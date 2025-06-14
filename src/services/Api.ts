// src/services/apiService.ts

import { AxiosPromise } from 'axios';
import {
  User,
  Order,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
  Cart,
  AddItemToCartPayload,
  PostCartItemResponse,
  CreateMealPayload,
  GetMealsResponse,
  Meal,
  UpdateMealPayload,
} from '../types/types';
import { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth';
import { api } from './axiosInstance';

export default class Api {
  // --- Auth Service --- //
  public static login = (credentials: LoginPayload): AxiosPromise<AuthResponse> => {
    return api.post('/auth/login', credentials);
  };

  public static register = (userData: RegisterPayload): AxiosPromise<AuthResponse> => {
    return api.post('/auth/register', userData);
  };

  public static fetchUserProfile = (): AxiosPromise<User> => {
    return api.get('/auth/profile');
  };

  // --- User Service --- //
  public static fetchUsers = (): AxiosPromise<User[]> => {
    return api.get('/users');
  };

  public static fetchUserById = (id: string): AxiosPromise<User> => {
    return api.get(`/users/${id}`);
  };

  // --- Meal Service --- //
  public static fetchMeals = (): AxiosPromise<GetMealsResponse> => {
    return api.get('/meals');
  };

  public static fetchMealById = (id: string): AxiosPromise<Meal> => {
    return api.get(`/meals/${id}`);
  };

  public static createMeal = (data: CreateMealPayload): AxiosPromise<Meal> => {
    return api.post('/meals', data);
  };

  public static updateMeal = (id: string, data: UpdateMealPayload): AxiosPromise<Meal> => {
    return api.put(`/meals/${id}`, data);
  };

  public static deleteMeal = (id: string): AxiosPromise<void> => {
    return api.delete(`/meals/${id}`);
  };

  // --- Order Service --- //
  public static fetchOrders = (params?: { userId?: string; status?: string }): AxiosPromise<Order[]> => {
    return api.get('/orders', { params });
  };

  public static fetchOrderById = (id: string): AxiosPromise<Order> => {
    return api.get(`/orders/${id}`);
  };

  public static createOrder = (data: CreateOrderPayload): AxiosPromise<Order> => {
    return api.post('/orders', data);
  };

  public static updateOrderStatus = (id: string, data: UpdateOrderStatusPayload): AxiosPromise<Order> => {
    return api.patch(`/orders/${id}/state`, data);
  };

  // --- Cart Service --- //
  public static fetchCart = (): AxiosPromise<Cart> => {
    return api.get('/cart');
  };

  public static addItemToCart = (payload: AddItemToCartPayload): AxiosPromise<PostCartItemResponse> => {
    return api.post('/cart/items', payload);
  };

  public static removeItemFromCart = (MealId: string): AxiosPromise<Cart> => {
    return api.delete(`/cart/items/${MealId}`);
  };

  public static clearCart = (): AxiosPromise<void> => {
    return api.delete('/cart');
  };
}
