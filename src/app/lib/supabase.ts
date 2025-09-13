import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for our database tables
export interface User {
  id: string
  email: string
  username: string
  full_name: string
  avatar_url?: string
  role: 'admin' | 'member' | 'visitor'
  discord_id?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  content: string
  image_url?: string
  github_url?: string
  status: 'planning' | 'in_progress' | 'completed' | 'archived'
  created_by: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location?: string
  max_participants?: number
  current_participants: number
  created_by: string
  created_at: string
  updated_at: string
}

export interface Resource {
  id: string
  title: string
  description: string
  url?: string
  file_url?: string
  category: 'datasheet' | 'tutorial' | 'tool' | 'library' | 'other'
  created_by: string
  created_at: string
  updated_at: string
} 