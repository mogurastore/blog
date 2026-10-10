---
pubDate: 2021-07-21
tags: ["docker", "rails"]
title: rails のプロジェクトを作成する
---

## 概要

自分が rails プロジェクトを作成する時の手順を紹介します。

api モードで作成する時の手順はこちら。

[rails のプロジェクトを api モードで作成する](/articles/rails-api-new/)

- 開発環境は docker で作る
- データベースは postgresql を使う
- テストは rspec を使う
- rails new -m でなるべくコード化

## docker

Dockerfile と docker-compose.yml はこんな感じです。

- webpacker 用の service は無くても動きますが高速化に繋がります
- データベースの設定は config/database.yml ではなく DATABASE_URL を使います

`Dockerfile`

```docker
FROM ruby:alpine

RUN apk add --no-cache \
  build-base \
  git \
  postgresql-dev \
  tzdata \
  yarn
```

`docker-compose.yml`

```yaml
version: "3.9"

x-base: &base
  build: .
  volumes:
    - .:${PWD}
    - gem-data:/usr/local/bundle
    - yarn-data:/usr/local/share/.cache/yarn
  working_dir: ${PWD}

services:
  app:
    <<: *base
    command: sh -c "rm -f tmp/pids/server.pid && ./bin/rails s -b 0"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgres://postgres@postgres
      LANG: C.UTF-8
      WEBPACKER_DEV_SERVER_HOST: webpacker
    ports:
      - "3000:3000"
  webpacker:
    <<: *base
    command: ./bin/webpack-dev-server
    environment:
      WEBPACKER_DEV_SERVER_HMR: "true"
      WEBPACKER_DEV_SERVER_HOST: 0.0.0.0
    ports:
      - "3035:3035"
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
  yarn-data:
```

## プロジェクト作成

template.rb を用意します。下記の処理を指定します。

- factory_bot_rails と rspec-rails を追加
- generators の設定
- web-console の設定
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
    g.assets false
    g.helper false
    g.jbuilder false
    g.routing_specs false
    g.view_specs false
  end
CODE

environment "config.web_console.permissions = '0.0.0.0/0'", env: 'development'

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
docker-compose run app rails new . -T -d postgresql -m template.rb
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
