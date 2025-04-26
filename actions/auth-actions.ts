"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

// ログイン処理のサーバーアクション
export async function loginAdmin(username: string, password: string) {
  const supabase = createServerSupabaseClient()

  try {
    // ユーザー名でadminを検索
    const { data, error } = await supabase
      .from("admins")
      .select("id, username, password_hash")
      .eq("username", username)
      .single()

    if (error || !data) {
      return { success: false, message: "ユーザー名またはパスワードが正しくありません" }
    }

    // パスワードの検証
    // 実際の実装では、bcryptなどを使用してパスワードを検証します
    // ここでは簡易的な実装としています
    if (data.password_hash !== password) {
      return { success: false, message: "ユーザー名またはパスワードが正しくありません" }
    }

    // 認証成功
    return { success: true, userId: data.id }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "ログイン処理中にエラーが発生しました" }
  }
}
