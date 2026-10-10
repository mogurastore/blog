---
pubDate: 2021-06-19
tags: [docker, firebase]
title: docker で firebase emulator を起動する
---

## Dockerfile

node と java が必要。

```dockerfile
FROM node:lts-alpine

RUN apk add --no-cache openjdk11-jre-headless
```

## docker-compose.yml

- command で import, export のオプションを付けないとデータが残らないので注意
- ports は UI, firestore, auth を使う例
- volumes で firebase login の認証情報や emulator の jar が cache されるようにする

```yaml
version: "3.7"

services:
  firebase:
    build: .
    command: npx firebase emulators:start --export-on-exit .firebase --import .firebase
    ports:
      - "4000:4000"
      - "8080:8080"
      - "9099:9099"
    volumes:
      - .:/workspace
      - ~/.cache/firebase:/root/.cache/firebase
      - ~/.config/configstore:/root/.config/configstore
    working_dir: /workspace
```

## firebase-tools をインストール

```bash
docker-compose run firebase npm init -y
docker-compose run firebase npm i -D firebase-tools
```

## firebase login と init

```bash
docker-compose run firebase npx firebase login --no-localhost
docker-compose run firebase npx firebase init
```

## firebase.json

host を 0.0.0.0 にする。

```json
"emulators": {
  "auth": {
    "host": "0.0.0.0",
    "port": 9099
  },
  "ui": {
    "enabled": true,
    "host": "0.0.0.0",
    "port": 4000
  },
  "firestore": {
    "host": "0.0.0.0",
    "port": 8080
  }
}
```

## 課題

firestore の emulator を立ち上げながら functions の shell を動かすみたいな込み入ったことをやろうとすると謎の挙動が起きる。

あまり複雑なことをするのは想定されていないのかもしれない。
