import type { ICoffee, CoffeeFormData } from '../types/coffee';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/coffees';

export async function getAllCoffees(): Promise<ICoffee[]> {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error('Unable to load your coffee collection.');
  return res.json();
}

export async function getCoffeeById(id: string): Promise<ICoffee> {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (res.status === 404) throw new Error('Coffee not found.');
  if (!res.ok) throw new Error('Failed to fetch coffee details.');
  return res.json();
}

export async function addCoffee(data: CoffeeFormData): Promise<ICoffee> {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (res.status === 409 || res.status === 400) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'This coffee is already in your collection.');
  }
  if (!res.ok) throw new Error('Failed to save coffee entry.');
  return res.json();
}

export async function updateCoffee(id: string, data: Partial<CoffeeFormData>): Promise<ICoffee> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update coffee entry.');
  return res.json();
}

export async function deleteCoffee(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to remove coffee entry.');
}