// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './slices/authSlice';
// Importa otros reducers aquí si los tienes
// import cartReducer from './slices/cartSlice'; // Ejemplo

const rootReducer = combineReducers({
  auth: authReducer,
  // cart: cartReducer, // Ejemplo
  // Agrega otros reducers aquí
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Solo persistiremos el slice 'auth'. Puedes añadir más.
  // blacklist: ['cart'] // Opcional: slices que NO quieres persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // Habilita DevTools solo en desarrollo
});

export const persistor = persistStore(store);

// Tipos para el estado y el dispatch, para usar con TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
