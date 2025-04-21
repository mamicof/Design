"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
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

export default function NewArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [activeTab, setActiveTab] = useState("edit")

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
        <h1 className="text-2xl font-bold">新規記事作成</h1>
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
