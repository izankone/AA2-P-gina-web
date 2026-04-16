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

export interface Order {
    id: number;
    userId: number;
    productId: number;
    productName: string;
    quantity: number;
    total: number;
    status: 'pendiente' | 'enviado' | 'entregado';
    createdAt: string;
}
