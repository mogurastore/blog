---
pubDate: 2021-07-31
tags: [rails]
title: rails に rack-cors を導入する
---

## 概要

rails に rack-cors を導入して外部サイトからアクセスできるようにしてみます。

## プロジェクトを作成

今回は外部からアクセスする api を作る想定です。下記の記事の通りにプロジェクトを作成します。

[rails のプロジェクトを api モードで作成する](/articles/rails-api-new/)

## 動作確認用の url を用意

先に動作確認用の url を設定しておきます。メッセージを返すだけの単純な api です。

コントローラーを作成します。

```bash
docker-compose run app rails g controller pings
```

ルーティングを設定します。

`config/routes.rb`

```ruby
root 'pings#show'
```

コントローラーに show メソッドを追加します。

`app/controllers/pings_controller.rb`

```ruby
def show
  render json: 'pong'
end
```

## rack-cors を追加

rack-cors を追加します。

```bash
docker-compose run app bundle add rack-cors
```

initializers の cors.rb に設定を追加します。

`config/initializers/cors.rb`

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :patch, :put]
  end
end
```

## 動作確認

rails server を起動します。

```bash
docker-compose up
```

rails server は下記のアドレスになります。このアドレス以外から rails server にアクセスできることを確認します。

http://localhost:3000

手っ取り早いのはブラウザで適当なサイトを開いて確認することです。

developer tools で下記のような js を実行して上手く通信できれば成功です。

```js
fetch("http://localhost:3000");
```

## 参考リンク

https://github.com/cyu/rack-cors
