import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 管理機能へのアクセスを制限するミドルウェア
export function middleware(request: NextRequest) {
  // 一時的に認証チェックを無効化
  return NextResponse.next()

  // 以下の認証コードはコメントアウト
  /*
  // 管理機能ページへのアクセスをチェック
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // セッションからログイン状態を確認
    const isLoggedIn = request.cookies.get("admin_authenticated")

    // ログインしていない場合はログインページにリダイレクト
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }
  }

  return NextResponse.next()
  */
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: "/admin/:path*",
}
