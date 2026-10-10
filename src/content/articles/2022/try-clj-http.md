---
pubDate: 2022-09-16
tags: [clojure]
title: clj-http で api を叩いてみた
---

# 概要

久しぶりに http-kit を使って api を叩こうとしたのですが ssl 関連でエラーがでました。

そこで、別のライブラリを探したところ clj-http というライブラリを見つけたのでそちらを使って api を叩くやり方を紹介します。

https://github.com/dakrone/clj-http

# インストール

依存関係に clj-http と cheshire を追加します。cheshire は json を parse するのに使います。

```clojure
;; deps.edn
{:deps
 {cheshire/cheshire {:mvn/version "5.11.0"}
  clj-http/clj-http {:mvn/version "3.12.3"}}}
```

# サンプル

{:as :json} を指定すると json が自動的に parse されます。cheshire が依存関係に必要なので注意してください。

```clojure
;; src/hello.clj
(ns hello
  (:require [clj-http.client :as client]))

(defn run [opts]
  (-> (client/get "https://jsonplaceholder.typicode.com/todos/1" {:as :json})
      :body
      (prn)))
```

# 実行

下記のコマンドで実行してみます。すると、api を叩いた結果が表示されます。

```bash
clj -X hello/run
```
