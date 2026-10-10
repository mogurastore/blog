---
pubDate: 2024-02-14
tags: [docker, playwright]
title: docker で playwright の gui を動かす
---

## 概要

以前 cypress の gui を docker で動かす方法について紹介しました。

[docker で cypress の gui を動かす](/articles/2022/run-cypress-gui-in-docker/)

今回は playwright の gui を docker で動かすやり方を紹介します。

環境は windows11 + docker desktop for windows です。

## compose.yaml

まずは compose.yaml を用意します。

microsoft から playwright の image が 提供されているのでそちらを使います。

提供されている image には playwright を動かすために必要なブラウザや依存関係が含まれているので便利です。

あとは gui を起動するために必要な environment や volumes を設定します。

また ipc を設定しないとメモリ不足になる可能性があるらしいので ipc も設定しときます。

完成系はこちら。

```yaml
services:
  playwright:
    image: mcr.microsoft.com/playwright:v1.41.1-jammy
    command: npx playwright test --ui
    environment:
      DISPLAY: :0
    ipc: host
    volumes:
      - .:/workspace
      - /tmp/.X11-unix:/tmp/.X11-unix
    working_dir: /workspace
```

## playwright のインストール

下記のコマンドを実行して playwright をインストールすることができます。

```shell
docker compose run playwright npm init playwright@latest
```

init コマンドですが既存のプロジェクトに実行しても大丈夫なようです。

質問に答えて設定していきます。

途中でブラウザや依存関係をインストールするか聞かれますが image に含まれているのでインストールはスキップされるようでした。

## playwright を起動

あとは docker compose up を実行すれば playwright の gui を起動することができます。

```shell
docker compose up
```

## 参考リンク

https://playwright.dev/docs/docker
