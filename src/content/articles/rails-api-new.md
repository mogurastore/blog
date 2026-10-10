---
pubDate: 2021-07-22
tags: ["docker", "rails"]
title: rails のプロジェクトをapiモードで作成する
---

## 概要

自分が rails プロジェクトを api モードで作成する時の手順を紹介します。

通常モードで作成する時の手順はこちら。

[rails のプロジェクトを作成する](/articles/rails-new/)

- 開発環境は docker で作る
- データベースは postgresql を使う
- テストは rspec を使う
- rails new -m でなるべくコード化

## docker

Dockerfile と docker-compose.yml はこんな感じです。

- データベースの設定は config/database.yml ではなく DATABASE_URL を使います

`Dockerfile`

```docker
FROM ruby:alpine

RUN apk add --no-cache \
  build-base \
  git \
  postgresql-dev \
  tzdata
```

`docker-compose.yml`

```yaml
version: "3.9"

services:
  app:
    build: .
    command: sh -c "rm -f tmp/pids/server.pid && ./bin/rails s -b 0"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgres://postgres@postgres
      LANG: C.UTF-8
    ports:
      - "3000:3000"
    volumes:
      - .:${PWD}
      - gem-data:/usr/local/bundle
    working_dir: ${PWD}
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

## プロジェクト作成

template.rb を用意します。下記の処理を指定します。

- factory_bot_rails と rspec-rails を追加
- generators の設定
- rspec のインストール
- データベースの作成

`template.rb`

```ruby
gem_group :development, :test do
  gem 'factory_bot_rails'
  gem 'rspec-rails'
end

environment <<-CODE
  config.generators do |g|
    g.routing_specs false
  end
CODE

after_bundle do
  generate 'rspec:install'

  rails_command 'db:create'
  rails_command 'db:create', env: 'test'
end
```

rails をインストールします。

```bash
docker-compose run app gem i rails
```

rails new を実行します。

- カレントディレクトリにプロジェクトを作成します
- rspec を使うので テスト は skip します

```bash
docker-compose run app rails new . -T -d postgresql -m template.rb --api
```

rails server を起動してみます。

```bash
docker-compose up
```

下記の url にアクセスして server が起動しているか確認します。

http://localhost:3000/

まだテストはありませんが動作確認のために rspec を実行してみます。

```bash
docker-compose run app rspec
```

## 参考リンク

https://github.com/rspec/rspec-rails

https://github.com/thoughtbot/factory_bot_rails
