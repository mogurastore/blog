---
pubDate: 2021-08-07
tags: [docker, vscode]
title: docker と vscode を使ったコード書き捨て術
---

## 概要

ちょっとライブラリを試したい時などに使える、docker と vscode を使ったコード書き捨て術を紹介します。

## 前提条件

前提条件として下記はインストール済みの想定です。

- docker
- vscode
  - Docker 拡張機能
  - Remote Development 拡張機能

## docker コンテナを立ち上げる

サイドバーの docker > images から右クリックで Run interactive を実行します。

## vscode remote でコンテナに attach

サイドバーの docker > containers から右クリックで Attach Visual Studio Code を実行します。

後は通常と同じように vscode でコードを書くだけです。

## port について

通常、コンテナ外からアクセスするには docker run の p オプションで port を指定すると思います。

しかし、vscode remote の terminal で process を立ち上げると、自動で port forwarding をしてくれます。

## git について

コンテナに git がインストールされている場合、vscode はコンテナ内に.gitconfig を転送してくれます。

認証情報もローカルと同じ感じで使えるように上手いことやってくれるので pull なども可能です。
