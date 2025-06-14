import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <main className="auth-layout">
      <Outlet /> {/* This will render the matched child route (e.g., LoginPage or RegisterPage) */}
    </main>
  );
};

export default AuthLayout;
