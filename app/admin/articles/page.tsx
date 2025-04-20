"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Edit, Trash2, Eye, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// サンプルデータ
const articlesData = [
  {
    id: 1,
    title: "色彩理論の基本",
    category: "UIデザイン",
    tags: ["初心者向け", "基礎知識", "UIデザイン"],
    status: "公開",
    date: "2024年3月15日",
  },
  {
    id: 2,
    title: "タイポグラフィの基礎",
    category: "UIデザイン",
    tags: ["初心者向け", "基礎知識", "タイポグラフィ"],
    status: "公開",
    date: "2024年3月10日",
  },
  {
    id: 3,
    title: "Figmaの使い方",
    category: "デザインツール",
    tags: ["チュートリアル", "ツール", "Figma"],
    status: "公開",
    date: "2024年2月28日",
  },
  {
    id: 4,
    title: "ユーザーリサーチの方法",
    category: "UXデザイン",
    tags: ["UXデザイン", "基礎知識", "ユーザーリサーチ"],
    status: "公開",
    date: "2024年2月20日",
  },
  {
    id: 5,
    title: "デザインシステムの構築方法（下書き）",
    category: "UIデザイン",
    tags: ["デザインシステム", "上級者向け", "チーム作業"],
    status: "下書き",
    date: "2024年4月18日",
  },
]

export default function ArticlesPage() {
  const [articles, setArticles] = useState(articlesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null)

  // 検索フィルタリング
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // 記事削除
  const handleDeleteClick = (id: number) => {
    setArticleToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (articleToDelete) {
      setArticles(articles.filter((article) => article.id !== articleToDelete))
      setDeleteDialogOpen(false)
      setArticleToDelete(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link href="/admin" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">記事管理</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Input
            placeholder="記事を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3"
          />
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            新規記事作成
          </Button>
        </Link>
      </div>

      <Separator className="mb-6" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead>カテゴリ</TableHead>
              <TableHead>タグ</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>更新日</TableHead>
              <TableHead className="w-[150px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 2 && (
                        <Badge variant="outline" className="font-normal text-xs">
                          +{article.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={article.status === "公開" ? "default" : "outline"}
                      className={article.status === "公開" ? "" : "text-orange-500 bg-orange-50"}
                    >
                      {article.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/article/${article.id}`}>
                        <Button variant="ghost" size="icon" title="プレビュー">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <Button variant="ghost" size="icon" title="編集">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" title="削除" onClick={() => handleDeleteClick(article.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  記事が見つかりませんでした
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 削除確認ダイアログ */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>記事の削除</DialogTitle>
            <DialogDescription>この記事を削除してもよろしいですか？この操作は元に戻せません。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              削除する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
