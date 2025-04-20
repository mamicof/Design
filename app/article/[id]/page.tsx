"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useState, useEffect, useCallback } from "react"

// サンプルデータ
const articles = [
  {
    id: 1,
    title: "色彩理論の基本",
    category: "UIデザイン",
    tags: ["初心者向け", "基礎知識", "UIデザイン"],
    date: "2024年3月15日",
    author: "田中デザイン",
    featuredImage: "/placeholder.svg?height=400&width=800",
    content: [
      {
        heading: "色彩理論とは",
        id: "what-is-color-theory",
        content: `色彩理論は、色の混合、調和、対比などの原理を体系化した学問です。デザイナーにとって色彩理論を理解することは、効果的で魅力的なデザインを作成するために不可欠です。

色彩理論の基本的な概念には、色相環、色の調和、色の対比などがあります。これらの概念を理解することで、デザインにおける色の使い方を戦略的に考えることができます。`,
      },
      {
        heading: "色の三属性",
        id: "color-attributes",
        content: `色には主に3つの属性があります：

1. **色相（Hue）**: 色の種類を表します。赤、青、黄などの基本的な色を指します。
2. **彩度（Saturation）**: 色の鮮やかさを表します。高彩度の色は鮮やかで、低彩度の色は灰色がかっています。
3. **明度（Brightness/Value）**: 色の明るさを表します。白に近いほど明度が高く、黒に近いほど明度が低くなります。

これらの属性を調整することで、無限の色のバリエーションを作り出すことができます。`,
      },
      {
        heading: "色相環",
        id: "color-wheel",
        content: `色相環は、色の関係を視覚的に表現したものです。基本的な色相環には、原色（赤、青、黄）と二次色（緑、オレンジ、紫）が含まれています。

色相環を使うことで、以下のような色の組み合わせを見つけることができます：

- **補色**: 色相環の反対側にある色同士（例：赤と緑）
- **類似色**: 色相環で隣接している色（例：青と青紫）
- **トライアド**: 色相環で等間隔に3つの色を選ぶ（例：赤、青、黄）

これらの組み合わせを理解することで、調和のとれた配色を作成できます。`,
      },
      {
        heading: "色の心理的効果",
        id: "psychological-effects",
        content: `色は人間の感情や行動に大きな影響を与えます。例えば：

- **赤**: エネルギー、情熱、緊急性を表します。注意を引きたい要素に使用されます。
- **青**: 信頼性、平和、安定を表します。企業のロゴやビジネスサイトでよく使用されます。
- **黄**: 楽観性、明るさ、注意を表します。警告や注目を集めたい場合に使用されます。
- **緑**: 自然、成長、健康を表します。環境関連や健康関連のブランドでよく使用されます。

デザインの目的や対象ユーザーに合わせて、適切な色を選ぶことが重要です。`,
      },
      {
        heading: "実践的な配色テクニック",
        id: "practical-techniques",
        content: `効果的な配色を作成するためのいくつかのテクニックを紹介します：

1. **60-30-10ルール**: 主要色を60%、補助色を30%、アクセントカラーを10%の割合で使用します。
2. **モノクロマティック**: 単一の色相の明度と彩度を変えて配色を作ります。
3. **アナログ配色**: 色相環で隣接する2〜3色を使用します。
4. **コントラスト**: 明度や彩度の異なる色を組み合わせて、視覚的な階層を作ります。

これらのテクニックを実験して、プロジェクトに最適な配色を見つけましょう。`,
      },
      {
        heading: "アクセシビリティと色",
        id: "accessibility",
        content: `デザインにおいて色を使用する際は、アクセシビリティを考慮することが重要です。色覚異常を持つユーザーや、コントラストの低い環境でデバイスを使用するユーザーのことを考慮する必要があります。

以下のポイントに注意しましょう：

1. **十分なコントラスト比**: テキストと背景の間に十分なコントラスト比を確保します（WCAG基準では4.5:1以上）。
2. **色だけに頼らない**: 情報を伝える際は、色だけでなく、形やテキストなど他の視覚的手がかりも使用します。
3. **色覚シミュレーション**: デザインツールの色覚シミュレーション機能を使って、異なる色覚特性でのデザインの見え方をチェックします。

アクセシブルなデザインは、より多くのユーザーにとって使いやすいデザインです。`,
      },
    ],
  },
  // 他の記事データ...
]

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const [article, setArticle] = useState(null)
  const [activeHeading, setActiveHeading] = useState("")
  const [contentSections, setContentSections] = useState([])
  const [isArticleFound, setIsArticleFound] = useState(false)

  useEffect(() => {
    // IDに基づいて記事を検索
    const foundArticle = articles.find((article) => article.id === id)
    if (foundArticle) {
      setArticle(foundArticle)
      setContentSections(foundArticle.content)
      setIsArticleFound(true)
    } else {
      setArticle(null)
      setContentSections([])
      setIsArticleFound(false)
    }
  }, [id])

  // 記事が見つからない場合
  if (!isArticleFound) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">記事が見つかりませんでした</h1>
        <Button onClick={() => router.push("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> トップページに戻る
        </Button>
      </div>
    )
  }

  // スクロール位置に基づいて現在のセクションを更新
  const handleScroll = useCallback(() => {
    const headings = contentSections.map((section) => section.id)

    for (const id of headings) {
      const element = document.getElementById(id)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100) {
          setActiveHeading(id)
        }
      }
    }
  }, [contentSections])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll() // 初期化時に実行

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* パンくずリスト */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">
          ホーム
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href={`/category/${article.category.toLowerCase()}`} className="hover:text-gray-900">
          {article.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-900">{article.title}</span>
      </nav>

      {/* アイキャッチ画像 */}
      <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={article.featuredImage || "/placeholder.svg?height=400&width=800"}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
        {/* 目次 */}
        <div className="hidden md:block">
          <div className="sticky top-6">
            <h3 className="font-semibold mb-4 text-gray-900">目次</h3>
            <ScrollArea className="h-[calc(100vh-150px)]">
              <ul className="space-y-1 pr-4">
                {contentSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={cn(
                        "block py-2 text-sm hover:text-gray-900 transition-colors border-l-2 pl-3",
                        activeHeading === section.id
                          ? "border-primary text-primary font-medium"
                          : "border-gray-100 text-gray-500",
                      )}
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </div>

        {/* 記事本文 */}
        <article>
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge>{article.category}</Badge>
            {article.tags.length > 0 && <Badge variant="outline">{article.tags[0]}</Badge>}
            <span className="text-sm text-gray-500 ml-auto">
              {article.date} | {article.author}
            </span>
          </div>
          <Separator className="mb-8" />

          <div className="prose prose-slate max-w-none">
            {contentSections.map((section) => (
              <section key={section.id} id={section.id} className="mb-10 scroll-mt-6">
                <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
                {section.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
