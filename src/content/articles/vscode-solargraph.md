---
pubDate: 2021-07-08
tags: [ruby, vscode]
title: vscode と solargraph を連携させる
---

## 概要

https://www.youtube.com/watch?v=JaC8uUGfEXM

solargraph という gem を使うと vscode で ruby を書く際に便利そうなので試してみました。

## solargraph をインストール

solargraph をインストールします。

https://github.com/castwide/solargraph

solargraph を development group に 追加します。

```bash
bundle add solargraph -g development
```

## vscode の拡張機能 をインストール

こちらを vscode にインストールします。

https://marketplace.visualstudio.com/items?itemName=castwide.solargraph

## settings.json

linter や formatter を enable にします。入力補完などは設定しなくてもデフォルトで enable です。

`.vscode/settings.json`

```json
{
  "[ruby]": {
    "editor.defaultFormatter": "castwide.solargraph"
  },
  "solargraph.diagnostics": true,
  "solargraph.formatting": true,
  "solargraph.useBundler": true
}
```

## yard gems

gem の入力補完は YARD というドキュメントツールを利用します。build にそこそこ時間がかかります。

```bash
yard gems
```

## 感想

完璧に入力補完ができるわけではないですが便利なのでおすすめです。
