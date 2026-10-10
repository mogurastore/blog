---
pubDate: 2021-08-27
tags: [react]
title: node.js を使わずに react を使ってみる
---

## 概要

node.js や npm などを使わずに react アプリケーションを書く方法を試してみました。

## html を用意

index.html を用意します。

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
```

index.js を module として読み込みます。

```html
<script type="module" src="index.js"></script>
```

root となる div を定義しておきます。

```html
<div id="root"></div>
```

## パッケージ読み込み

esm.sh からパッケージを読み込みます。

- htm
- react-dom

htm は jsx の代替のテンプレートです。ビルドを行わなくても使うことができます。

```javascript
import { html } from "https://esm.sh/htm/react";
import { render } from "https://esm.sh/react-dom";
```

## hello world

とりあえず hello world と表示してみます。

```javascript
const App = () => {
  return html`
    <div>
      <h3>hello world</h3>
    </div>
  `;
};

render(html`<${App} />`, document.querySelector("#root"));
```

## useState を使ってみる

useState で state の管理をしてみます。

esm.sh からパッケージを読み込みます。

```javascript
import { useState } from "https://esm.sh/react";
```

例としてカウンターを作ってみます。

```javascript
const App = () => {
  const [counter, setCounter] = useState(0);

  const inc = () => {
    setCounter((i) => i + 1);
  };

  return html`
    <div>
      <button onClick=${inc}>${counter}</button>
    </div>
  `;
};
```

## 参考リンク

[JavaScript モジュール - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)

https://esm.sh

https://github.com/developit/htm
