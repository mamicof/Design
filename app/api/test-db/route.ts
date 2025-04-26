import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // 簡単なクエリを実行してデータベース接続をテスト
    const { data, error } = await supabase.from("categories").select("id, name").limit(1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "データベース接続に成功しました",
      data,
    })
  } catch (error) {
    console.error("データベース接続エラー:", error)
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
