"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, PlusCircle, Edit, Trash2, ChevronRight } from "lucide-react"
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
const categoriesData = [
  {
    id: 1,
    name: "UIデザイン",
    slug: "ui-design",
    count: 12,
    subcategories: [
      { id: 5, name: "色彩理論", slug: "color-theory", count: 3 },
      { id: 6, name: "タイポグラフィ", slug: "typography", count: 4 },
      { id: 7, name: "レイアウト", slug: "layout", count: 3 },
      { id: 8, name: "アクセシビリティ", slug: "accessibility", count: 2 },
    ],
  },
  {
    id: 2,
    name: "UXデザイン",
    slug: "ux-design",
    count: 8,
    subcategories: [
      { id: 9, name: "ユーザーリサーチ", slug: "user-research", count: 2 },
      { id: 10, name: "ペルソナ", slug: "persona", count: 1 },
      { id: 11, name: "ユーザージャーニー", slug: "user-journey", count: 3 },
      { id: 12, name: "プロトタイピング", slug: "prototyping", count: 2 },
    ],
  },
  {
    id: 3,
    name: "グラフィックデザイン",
    slug: "graphic-design",
    count: 6,
    subcategories: [
      { id: 13, name: "ロゴデザイン", slug: "logo-design", count: 2 },
      { id: 14, name: "ブランディング", slug: "branding", count: 1 },
      { id: 15, name: "印刷デザイン", slug: "print-design", count: 1 },
      { id: 16, name: "イラストレーション", slug: "illustration", count: 2 },
    ],
  },
  {
    id: 4,
    name: "デザインツール",
    slug: "design-tools",
    count: 10,
    subcategories: [
      { id: 17, name: "Figma", slug: "figma", count: 3 },
      { id: 18, name: "Adobe XD", slug: "adobe-xd", count: 2 },
      { id: 19, name: "Sketch", slug: "sketch", count: 2 },
      { id: 20, name: "Photoshop", slug: "photoshop", count: 2 },
      { id: 21, name: "Illustrator", slug: "illustrator", count: 1 },
    ],
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(categoriesData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<any>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategorySlug, setNewCategorySlug] = useState("")
  const [parentCategoryId, setParentCategoryId] = useState<number | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])
  const [isAddMainCategoryDialogOpen, setIsAddMainCategoryDialogOpen] = useState(false)
  const [newMainCategoryName, setNewMainCategoryName] = useState("")
  const [newMainCategorySlug, setNewMainCategorySlug] = useState("")

  // カテゴリの展開/折りたたみ
  const toggleExpand = (id: number) => {
    setExpandedCategories((prev) => (prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]))
  }

  // 新規カテゴリ追加ダイアログを開く
  const openAddDialog = (parentId: number | null = null) => {
    setParentCategoryId(parentId)
    setNewCategoryName("")
    setNewCategorySlug("")
    setIsAddDialogOpen(true)
  }

  // 新規メインカテゴリ追加ダイアログを開く
  const openAddMainCategoryDialog = () => {
    setNewMainCategoryName("")
    setNewMainCategorySlug("")
    setIsAddMainCategoryDialogOpen(true)
  }

  // カテゴリ編集ダイアログを開く
  const openEditDialog = (category: any) => {
    setCurrentCategory(category)
    setNewCategoryName(category.name)
    setNewCategorySlug(category.slug)
    setIsEditDialogOpen(true)
  }

  // カテゴリ削除ダイアログを開く
  const openDeleteDialog = (category: any) => {
    setCurrentCategory(category)
    setIsDeleteDialogOpen(true)
  }

  // カテゴリの追加
  const addCategory = () => {
    if (newCategoryName && newCategorySlug) {
      const newCategory = {
        id:
          Math.max(...categories.map((c) => c.id), ...categories.flatMap((c) => c.subcategories.map((s) => s.id))) + 1,
        name: newCategoryName,
        slug: newCategorySlug,
        count: 0,
        subcategories: [],
      }

      if (parentCategoryId === null) {
        // 親カテゴリとして追加
        setCategories([...categories, newCategory])
      } else {
        // サブカテゴリとして追加
        setCategories(
          categories.map((cat) => {
            if (cat.id === parentCategoryId) {
              return {
                ...cat,
                subcategories: [...cat.subcategories, { ...newCategory, subcategories: undefined }],
              }
            }
            return cat
          }),
        )
      }
      setIsAddDialogOpen(false)
    }
  }

  // メインカテゴリの追加
  const addMainCategory = () => {
    if (newMainCategoryName && newMainCategorySlug) {
      const newCategory = {
        id: Math.max(...categories.map((c) => c.id)) + 1,
        name: newMainCategoryName,
        slug: newMainCategorySlug,
        count: 0,
        subcategories: [],
      }
      setCategories([...categories, newCategory])
      setIsAddMainCategoryDialogOpen(false)
    }
  }

  // カテゴリの編集
  const editCategory = () => {
    if (newCategoryName && newCategorySlug && currentCategory) {
      if (currentCategory.subcategories) {
        // 親カテゴリの編集
        setCategories(
          categories.map((cat) => {
            if (cat.id === currentCategory.id) {
              return { ...cat, name: newCategoryName, slug: newCategorySlug }
            }
            return cat
          }),
        )
      } else {
        // サブカテゴリの編集
        setCategories(
          categories.map((cat) => {
            return {
              ...cat,
              subcategories: cat.subcategories.map((subcat) => {
                if (subcat.id === currentCategory.id) {
                  return { ...subcat, name: newCategoryName, slug: newCategorySlug }
                }
                return subcat
              }),
            }
          }),
        )
      }
      setIsEditDialogOpen(false)
    }
  }

  // カテゴリの削除
  const deleteCategory = () => {
    if (currentCategory) {
      if (currentCategory.subcategories) {
        // 親カテゴリの削除
        setCategories(categories.filter((cat) => cat.id !== currentCategory.id))
      } else {
        // サブカテゴリの削除
        setCategories(
          categories.map((cat) => {
            return {
              ...cat,
              subcategories: cat.subcategories.filter((subcat) => subcat.id !== currentCategory.id),
            }
          }),
        )
      }
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
        <h1 className="text-2xl font-bold">カテゴリ管理</h1>
      </div>

      <div className="flex justify-between mb-6">
        <Button onClick={openAddMainCategoryDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          新規メインカテゴリ追加
        </Button>
        <Button onClick={() => openAddDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          新規サブカテゴリ追加
        </Button>
      </div>

      <Separator className="mb-6" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">カテゴリ名</TableHead>
              <TableHead>スラッグ</TableHead>
              <TableHead className="text-center">記事数</TableHead>
              <TableHead className="w-[150px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <>
                <TableRow key={category.id} className="h-10">
                  <TableCell className="font-medium py-2">
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 mr-2"
                        onClick={() => toggleExpand(category.id)}
                      >
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            expandedCategories.includes(category.id) ? "rotate-90" : ""
                          }`}
                        />
                      </Button>
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-2">{category.slug}</TableCell>
                  <TableCell className="text-center py-2">{category.count}</TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="サブカテゴリ追加"
                        onClick={() => openAddDialog(category.id)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="編集" onClick={() => openEditDialog(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="削除" onClick={() => openDeleteDialog(category)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedCategories.includes(category.id) &&
                  category.subcategories.map((subcat) => (
                    <TableRow key={subcat.id} className="h-10">
                      <TableCell className="font-medium py-2">
                        <div className="flex items-center pl-6">
                          <span className="text-muted-foreground">└</span>
                          <span className="ml-2">{subcat.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">{subcat.slug}</TableCell>
                      <TableCell className="text-center py-2">{subcat.count}</TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" title="編集" onClick={() => openEditDialog(subcat)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="削除" onClick={() => openDeleteDialog(subcat)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 新規メインカテゴリ追加ダイアログ */}
      <Dialog open={isAddMainCategoryDialogOpen} onOpenChange={setIsAddMainCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新規メインカテゴリ追加</DialogTitle>
            <DialogDescription>新しいメインカテゴリを追加します。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="main-name">カテゴリ名</Label>
              <Input
                id="main-name"
                value={newMainCategoryName}
                onChange={(e) => setNewMainCategoryName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="main-slug">スラッグ</Label>
              <Input
                id="main-slug"
                value={newMainCategorySlug}
                onChange={(e) => setNewMainCategorySlug(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URLに使用される識別子です。半角英数字とハイフンのみ使用できます。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMainCategoryDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={addMainCategory}>追加する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 新規サブカテゴリ追加ダイアログ */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{parentCategoryId === null ? "新規カテゴリ追加" : "新規サブカテゴリ追加"}</DialogTitle>
            <DialogDescription>
              {parentCategoryId === null
                ? "新しいカテゴリを追加します。"
                : `「${categories.find((c) => c.id === parentCategoryId)?.name}」の下にサブカテゴリを追加します。`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">カテゴリ名</Label>
              <Input
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="slug">スラッグ</Label>
              <Input
                id="slug"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URLに使用される識別子です。半角英数字とハイフンのみ使用できます。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={addCategory}>追加する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* カテゴリ編集ダイアログ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>カテゴリの編集</DialogTitle>
            <DialogDescription>カテゴリ情報を編集します。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-name">カテゴリ名</Label>
              <Input
                id="edit-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-slug">スラッグ</Label>
              <Input
                id="edit-slug"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
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
            <Button onClick={editCategory}>保存する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* カテゴリ削除ダイアログ */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>カテゴリの削除</DialogTitle>
            <DialogDescription>
              {currentCategory?.subcategories
                ? "このカテゴリとそのサブカテゴリをすべて削除してもよろしいですか？"
                : "このカテゴリを削除してもよろしいですか？"}
              この操作は元に戻せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={deleteCategory}>
              削除する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
