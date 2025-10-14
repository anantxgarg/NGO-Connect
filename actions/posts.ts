'use server';

import { supabase } from '@/lib/supabase';
import { Post, PostType, PostCategory, PostStatus } from '@/lib/database.types';

export async function getPosts(filters?: {
  type?: PostType;
  category?: PostCategory;
  status?: PostStatus;
  search?: string;
  limit?: number;
}) {
  let query = supabase
    .from('posts')
    .select('*, ngos(*)')
    .order('created_at', { ascending: false });

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  } else {
    query = query.eq('status', 'OPEN');
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data as unknown as (Post & { ngos: any })[];
}

export async function getPostById(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, ngos(*)')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data as unknown as Post & { ngos: any } | null;
}

export async function incrementPostViews(postId: string) {
  try {
    const { data: post } = await supabase
      .from('posts')
      .select('view_count')
      .eq('id', postId)
      .maybeSingle();

    if (post && typeof post === 'object' && 'view_count' in post) {
      const newCount = ((post as any).view_count || 0) + 1;
      const updateQuery = supabase.from('posts').update as any;
      await updateQuery({ view_count: newCount }).eq('id', postId);
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}
