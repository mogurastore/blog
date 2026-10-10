---
pubDate: 2023-01-30
tags: [docker, rails]
title: rails の system test を docker で動かす
---

# 概要

rails の system test は chrome などのブラウザが必要なので、docker で動かすにはひと手間必要です。

selenium が公開している image を使うと Dockerfile で chrome のインストールなどをせずとも system test を動かすことができます。

# docker-compose.yml

こんな感じになります。

selenium の ports は指定しなくてもテスト自体は動きますが、テストの様子をブラウザで閲覧したいので指定しています。

```yaml
services:
  rails:
    image: ruby
    command: sh -c "rm -f tmp/pids/server.pid && ./bin/rails s"
    depends_on:
      - selenium
    environment:
      BINDING: 0.0.0.0
      LANG: C.UTF-8
    ports:
      - "3000:3000"
    tty: true
    volumes:
      - .:/workspace
      - gem-data:/usr/local/bundle
    working_dir: /workspace
  selenium:
    image: selenium/standalone-chrome
    ports:
      - "7900:7900"

volumes:
  gem-data:
```

# Gemfile

Gemfile から webdrivers を削除します。

webdrivers を require していると、インストールされている chrome を探すのでエラーになってしまいます。

今回は remote の selenium と連携する方針なので webdrivers は不要です。

```diff
- gem "webdrivers"
```

# test/application_system_test_case.rb

selenium を使うための設定を追加します。

url の host は docker-compose.yml の service 名です。

Capybara.server_host はデフォルトだと 127.0.0.1 ですが、それだと接続が上手くいきません。

環境変数 HOSTNAME の値を指定してあげると上手く接続できるようになります。

```ruby
driven_by :selenium, using: :chrome, screen_size: [1400, 1400], options: {
  browser: :remote,
  url: 'http://selenium:4444'
}

Capybara.server_host = ENV.fetch('HOSTNAME')
```
