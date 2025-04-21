import Link from "next/link"
import { FileText, Tag, FolderTree } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">管理機能</h1>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          サイトに戻る
        </Link>
      </div>

      {/* 記事管理 */}
      <div className="mb-8">
        <Link href="/admin/articles" className="block group">
          <Card className="h-full transition-all group-hover:shadow-md">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>記事管理</CardTitle>
              <CardDescription>記事の追加・編集・削除</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                記事の作成、編集、削除、下書き保存などを行います。マークダウン形式で記事を作成できます。
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* カテゴリ管理とタグ管理を横に並べる */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/categories" className="block group">
          <Card className="h-full transition-all group-hover:shadow-md">
            <CardHeader>
              <FolderTree className="h-8 w-8 text-primary mb-2" />
              <CardTitle>カテゴリ管理</CardTitle>
              <CardDescription>カテゴリの追加・編集・削除</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                カテゴリの作成、編集、削除を行います。カテゴリは階層構造で管理できます。
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/tags" className="block group">
          <Card className="h-full transition-all group-hover:shadow-md">
            <CardHeader>
              <Tag className="h-8 w-8 text-primary mb-2" />
              <CardTitle>タグ管理</CardTitle>
              <CardDescription>タグの追加・編集・削除</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                タグの作成、編集、削除を行います。タグは記事の分類や検索に使用されます。
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
