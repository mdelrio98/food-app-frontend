// src/components/Auth/ProtectedRoute.tsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../../store';

interface ProtectedRouteProps {
  // Puedes añadir props para control de roles si lo necesitas en el futuro
  // roles?: string[];
}

const ProtectedRoute = ({}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Mientras se carga el estado de autenticación (ej. desde persist), podrías mostrar un spinner
  if (isLoading) {
    return <div>Loading...</div>; // O un componente Spinner más elegante
  }

  if (!isAuthenticated) {
    // Redirige al login, pero guarda la ubicación a la que intentaban ir
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, renderiza el componente hijo (la ruta protegida)
  return <Outlet />;
};

export default ProtectedRoute;
