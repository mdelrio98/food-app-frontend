// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Api from '../../services/Api';
import { AuthResponse, AuthState, LoginPayload, RegisterPayload, User } from '../../types/auth';
import { notifier } from '../../utils/notifier';

// Cargar el estado inicial desde localStorage para la hidratación inicial sin redux-persist si fuera necesario
const token = localStorage.getItem('authToken');
const userString = localStorage.getItem('authUser');

const initialState: AuthState = {
  user: userString && userString !== 'undefined' ? (JSON.parse(userString) as User) : null,
  token: token,
  isAuthenticated: !!token,
  isLoading: false,
  error: null as string | null,
};

// Async Thunk para Login
export const loginUser = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await Api.login(credentials);
      // El token se guarda en el reducer con persistencia, pero también se puede hacer aquí si se prefiere
      notifier.success(response.data.message || 'Login successful!');
      return response.data; // Payload para el reducer: { user, token, message }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to login';
      notifier.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async Thunk para Registro
export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Api.register(userData);
      notifier.success(response.data.message || 'Registration successful! Please login.');
      // No logueamos al usuario automáticamente, se redirige a login
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to register';
      notifier.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state: AuthState) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // No es necesario tocar localStorage aquí si redux-persist está configurado para purgar
      // pero hacerlo manualmente asegura la limpieza inmediata.
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      notifier.info('You have been logged out.');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.isAuthenticated = true;

        const { id, name, email, token } = action.payload;
        const user: User = { id, name, email };

        state.user = user;
        state.token = token;

        // Explicitly set items in localStorage for immediate availability
        localStorage.setItem('authUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        // No state change on fulfilled, user must login after register.
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
