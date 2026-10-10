---
pubDate: 2022-07-12
tags: [docker, vscode]
title: 最小限の設定ファイルで devconainer を立ち上げる
---

## 概要

最近気づいたのですが vscode で devcontainer を立ち上げる場合、最低限 image を指定すれば良いみたいです。

ユースケースによってはそれで十分な気がするのでやり方を紹介します。

## 設定の例

`.devcontainer.json` で下記のように image だけ指定します。

```json
{
  "image": "node:lts"
}
```

あとは普通に `Reopen in Container` などして devconainer を立ち上げれば OK です。

port fowarding やファイルのマウントなどは vscode が自動でやってくれるので指定しなくても大丈夫です。

特に npm などパッケージがカレントディレクトリにインストールされるタイプのものは、キャッシュ用の volume なども指定する必要がありません。

node.js オンリー の開発ならこれくらいの `.devcontainer.json` でも使い物になると思います。

## 注意点

複数の container を動かす構成の場合は docker-compose を使って devcontainer を立ち上げたほうが楽かと思います。

また、マウントされるのはカレントディレクトリのみなので、キャッシュ用の volume をマウントしたい場合は指定する必要があります。

その他 working_dir も指定してないので docker exec をする時には注意が必要です。基本的には vscode の terminal を使う運用になるかと思います。
