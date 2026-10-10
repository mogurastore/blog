---
pubDate: 2021-10-11
tags: [docker, github]
title: github actions で github container registry に push する
---

## 概要

github actions から github container registry へ docker の image を push する方法を紹介します。

## リポジトリを作成

github で リポジトリを作成します。

## Dockerfile を用意

Dockerfile を用意します。

サンプルとして echo コマンドを実行するだけの Dockerfile を用意しました。

```dockerfile
FROM busybox

CMD ["echo", "1"]
```

## github actions の設定

github actions の workflow を追加します。

Actions タブから追加するのが楽です。

Dockerfile があると Publish Docker Container の workflow が Suggest されます。

workflow の yaml を作成して commit されると docker image の push が始まります。

## git の tag と連動して docker image を push するようにする

git の tag と連動して docker image も tag をつけるように変更してみます。

git の tag が v1.0.0 なら、docker の tag は 1.0.0 になるといった感じです。

まず trigger を tags だけにします。

```yaml
on:
  push:
    tags: ["v*.*.*"]
```

meta step の with に tags を追加します。

{% raw %}

```yaml
with:
  images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
  tags: |
    type=semver,pattern={{ version }}
```

{% endraw %}

これで OK です。

## 参考リンク

https://github.com/docker/build-push-action

https://github.com/docker/metadata-action
