---
pubDate: 2022-09-17
tags: [ruby]
title: vcr で rspec の外部 api 呼び出しをキャッシュする
---

# 概要

外部 api に依存したコードのテストを書く場合、毎回 api を呼び出すのは避けたいです。

そんな時は api 呼び出しを stub にするのが回避策としてありますが vcr を使うと一度呼び出した api を自動的に stub にしてくれて便利です。

https://github.com/vcr/vcr

# インストール

bundle add で vcr と webmock をインストールします。

```bash
bundle add -g test vcr webmock
```

vcr の設定を追加します。

```ruby
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = "spec/fixtures/vcr_cassettes"
  config.hook_into :webmock
end
```

# テストを書く

vcr をインストールしたらテストを書いてみます。

こんな感じで use_cassette に block を渡します。

```ruby
it 'calls the api' do
  VCR.use_cassette("todo1") do
    body = URI.parse("https://jsonplaceholder.typicode.com/todos/1").read
    data = JSON.parse(body)

    expect(data['userId']).to eq 1
  end
end
```

テストを実行すると api が呼び出され、その内容がファイルに保存されます。

次回以降はこちらのファイルを使って api の呼び出しを stub してくれるようになります。
