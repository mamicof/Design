"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
  article: {
    id: number
    title: string
    excerpt: string
    category: string
    tags: string[]
    date: string
    author: string
    image?: string
  }
  onTagClick?: (tag: string) => void
}

export function ArticleCard({ article, onTagClick }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.id}`} className="block group">
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all group-hover:shadow-md flex flex-col h-[200px]">
        <div className="relative h-24 w-full overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg?height=200&width=300"}
            alt={article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-3 bg-white flex-1 flex flex-col justify-between">
          <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title.length > 50 ? article.title.substring(0, 48) + ".." : article.title}
          </h3>
          {article.tags.length > 0 && (
            <Badge variant="secondary" className="font-normal text-xs self-start mt-auto">
              {article.tags[0]}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  )
}
