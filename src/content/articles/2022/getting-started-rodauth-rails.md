---
pubDate: 2022-09-15
tags: [ruby, rails]
title: rodauth-rails でログイン機能を実装
---

## 概要

rails でログイン機能を作る際に有名な gem として devise があります。しかし devise は rails7 への対応がまだ途中のようなので他の gem がないか探していました。

そんな時 rodauth-rails という良さげな gem を見つけたので今日はそちらを使ってログイン機能を実装する方法を紹介します。

https://github.com/janko/rodauth-rails

## インストール

まずは bundle add で rodauth-rails を追加します。

```bash
bundle add rodauth-rails
```

なお rodauth-rails はさまざまな認証方法に対応しているので認証方法によっては追加で gem が必要な場合もあります。WebAuthn にも対応しているのはすごいですね。

必要な gem をインストールしたら下記のコマンドを実行して各種ファイルを作成します。

```bash
rails generate rodauth:install
```

migration ファイルも作成されるので rails db migrate を実行します。

```bash
rails db:migrate
```

最後に action_mailer の URL を設定します。

```ruby
# config/environments/development.rb
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

## 認証チェックを設定する

認証チェックはルーティングレベルとコントローラーレベルで設定することができます。

ルーティングレベルで設定する場合

```ruby
# config/routes.rb
Rails.application.routes.draw do
  constraints Rodauth::Rails.authenticated do
    # ... authenticated routes ...
  end
end
```

コントローラーレベルで設定する場合

```ruby
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  private

  def authenticate
    rodauth.require_account
  end
end
```

```ruby
# app/controllers/dashboard_controller.rb
class DashboardController < ApplicationController
  before_action :authenticate
end
```

## layout にリンクを追加

layout ファイルにログイン画面などのリンクを追加します。method を post に指定する部分は turbo 対応の書き方にしています。

```erb
<!-- app/views/layouts/application.html.erb -->
<% if rodauth.logged_in? %>
  <%= link_to "Sign out", rodauth.logout_path, data: { turbo_method: :post } %>
<% else %>
  <%= link_to "Sign in", rodauth.login_path %>
  <%= link_to "Sign up", rodauth.create_account_path %>
<% end %>
```

## アカウント登録をしてみる

早速アカウント作成画面からアカウント登録をしてみます。

アカウント登録後 log を確認してメールアドレスの認証チェックのリンクをクリックします。

rodauth-rails はデフォルトでメールアドレスの認証チェックが有効になっています。

設定された期間内はメールアドレスを認証しなくてもログイン可能ですが、期限を過ぎるとログインができなくなってしまいます。

その場合は認証チェックメール再送画面にメールアドレスを入力すると認証メールが再送されます。

## view のカスタマイズ

view をカスタマイズしたい場合は下記のコマンドを実行して generate された view をカスタマイズします。

```bash
rails generate rodauth:views
```

## ルーティングの確認

rodauth-rails で定義されているルーティングは rails routes では表示されません。

下記のコマンドで確認することができます。

```bash
rails rodauth:routes
```
