export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: number
          title: string
          content: string
          category_id: number | null
          subcategory_id: number | null
          status: string
          author: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          content: string
          category_id?: number | null
          subcategory_id?: number | null
          status?: string
          author?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string
          category_id?: number | null
          subcategory_id?: number | null
          status?: string
          author?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      subcategories: {
        Row: {
          id: number
          name: string
          slug: string
          category_id: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          category_id: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          category_id?: number
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: number
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      article_tags: {
        Row: {
          article_id: number
          tag_id: number
        }
        Insert: {
          article_id: number
          tag_id: number
        }
        Update: {
          article_id?: number
          tag_id?: number
        }
      }
      admins: {
        Row: {
          id: number
          username: string
          password_hash: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          username: string
          password_hash: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          username?: string
          password_hash?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
