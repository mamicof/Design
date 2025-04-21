"use client"

import Link from "next/link"

import { useParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { ArticleCard } from "@/components/article-card"

// サンプルデータ - 大カテゴリと中カテゴリの両方に対応
const categoryData = {
  // 大カテゴリ
  uidesign: {
    name: "UIデザイン",
    description: "UIデザインに関する記事をまとめたカテゴリです。",
    articles: [
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
        title: "タイポグラフィの基礎",
        category: "UIデザイン",
        subcategory: "タイポグラフィ",
        tags: ["初心者向け", "基礎知識", "タイポグラフィ"],
        date: "2024年3月10日",
        author: "佐藤デザイン",
      },
      {
        id: 8,
        title: "デザインシステムの構築方法",
        category: "UIデザイン",
        subcategory: "デザインシステム",
        tags: ["デザインシステム", "上級者向け", "チーム作業"],
        date: "2024年1月20日",
        author: "中村デザイン",
      },
    ],
  },
  uxdesign: {
    name: "UXデザイン",
    description: "UXデザインに関する記事をまとめたカテゴリです。",
    articles: [
      {
        id: 4,
        title: "ユーザーリサーチの方法",
        category: "UXデザイン",
        subcategory: "ユーザーリサーチ",
        tags: ["UXデザイン", "基礎知識", "ユーザーリサーチ"],
        date: "2024年2月20日",
        author: "鈴木デザイン",
      },
    ],
  },

  // 中カテゴリ
  色彩理論: {
    name: "色彩理論",
    description: "色の基本原理と効果的な配色方法について学ぶカテゴリです。",
    parentCategory: "UIデザイン",
    articles: [
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
        id: 9,
        title: "カラーパレットの作り方と効果的な配色テクニック",
        category: "UIデザイン",
        subcategory: "色彩理論",
        tags: ["テクニック", "UIデザイン", "配色"],
        date: "2023年12月10日",
        author: "佐藤デザイン",
      },
      {
        id: 10,
        title: "色彩心理学とUXデザイン",
        category: "UIデザイン",
        subcategory: "色彩理論",
        tags: ["UXデザイン", "心理学", "上級者向け"],
        date: "2023年11月5日",
        author: "鈴木デザイン",
      },
    ],
  },
  タイポグラフィ: {
    name: "タイポグラフィ",
    description: "文字の配置や書体の選択によって、テキストを視覚的に効果的に表現する技術について学ぶカテゴリです。",
    parentCategory: "UIデザイン",
    articles: [
      {
        id: 2,
        title: "タイポグラフィの基礎",
        category: "UIデザイン",
        subcategory: "タイポグラフィ",
        tags: ["初心者向け", "基礎知識", "タイポグラフィ"],
        date: "2024年3月10日",
        author: "佐藤デザイン",
      },
    ],
  },
  figma: {
    name: "Figma",
    description: "デザインツールFigmaの使い方や効率的なワークフローについて学ぶカテゴリです。",
    parentCategory: "デザインツール",
    articles: [
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
        id: 11,
        title: "Figmaのコンポーネント設計とバリアント機能の活用方法",
        category: "デザインツール",
        subcategory: "Figma",
        tags: ["コンポーネント", "Figma", "上級者向け"],
        date: "2023年10月15日",
        author: "伊藤デザイン",
      },
      {
        id: 12,
        title: "FigmaとDevelopersの連携方法",
        category: "デザインツール",
        subcategory: "Figma",
        tags: ["開発連携", "Figma", "チーム作業"],
        date: "2023年9月20日",
        author: "渡辺デザイン",
      },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  // スラッグを小文字に変換して検索（大カテゴリは小文字で保存されている）
  const lowerSlug = slug.toLowerCase()

  // まず大カテゴリで検索
  let category = categoryData[lowerSlug]

  // 大カテゴリで見つからなければ、中カテゴリで検索
  if (!category) {
    category = categoryData[slug]
  }

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
      <p className="text-gray-500 mb-2">{category.description}</p>

      {/* 親カテゴリがある場合は表示 */}
      {category.parentCategory && (
        <p className="text-sm text-gray-500 mb-4">
          親カテゴリ:{" "}
          <Link href={`/category/${category.parentCategory.toLowerCase()}`} className="text-primary hover:underline">
            {category.parentCategory}
          </Link>
        </p>
      )}

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {category.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
