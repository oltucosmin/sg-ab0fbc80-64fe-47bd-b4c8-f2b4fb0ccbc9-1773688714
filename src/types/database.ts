export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          image_url: string
          category: 'solar' | 'heat-pump' | 'hybrid'
          power: string | null
          completed_date: string
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location: string
          image_url: string
          category: 'solar' | 'heat-pump' | 'hybrid'
          power?: string | null
          completed_date: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          image_url?: string
          category?: 'solar' | 'heat-pump' | 'hybrid'
          power?: string | null
          completed_date?: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          message: string
          gdpr_consent: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          message: string
          gdpr_consent: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          message?: string
          gdpr_consent?: boolean
          created_at?: string
        }
      }
    }
  }
}