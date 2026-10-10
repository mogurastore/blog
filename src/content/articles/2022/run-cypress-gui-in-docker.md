---
pubDate: 2022-12-19
tags: [docker, node]
title: docker で cypress の gui を動かす
---

## 概要

[DEPARTURE Advent Calendar 2022 | 19 日目](https://qiita.com/advent-calendar/2022/departure-development)

cypress は node.js 製の e2e testing framework です。

headless mode でも使うことができますが、今回は docker 上で gui を動かす方法を紹介します。

## Dockerfile

image は cypress が公式で提供してくれているのでそちらを使います。

提供されている image は 3 種類ありますが、今回は cypress/base を使ったやり方を紹介します。ちなみに latest はだいぶ古いのでちゃんと tag を指定して使いましょう。

あらかじめ cache 用のディレクトリを作成しておきます。これをしないとインストールの際に権限の関係で失敗してしまいます。

```docker
FROM cypress/base:18.12.1

RUN mkdir -p /home/node/.cache/Cypress && chown node:node /home/node/.cache/Cypress
```

## docker-compose.yml

cypress の cache 用の volume を用意し Dockerfile で作成したディレクトリに mount します。

docker で gui を動かすために必要な環境変数と volumes も設定します。

```yml
services:
  node:
    build:
      context: .
      dockerfile: Dockerfile
    command: npx cypress open
    environment:
      DISPLAY: :0
    user: node
    volumes:
      - .:/workspace
      - /tmp/.X11-unix:/tmp/.X11-unix
      - cypress-cache:/home/node/.cache/Cypress
    working_dir: /workspace

volumes:
  cypress-cache:
```

## cypress を起動してみる

あとは通常と同じような流れになります。

```bash
docker-compose run node npm init -y
docker-compose run node npm i -D cypress
docker-compose up
```

## 参考リンク

https://github.com/cypress-io/cypress-docker-images

https://qiita.com/mya-zaki@github/items/f283a7c501b883e39e01
