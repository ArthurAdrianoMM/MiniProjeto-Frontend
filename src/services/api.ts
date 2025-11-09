import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { storage } from '../utils/storage';
import type { ApiError, Habit, HabitRequest, HabitFilters, LoginRequest, LoginResponse, RegisterRequest, User } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add token
    this.api.interceptors.request.use(
      (config) => {
        const token = storage.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          const errorMessage = error.response.data?.error;
          if (errorMessage === 'Token expirado' || errorMessage === 'Token de acesso não fornecido') {
            storage.clear();
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication endpoints
  async register(data: RegisterRequest): Promise<User> {
    const response = await this.api.post<{ id: string; name: string; email: string; createdAt: string; message: string }>('/api/register', data);
    return {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      createdAt: response.data.createdAt,
    };
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>('/api/login', data);
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await this.api.get<{ message: string; user: User; timestamp: string }>('/api/profile');
    return response.data.user;
  }

  async testProtected(): Promise<{ message: string; user: User; timestamp: string }> {
    const response = await this.api.get('/api/protected');
    return response.data;
  }

  // Habit endpoints
  async createHabit(data: HabitRequest): Promise<Habit> {
    const response = await this.api.post<Habit & { message: string }>('/api/habits', data);
    const { message, ...habit } = response.data;
    return habit;
  }

  async getHabits(filters?: HabitFilters): Promise<Habit[]> {
    const params = new URLSearchParams();
    if (filters?.isActive !== undefined) {
      params.append('isActive', String(filters.isActive));
    }
    if (filters?.frequency) {
      params.append('frequency', filters.frequency);
    }
    if (filters?.name) {
      params.append('name', filters.name);
    }

    const response = await this.api.get<{ habits: Habit[]; count: number; message: string }>(
      `/api/habits${params.toString() ? `?${params.toString()}` : ''}`
    );
    return response.data.habits;
  }

  async getHabitById(id: string): Promise<Habit> {
    const response = await this.api.get<Habit>(`/api/habits/${id}`);
    return response.data;
  }

  async updateHabit(id: string, data: HabitRequest): Promise<Habit> {
    const response = await this.api.put<Habit & { message: string }>(`/api/habits/${id}`, data);
    const { message, ...habit } = response.data;
    return habit;
  }

  async patchHabit(id: string, data: Partial<HabitRequest>): Promise<Habit> {
    const response = await this.api.patch<Habit & { message: string }>(`/api/habits/${id}`, data);
    const { message, ...habit } = response.data;
    return habit;
  }

  async deleteHabit(id: string): Promise<void> {
    await this.api.delete<{ message: string; id: string }>(`/api/habits/${id}`);
  }

  // Utility endpoints
  async healthCheck(): Promise<{ status: string; timestamp: string; uptime: number; environment: string }> {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();

