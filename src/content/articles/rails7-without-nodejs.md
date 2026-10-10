---
pubDate: 2022-03-26
tags: [docker, rails]
title: rails7 で node.js への依存が減ったので環境構築を見直した
---

## 概要

rails7 からデフォルトでは node.js へ依存しなくなったので docker での環境構築を見直してみました。

なお、旧版の環境構築はこちら。

[rails のプロジェクトを作成する](/articles/rails-new/)

## Dockerfile

前述の通りデフォルトでは node.js へ依存しなくなったので削除しました。

## compose.yaml

compose.yaml はこんな感じです。

ちなみに docker-compose の v2 から docker-compose.yml よりも compose.yaml というファイルが優先されるそうです。

`compose.yaml`

```yaml
services:
  rails:
    image: ruby
    command: sh -c "rm -f tmp/pids/server.pid && ./bin/rails s"
    depends_on:
      - postgres
    environment:
      BINDING: 0.0.0.0
      DATABASE_URL: postgres://postgres@postgres
      LANG: C.UTF-8
    ports:
      - "3000:3000"
    tty: true
    volumes:
      - .:/workspace
      - gem-data:/usr/local/bundle
    working_dir: /workspace
  postgres:
    image: postgres:alpine
    environment:
      POSTGRES_HOST_AUTH_METHOD: trust
    ports:
      - "5432:5432"
    volumes:
      - pg-data:/var/lib/postgresql/data

volumes:
  gem-data:
  pg-data:
```

webpacker はデフォルトではなくなったので設定を削除しました。

また、環境変数の BINDING 設定するようにしました。こうすると Procfile.dev が作成される場合でも command を変更するだけで良いので便利です。

## プロジェクト作成

プロジェクトを作成します。

旧版では template を使って色々やっていましたが今回は割愛します。

rails をインストールします。

```bash
docker compose run rails gem i rails
```

rails new を実行します。

```bash
docker compose run rails rails new . -d postgresql
```

database を作成します。

```bash
docker compose run rails rails db:create
docker compose run -e RAILS_ENV=test rails rails db:create
```

development と test の database を作成するので 2 回コマンドを実行しています。

環境変数で database の設定する場合は compose.yaml で完結するのがメリットですが database の作成の時だけはちょっと面倒です。

rails server を起動してみます。

```bash
docker compose up
```

下記の url にアクセスして server が起動しているか確認します。

http://localhost:3000/

## 感想

デフォルトで node.js に依存しなくなったので環境構築が楽になりました。

また sassc-rails もデフォルトから外れたようで、インストールが速くなったのも地味にうれしいです。
