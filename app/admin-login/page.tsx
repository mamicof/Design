"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // 実際のアプリケーションでは、このパスワードはサーバーサイドで安全に保存・検証する必要があります
  // ここでは簡易的な実装として、クライアントサイドでパスワードを検証しています
  const ADMIN_PASSWORD = "admin123" // 実際の実装では環境変数などで安全に管理してください

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // パスワードの検証
      if (password === ADMIN_PASSWORD) {
        // パスワードが正しい場合、Cookieを設定してログイン状態を保存
        // 実際のアプリケーションでは、サーバーサイドでセッションを管理する必要があります
        document.cookie = "admin_authenticated=true; path=/; max-age=3600" // 1時間有効

        // 管理画面にリダイレクト
        router.push("/admin")
      } else {
        setError("パスワードが正しくありません")
      }
    } catch (err) {
      setError("ログイン処理中にエラーが発生しました")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>管理者ログイン</CardTitle>
          <CardDescription>管理機能にアクセスするにはパスワードを入力してください</CardDescription>
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
