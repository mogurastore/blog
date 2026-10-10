---
pubDate: 2021-11-03
tags: [docker, golang]
title: docker で go の開発環境を作る
---

## 概要

docker で go の開発環境を作ってみます。

## docker-compose.yml

image は golang を使います。

普段は開発環境なら結構 alpine を使う派なのですが、golang:alpine は非常に実験的で公式でもサポートしてないようなので使わないことにしました。

golang の image では GOPATH が /go に設定されています。なので /go を volumes に指定してパッケージがキャッシュされるようにしてます。

working_dir は /go/src 配下がいいのかと思いましたが、今はどこでも良くなったっぽいので /workspace にしてます。

最低限の構成としてはこんな感じになります。

```yaml
version: "3.9"

services:
  app:
    image: golang
    volumes:
      - .:/workspace
      - go-data:/go
    working_dir: /workspace
volumes:
  go-data:
```

## hello world

go mod init で go.mod ファイルを作成します。

```bash
docker-compose run app go mod init example/hello
```

main.go に hello world のコードを書きます。

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

go run で実行してみます。

```bash
docker-compose run app go run .
```

## 外部パッケージを使用

外部パッケージを使用してみます。

main.go を変更します。

```go
package main

import "fmt"

import "rsc.io/quote"

func main() {
    fmt.Println(quote.Go())
}
```

go mod tidy を実行します。

```bash
docker-compose run app go mod tidy
```

go run で実行してみます。

```bash
docker-compose run app go run .
```

## 参考

[https://hub.docker.com/\_/golang](https://hub.docker.com/_/golang)

https://golang.org/doc/tutorial/getting-started
