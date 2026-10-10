---
pubDate: 2021-07-20
tags: ["rails"]
title: rails に ActionText を導入する
---

## プロジェクトを作成

下記の記事の通りにプロジェクトを作成します。

[rails のプロジェクトを作成する](/articles/rails-new/)

## scaffold でひな形を作成

scaffold でひな形を作成します。

モデル名は article で、カラムは title だけにします。

```shell
docker-compose run app rails g scaffold article title
```

migrate を実行します。

```shell
docker-compose run app rails db:migrate
```

## ActionText のインストール

ActionText をインストールします。

```bash
docker-compose run app rails action_text:install
```

データベースの migrate を実行します。

```bash
docker-compose run app rails db:migrate
```

モデルに has_rich_text を追加します。content という名前で記事本文を保存するようにします。

`app/models/article.rb`

```ruby
has_rich_text :content
```

article_params の permit に :content を追加します。

`app/controllers/articles_controller.rb`

```ruby
def article_params
  params.require(:article).permit(:title, :content)
end
```

form に rich_text_area を追加します。

`app/views/articles/_form.html.erb`

```erb
<div class="field">
  <%= form.label :content %>
  <%= form.rich_text_area :content %>
</div>
```

記事詳細に content の表示を追加します。

`app/views/articles/show.html.erb`

```erb
<%= @article.content %>
```

下記の url にアクセスして動作確認をしてみます。

http://localhost:3000/articles

## 画像を表示できるようにする

ActionText には画像投稿機能がありますが、リサイズに必要なライブラリがインストールされていないと表示されません。

画像のリサイズをやめるとライブラリをインストールしなくても画像は表示されます。

`app/views/active_storage/blobs/_blob.html.erb`

```diff
-  <% if blob.representable? %>
-    <%= image_tag blob.representation(resize_to_limit: local_assigns[:in_gallery] ? [ 800, 600 ] : [ 1024, 768 ]) %>
-  <% end %>
+  <%= image_tag blob %>
```
