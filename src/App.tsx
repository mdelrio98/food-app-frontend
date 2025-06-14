import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Meals from './components/Meals/Meals';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthLayout from './components/Layout/AuthLayout';
import MainLayout from './components/Layout/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Autenticación (sin header principal, sin cart) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas Protegidas (con header principal, con cart) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Meals />} />
            {/* Agrega aquí otras rutas que quieras proteger y que usen MainLayout */}
          </Route>
        </Route>

        {/* Redirección por defecto si no se encuentra la ruta o para rutas no autenticadas */}
        {/* Considera a dónde quieres redirigir si alguien intenta acceder a una ruta protegida sin estar logueado */}
        {/* O si una ruta no coincide con nada */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
