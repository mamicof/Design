"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// サンプルデータ
const articles = [
  {
    id: 1,
    title: "色彩理論の基本",
    category: "UIデザイン",
    tags: ["初心者向け", "基礎知識", "UIデザイン"],
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "色の基本原理と効果的な配色方法について学びます。色相、彩度、明度の概念や色彩心理学の基礎知識を解説します。",
    date: "2024年3月15日",
  },
  {
    id: 2,
    title: "タイポグラフィの基礎とフォント選びのポイント",
    category: "UIデザイン",
    tags: ["初心者向け", "基礎知識", "タイポグラフィ"],
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "読みやすく美しいテキストデザインのための基本原則とテクニックを紹介します。フォント選びからレイアウトまで解説します。",
    date: "2024年3月10日",
  },
  {
    id: 3,
    title: "Figmaの使い方",
    category: "デザインツール",
    tags: ["チュートリアル", "ツール", "Figma"],
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "Figmaの基本機能と効率的なワークフローについて解説します。コンポーネント、オートレイアウト、プロトタイピングなどを学びます。",
    date: "2024年2月28日",
  },
  {
    id: 4,
    title: "ユーザーリサーチの方法",
    category: "UXデザイン",
    tags: ["UXデザイン", "基礎知識", "ユーザーリサーチ"],
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "効果的なユーザーリサーチの手法とインタビュー方法について学びます。定性的・定量的リサーチの違いや実施方法を解説します。",
    date: "2024年2月20日",
  },
  {
    id: 5,
    title: "レスポンシブデザインの原則",
    category: "UIデザイン",
    tags: ["レスポンシブ", "テクニック", "UIデザイン"],
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "様々な画面サイズに対応するレスポンシブデザインの原則とベストプラクティスを解説します。フレキシブルグリッドやメディアクエリの使い方を学びます。",
    date: "2024年2月15日",
  },
  {
    id: 6,
    title: "2024年のデザイントレンド",
    category: "トレンド",
    tags: ["トレンド", "インスピレーション", "2024"],
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "2024年に注目すべきデザイントレンドと実践方法について解説します。最新のUIデザイン、カラートレンド、タイポグラフィのトレンドを紹介します。",
    date: "2024年1月30日",
  },
  {
    id: 7,
    title: "アクセシブルなデザインの作り方",
    category: "アクセシビリティ",
    tags: ["アクセシビリティ", "基礎知識", "UIデザイン"],
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "すべてのユーザーが使いやすいアクセシブルなデザインの原則と実践方法を解説します。色のコントラスト、キーボードナビゲーション、スクリーンリーダー対応などを学びます。",
    date: "2024年1月25日",
  },
  {
    id: 8,
    title: "デザインシステムの構築方法",
    category: "UIデザイン",
    tags: ["デザインシステム", "上級者向け", "チーム作業"],
    image: "/placeholder.svg?height=200&width=300",
    excerpt:
      "効率的で一貫性のあるデザインシステムの構築と管理方法について解説します。コンポーネント設計、ドキュメント作成、チーム連携の方法を学びます。",
    date: "2024年1月20日",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<typeof articles>([])

  useEffect(() => {
    if (query) {
      // 検索クエリに基づいて記事をフィルタリング
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          article.category.toLowerCase().includes(query.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">検索結果: {query}</h1>
      <p className="text-gray-500 mb-6">{results.length}件の記事が見つかりました</p>
      <Separator className="mb-8" />

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {results.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`} className="block group">
              <div className="overflow-hidden rounded-lg shadow-sm transition-all group-hover:shadow-md h-[220px] flex flex-col">
                <div className="relative h-24 w-full overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3 bg-white flex-1 flex flex-col">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title.length > 50 ? article.title.substring(0, 48) + ".." : article.title}
                  </h3>
                  {article.tags.length > 0 && (
                    <Badge variant="secondary" className="font-normal text-xs self-start">
                      {article.tags[0]}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">検索条件に一致する記事が見つかりませんでした</p>
        </div>
      )}
    </div>
  )
}
