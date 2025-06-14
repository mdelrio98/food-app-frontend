import { FC, Fragment, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; 

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout, { UserData } from './Checkout';
import Api from '../../services/Api';
import { ICartItem } from '../../types/types';

// Define la interfaz para las props del componente
interface CartProps {
  onClose: () => void;
}

const Cart: FC<CartProps> = (props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item:ICartItem) => {
    // El contexto ya debería manejar la lógica de agregar un item existente
    cartCtx.addItem({ ...item, mealId: item.mealId, quantity: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData: UserData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Usar el servicio de API en lugar de fetch
      if (!user || !user.id) {
        setError('User not authenticated. Please login to place an order.');
        setIsSubmitting(false);
        return;
      }
      await Api.createOrder({
        userId: user.id,
        shippingAddress: userData,
        items: cartCtx.items.map((item:ICartItem) => ({ mealId: item.mealId, quantity: item.quantity }))
      });
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error: any) {
      setError(error.message || 'Failed to submit order.');
    }
    setIsSubmitting(false);
  };

  const cartItemsClasses = `${classes['cart-items']} ${isCheckout ? classes.checkout : ''}`;

  const cartItems = (
    <ul className={cartItemsClasses}>
      {cartCtx.items.map((item, index) => {
        // Fallback key logic: prefer mealId, but use index if mealId is missing.
        const keyToUse = item.mealId !== undefined && item.mealId !== null ? item.mealId : `cart-item-${index}`;
        if (item.mealId === undefined || item.mealId === null) {
          /* eslint-disable-next-line no-console */
          console.warn('Cart item missing mealId, using index as fallback key:', item);
        }
        return (
          <CartItem
            key={keyToUse}
            name={item.name}
            amount={item.quantity}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.mealId)} // Ensure item.mealId is valid for removal
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      ) : <>{modalActions}</>}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const errorModalContent = (
    <Fragment>
      <p>{error}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  /* eslint-disable-next-line no-console */
  console.log('Current cartCtx.items:', cartCtx.items); // Log items when Cart component renders

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && !error && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && !error && didSubmitModalContent}
      {error && !isSubmitting && errorModalContent}
    </Modal>
  );
};

export default Cart;
