export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'Diário' | 'Semanal' | 'Quinzenal' | 'Mensal';
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message: string;
}

export interface HabitRequest {
  name: string;
  description?: string;
  frequency: 'Diário' | 'Semanal' | 'Quinzenal' | 'Mensal';
  isActive?: boolean;
}

export interface HabitFilters {
  isActive?: boolean;
  frequency?: 'Diário' | 'Semanal' | 'Quinzenal' | 'Mensal';
  name?: string;
}

export interface ApiError {
  error: string;
  message?: string;
}

