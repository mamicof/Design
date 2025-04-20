import Link from "next/link"
import { BarChart, FileText, Tag, FolderTree, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          サイトに戻る
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">総記事数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +12%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">閲覧数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +8%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">カテゴリ数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">タグ数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +5</p>
          </CardContent>
        </Card>
      </div>

      {/* アクセス統計 */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>アクセス統計</CardTitle>
            <Button variant="outline" size="sm">
              詳細を表示
            </Button>
          </div>
          <CardDescription>過去30日間のアクセス数推移</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
            <BarChart className="h-8 w-8 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">アクセス統計グラフ</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 最近の活動 */}
        <Card>
          <CardHeader>
            <CardTitle>最近の活動</CardTitle>
            <CardDescription>最近の更新や操作履歴</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5 bg-primary/10 p-1 rounded-full">
                  <FileText className="h-3 w-3 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">記事「色彩理論の基本」を更新しました</p>
                  <p className="text-xs text-muted-foreground">2時間前</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-0.5 bg-primary/10 p-1 rounded-full">
                  <Tag className="h-3 w-3 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">タグ「デザインシステム」を追加しました</p>
                  <p className="text-xs text-muted-foreground">昨日</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-0.5 bg-primary/10 p-1 rounded-full">
                  <FolderTree className="h-3 w-3 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">カテゴリ「UXデザイン」を更新しました</p>
                  <p className="text-xs text-muted-foreground">3日前</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 人気コンテンツ */}
        <Card>
          <CardHeader>
            <CardTitle>人気コンテンツ</CardTitle>
            <CardDescription>閲覧数の多い記事</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 bg-primary/10 p-1 rounded-full">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-sm font-medium">色彩理論の基本</p>
                </div>
                <p className="text-sm text-muted-foreground">245 閲覧</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 bg-primary/10 p-1 rounded-full">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Figmaの使い方</p>
                </div>
                <p className="text-sm text-muted-foreground">198 閲覧</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 bg-primary/10 p-1 rounded-full">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-sm font-medium">デザインシステムの構築方法</p>
                </div>
                <p className="text-sm text-muted-foreground">156 閲覧</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
