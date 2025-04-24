"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

// 記事一覧を取得
export async function getArticles() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      content,
      status,
      author,
      created_at,
      updated_at,
      categories(id, name, slug),
      subcategories(id, name, slug),
      article_tags(tag_id, tags(id, name, slug))
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching articles:", error)
    return []
  }

  // データを整形
  return data.map((article) => {
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      category: article.categories?.name || "",
      subcategory: article.subcategories?.name || "",
      tags: article.article_tags?.map((tag) => tag.tags?.name) || [],
      date: new Date(article.created_at).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      updatedDate: article.updated_at
        ? new Date(article.updated_at).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null,
      author: article.author || "",
    }
  })
}

// 記事詳細を取得
export async function getArticleById(id: number) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      content,
      status,
      author,
      created_at,
      updated_at,
      categories(id, name, slug),
      subcategories(id, name, slug),
      article_tags(tag_id, tags(id, name, slug))
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error(`Error fetching article with id ${id}:`, error)
    return null
  }

  // データを整形
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    category: data.categories?.name || "",
    subcategory: data.subcategories?.name || "",
    tags: data.article_tags?.map((tag) => tag.tags?.name) || [],
    date: new Date(data.created_at).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    updatedDate: data.updated_at
      ? new Date(data.updated_at).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null,
    author: data.author || "",
  }
}
