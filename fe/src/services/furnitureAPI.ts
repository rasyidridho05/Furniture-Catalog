import type { Furniture } from '../types/furniture';
import type { DataForm } from '../components/FormAdd';

const BASE_URL = 'http://localhost:3000/furniture';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const pesan = Array.isArray(body?.message)
      ? body.message.join(', ')
      : (body?.message ?? 'Terjadi kesalahan pada server');
    throw new Error(pesan);
  }
  return res.json();
}

export const getAllFurniture = () => request<Furniture[]>(BASE_URL);

export const createFurniture = (data: DataForm) =>
  request<Furniture>(BASE_URL, { method: 'POST', body: JSON.stringify(data) });

export const updateFurniture = (id: number, data: DataForm) =>
  request<Furniture>(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

export const deleteFurniture = (id: number) =>
  request<{ message: string }>(`${BASE_URL}/${id}`, { method: 'DELETE' });