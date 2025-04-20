"use client"

import { useEffect, useState } from "react"

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const [html, setHtml] = useState("")

  // 簡易的なマークダウンパーサー
  useEffect(() => {
    // 実際のアプリケーションでは、marked.jsなどのライブラリを使用することをお勧めします
    let parsedContent = content
      // 見出し
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3 mt-5">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2 mt-4">$1</h3>')
      // 太字
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // 斜体
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // リンク
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
      // 画像
      .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-md my-4" />')
      // コードブロック
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')
      // インラインコード
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded">$1</code>')
      // 箇条書きリスト
      .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
      // 番号付きリスト
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal">$1</li>')
      // 段落
      .replace(/^(?!<[hl]|<li|<pre)(.+)$/gm, '<p class="mb-4">$1</p>')
      // 空行
      .replace(/^\s*$/gm, "<br />")

    // リストをグループ化
    parsedContent = parsedContent
      .replace(/<li class="ml-6 list-disc">([\s\S]*?)(?=<\/li>)<\/li>/g, (match) => {
        if (!match.includes('<ul class="my-4">')) {
          return `<ul class="my-4">${match}</li></ul>`
        }
        return match
      })
      .replace(/<li class="ml-6 list-decimal">([\s\S]*?)(?=<\/li>)<\/li>/g, (match) => {
        if (!match.includes('<ol class="my-4">')) {
          return `<ol class="my-4">${match}</li></ol>`
        }
        return match
      })

    setHtml(parsedContent)
  }, [content])

  return (
    <div className="prose prose-sm max-w-none prose-headings:mt-0 prose-p:my-2">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
