---
pubDate: 2021-06-24
tags: [angular, tailwind]
title: angularにtailwind cssを導入する
---

## 概要

https://www.youtube.com/watch?v=c5dXbn-fJKY

angular の 11.2 から tailwind css の導入が楽になったようなので試してみました。

## jit と非 jit 共通でやること

tailwindcss をインストールします。

```bash
npm i -D tailwindcss
```

tailwind.config.js を作成します。

```bash
npx tailwind init
```

style.css で tailwindcss を import します。

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

## jit で導入

tailwind.config.js の mode と purge を設定します。

```js
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{html,ts}"],
  // 以下、初期設定なので省略
};
```

## 非 jit で導入

tailwind.config.js の purge を設定します。

angular が環境変数 TAILWIND_MODE をセットしてくれるので、それをチェックして purge するかどうかを判定します。

```js
module.exports = {
  purge: {
    enabled: process.env.TAILWIND_MODE === "build",
    content: ["./src/**/*.{html,ts}"],
  },
  // 以下、初期設定なので省略
};
```

## 感想

楽でした。今後は積極的に使おうと思います。
