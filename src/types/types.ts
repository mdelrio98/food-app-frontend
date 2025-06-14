// src/types/api.ts


export interface User {
  id: string; // or number, depending on your backend
  name: string;
  email: string;
  // Add other user-specific fields like role, address, etc.
}

export interface Meal {
  id: string; // or number
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
  stock?: number;
  // Add other meal-specific fields
}
export interface GetMealsResponse{
  meals: Meal[];
}

export interface PostCartItemResponse extends Meal{
}

export interface OrderItem {
  mealId: string; // or number, should match meal's id type
  mealName?: string; // For display purposes on the frontend
  quantity: number;
  unitPrice: number; // Price at the time of order
}

export interface Order {
  id: string; // or number
  userId: string; // or number, should match User's id type
  items: OrderItem[];
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  createdAt?: string; // ISO date string (e.g., "2024-07-30T10:30:00Z")
  updatedAt?: string; // ISO date string
  shippingAddress?: any; // Define a proper interface for Address
  // Add other order-specific fields
}


// --- Request Payload Types ---

export interface CreateMealPayload extends Omit<Meal, 'id'> {}

export interface UpdateMealPayload extends Partial<Omit<Meal, 'id'>> {}

export interface CreateOrderPayload {
  userId: string; // or number
  items: Array<Omit<OrderItem, 'mealName' | 'unitPrice'>>;
  // Backend will likely calculate total and assign initial state and dates
  shippingAddress?: any; // Define a proper interface for Address
}

export interface UpdateOrderStatusPayload {
  status: Order['status'];
}

// Example for a login request/response if you need it
export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  user: User;
}


// --- Cart Types ---

export interface ICartItem {
  mealId: string; // or number
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Cart {
  id: string; // or number
  userId: string; // or number
  items: ICartItem[];
  subtotal: number; // Backend likely calculates this
  totalItems: number; // Backend likely calculates this
  totalAmount: number;
}

export interface AddItemToCartPayload {
  mealId: string; // or number
  quantity: number;
}
