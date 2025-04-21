"use client"

import { useParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { ArticleCard } from "@/components/article-card"

// サンプルデータ
const articles = [
  {
    id: 1,
    title: "色彩理論の基本",
    category: "UIデザイン",
    subcategory: "色彩理論",
    tags: ["初心者向け", "基礎知識", "UIデザイン"],
    date: "2024年3月15日",
    author: "田中デザイン",
  },
  {
    id: 2,
    title: "タイポグラフィの基礎とフォント選びのポイント",
    category: "UIデザイン",
    subcategory: "タイポグラフィ",
    tags: ["初心者向け", "基礎知識", "タイポグラフィ"],
    date: "2024年3月10日",
    author: "佐藤デザイン",
  },
  {
    id: 3,
    title: "Figmaの使い方",
    category: "デザインツール",
    subcategory: "Figma",
    tags: ["チュートリアル", "ツール", "Figma"],
    date: "2024年2月28日",
    author: "高橋デザイン",
  },
  {
    id: 4,
    title: "ユーザーリサーチの方法",
    category: "UXデザイン",
    subcategory: "ユーザーリサーチ",
    tags: ["UXデザイン", "基礎知識", "ユーザーリサーチ"],
    date: "2024年2月20日",
    author: "鈴木デザイン",
  },
  {
    id: 7,
    title: "アクセシブルなデザインの作り方",
    category: "UIデザイン",
    subcategory: "アクセシビリティ",
    tags: ["アクセシビリティ", "基礎知識", "UIデザイン"],
    date: "2024年1月25日",
    author: "伊藤デザイン",
  },
]

export default function TagPage() {
  const params = useParams()
  const tag = decodeURIComponent(params.slug as string)

  // タグに基づいて記事をフィルタリング
  const filteredArticles = articles.filter((article) => article.tags.includes(tag))

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">タグ: {tag}</h1>
      <p className="text-gray-500 mb-6">{filteredArticles.length}件の記事が見つかりました</p>
      <Separator className="mb-8" />

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">このタグに関連する記事が見つかりませんでした</p>
        </div>
      )}
    </div>
  )
}
