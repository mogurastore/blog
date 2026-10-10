---
pubDate: 2021-07-12
tags: [openapi, ruby]
title: committee-rails と rspec で api をテストする
---

## 概要

api をドキュメント化する際の選択肢として openapi があります。

committee-rails を使うと、実装した api が openapi で定義した通りかテストするのに便利です。

https://github.com/willnet/committee-rails

## openapi.yaml を書く

message を返すだけの単純な api を定義します。

`openapi.yaml`

```yaml
openapi: 3.0.1
info:
  version: "1.0.0"
  title: "Example"
paths:
  /ping:
    get:
      responses:
        "200":
          description: "successful operation"
          content:
            application/json:
              schema:
                type: object
                required:
                  - message
                properties:
                  message:
                    type: string
```

コントローラーはこんな感じです。

```ruby
class PingsController < ApplicationController
  def show
    render json: { message: 'pong' }
  end
end
```

## インストール

test group で committee-rails をインストールします。

```bash
bundle add committee-rails -g test
```

rails_helper.rb の RSpec.configure の中に下記の設定を追加します。

`spec/rails_helper.rb`

```ruby
config.include Committee::Rails::Test::Methods
config.add_setting :committee_options
config.committee_options = {
  schema_path: Rails.root.join('openapi.yaml').to_s,
  query_hash_key: 'rack.request.query_hash',
  parse_response_by_content_type: false
}
```

## テストを書く

request spec に schema のテストを追加します。

assert_response_schema_confirm で指定した status code の schema と一致するかをテストできます。

```ruby
require 'rails_helper'

RSpec.describe 'Pings', type: :request do
  describe 'GET /index' do
    it do
      get url_for(%i[ping])
      assert_response_schema_confirm(200)
    end
  end
end
```

## 動作確認

動作確認をしてみます。

```ruby
rspec
```

無事にテストが通ったらコントローラーや openapi.yaml を変えてみてテストが落ちるかを確認します。

## 注意点

openapi.yaml に書かれていない properties をコントローラーで返してもテストは通ります。

```ruby
# これでもテストは通る
render json: { message: 'pong', foo: 1 }
```

また、required で指定していない properties はコントローラーで返さなくてもテストは通ります。

## 感想

少ない手間でレスポンスをテストできるので便利そうでした。

ただし注意点で書いた通り、ある程度保証されるくらいで考えた方がよさそうです。

完全に一致するか確かめたい api がある場合は、個別にテストを書いた方が良さそうでした。
