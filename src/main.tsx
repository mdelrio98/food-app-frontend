import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect } from 'react';

import './index.css';
import App from './App';

// Initialize axios mock adapter for development
//import './mock/axiosMock.js';
import { notifier } from './utils/notifier';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; 
import CartProvider from './store/CartProvider'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

// Helper component to bridge notistack with our notifier utility
const Notifier = () => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    notifier.enqueueSnackbar = enqueueSnackbar;
  }, [enqueueSnackbar]);
  return null;
};

root.render(
  <React.StrictMode>
    <SnackbarProvider 
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Notifier />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
