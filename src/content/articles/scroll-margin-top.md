---
pubDate: 2021-06-26
tags: [css]
title: scroll-margin-topで固定ヘッダーに被るのを防ぐ
---

## 概要

https://www.youtube.com/watch?v=HE0xnb0E4B0

fixed や sticky などで作った固定ヘッダーがある場合、ページ内リンクへ飛んだ際にコンテンツと被ってしまいます。これを解決する方法を紹介します。

## 解決方法

css の scroll-margin-top を使います。scroll-margin-top を使うとスクロールに margin を追加する、みたいなことができるようになります。

イメージとしてはこんな感じになります。

```css
header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100px;
}

.anchor-item {
  scroll-margin-top: 100px;
}
```

固定ヘッダーの高さが 100px です。scroll-margin-top のおかげでページ内リンクへ飛んだ際に 100px 分多めにスクロールするので、ヘッダーと被らずコンテンツが表示されます。

## 対応ブラウザ

scroll-margin-top は IE には対応していません。
IE に対応するなら別の方法をとる必要があります。
