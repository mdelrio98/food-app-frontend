// src/services/apiService.ts

import { AxiosPromise } from 'axios';
import {
  User,
  Product,
  Order,
  CreateProductPayload,
  UpdateProductPayload,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
  LoginRequestPayload,
  LoginResponseData,
  Cart,
  AddItemToCartPayload,
  GetProductsResponse,
  PostCartItemResponse,
} from '../types/types';
import {api} from './axiosInstance';

export default class Api {
  // --- Auth Service --- //
  public static login = (credentials: LoginRequestPayload): AxiosPromise<LoginResponseData> => {
    return api.post('/auth/login', credentials);
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

  // --- Product Service --- //
  public static fetchProducts = (): AxiosPromise<GetProductsResponse> => {
    return api.get('/products');
  };

  public static fetchProductById = (id: string): AxiosPromise<Product> => {
    return api.get(`/products/${id}`);
  };

  public static createProduct = (data: CreateProductPayload): AxiosPromise<Product> => {
    return api.post('/products', data);
  };

  public static updateProduct = (id: string, data: UpdateProductPayload): AxiosPromise<Product> => {
    return api.put(`/products/${id}`, data);
  };

  public static deleteProduct = (id: string): AxiosPromise<void> => {
    return api.delete(`/products/${id}`);
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

  public static removeItemFromCart = (productId: string): AxiosPromise<Cart> => {
    return api.delete(`/cart/items/${productId}`);
  };

  public static clearCart = (): AxiosPromise<void> => {
    return api.delete('/cart');
  };
}
