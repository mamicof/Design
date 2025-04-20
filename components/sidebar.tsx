"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// サンプルデータ
const categories = [
  {
    name: "UIデザイン",
    items: [
      { name: "色彩理論", slug: "color-theory" },
      { name: "タイポグラフィ", slug: "typography" },
      { name: "レイアウト", slug: "layout" },
      { name: "アクセシビリティ", slug: "accessibility" },
    ],
  },
  {
    name: "UXデザイン",
    items: [
      { name: "ユーザーリサーチ", slug: "user-research" },
      { name: "ペルソナ", slug: "persona" },
      { name: "ユーザージャーニー", slug: "user-journey" },
      { name: "プロトタイピング", slug: "prototyping" },
    ],
  },
  {
    name: "グラフィックデザイン",
    items: [
      { name: "ロゴデザイン", slug: "logo-design" },
      { name: "ブランディング", slug: "branding" },
      { name: "印刷デザイン", slug: "print-design" },
      { name: "イラストレーション", slug: "illustration" },
    ],
  },
  {
    name: "デザインツール",
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

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleCategoryClick = (slug: string) => {
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

      {/* 検索フォーム */}
      <div className="px-4 pb-4">
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
      </div>

      {/* カテゴリとタグ */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="space-y-6">
            {/* カテゴリ */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 mb-3">カテゴリ</h3>
              <div className="space-y-5">
                {categories.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <h4 className="text-sm font-semibold text-gray-700">{category.name}</h4>
                    <ul className="space-y-1 pl-2">
                      {category.items.map((item) => (
                        <li key={item.slug}>
                          <button
                            onClick={() => handleCategoryClick(item.slug)}
                            className={cn(
                              "text-sm w-full text-left py-1 px-2 rounded-sm transition-colors",
                              pathname === `/category/${item.slug}`
                                ? "bg-[#e6f0ff] text-[#2563eb] font-medium"
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
                        ? "bg-[#e6f0ff] text-[#2563eb]"
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
        <h3 className="text-sm font-bold text-gray-500 mb-3">管理機能</h3>
        <div className="space-y-1">
          <Link
            href="/admin/articles"
            className={cn(
              "flex items-center gap-2 text-sm py-1.5 px-3 rounded-md transition-colors",
              pathname.startsWith("/admin/articles")
                ? "bg-[#e6f0ff] text-[#2563eb]"
                : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900",
            )}
          >
            <span>記事管理</span>
          </Link>
          <Link
            href="/admin/categories"
            className={cn(
              "flex items-center gap-2 text-sm py-1.5 px-3 rounded-md transition-colors",
              pathname.startsWith("/admin/categories")
                ? "bg-[#e6f0ff] text-[#2563eb]"
                : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900",
            )}
          >
            <span>カテゴリ管理</span>
          </Link>
          <Link
            href="/admin/tags"
            className={cn(
              "flex items-center gap-2 text-sm py-1.5 px-3 rounded-md transition-colors",
              pathname.startsWith("/admin/tags")
                ? "bg-[#e6f0ff] text-[#2563eb]"
                : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900",
            )}
          >
            <span>タグ管理</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
