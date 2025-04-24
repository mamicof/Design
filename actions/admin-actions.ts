"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

// 記事を保存（新規作成または更新）
export async function saveArticle(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const id = formData.get("id") ? Number.parseInt(formData.get("id") as string) : undefined
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const categoryId = Number.parseInt(formData.get("category_id") as string)
  const subcategoryId = Number.parseInt(formData.get("subcategory_id") as string)
  const status = formData.get("status") as string
  const author = formData.get("author") as string
  const tags = JSON.parse(formData.get("tags") as string) as number[]

  try {
    // 記事の保存
    let articleId = id

    if (id) {
      // 既存記事の更新
      const { error } = await supabase
        .from("articles")
        .update({
          title,
          content,
          category_id: categoryId,
          subcategory_id: subcategoryId,
          status,
          author,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error
    } else {
      // 新規記事の作成
      const { data, error } = await supabase
        .from("articles")
        .insert({
          title,
          content,
          category_id: categoryId,
          subcategory_id: subcategoryId,
          status,
          author,
        })
        .select("id")
        .single()

      if (error) throw error
      articleId = data.id
    }

    if (articleId) {
      // 既存のタグ関連付けを削除
      const { error: deleteError } = await supabase.from("article_tags").delete().eq("article_id", articleId)

      if (deleteError) throw deleteError

      // 新しいタグ関連付けを追加
      if (tags.length > 0) {
        const tagInserts = tags.map((tagId) => ({
          article_id: articleId!,
          tag_id: tagId,
        }))

        const { error: insertError } = await supabase.from("article_tags").insert(tagInserts)

        if (insertError) throw insertError
      }
    }

    // キャッシュを更新
    revalidatePath("/")
    revalidatePath(`/article/${articleId}`)
    revalidatePath("/admin/articles")

    return { success: true, id: articleId }
  } catch (error) {
    console.error("Error saving article:", error)
    return { success: false, error: (error as Error).message }
  }
}
