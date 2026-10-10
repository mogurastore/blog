# MoguraDev

個人テックブログ。URL: https://mogura.dev

Astro による静的サイト。記事は `src/content/articles/` 配下の Markdown で管理する。

## 開発

```sh
pnpm install
pnpm run dev      # localhost:4321
pnpm run build    # dist/ に出力
pnpm run preview
```

## 構成

```text
├── public/               # 静的アセット
├── src/
│   ├── components/       # Header / Footer 等
│   ├── content/articles/ # 記事本体（年別ディレクトリ）
│   ├── layouts/          # 記事レイアウト
│   ├── lib/articles.ts   # 記事取得ロジック
│   └── pages/            # ルーティング
├── astro.config.mjs
└── package.json
```

## 記事の追加

`src/content/articles/` に Markdown を置く。フロントマターは `title` と `pubDate` が必須。

```md
---
title: 記事タイトル
pubDate: 2026-10-11
---
```
