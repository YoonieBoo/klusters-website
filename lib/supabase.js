import { createClient } from '@supabase/supabase-js'
import WebSocket from 'ws'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

export function hasSupabaseServerConfig() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey)
}

export function getSupabaseClient() {
  if (!hasSupabaseConfig()) {
    throw new Error(
      'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    )
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
      transport: WebSocket,
    },
  })
}

export function getSupabaseServerClient() {
  if (!hasSupabaseServerConfig()) {
    throw new Error(
      'Supabase server client is not configured. Add SUPABASE_SERVICE_ROLE_KEY on the server.'
    )
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      transport: WebSocket,
    },
  })
}
