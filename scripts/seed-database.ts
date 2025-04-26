"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

// サンプルデータ
const categories = [
  { name: "UIデザイン", slug: "uidesign" },
  { name: "UXデザイン", slug: "uxdesign" },
  { name: "グラフィックデザイン", slug: "graphicdesign" },
  { name: "デザインツール", slug: "designtools" },
]

const subcategories = [
  { name: "色彩理論", slug: "色彩理論", category: "UIデザイン" },
  { name: "タイポグラフィ", slug: "タイポグラフィ", category: "UIデザイン" },
  { name: "レイアウト", slug: "レイアウト", category: "UIデザイン" },
  { name: "アクセシビリティ", slug: "アクセシビリティ", category: "UIデザイン" },
  { name: "ユーザーリサーチ", slug: "ユーザーリサーチ", category: "UXデザイン" },
  { name: "ペルソナ", slug: "ペルソナ", category: "UXデザイン" },
  { name: "ユーザージャーニー", slug: "ユーザージャーニー", category: "UXデザイン" },
  { name: "プロトタイピング", slug: "プロトタイピング", category: "UXデザイン" },
  { name: "ロゴデザイン", slug: "ロゴデザイン", category: "グラフィックデザイン" },
  { name: "ブランディング", slug: "ブランディング", category: "グラフィックデザイン" },
  { name: "印刷デザイン", slug: "印刷デザイン", category: "グラフィックデザイン" },
  { name: "イラストレーション", slug: "イラストレーション", category: "グラフィックデザイン" },
  { name: "Figma", slug: "figma", category: "デザインツール" },
  { name: "Adobe XD", slug: "adobe-xd", category: "デザインツール" },
  { name: "Sketch", slug: "sketch", category: "デザインツール" },
  { name: "Photoshop", slug: "photoshop", category: "デザインツール" },
  { name: "Illustrator", slug: "illustrator", category: "デザインツール" },
]

const tags = [
  { name: "初心者向け", slug: "beginner" },
  { name: "上級者向け", slug: "advanced" },
  { name: "トレンド", slug: "trend" },
  { name: "基礎知識", slug: "basic" },
  { name: "ケーススタディ", slug: "case-study" },
  { name: "チュートリアル", slug: "tutorial" },
  { name: "インスピレーション", slug: "inspiration" },
  { name: "ツール", slug: "tool" },
  { name: "テクニック", slug: "technique" },
]

const articles = [
  {
    title: "色彩理論の基本",
    content: `# 色彩理論の基本

色彩理論は、色の混合、調和、対比などの原理を体系化した学問です。デザイナーにとって色彩理論を理解することは、効果的で魅力的なデザインを作成するために不可欠です。

## 色の三属性

色には主に3つの属性があります：

1. **色相（Hue）**: 色の種類を表します。赤、青、黄などの基本的な色を指します。
2. **彩度（Saturation）**: 色の鮮やかさを表します。高彩度の色は鮮やかで、低彩度の色は灰色がかっています。
3. **明度（Brightness/Value）**: 色の明るさを表します。白に近いほど明度が高く、黒に近いほど明度が低くなります。

## 色相環

色相環は、色の関係を視覚的に表現したものです。基本的な色相環には、原色（赤、青、黄）と二次色（緑、オレンジ、紫）が含まれています。

色相環を使うことで、以下のような色の組み合わせを見つけることができます：

- **補色**: 色相環の反対側にある色同士（例：赤と緑）
- **類似色**: 色相環で隣接している色（例：青と青紫）
- **トライアド**: 色相環で等間隔に3つの色を選ぶ（例：赤、青、黄）`,
    category: "UIデザイン",
    subcategory: "色彩理論",
    tags: ["初心者向け", "基礎知識", "UIデザイン"],
    status: "published",
    author: "田中デザイン",
  },
  {
    title: "タイポグラフィの基礎",
    content: `# タイポグラフィの基礎

タイポグラフィは、文字の配置や書体の選択によって、テキストを視覚的に効果的に表現する技術です。

## フォントの種類

主なフォントの種類には以下があります：

1. **セリフ体**: 文字の端に装飾（セリフ）がある書体。例：Times New Roman
2. **サンセリフ体**: 装飾のない直線的な書体。例：Helvetica
3. **モノスペース**: すべての文字が同じ幅を持つ書体。例：Courier New
4. **スクリプト体**: 手書き風の書体。例：Brush Script

## タイポグラフィの基本原則

効果的なタイポグラフィのためには、以下の原則を理解することが重要です：

1. **階層**: 見出し、小見出し、本文など、テキストの重要度に応じた視覚的な階層を作ります。
2. **読みやすさ**: 適切なフォントサイズ、行間、文字間隔を設定して読みやすさを確保します。
3. **コントラスト**: フォントの太さや大きさを変えることで、視覚的な興味を引き出します。
4. **整列**: テキストの配置（左揃え、中央揃え、右揃え、両端揃え）を適切に選択します。`,
    category: "UIデザイン",
    subcategory: "タイポグラフィ",
    tags: ["初心者向け", "基礎知識", "タイポグラフィ"],
    status: "published",
    author: "佐藤デザイン",
  },
  {
    title: "Figmaの使い方",
    content: `# Figmaの使い方

Figmaは、ウェブベースのデザインツールで、UIデザインやプロトタイピングに広く使用されています。

## Figmaの基本機能

Figmaの主な機能には以下があります：

1. **デザイン**: ベクターベースのデザインツールで、様々な形状やテキストを作成できます。
2. **コンポーネント**: 再利用可能なデザイン要素を作成し、一貫性のあるデザインを維持できます。
3. **プロトタイピング**: インタラクティブなプロトタイプを作成し、ユーザー体験をテストできます。
4. **コラボレーション**: リアルタイムで複数のデザイナーが同時に作業できます。

## Figmaの使い始め方

1. アカウントを作成し、新しいファイルを開始します。
2. フレームを作成して、デザインのキャンバスを設定します。
3. 基本的な形状やテキストを追加して、デザインを構築します。
4. コンポーネントを作成して、デザインの一貫性を確保します。`,
    category: "デザインツール",
    subcategory: "Figma",
    tags: ["チュートリアル", "ツール", "Figma"],
    status: "published",
    author: "高橋デザイン",
  },
  {
    title: "ユーザーリサーチの方法",
    content: `# ユーザーリサーチの方法

ユーザーリサーチは、ユーザーのニーズ、行動、動機を理解するためのプロセスです。

## リサーチの種類

主なユーザーリサーチの種類には以下があります：

1. **定性的リサーチ**: インタビュー、観察、ユーザビリティテストなど、深い洞察を得るための方法。
2. **定量的リサーチ**: アンケート、アナリティクス分析など、数値データを収集する方法。

## ユーザーインタビューの実施方法

効果的なユーザーインタビューを実施するためのステップ：

1. **目的の明確化**: インタビューで何を知りたいのかを明確にします。
2. **質問の準備**: オープンエンドな質問を準備し、バイアスを避けます。
3. **参加者の募集**: 対象ユーザーを代表する参加者を募集します。
4. **インタビューの実施**: リラックスした環境で、参加者の発言をよく聞きます。
5. **分析**: 収集した情報を整理し、パターンや洞察を見つけます。`,
    category: "UXデザイン",
    subcategory: "ユーザーリサーチ",
    tags: ["UXデザイン", "基礎知識", "ユーザーリサーチ"],
    status: "published",
    author: "鈴木デザイン",
  },
]

// 管理者アカウント
const admins = [
  {
    username: "admin",
    password_hash: "$2a$10$GQKrHQcZsyBsr8G3hH7vZ.9QUKjRZgI1VPRQyPr1z7VV6zQdI3U8W", // "admin123"のハッシュ
  },
]

export async function seedDatabase() {
  const supabase = createServerSupabaseClient()

  try {
    // カテゴリの登録
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .insert(categories)
      .select()
    if (categoriesError) throw categoriesError

    // カテゴリIDのマッピングを作成
    const categoryMap = categoriesData.reduce(
      (map, category) => {
        map[category.name] = category.id
        return map
      },
      {} as Record<string, number>,
    )

    // サブカテゴリの登録
    const subcategoriesWithIds = subcategories.map((subcat) => ({
      name: subcat.name,
      slug: subcat.slug,
      category_id: categoryMap[subcat.category],
    }))

    const { data: subcategoriesData, error: subcategoriesError } = await supabase
      .from("subcategories")
      .insert(subcategoriesWithIds)
      .select()
    if (subcategoriesError) throw subcategoriesError

    // サブカテゴリIDのマッピングを作成
    const subcategoryMap = subcategoriesData.reduce(
      (map, subcategory) => {
        map[subcategory.name] = subcategory.id
        return map
      },
      {} as Record<string, number>,
    )

    // タグの登録
    const { data: tagsData, error: tagsError } = await supabase.from("tags").insert(tags).select()
    if (tagsError) throw tagsError

    // タグIDのマッピングを作成
    const tagMap = tagsData.reduce(
      (map, tag) => {
        map[tag.name] = tag.id
        return map
      },
      {} as Record<string, number>,
    )

    // 記事の登録
    for (const article of articles) {
      // 記事を登録
      const { data: articleData, error: articleError } = await supabase
        .from("articles")
        .insert({
          title: article.title,
          content: article.content,
          category_id: categoryMap[article.category],
          subcategory_id: subcategoryMap[article.subcategory],
          status: article.status,
          author: article.author,
        })
        .select()
      if (articleError) throw articleError

      // 記事とタグの関連付け
      const articleId = articleData[0].id
      const articleTags = article.tags.map((tag) => ({
        article_id: articleId,
        tag_id: tagMap[tag],
      }))

      const { error: articleTagsError } = await supabase.from("article_tags").insert(articleTags)
      if (articleTagsError) throw articleTagsError
    }

    // 管理者の登録
    const { error: adminsError } = await supabase.from("admins").insert(admins)
    if (adminsError) throw adminsError

    return { success: true, message: "データベースの初期化が完了しました" }
  } catch (error) {
    console.error("データベース初期化エラー:", error)
    return { success: false, error: (error as Error).message }
  }
}
