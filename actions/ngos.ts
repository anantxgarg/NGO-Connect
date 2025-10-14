'use server';

import { supabase } from '@/lib/supabase';
import { NGO } from '@/lib/database.types';

export async function getNgos(filters?: {
  verified?: boolean;
  city?: string;
  search?: string;
  limit?: number;
}) {
  let query = supabase
    .from('ngos')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.verified !== undefined) {
    query = query.eq('is_verified', filters.verified);
  }

  if (filters?.city) {
    query = query.eq('address_city', filters.city);
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching NGOs:', error);
    return [];
  }

  return data as NGO[];
}

export async function getNgoBySlug(slug: string) {
  const { data, error } = await supabase
    .from('ngos')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error fetching NGO:', error);
    return null;
  }

  return data as NGO | null;
}

export async function getNgoById(id: string) {
  const { data, error } = await supabase
    .from('ngos')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching NGO:', error);
    return null;
  }

  return data as NGO | null;
}
