---
pubDate: 2021-06-25
tags: [docker]
title: https-portalでお手軽https化
---

## 概要

https://github.com/SteveLTN/https-portal

https-portal は簡単に https サーバーを用意できるツールです。docker-compose に service を定義するだけで、Nginx と Let's Encrypt を使った https サーバーを立てることができます。

## localhost の https 化

まずは localhost を https 化してみます。検証のために python でサーバーを立てます。

`docker-compose.yml`

```yml
version: "3.9"

services:
  https:
    image: steveltn/https-portal:1
    ports:
      - "80:80"
      - "443:443"
    environment:
      DOMAINS: localhost -> http://python:8000
      STAGE: local
  python:
    image: python:alpine
    command: python -m http.server
    working_dir: /
```

これだけで python で立てたサーバーを https 化できました。

`https://localhost` にアクセスすると確認できます。ただし、自己署名証明書なので警告は出ます。

## 公開中の web サイトを https 化

次に公開中の web サイトを https 化してみます。と言っても localhost を https 化した時とだいたい同じで、環境変数を少し書き換えるだけです。なお、Let's Encrypt's から test 用の証明書を発行するので時間がかかります。

`docker-compose.yml`

```yml
environment:
  DOMAINS: YOUR_DOMAIN -> http://python:8000
  STAGE: staging
```

staging で動作確認が出来たら production に変更します。これでブラウザで警告が表示されなくなり、公開中のサイトを https 化できました。

## 注意点

いきなり STAGE を production で動作確認をしていると、Let's Encrypt's のレート制限に引っかかってしまうことがあるらしいです。
