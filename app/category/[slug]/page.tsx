"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// サンプルデータ
const categoryData = {
  "color-theory": {
    name: "色彩理論",
    description: "色の基本原理と効果的な配色方法について学ぶカテゴリです。",
    articles: [
      {
        id: 1,
        title: "色彩理論の基本",
        tags: ["初心者向け", "基礎知識", "UIデザイン"],
        image: "/placeholder.svg?height=200&width=300",
        date: "2024年3月15日",
      },
      {
        id: 9,
        title: "カラーパレットの作り方と効果的な配色テクニック",
        tags: ["テクニック", "UIデザイン", "配色"],
        image: "/placeholder.svg?height=200&width=300",
        date: "2023年12月10日",
      },
      {
        id: 10,
        title: "色彩心理学とUXデザイン",
        tags: ["UXデザイン", "心理学", "上級者向け"],
        image: "/placeholder.svg?height=200&width=300",
        date: "2023年11月5日",
      },
    ],
  },
  figma: {
    name: "Figma",
    description: "デザインツールFigmaの使い方や効率的なワークフローについて学ぶカテゴリです。",
    articles: [
      {
        id: 3,
        title: "Figmaの使い方",
        tags: ["チュートリアル", "ツール", "Figma"],
        image: "/placeholder.svg?height=200&width=300",
        date: "2024年2月28日",
      },
      {
        id: 11,
        title: "Figmaのコンポーネント設計とバリアント機能の活用方法",
        tags: ["コンポーネント", "Figma", "上級者向け"],
        image: "/placeholder.svg?height=200&width=300",
        date: "2023年10月15日",
      },
      {
        id: 12,
        title: "FigmaとDevelopersの連携方法",
        tags: ["開発連携", "Figma", "チーム作業"],
        image: "/placeholder.svg?height=200&width=300",
        date: "2023年9月20日",
      },
    ],
  },
  // 他のカテゴリも同様に定義...
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = categoryData[slug as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">カテゴリが見つかりません</h1>
        <p className="text-muted-foreground">指定されたカテゴリは存在しないか、削除された可能性があります。</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-500 mb-6">{category.description}</p>
      <Separator className="mb-8" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {category.articles.map((article) => (
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
    </div>
  )
}
