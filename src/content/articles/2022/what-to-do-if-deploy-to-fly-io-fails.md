---
pubDate: 2022-08-30
tags: [fly.io]
title: fly.io への deploy が途中で止まる場合の対処法
---

## 概要

最近 fly.io を触り始めたのですが CLI での deploy が上手く行かず困っていました。

具体的には、途中で deploy が止まりそのまま timeout してしまいます。

いろいろ試した結果、対処法が見つかったので紹介します。

## 対処法

下記のコマンドを実行すると deploy できるようになりました。websockets を介した wireguard トンネリングを有効にするコマンドのようです。

```bash
flyctl wireguard websockets enable
```

## メモ

上記の対処法を実行する前でも local build なら deploy できていました。

fly.io は local で build する方法と remote に build 用の app を作成して build する 2 種類の方法があります。

デフォルトでは remote build が行われますが、下記のコマンドを実行すれば local build を行うことができます。

```bash
flyctl deploy --local-only
```
