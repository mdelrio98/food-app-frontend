import React from 'react';
import { ICartItem } from '../types/types';

// Define the shape of the Cart Context
export interface CartContextType {
  items: ICartItem[];
  totalAmount: number;
  addItem: (item: ICartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// Create the context with a default value for autocompletion and type safety
const CartContext = React.createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
