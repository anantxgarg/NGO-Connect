'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/lib/database.types';
import { supabaseClient } from '@/lib/supabase-client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (supabaseUser: SupabaseUser | null) => {
    if (!supabaseUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const { data } = await supabaseClient
      .from('users')
      .select('*')
      .eq('id', supabaseUser.id)
      .maybeSingle();

    setUser(data);
    setLoading(false);
  };

  const refreshUser = async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    await fetchUser(session?.user || null);
  };

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      await fetchUser(session?.user || null);

      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
        (_event, session) => {
          (async () => {
            await fetchUser(session?.user || null);
          })();
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    })();
  }, []);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
