---
pubDate: 2022-04-17
tags: [ruby, vscode]
title: vscode と steep を連携させて ruby の型検査などをしてみる
---

## 概要

vscode と steep を連携させてみたので導入手順や感想などを書きます。

steep は型検査をしてくれる gem です。

LSP の機能もあるので入力補完などもしてくれます。

## 導入手順

### steep-vscode のインストール

まず vscode の拡張機能 steep-vscode をインストールします。

https://marketplace.visualstudio.com/items?itemName=soutaro.steep-vscode

### steep のインストール

steep-vscode は bundle exec で steep を動かすらしいので Gemfile を用意して steep を追加します。

```bash
bundle init
bundle add steep
```

### Steepfile の作成

Steepfile も必要なので用意します。

```bash
bundle exec steep init
```

今回は Steepfile の中身をこんな感じにします。

check はディレクトリ単位でも指定できますが今回は最小限に app.rb だけチェックします。

```ruby
target :app do
  signature 'sig'

  check 'app.rb'
end
```

### ruby のコードを書く

app.rb というファイルを作り適当にコードを書きます。

```ruby
class N
  def one
    1
  end
end
```

### rbs ファイルの作成

typeprof で rbs ファイルを生成します。

typeprof は ruby の型解析を行ってくれる gem です。

ruby 3.0 から ruby 本体に同梱されるようになったらしいです。

```bash
mkdir sig
typeprof app.rb -o sig/app.rbs
```

生成された app.rbs の中身はこんな感じです。

```ruby
# TypeProf 0.21.2

# Classes
class N
  def one: -> Integer
end
```

### 動作確認

app.rb を書き換えてみます。

```ruby
class N
  def one
    1.to_s
  end
end
```

入力補完や型検査が動作しています。

#### 入力補完

![](https://i.imgur.com/eD4SSgl.png)

#### 型検査

![](https://i.imgur.com/UxG8E36.png)

## 感想

とりあえず始めるだけなら思ったより簡単でした。

bundle gem をした時の雛形にも rbs ファイルが含まれるようになったみたいですし、今後 rbs ファイル付きの gem がリリースされていけば便利になりそうです。

ただ、今のところ rails プロジェクトに導入しようとすると結構頑張る必要がありそうでした。

あと、定義元にジャンプしようとすると ruby のコードではなく rbs の方にジャンプするようになっているみたいです。

他には rbs ファイルを更新しても vscode 上で反映されないのも気になっています。もしかしたら remote container で試したせいかもしれないです。現状はコマンドパレットで steep を restart して対処しています。

また steep の他に solargraph も rbs に対応する予定らしいのでそちらも気になっています。
