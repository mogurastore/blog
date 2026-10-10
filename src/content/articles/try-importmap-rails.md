---
pubDate: 2021-08-28
tags: [rails]
title: importmap-rails を試してみました
---

## 概要

rails7 から webpacker に代わり importmap-rails がデフォルトになるようです。

今回は rails6 で importmap-rails を試してみました。

## docker で開発環境を用意

docker で開発環境を作ります。

yarn は必要ないので image は普通の ruby を指定します。

`docker-compose.yml`

```yaml
version: "3.7"

services:
  rails:
    image: ruby
    command: rails s -b 0
    ports:
      - "3000:3000"
    volumes:
      - .:/workspace
      - gem-data:/usr/local/bundle
    working_dir: /workspace

volumes:
  gem-data:
```

rails を install します。

```bash
docker-compose run rails gem i rails
```

## プロジェクト作成

rails new でプロジェクトを作成します。

rails6 では webpacker がデフォルトなので J オプションでスキップします。

```bash
docker-compose run rails rails new . -J
```

## importmap-rails をインストール

importmap-rails を bundle add します。

```bash
docker-compose run rails bundle add importmap-rails
```

importmap-rails の設定ファイルなどを生成します。

```bash
docker-compose run rails rails importmap:install
```

## @rails/ujs を読み込んでみる

@rails/ujs を読み込むように設定します。

```bash
docker-compose run rails ./bin/importmap pin @rails/ujs
```

@rails/ujs を起動します。

`app/javascript/application.js`

```javascript
import Rails from "@rails/ujs";

Rails.start();
```

## 動作確認

動作確認をしてみます。

scaffold で todo アプリを作成します。

```bash
docker-compose run rails rails g scaffold todo name
```

db:migrate を実行します。

```bash
docker-compose run rails rails db:migrate
```

開発用サーバーを起動します。

```bash
docker-compose up
```

下記の url をブラウザで開きます。

http://localhost:3000/todos

todo の削除時に confirm が表示された場合は@rails/ujs が動作しています。

## 参考リンク

https://github.com/rails/importmap-rails

[Modern web apps without JavaScript bundling or transpiling](https://world.hey.com/dhh/modern-web-apps-without-javascript-bundling-or-transpiling-a20f2755)
