---
pubDate: 2023-02-12
tags: [cypress, docker]
title: cypress の factory image を紹介
---

## 概要

cypress でテストを行う場合、cypress 自体のバージョン以外に node やブラウザのバージョンも関係してきます。

cypress/factory image を使うと docker の ARG を使ってそれらのバージョンを制御することができます。

## 使い方

ARG でバージョンを指定するサンプルです。

```dockerfile
ARG NODE_VERSION='18.12.1'
ARG CYPRESS_VERSION='12.5.1'

FROM cypress/factory
```

使用可能な ARG は下記のとおりです。

- NODE_VERSION
- YARN_VERSION
- CYPRESS_VERSION
- CHROME_VERSION
- FIREFOX_VERSION
- EDGE_VERSION

ARG を指定しない場合はインストール自体がスキップされますが、NODE_VERSION のみデフォルトのバージョンがインストールされます。

なお、chrome などのブラウザをインストールしなくても electron で cypress を動かすことはできます。

## リンク

https://hub.docker.com/r/cypress/factory
