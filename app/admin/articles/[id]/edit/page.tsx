"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MarkdownEditor } from "@/components/markdown-editor"
import { MarkdownPreview } from "@/components/markdown-preview"

// サンプルデータ
const categories = [
  { id: 1, name: "UIデザイン" },
  { id: 2, name: "UXデザイン" },
  { id: 3, name: "グラフィックデザイン" },
  { id: 4, name: "デザインツール" },
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

// サンプル記事データ
const articlesData = {
  1: {
    title: "色彩理論の基本",
    content: `# 色彩理論の基本

色彩理論は、色の混合、調和、対比などの原理を体系化した学問です。デザイナーにとって色彩理論を理解することは、効果的で魅力的なデザインを作成するために不可欠です。

## 色の三属性

色には主に3つの属性があります：

1. **色相（Hue）**: 色の種類を表します。赤、青、黄などの基本的な色を指します。
2. **彩度（Saturation）**: 色の鮮やかさを表します。高彩度の色は鮮やかで、低彩度の色は灰色がかっています。
3. **明度（Brightness/Value）**: 色の明るさを表します。白に近いほど明度が高く、黒に近いほど明度が低くなります。

## 色相環

色相環は、色の関係を視覚的に表現したものです。基本的な色相環には、原色（赤、青、黄）と二次色（緑、オレンジ、紫）が含まれています。

色相環を使うことで、以下のような色の組み合わせを見つけることができます：

- **補色**: 色相環の反対側にある色同士（例：赤と緑）
- **類似色**: 色相環で隣接している色（例：青と青紫）
- **トライアド**: 色相環で等間隔に3つの色を選ぶ（例：赤、青、黄）`,
    category: "UIデザイン",
    tags: ["初心者向け", "基礎知識", "UIデザイン"],
    status: "公開",
    image: "/placeholder.svg?height=200&width=300",
  },
  2: {
    title: "タイポグラフィの基礎",
    content: `# タイポグラフィの基礎

タイポグラフィは、文字の配置や書体の選択によって、テキストを視覚的に効果的に表現する技術です。

## フォントの種類

主なフォントの種類には以下があります：

1. **セリフ体**: 文字の端に装飾（セリフ）がある書体。例：Times New Roman
2. **サンセリフ体**: 装飾のない直線的な書体。例：Helvetica
3. **モノスペース**: すべての文字が同じ幅を持つ書体。例：Courier New
4. **スクリプト体**: 手書き風の書体。例：Brush Script

## タイポグラフィの基本原則

効果的なタイポグラフィのためには、以下の原則を理解することが重要です：

1. **階層**: 見出し、小見出し、本文など、テキストの重要度に応じた視覚的な階層を作ります。
2. **読みやすさ**: 適切なフォントサイズ、行間、文字間隔を設定して読みやすさを確保します。
3. **コントラスト**: フォントの太さや大きさを変えることで、視覚的な興味を引き出します。
4. **整列**: テキストの配置（左揃え、中央揃え、右揃え、両端揃え）を適切に選択します。

## Webデザインにおけるタイポグラフィ

Webデザインでは、以下の点に注意してタイポグラフィを設計します：

- **レスポンシブ設計**: 様々な画面サイズで読みやすいフォントサイズを設定します。
- **Webフォント**: Google FontsやAdobe Fontsなどのサービスを利用して、多様なフォントを使用できます。
- **行の長さ**: 一行あたり45〜75文字程度が読みやすいとされています。`,
    category: "UIデザイン",
    tags: ["初心者向け", "基礎知識", "タイポグラフィ"],
    status: "公開",
    image: "/placeholder.svg?height=200&width=300",
  },
}

export default function EditArticlePage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [activeTab, setActiveTab] = useState("edit")
  const [status, setStatus] = useState("公開")

  // 記事データの取得
  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得
    const article = articlesData[id as keyof typeof articlesData]
    if (article) {
      setTitle(article.title)
      setContent(article.content)
      setCategory(article.category)
      setSelectedTags(article.tags)
      setStatus(article.status)
    }
  }, [id])

  // タグの追加
  const addTag = () => {
    if (tagInput && !selectedTags.includes(tagInput)) {
      setSelectedTags([...selectedTags, tagInput])
      setTagInput("")
    }
  }

  // タグの削除
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  // 記事の保存
  const saveArticle = (isDraft: boolean) => {
    // ここで記事データを保存する処理を実装
    console.log({
      id,
      title,
      content,
      category,
      tags: selectedTags,
      status: isDraft ? "下書き" : "公開",
    })

    // 保存後に記事一覧ページに戻る
    router.push("/admin/articles")
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link href="/admin/articles" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">記事の編集</h1>
      </div>

      <div className="grid gap-6">
        {/* タイトル入力 */}
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="記事のタイトルを入力"
            className="mt-1"
          />
        </div>

        {/* カテゴリ選択 */}
        <div>
          <Label htmlFor="category">カテゴリ</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="mt-1">
              <SelectValue placeholder="カテゴリを選択" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* タグ選択 */}
        <div>
          <Label htmlFor="tags">タグ</Label>
          <div className="flex mt-1 mb-2">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="タグを入力"
              className="rounded-r-none"
              list="tag-suggestions"
            />
            <datalist id="tag-suggestions">
              {tags.map((tag) => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
            <Button type="button" onClick={addTag} className="rounded-l-none" disabled={!tagInput}>
              追加
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="cursor-pointer">
                {tag}
                <button className="ml-1 text-xs hover:text-destructive" onClick={() => removeTag(tag)}>
                  ✕
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* アイキャッチ画像 */}
        <div>
          <Label htmlFor="featured-image">アイキャッチ画像</Label>
          <div className="mt-1 border-2 border-dashed rounded-md p-6 text-center">
            <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">画像をドラッグ&ドロップするか、クリックしてアップロード</p>
            <Input id="featured-image" type="file" accept="image/*" className="hidden" />
            <Button variant="outline" size="sm" className="mt-2">
              画像を選択
            </Button>
          </div>
        </div>

        {/* 本文エディタ */}
        <div>
          <Label>本文</Label>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">編集</TabsTrigger>
              <TabsTrigger value="preview">プレビュー</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="border rounded-md p-4 min-h-[400px]">
              <MarkdownEditor value={content} onChange={setContent} />
            </TabsContent>
            <TabsContent value="preview" className="border rounded-md p-4 min-h-[400px]">
              <MarkdownPreview content={content} />
            </TabsContent>
          </Tabs>
        </div>

        {/* 保存ボタン */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => saveArticle(true)}>
            下書き保存
          </Button>
          <Button onClick={() => saveArticle(false)}>公開する</Button>
        </div>
      </div>
    </div>
  )
}
