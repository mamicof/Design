"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

// カテゴリ一覧を取得
export async function getCategories() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("categories")
      .select(`
        id,
        name,
        slug,
        subcategories(id, name, slug)
      `)
      .order("name")

    if (error) {
      console.error("Error fetching categories:", error)
      return []
    }

    return data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      items: category.subcategories.map((subcat) => ({
        id: subcat.id,
        name: subcat.name,
        slug: subcat.slug,
      })),
    }))
  } catch (error) {
    console.error("Error in getCategories:", error)
    return []
  }
}

// カテゴリ別の記事一覧を取得
export async function getArticlesByCategory(categorySlug: string) {
  try {
    const supabase = createServerSupabaseClient()

    // まず大カテゴリで検索
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("slug", categorySlug)
      .single()

    if (categoryError) {
      // 大カテゴリで見つからなければ、中カテゴリで検索
      const { data: subcategory, error: subcategoryError } = await supabase
        .from("subcategories")
        .select("id, name, slug, category_id, categories(id, name, slug)")
        .eq("slug", categorySlug)
        .single()

      if (subcategoryError) {
        console.error("Error fetching category:", subcategoryError)
        return null
      }

      // 中カテゴリの記事を取得
      const { data: articles, error: articlesError } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          status,
          author,
          created_at,
          updated_at,
          categories(id, name, slug),
          subcategories(id, name, slug),
          article_tags(tag_id, tags(id, name, slug))
        `)
        .eq("subcategory_id", subcategory.id)
        .eq("status", "published")
        .order("created_at", { ascending: false })

      if (articlesError) {
        console.error("Error fetching articles:", articlesError)
        return null
      }

      return {
        name: subcategory.name,
        slug: subcategory.slug,
        parentCategory: subcategory.categories?.name,
        description: `${subcategory.name}に関する記事をまとめたカテゴリです。`,
        articles: formatArticles(articles),
      }
    }

    // 大カテゴリの記事を取得
    const { data: articles, error: articlesError } = await supabase
      .from("articles")
      .select(`
        id,
        title,
        status,
        author,
        created_at,
        updated_at,
        categories(id, name, slug),
        subcategories(id, name, slug),
        article_tags(tag_id, tags(id, name, slug))
      `)
      .eq("category_id", category.id)
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (articlesError) {
      console.error("Error fetching articles:", articlesError)
      return null
    }

    return {
      name: category.name,
      slug: category.slug,
      description: `${category.name}に関する記事をまとめたカテゴリです。`,
      articles: formatArticles(articles),
    }
  } catch (error) {
    console.error("Error in getArticlesByCategory:", error)
    return null
  }
}

// 記事データのフォーマット
function formatArticles(articles: any[]) {
  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    category: article.categories?.name || "",
    subcategory: article.subcategories?.name || "",
    tags: article.article_tags?.map((tag: any) => tag.tags?.name) || [],
    date: new Date(article.created_at).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author: article.author || "",
  }))
}
