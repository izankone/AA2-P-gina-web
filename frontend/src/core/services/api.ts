// src/core/services/api.ts

const API_URL = 'http://localhost:3000';

export async function get<T>(resource: string): Promise<T> {
    const response = await fetch(`${API_URL}/${resource}`);
    if (!response.ok) {
        throw new Error(`Error fetching ${resource}: ${response.statusText}`);
    }
    return response.json();
}

export async function post<T>(resource: string, data: any): Promise<T> {
    const response = await fetch(`${API_URL}/${resource}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error querying ${resource}: ${response.statusText}`);
    }
    return response.json();
}

// Métodos put y delete se añadirán según necesidad
export async function put<T>(resource: string, id: number, data: any): Promise<T> {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function remove(resource: string, id: number): Promise<void> {
    await fetch(`${API_URL}/${resource}/${id}`, {
        method: 'DELETE',
    });
}
