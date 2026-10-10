---
pubDate: 2022-09-02
tags: [ruby]
title: ruby の ractor を試してみた
---

## 概要

ruby 3.0 で導入された ractor を試してみました。気軽に並列処理を書くための仕組みらしいです。

## 注意点

ruby 3.1 では ractor はまだ実験的機能です。

## benchmark

1 秒かかる task を 5 回繰り返し、結果を取得するサンプルコードです。

ractor を使った場合は 1 秒、使わなかった場合は 5 秒かかっています。

```ruby
require 'benchmark'

Warning[:experimental] = false

def task
  sleep 1

  'result'
end


def r = Ractor.new { task }

Benchmark.bm do |x|
  x.report { 5.times.map { r }.each(&:take) }
  x.report { 5.times.each { task } }
end

# 結果
#     user     system      total        real
# 0.003882   0.000000   0.003882 (  1.003568)
# 0.000615   0.000000   0.000615 (  5.006763)
```

## 感想

まだ実験段階の機能らしいので実践投入は難しそうなのと、それ以外にも ractor を使った場合の制約やメモリの話など使いこなすのは難しそうでした。

とは言え使ってみること自体は簡単そうなので、何かスクリプトあたりから試してみたいと思います。
