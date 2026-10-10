---
pubDate: 2021-12-08
tags: [github, vscode]
title: vscode の github 拡張機能を使ったワークフローを紹介
---

[DEPARTURE Advent Calendar 2021 | 8 日目](https://qiita.com/advent-calendar/2021/departure-development)

## 概要

vscode 上で github の issue 作成から pull request の merge までを行うワークフローを紹介します。

こちらの拡張機能を使います。

https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github

## issue の作成

サイドバーから issue を作成できます。

markdown 形式で title などを記入、保存したら issue が作成されるという感じです。

## 作業 branch の作成

サイドバーに issue 一覧が表示されるので、取り掛かる issue を選択します。

issue を選択すると自動的に branch が切り替わります。

branch 名は user/issue1 といった形式になります。

## pull request の作成

サイドバーから pull request を作成します。

issue の作成とは違って専用の UI で入力します。

## pull request の merge

差分を確認して merge します。

branch が不要なら削除もできます。

## まとめ

vscode の github 拡張機能を使ったワークフローを紹介しました。

現時点で issue の閲覧・更新はできませんが、それ以外は vscode 上で完結することができます。
