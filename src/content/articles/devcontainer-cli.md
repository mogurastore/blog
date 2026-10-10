---
pubDate: 2022-04-18
tags: [docker vscode]
title: devcontainer cli が便利だったので紹介します
---

## 概要

vscode の remote container を terminal から直接開く devcontainer cli を試しました。

普通に vscode でディレクトリを開いてから reopen in container するのと大して変わらないかと持っていたのですが、実際試したみたら意外と便利だったので導入方法などを紹介します。

## 拡張機能をインストール

まずは拡張機能の remote-containers をインストールします。

https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers

## devcontainer cli をインストール

vscode のコマンドパレットで下記のコマンドを実行します。

`Remote-Containers: Install devcontainer CLI`

## 動作確認

動作確認用に docker-compose.yml を用意します。

```yaml
services:
  app:
    image: alpine
    volumes:
      - .:/workspace
    working_dir: /workspace
```

動作確認用に .devcontainer.json を用意します。

```json
{
  "name": "app",
  "dockerComposeFile": ["docker-compose.yml"],
  "service": "app",
  "workspaceFolder": "/workspace"
}
```

準備ができたので devcontainer open を実行します。

```bash
devcontainer open
```

open はディレクトリを指定することもできます。指定しない場合はカレントディレクトリで実行されます。

これで terminal から直接 devcontainer を起動できるようになりました。

## 参考リンク

https://code.visualstudio.com/docs/remote/devcontainer-cli
