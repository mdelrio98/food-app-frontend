import { FC, ReactNode, useState, useEffect, useCallback } from 'react';
import CartContext, { CartContextType } from './cart-context';
import Api from '../services/Api';
import { notifier } from '../utils/notifier';
import { AddItemToCartPayload, ICartItem } from '../types/types';

// Define the structure of the cart state
interface CartState {
  items: ICartItem[];
  totalAmount: number;
}

const defaultCartState: CartState = { items: [], totalAmount: 0 };


// Define the props for the provider
interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: FC<CartProviderProps> = (props) => {
  const [cart, setCart] = useState<CartState>(defaultCartState);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCartHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Api.fetchCart();
      if (response.status === 200) {
        setCart(response.data);
      }
    } catch (error) {
      // Error is handled by the global interceptor
      
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartHandler();
  }, [fetchCartHandler]);

  const addItemToCartHandler = async (item: ICartItem) => {
    setIsLoading(true);
    try {
      const payload: AddItemToCartPayload = { mealId: item.mealId, quantity: item.quantity };
      const response = await Api.addItemToCart(payload);
      if (response.status === 200) {
        setCart((prevCart) => {
          const updatedTotalAmount = prevCart.totalAmount + item.price * item.quantity;

          const existingCartItemIndex = prevCart.items.findIndex(
            (cartItem) => cartItem.mealId === item.mealId
          );
          const existingCartItem = prevCart.items[existingCartItemIndex];

          let updatedItems;

          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + item.quantity,
            };
            updatedItems = [...prevCart.items];
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            // The API response for adding an item might not be the full product, 
            // so we construct the new cart item from the submitted `item`.
            const newItem = { ...item, mealId: item.mealId };
            updatedItems = prevCart.items.concat(newItem);
          }

          return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          };
        });
        notifier.success('Item added to cart!');
      }
    } catch (error) {
      // Error is handled by the global interceptor
    } finally {
      setIsLoading(false);
    }
  };

  const removeItemFromCartHandler = async (id: string) => {
    if (id === undefined) {
      notifier.error('Cannot remove item: ID is undefined.');
      console.error('Attempted to remove item with undefined ID');
      return;
    }
    setIsLoading(true);
    try {
      const response = await Api.removeItemFromCart(id);
      if (response.status === 200) {
        setCart((prevCart) => {
          const itemToRemove = prevCart.items.find((item) => item.mealId === id);

          if (!itemToRemove) {
            return prevCart; // Should not happen, but as a safeguard
          }

          const updatedItems = prevCart.items.filter((item) => item.mealId !== id);
          const updatedTotalAmount =
            prevCart.totalAmount - itemToRemove.price * itemToRemove.quantity;

          return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
          };
        });
        notifier.success('Item removed from cart!');
      }
    } catch (error) {
      // Error is handled by the global interceptor
    } finally {
      setIsLoading(false);
    }
  };

  const clearCartHandler = async () => {
    setIsLoading(true);
    try {
      const response = await Api.clearCart();
      if (response.status === 200) {
        setCart(defaultCartState);
        notifier.success('Cart cleared!');
      }
    } catch (error) {
      // Error is handled by the global interceptor
    } finally {
      setIsLoading(false);
    }
  };

  const cartContext: CartContextType = {
    items: cart.items,
    totalAmount: cart.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
  );
};

export { CartProvider as default };
