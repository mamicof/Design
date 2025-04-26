"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createServerSupabaseClient } from "@/lib/supabase"

// ログイン処理のサーバーアクション
async function loginAdmin(username: string, password: string) {
  "use server"

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

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await loginAdmin(username, password)

      if (result.success) {
        // 認証成功時の処理
        // 実際の実装では、セッションやCookieを設定します
        document.cookie = "admin_authenticated=true; path=/; max-age=3600" // 1時間有効
        router.push("/admin")
      } else {
        setError(result.message || "ログインに失敗しました")
      }
    } catch (err) {
      console.error(err)
      setError("ログイン処理中にエラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>管理者ログイン</CardTitle>
          <CardDescription>管理機能にアクセスするにはログインしてください</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">ユーザー名</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
