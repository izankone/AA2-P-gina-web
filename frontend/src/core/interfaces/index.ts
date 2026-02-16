// src/core/interfaces/index.ts

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    categoryId: number;
    image?: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'user' | 'editor';
    token?: string; // Para simular auth
}
