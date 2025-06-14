// src/types/auth.ts

/**
 * Interfaz para el objeto User, basado en la respuesta esperada del backend.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  // Agrega otros campos que devuelve tu API para el usuario
  // Ejemplo: role, direccion, telefono, etc.
}

/**
 * Interfaz para la respuesta de la API de login y registro.
 */
export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  message?: string; // Mensaje opcional de éxito
}

/**
 * Interfaz para el payload de la API de login.
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Interfaz para el payload de la API de registro.
 * Extiende LoginPayload y añade campos adicionales si son necesarios.
 */
export interface RegisterPayload extends LoginPayload {
  name: string;
  // Agrega otros campos necesarios para el registro, ej: direccion, telefono
}

/**
 * Interfaz para el estado de autenticación en el slice de Redux.
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null; // Puede ser string o un objeto de error serializado
}
