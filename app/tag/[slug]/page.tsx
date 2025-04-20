"use client"

import { useParams } from "next/navigation"
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
    date: "2024年3月15日",
  },
  {
    id: 2,
    title: "タイポグラフィの基礎とフォント選びのポイント",
    category: "UIデザイン",
    tags: ["初心者向け", "基礎知識", "タイポグラフィ"],
    image: "/placeholder.svg?height=200&width=300",
    date: "2024年3月10日",
  },
  {
    id: 3,
    title: "Figmaの使い方",
    category: "デザインツール",
    tags: ["チュートリアル", "ツール", "Figma"],
    image: "/placeholder.svg?height=200&width=300",
    date: "2024年2月28日",
  },
  {
    id: 4,
    title: "ユーザーリサーチの方法",
    category: "UXデザイン",
    tags: ["UXデザイン", "基礎知識", "ユーザーリサーチ"],
    image: "/placeholder.svg?height=200&width=300",
    date: "2024年2月20日",
  },
  {
    id: 7,
    title: "アクセシブルなデザインの作り方",
    category: "アクセシビリティ",
    tags: ["アクセシビリティ", "基礎知識", "UIデザイン"],
    image: "/placeholder.svg?height=200&width=300",
    date: "2024年1月25日",
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
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
                  <Badge
                    variant="secondary"
                    className={`font-normal text-xs self-start ${
                      article.tags[0] === tag ? "bg-primary/20 text-primary" : ""
                    }`}
                  >
                    {article.tags[0]}
                  </Badge>
                </div>
              </div>
            </Link>
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
