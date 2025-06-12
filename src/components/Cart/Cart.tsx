import { FC, Fragment, useContext, useState } from 'react';

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
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData: UserData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Usar el servicio de API en lugar de fetch
      await Api.createOrder({ 
        userId: 'user-1', // Placeholder userId
        shippingAddress: userData, 
        items: cartCtx.items.map(item => ({ productId: item.productId, quantity: item.quantity })) 
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
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.productId}
          name={item.name}
          amount={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.productId)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
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
