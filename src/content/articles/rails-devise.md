---
pubDate: 2021-07-19
tags: ["rails"]
title: devise で rails にログイン機能を追加する
---

## 概要

devise という gem を使って rails にログイン機能を追加します。

## プロジェクトを作成

下記の記事の通りにプロジェクトを作成します。

[rails のプロジェクトを作成する](/articles/rails-new/)

## ログイン機能を追加

devise を追加します。

```ruby
docker-compose run app bundle add devise
```

devise の install を実行します。

```bash
docker-compose run app rails g devise:install
```

User モデルを作成します。

```bash
docker-compose run app rails g devise User
```

データベースの migrate を実行します。

```bash
docker-compose run app rails db:migrate
```

ApplicationController に before_action を追加します。

`app/controllers/application_controller.rb`

```ruby
before_action :authenticate_user!
```

rails server を起動します。

```bash
docker-compose up
```

動作確認をしてみます。

下記の url から新規登録ができるようになっていれば OK です。

http://localhost:3000/users/sign_up

## 参考リンク

https://github.com/heartcombo/devise
