import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Cart from '../Cart/Cart';
import CartProvider from '../../store/CartProvider';

const MainLayout: React.FC = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Outlet /> {/* This will render the matched child route (e.g., Meals page) */}
      </main>
    </CartProvider>
  );
};

export default MainLayout;
