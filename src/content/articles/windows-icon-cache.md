---
pubDate: 2021-08-16
tags: [windows]
title: windows のアイコンが正しく表示されない時の対処法
---

## 概要

windows の検索ボックスでアイコンが表示されないことがありました。

その場合の対処法を調べたので紹介します。

## 対処法

windows でアイコンの表示がおかしい時は、アイコンのキャッシュをクリアすると直ります。

キャッシュを再構築するには powershell で以下のコマンドを実行すれば OK です。

```powershell
ie4uinit.exe -show
```
