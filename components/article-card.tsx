"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
  article: {
    id: number
    title: string
    excerpt?: string
    category: string
    subcategory?: string
    tags: string[]
    date: string
    author: string
  }
  onTagClick?: (tag: string) => void
}

export function ArticleCard({ article, onTagClick }: ArticleCardProps) {
  // タグを最大4つまで表示
  const displayTags = article.tags.slice(0, 4)
  const hasMoreTags = article.tags.length > 4

  return (
    <Link href={`/article/${article.id}`} className="block group">
      <div className="overflow-hidden rounded-lg border border-gray-200 transition-all group-hover:border-gray-300 flex flex-col h-[160px] w-full">
        <div className="p-3 flex-1 flex flex-col">
          {/* タイトル - 最大2行 */}
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {article.title}
          </h3>

          {/* 中カテゴリ - 最大1行 */}
          {article.subcategory && (
            <div className="mb-1">
              <Badge variant="secondary" className="font-normal text-xs">
                {article.subcategory}
              </Badge>
            </div>
          )}

          {/* タグ - 最大2行分 */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {displayTags.map((tag) => (
              <Badge
                key={tag}
                className="bg-white/70 text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 transition-colors font-normal text-xs"
                onClick={
                  onTagClick
                    ? (e) => {
                        e.preventDefault()
                        onTagClick(tag)
                      }
                    : undefined
                }
              >
                {tag}
              </Badge>
            ))}
            {hasMoreTags && (
              <Badge variant="outline" className="font-normal text-xs">
                +{article.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
