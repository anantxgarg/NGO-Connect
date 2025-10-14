export type UserRole = 'USER' | 'NGO' | 'ADMIN';
export type PostType = 'DONATION' | 'DRIVE';
export type PostStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'FULFILLED';
export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type PostCategory = 'Food' | 'Clothes' | 'Education' | 'Environment' | 'Medical' | 'Books' | 'Technology' | 'Other';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: UserRole;
          phone: string | null;
          city: string | null;
          interests: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: UserRole;
          phone?: string | null;
          city?: string | null;
          interests?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: UserRole;
          phone?: string | null;
          city?: string | null;
          interests?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ngos: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          description: string;
          email: string;
          phone: string | null;
          address_city: string;
          address_state: string;
          address_country: string;
          address_pincode: string | null;
          logo_url: string | null;
          cover_url: string | null;
          website: string | null;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          description: string;
          email: string;
          phone?: string | null;
          address_city: string;
          address_state: string;
          address_country: string;
          address_pincode?: string | null;
          logo_url?: string | null;
          cover_url?: string | null;
          website?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          slug?: string;
          description?: string;
          email?: string;
          phone?: string | null;
          address_city?: string;
          address_state?: string;
          address_country?: string;
          address_pincode?: string | null;
          logo_url?: string | null;
          cover_url?: string | null;
          website?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      ngo_verifications: {
        Row: {
          id: string;
          ngo_id: string;
          documents: string[];
          status: VerificationStatus;
          notes: string | null;
          reviewed_by: string | null;
          created_at: string;
          reviewed_at: string | null;
        };
        Insert: {
          id?: string;
          ngo_id: string;
          documents: string[];
          status?: VerificationStatus;
          notes?: string | null;
          reviewed_by?: string | null;
          created_at?: string;
          reviewed_at?: string | null;
        };
        Update: {
          id?: string;
          ngo_id?: string;
          documents?: string[];
          status?: VerificationStatus;
          notes?: string | null;
          reviewed_by?: string | null;
          created_at?: string;
          reviewed_at?: string | null;
        };
      };
      posts: {
        Row: {
          id: string;
          ngo_id: string;
          type: PostType;
          title: string;
          description: string;
          category: PostCategory;
          location: string;
          date_start: string | null;
          date_end: string | null;
          needed_count: number | null;
          status: PostStatus;
          images: string[] | null;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          ngo_id: string;
          type: PostType;
          title: string;
          description: string;
          category: PostCategory;
          location: string;
          date_start?: string | null;
          date_end?: string | null;
          needed_count?: number | null;
          status?: PostStatus;
          images?: string[] | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          ngo_id?: string;
          type?: PostType;
          title?: string;
          description?: string;
          category?: PostCategory;
          location?: string;
          date_start?: string | null;
          date_end?: string | null;
          needed_count?: number | null;
          status?: PostStatus;
          images?: string[] | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          message: string;
          status: ApplicationStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          message: string;
          status?: ApplicationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          message?: string;
          status?: ApplicationStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_inquiries: {
        Row: {
          id: string;
          ngo_id: string;
          post_id: string | null;
          user_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          ngo_id: string;
          post_id?: string | null;
          user_id?: string | null;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          ngo_id?: string;
          post_id?: string | null;
          user_id?: string | null;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          payload: any | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          payload?: any | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          payload?: any | null;
          is_read?: boolean;
          created_at?: string;
        };
      };
      saved_posts: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_id?: string;
          created_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          meta: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          meta?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_id?: string;
          action?: string;
          entity_type?: string;
          entity_id?: string;
          meta?: any | null;
          created_at?: string;
        };
      };
    };
  };
}

export type User = Database['public']['Tables']['users']['Row'];
export type NGO = Database['public']['Tables']['ngos']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Application = Database['public']['Tables']['applications']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type SavedPost = Database['public']['Tables']['saved_posts']['Row'];
