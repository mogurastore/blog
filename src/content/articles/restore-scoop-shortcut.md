---
pubDate: 2021-09-03
tags: [scoop, windows]
title: scoop でインストールしたアプリが見つからない時の対処法
---

## 概要

scoop を使って obs-studio をインストールしたのですが、ショートカットが見つからず困っていました。

対処法を見つけたので紹介します。

## 対処法

まずは windows powershell を開きます。

そして下記のコマンドを実行するとショートカットが再生成されるようです。

```powershell
scoop reset *
```

普段は microsoft store 版の powershell を使っているのですが、どうも scoop と相性が良くないようです。

scoop install などは windows powershell でやった方が良いかもしれないと思いました。

## 参考リンク

https://github.com/lukesampson/scoop/issues/4246
