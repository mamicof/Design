"use client"

import type React from "react"

import { useState, Suspense, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// サンプルカテゴリデータ（データベース連携が完了するまでの仮データ）
const sampleCategories = [
  {
    id: 1,
    name: "UIデザイン",
    slug: "uidesign",
    items: [
      { id: 5, name: "色彩理論", slug: "色彩理論" },
      { id: 6, name: "タイポグラフィ", slug: "タイポグラフィ" },
      { id: 7, name: "レイアウト", slug: "レイアウト" },
      { id: 8, name: "アクセシビリティ", slug: "アクセシビリティ" },
    ],
  },
  {
    id: 2,
    name: "UXデザイン",
    slug: "uxdesign",
    items: [
      { id: 9, name: "ユーザーリサーチ", slug: "ユーザーリサーチ" },
      { id: 10, name: "ペルソナ", slug: "ペルソナ" },
      { id: 11, name: "ユーザージャーニー", slug: "ユーザージャーニー" },
      { id: 12, name: "プロトタイピング", slug: "プロトタイピング" },
    ],
  },
  {
    id: 3,
    name: "グラフィックデザイン",
    slug: "graphicdesign",
    items: [
      { id: 13, name: "ロゴデザイン", slug: "ロゴデザイン" },
      { id: 14, name: "ブランディング", slug: "ブランディング" },
      { id: 15, name: "印刷デザイン", slug: "印刷デザイン" },
      { id: 16, name: "イラストレーション", slug: "イラストレーション" },
    ],
  },
  {
    id: 4,
    name: "デザインツール",
    slug: "designtools",
    items: [
      { id: 17, name: "Figma", slug: "figma" },
      { id: 18, name: "Adobe XD", slug: "adobe-xd" },
      { id: 19, name: "Sketch", slug: "sketch" },
      { id: 20, name: "Photoshop", slug: "photoshop" },
      { id: 21, name: "Illustrator", slug: "illustrator" },
    ],
  },
]

// タグのサンプルデータ
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
  const [categories, setCategories] = useState<any[]>(sampleCategories)
  const [loading, setLoading] = useState(false)

  // カテゴリデータの取得
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        // データベースからカテゴリを取得する処理
        // 現時点ではサンプルデータを使用
        // const data = await getCategories()
        // if (data && data.length > 0) {
        //   setCategories(data)
        // }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (slug: string, isMainCategory: boolean) => {
    router.push(`/category/${slug}`)
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
            {/* カテゴリ */}
            <div className="space-y-5">
              {loading
                ? // ローディング表示
                  Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="space-y-2">
                        <div className="h-5 bg-gray-100 rounded-md w-24 animate-pulse"></div>
                        <div className="space-y-1 pl-2">
                          {Array(3)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className="h-4 bg-gray-100 rounded-md w-32 animate-pulse"></div>
                            ))}
                        </div>
                      </div>
                    ))
                : // カテゴリ表示
                  categories.map((category) => (
                    <div key={category.id} className="space-y-1">
                      {/* 大カテゴリ - クリック可能に変更 */}
                      <button
                        onClick={() => handleCategoryClick(category.slug, true)}
                        className={cn(
                          "text-sm font-semibold w-full text-left py-1 rounded-sm transition-colors",
                          pathname === `/category/${category.slug}`
                            ? "text-primary"
                            : "text-gray-700 hover:text-primary",
                        )}
                      >
                        {category.name}
                      </button>

                      {/* 中カテゴリ */}
                      <ul className="space-y-1">
                        {category.items.map((item: any) => (
                          <li key={item.id}>
                            <button
                              onClick={() => handleCategoryClick(item.slug, false)}
                              className={cn(
                                "text-sm w-full text-left py-1 mx-3 rounded-sm transition-colors",
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

      {/* 管理機能へのリンク */}
      <div className="p-4 mt-auto">
        <Link
          href="/admin"
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
