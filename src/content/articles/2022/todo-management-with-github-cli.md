---
pubDate: 2022-07-16
tags: [github]
title: todo 管理に Github CLI を使うアイディア
---

## 概要

最近 Github issue + Github CLI で todo を管理しているのですが結構良い感じなので紹介します。

## やり方

まずは todo 用の repository を用意します。

次に `gh alias set todo "issue --repo OWNER/REPO"` という gh alias を定義します。

これで、どのディレクトリにいても `OWNER/REPO` の issue にアクセスできるようになります。

## 基本的な使い方

中身は `gh issue` なので `gh issue` のコマンドを使うことができます。

良く使うのは下記のコマンドです。

- gh todo list
- gh todo create
- gh todo close

## todo にコメントする

コメントをしたい場合は `gh todo comment` でコメントをすることができます。中長期的な todo の場合は結構コメントをしたくなるので嬉しいポイントです。

## todo を label で管理する

github の label を使って todo を管理することもできます。

`gh todo create` の l オプションで label を指定するか Add metadata で label を選択すれば OK です。

`gh todo list` の l オプションを使うと label で todo を絞り込むことができます。ちなみに S オプションを使うと label 以外の色んな条件で絞り込むことができます。

ただし label 自体の作成などは `gh label`で行う必要があります。`gh todo` は `gh issue --repo OWNER/REPO` の alias なので label の管理はできません。

また、うっかり repo オプションを省略して別の repository に label を作ってしまうなどのミスには注意してください。

## todo をブラウザで見る

一部のコマンドは w オプションを渡すとブラウザで見ることができます。マイルストーンの設定などはブラウザの方が便利だったりするのでそういう時に使っています。
