import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Clock, BookOpen, TrendingUp } from "lucide-react"
import { ArticleCard } from "@/components/article-card"

// サンプルデータ
const recentlyViewed = [
  {
    id: 1,
    title: "色彩理論の基本",
    category: "UIデザイン",
    subcategory: "色彩理論",
    excerpt: "色の基本原理と効果的な配色方法について学びます。",
    tags: ["初心者向け", "基礎知識"],
    date: "2024年3月15日",
    author: "田中デザイン",
  },
  {
    id: 2,
    title: "Figmaの使い方とコンポーネント設計の基本原則",
    category: "デザインツール",
    subcategory: "Figma",
    excerpt: "Figmaの基本機能と効率的なワークフローについて解説します。",
    tags: ["チュートリアル", "ツール"],
    date: "2024年3月10日",
    author: "佐藤デザイン",
  },
  {
    id: 3,
    title: "ユーザーリサーチの方法",
    category: "UXデザイン",
    subcategory: "ユーザーリサーチ",
    excerpt: "効果的なユーザーリサーチの手法とインタビュー方法について学びます。",
    tags: ["UXデザイン", "基礎知識"],
    date: "2024年2月28日",
    author: "鈴木デザイン",
  },
]

const recentlyAdded = [
  {
    id: 4,
    title: "2024年のデザイントレンド",
    category: "トレンド",
    subcategory: "デザイントレンド",
    excerpt: "2024年に注目すべきデザイントレンドと実践方法について解説します。",
    tags: ["トレンド", "インスピレーション"],
    date: "2024年2月20日",
    author: "高橋デザイン",
  },
  {
    id: 5,
    title: "アクセシブルなデザインの作り方とWCAGガイドラインの実践方法",
    category: "UIデザイン",
    subcategory: "アクセシビリティ",
    excerpt: "すべてのユーザーが使いやすいアクセシブルなデザインの原則と実践方法。",
    tags: ["アクセシビリティ", "基礎知識"],
    date: "2024年2月15日",
    author: "伊藤デザイン",
  },
  {
    id: 6,
    title: "デザインシステムの構築方法",
    category: "UIデザイン",
    subcategory: "デザインシステム",
    excerpt: "効率的で一貫性のあるデザインシステムの構築と管理方法について解説します。",
    tags: ["デザインシステム", "上級者向け"],
    date: "2024年2月10日",
    author: "渡辺デザイン",
  },
]

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* サイト概要 */}
      <section>
        <h1 className="text-3xl font-bold mb-4">デザインWiki</h1>
        <p className="text-gray-600 mb-6 max-w-3xl">
          UIUXを中心とした開発に関する知識をメモしているサイトです。
          <br />
          ※なお、このサイトは業務時間外に作成しているものです
        </p>
        <Separator className="my-8" />
      </section>

      {/* 最近閲覧した記事 */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-xl font-semibold">最近閲覧した記事</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recentlyViewed.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 最近追加された記事 */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-gray-500" />
          <h2 className="text-xl font-semibold">最近追加された記事</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recentlyAdded.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 人気のタグ */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-gray-500" />
          <h2 className="text-xl font-semibold">人気のタグ</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["初心者向け", "トレンド", "チュートリアル", "ケーススタディ", "基礎知識"].map((tag) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 bg-white rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
