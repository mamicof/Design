"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TableOfContentsProps {
  headings: {
    id: string
    title: string
  }[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      for (const heading of headings) {
        const element = document.getElementById(heading.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveId(heading.id)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // 初期化時に実行

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [headings])

  return (
    <div className="sticky top-6">
      <h3 className="font-medium mb-3">目次</h3>
      <ScrollArea className="h-[calc(100vh-150px)]">
        <ul className="space-y-2 pr-4">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 text-sm hover:text-foreground transition-colors border-l-2 pl-3",
                  activeId === heading.id
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent text-muted-foreground",
                )}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
