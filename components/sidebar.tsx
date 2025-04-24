"use client"

import type React from "react"

import { useState, Suspense } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// サンプルデータ - 大カテゴリと中カテゴリの階層構造
const categories = [
  {
    name: "UIデザイン",
    slug: "uidesign", // 大カテゴリのスラッグは小文字で統一
    items: [
      { name: "色彩理論", slug: "色彩理論" },
      { name: "タイポグラフィ", slug: "タイポグラフィ" },
      { name: "レイアウト", slug: "レイアウト" },
      { name: "アクセシビリティ", slug: "アクセシビリティ" },
    ],
  },
  {
    name: "UXデザイン",
    slug: "uxdesign",
    items: [
      { name: "ユーザーリサーチ", slug: "ユーザーリサーチ" },
      { name: "ペルソナ", slug: "ペルソナ" },
      { name: "ユーザージャーニー", slug: "ユーザージャーニー" },
      { name: "プロトタイピング", slug: "プロトタイピング" },
    ],
  },
  {
    name: "グラフィックデザイン",
    slug: "graphicdesign",
    items: [
      { name: "ロゴデザイン", slug: "ロゴデザイン" },
      { name: "ブランディング", slug: "ブランディング" },
      { name: "印刷デザイン", slug: "印刷デザイン" },
      { name: "イラストレーション", slug: "イラストレーション" },
    ],
  },
  {
    name: "デザインツール",
    slug: "designtools",
    items: [
      { name: "Figma", slug: "figma" },
      { name: "Adobe XD", slug: "adobe-xd" },
      { name: "Sketch", slug: "sketch" },
      { name: "Photoshop", slug: "photoshop" },
      { name: "Illustrator", slug: "illustrator" },
    ],
  },
]

const tags = [
  "初心者向け",
  "上級者向け",
  "トレンド",
  "基礎知識",
  "ケーススタディ",
  "チュートリアル",
  "インスピレーション",
  "ツール",
  "テクニック",
]

// 検索フォームコンポーネントを分離
function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="検索..."
          className="pl-8 bg-white/70 border-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  )
}

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleCategoryClick = (slug: string, isMainCategory: boolean) => {
    if (isMainCategory) {
      router.push(`/category/${slug}`)
    } else {
      router.push(`/category/${slug}`)
    }
  }

  const handleTagClick = (tag: string) => {
    router.push(`/tag/${encodeURIComponent(tag)}`)
  }

  return (
    <div className="w-64 bg-[#f7f6f3] flex flex-col h-full">
      {/* サイト名 */}
      <div className="p-4">
        <Link href="/" className="text-xl font-semibold hover:text-primary transition-colors">
          デザインWiki
        </Link>
      </div>

      {/* 検索フォーム - Suspenseでラップ */}
      <div className="px-4 pb-4">
        <Suspense
          fallback={
            <div className="relative">
              <div className="h-9 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
          }
        >
          <SearchForm />
        </Suspense>
      </div>

      {/* カテゴリとタグ */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="space-y-6">
            {/* カテゴリ - ラベルを削除 */}
            <div className="space-y-5">
              {categories.map((category) => (
                <div key={category.name} className="space-y-1">
                  {/* 大カテゴリ - クリック可能に変更 */}
                  <button
                    onClick={() => handleCategoryClick(category.slug, true)}
                    className={cn(
                      "text-sm font-semibold w-full text-left py-1 rounded-sm transition-colors",
                      pathname === `/category/${category.slug}` ? "text-primary" : "text-gray-700 hover:text-primary",
                    )}
                  >
                    {category.name}
                  </button>

                  {/* 中カテゴリ */}
                  <ul className="space-y-1">
                    {category.items.map((item) => (
                      <li key={item.slug}>
                        <button
                          onClick={() => handleCategoryClick(item.slug, false)}
                          className={cn(
                            "text-sm w-full text-left py-1 px-2 pl-0 rounded-sm transition-colors",
                            pathname === `/category/${item.slug}`
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-gray-600 hover:bg-gray-200/50",
                          )}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* タグ */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 mb-3">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={cn(
                      "text-xs px-2 py-1 rounded-md transition-colors",
                      pathname === `/tag/${encodeURIComponent(tag)}`
                        ? "bg-primary/10 text-primary"
                        : "bg-white/70 text-gray-600 hover:bg-gray-200/50 hover:text-gray-900",
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* 管理機能へのリンク - 元のシンプルな形式に戻す */}
      <div className="p-4 mt-auto">
        <Link
          href="/admin-login"
          className={cn(
            "flex items-center gap-2 text-sm py-2 px-3 rounded-md transition-colors",
            pathname.startsWith("/admin")
              ? "bg-primary/10 text-primary"
              : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900",
          )}
        >
          <Settings className="h-4 w-4" />
          <span>管理機能</span>
        </Link>
      </div>
    </div>
  )
}
