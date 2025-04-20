"use client"

import { useRef } from "react"
import { Bold, Italic, List, ListOrdered, ImageIcon, LinkIcon, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // テキストエリアの選択範囲を取得
  const getSelection = () => {
    const textarea = textareaRef.current
    if (!textarea) return { start: 0, end: 0, text: "" }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = value.substring(start, end)

    return { start, end, text }
  }

  // テキストエリアの選択範囲を置換
  const replaceSelection = (replacement: string, selectAfter = false) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const { start, end } = getSelection()
    const newValue = value.substring(0, start) + replacement + value.substring(end)
    onChange(newValue)

    // 選択範囲を更新
    setTimeout(() => {
      textarea.focus()
      if (selectAfter) {
        textarea.selectionStart = start
        textarea.selectionEnd = start + replacement.length
      } else {
        textarea.selectionStart = textarea.selectionEnd = start + replacement.length
      }
    }, 0)
  }

  // マークダウン書式の適用
  const applyFormat = (format: string) => {
    const { start, end, text } = getSelection()

    switch (format) {
      case "bold":
        replaceSelection(`**${text || "太字テキスト"}**`, !text)
        break
      case "italic":
        replaceSelection(`*${text || "斜体テキスト"}*`, !text)
        break
      case "list":
        replaceSelection(`\n- ${text || "リスト項目"}`, !text)
        break
      case "ordered-list":
        replaceSelection(`\n1. ${text || "番号付きリスト項目"}`, !text)
        break
      case "link":
        replaceSelection(`[${text || "リンクテキスト"}](URL)`, !text)
        break
      case "image":
        replaceSelection(`![${text || "画像の説明"}](画像のURL)`, !text)
        break
      case "code":
        if (text.includes("\n")) {
          replaceSelection(`\`\`\`\n${text || "コードブロック"}\n\`\`\``, !text)
        } else {
          replaceSelection(`\`${text || "インラインコード"}\``, !text)
        }
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-1 mb-2 p-1 border rounded-md bg-muted/50">
        <Button variant="ghost" size="icon" onClick={() => applyFormat("bold")} title="太字" type="button">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("italic")} title="斜体" type="button">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("list")} title="箇条書きリスト" type="button">
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => applyFormat("ordered-list")}
          title="番号付きリスト"
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("link")} title="リンク" type="button">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("image")} title="画像" type="button">
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("code")} title="コード" type="button">
          <Code className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-h-[350px] font-mono text-sm resize-none"
        placeholder="マークダウン形式で記事を入力..."
      />
    </div>
  )
}
