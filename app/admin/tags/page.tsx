"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, PlusCircle, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// サンプルデータ
const tagsData = [
  { id: 1, name: "初心者向け", slug: "beginner", count: 8 },
  { id: 2, name: "上級者向け", slug: "advanced", count: 5 },
  { id: 3, name: "トレンド", slug: "trend", count: 6 },
  { id: 4, name: "基礎知識", slug: "basic", count: 10 },
  { id: 5, name: "ケーススタディ", slug: "case-study", count: 4 },
  { id: 6, name: "チュートリアル", slug: "tutorial", count: 7 },
  { id: 7, name: "インスピレーション", slug: "inspiration", count: 3 },
  { id: 8, name: "ツール", slug: "tool", count: 9 },
  { id: 9, name: "テクニック", slug: "technique", count: 6 },
]

export default function TagsPage() {
  const [tags, setTags] = useState(tagsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTag, setCurrentTag] = useState<any>(null)
  const [newTagName, setNewTagName] = useState("")
  const [newTagSlug, setNewTagSlug] = useState("")

  // 検索フィルタリング
  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 新規タグ追加ダイアログを開く
  const openAddDialog = () => {
    setNewTagName("")
    setNewTagSlug("")
    setIsAddDialogOpen(true)
  }

  // タグ編集ダイアログを開く
  const openEditDialog = (tag: any) => {
    setCurrentTag(tag)
    setNewTagName(tag.name)
    setNewTagSlug(tag.slug)
    setIsEditDialogOpen(true)
  }

  // タグ削除ダイアログを開く
  const openDeleteDialog = (tag: any) => {
    setCurrentTag(tag)
    setIsDeleteDialogOpen(true)
  }

  // タグの追加
  const addTag = () => {
    if (newTagName && newTagSlug) {
      const newTag = {
        id: Math.max(...tags.map((t) => t.id)) + 1,
        name: newTagName,
        slug: newTagSlug,
        count: 0,
      }
      setTags([...tags, newTag])
      setIsAddDialogOpen(false)
    }
  }

  // タグの編集
  const editTag = () => {
    if (newTagName && newTagSlug && currentTag) {
      setTags(
        tags.map((tag) => {
          if (tag.id === currentTag.id) {
            return { ...tag, name: newTagName, slug: newTagSlug }
          }
          return tag
        }),
      )
      setIsEditDialogOpen(false)
    }
  }

  // タグの削除
  const deleteTag = () => {
    if (currentTag) {
      setTags(tags.filter((tag) => tag.id !== currentTag.id))
      setIsDeleteDialogOpen(false)
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
        <h1 className="text-2xl font-bold">タグ管理</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Input
            placeholder="タグを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3"
          />
        </div>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          新規タグ追加
        </Button>
      </div>

      <Separator className="mb-6" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タグ名</TableHead>
              <TableHead>スラッグ</TableHead>
              <TableHead className="text-center">記事数</TableHead>
              <TableHead className="w-[150px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <TableRow key={tag.id} className="h-10">
                  <TableCell className="font-medium py-2">{tag.name}</TableCell>
                  <TableCell className="py-2">{tag.slug}</TableCell>
                  <TableCell className="text-center py-2">{tag.count}</TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="編集" onClick={() => openEditDialog(tag)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="削除" onClick={() => openDeleteDialog(tag)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  タグが見つかりませんでした
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 新規タグ追加ダイアログ */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新規タグ追加</DialogTitle>
            <DialogDescription>新しいタグを追加します。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">タグ名</Label>
              <Input id="name" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="slug">スラッグ</Label>
              <Input id="slug" value={newTagSlug} onChange={(e) => setNewTagSlug(e.target.value)} className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">
                URLに使用される識別子です。半角英数字とハイフンのみ使用できます。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={addTag}>追加する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* タグ編集ダイアログ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タグの編集</DialogTitle>
            <DialogDescription>タグ情報を編集します。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-name">タグ名</Label>
              <Input
                id="edit-name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-slug">スラッグ</Label>
              <Input
                id="edit-slug"
                value={newTagSlug}
                onChange={(e) => setNewTagSlug(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URLに使用される識別子です。半角英数字とハイフンのみ使用できます。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={editTag}>保存する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* タグ削除ダイアログ */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タグの削除</DialogTitle>
            <DialogDescription>このタグを削除してもよろしいですか？この操作は元に戻せません。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={deleteTag}>
              削除する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
