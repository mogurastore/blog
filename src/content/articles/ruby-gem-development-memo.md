---
pubDate: 2022-04-13
tags: [ruby]
title: ruby の gem を開発する時のメモ
---

## 概要

最近、gem を開発してみて得た知見などをメモとして残しておきます。

## gem の名前が被っていないか調べる

開発前に gem の名前が被っていないか調べます。

完全一致で検索するには exact オプションを使います。

```bash
gem search -e NAME
```

## bundler で gem の雛形を作る

下記のコマンドを使うと bundler で gem の雛形を作ることができます。

```bash
bundle gem NAME
```

bundle config に設定が無い場合は test に何を使うかなどの質問がされます。

一度答えると次回からは同じ設定が引き継がれます。

オプションで直接指定も可能です。

## 実行ファイル付きで gem の雛形を作る

CLI を作る時は exe (bin) オプションを使うと実行ファイルの作成なども行ってくれます。

```bash
bundle gem NAME -b
```

## irb で試す

./bin/console を使うと開発中の gem を require した状態で irb を立ち上げることができます。

```bash
./bin/console
```

## gem を install する

rake install で gem を install することができます。

なお、bundler で作った雛形は git 管理下のファイルのみ install 対象になるので注意。

```bash
rake install
```

## gem を release する

rake release コマンドを使うと以下のことをしてくれます。

- git の tag を作成
- git push
- gem の build
- gem の push
