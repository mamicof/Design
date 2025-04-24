"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// Google Analytics測定ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX" // ← ここに実際のGA測定IDを入力してください

declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, any> | string) => void
  }
}

// Google Analyticsのページビュートラッキング
export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // ページビューの送信
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }, [pathname, searchParams])

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
