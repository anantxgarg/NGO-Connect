'use server';

import { supabase } from './supabase';
import { User, UserRole } from './database.types';

export async function signUp(email: string, password: string, name: string, role: UserRole = 'USER') {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role,
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  return { success: true, user: authData.user };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    return { success: true, user: userData };
  }

  return { error: 'User not found' };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return null;
  }

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();

  return user;
}

export async function updateUserProfile(userId: string, data: Partial<User>) {
  const updateQuery = supabase.from('users').update as any;
  const { error } = await updateQuery({ ...data, updated_at: new Date().toISOString() }).eq('id', userId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
