"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, Calendar, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

// サンプルデータ
const articles = [
  {
    id: 1,
    title: "色彩理論の基本",
    category: "UIデザイン", // 大カテゴリ
    subcategory: "色彩理論", // 中カテゴリ
    tags: ["初心者向け", "基礎知識", "UIデザイン"],
    date: "2024年3月15日",
    updatedDate: "2024年3月20日",
    author: "田中デザイン",
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
  {
    id: 2,
    title: "タイポグラフィの基礎",
    category: "UIデザイン", // 大カテゴリ
    subcategory: "タイポグラフィ", // 中カテゴリ
    tags: ["初心者向け", "基礎知識", "タイポグラフィ"],
    date: "2024年3月10日",
    updatedDate: "2024年3月12日",
    author: "佐藤デザイン",
    content: [
      {
        heading: "タイポグラフィとは",
        id: "what-is-typography",
        content: `タイポグラフィは、文字の配置や書体の選択によって、テキストを視覚的に効果的に表現する技術です。読みやすさと美しさを両立させることが重要です。`,
      },
      {
        heading: "フォントの種類",
        id: "font-types",
        content: `主なフォントの種類には以下があります：

1. **セリフ体**: 文字の端に装飾（セリフ）がある書体。例：Times New Roman
2. **サンセリフ体**: 装飾のない直線的な書体。例：Helvetica
3. **モノスペース**: すべての文字が同じ幅を持つ書体。例：Courier New
4. **スクリプト体**: 手書き風の書体。例：Brush Script`,
      },
    ],
  },
]

import { getArticleById } from "@/actions/article-actions"
import { notFound } from "next/navigation"
// 他のインポート...

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const article = await getArticleById(id)

  if (!article) {
    notFound()
  }

  // 記事の表示ロジック...

  const router = useRouter()
  //const id = Number(params.id)
  const [activeHeading, setActiveHeading] = useState("")
  //const [isArticleFound, setIsArticleFound] = useState(false)

  // useEffect(() => {
  //   // IDに基づいて記事を検索
  //   const foundArticle = articles.find((article) => article.id === id)
  //   if (foundArticle) {
  //     setArticle(foundArticle)
  //     setIsArticleFound(true)
  //   } else {
  //     setArticle(null)
  //     setIsArticleFound(false)
  //   }
  // }, [id])

  // スクロール位置に基づいて現在のセクションを更新
  useEffect(() => {
    if (!article) return

    const handleScroll = () => {
      const headings = article.content.map((section: any) => section.id)

      for (const id of headings) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveHeading(id)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // 初期化時に実行

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [article])

  // 記事が見つからない場合
  // if (!isArticleFound) {
  //   return (
  //     <div className="max-w-5xl mx-auto p-6 text-center">
  //       <h1 className="text-2xl font-bold mb-4">記事が見つかりませんでした</h1>
  //       <Button onClick={() => router.push("/")} variant="outline">
  //         <ArrowLeft className="mr-2 h-4 w-4" /> トップページに戻る
  //       </Button>
  //     </div>
  //   )
  // }

  // 記事データがロード中の場合
  if (!article) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p>読み込み中...</p>
      </div>
    )
  }

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
        <Link href={`/category/${article.subcategory.toLowerCase()}`} className="hover:text-gray-900">
          {article.subcategory}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-900">{article.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
        {/* 目次 */}
        <div className="hidden md:block">
          <div className="sticky top-6">
            <h3 className="font-medium mb-3">目次</h3>
            <ScrollArea className="h-[calc(100vh-150px)]">
              <ul className="space-y-1 pr-4">
                {article.content.map((section: any) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={cn(
                        "block py-1 text-sm hover:text-foreground transition-colors border-l-2 pl-3",
                        activeHeading === section.id
                          ? "border-primary text-foreground font-medium"
                          : "border-gray-100 text-muted-foreground",
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
          {/* タイトル */}
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

          {/* カテゴリとタグ */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Link href={`/category/${article.category.toLowerCase()}`}>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                {article.category}
              </Badge>
            </Link>
            <Link href={`/category/${article.subcategory.toLowerCase()}`}>
              <Badge className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-colors">
                {article.subcategory}
              </Badge>
            </Link>

            {article.tags.map((tag: string) => (
              <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                <Badge className="bg-white/70 text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          {/* 日付情報 */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>作成: {article.date}</span>
            </div>
            {article.updatedDate && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>更新: {article.updatedDate}</span>
              </div>
            )}
          </div>

          <Separator className="mb-8" />

          {/* 記事コンテンツ */}
          <div className="prose prose-slate max-w-none">
            {article.content.map((section: any) => (
              <section key={section.id} id={section.id} className="mb-10 scroll-mt-6">
                <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
                {section.content.split("\n\n").map((paragraph: string, index: number) => {
                  // リスト項目の処理
                  if (paragraph.match(/^\d+\.\s/)) {
                    return (
                      <ol key={index} className="list-decimal pl-6 mb-4">
                        {paragraph.split("\n").map((item, i) => {
                          const listItem = item.replace(/^\d+\.\s/, "")
                          return (
                            <li key={i} className="mb-1">
                              {listItem}
                            </li>
                          )
                        })}
                      </ol>
                    )
                  } else if (paragraph.match(/^-\s/)) {
                    return (
                      <ul key={index} className="list-disc pl-6 mb-4">
                        {paragraph.split("\n").map((item, i) => {
                          const listItem = item.replace(/^-\s/, "")
                          return (
                            <li key={i} className="mb-1">
                              {listItem}
                            </li>
                          )
                        })}
                      </ul>
                    )
                  }

                  // マークダウン記法の処理
                  const formattedParagraph = paragraph
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // 太字
                    .replace(/\*(.*?)\*/g, "<em>$1</em>") // 斜体
                    .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" class="text-primary hover:underline">$1</a>') // リンク

                  return (
                    <p
                      key={index}
                      className="mb-4 text-gray-700"
                      dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                    />
                  )
                })}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
