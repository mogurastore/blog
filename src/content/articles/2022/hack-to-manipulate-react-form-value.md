---
pubDate: 2022-12-05
tags: [react]
title: react の form の値を外部から操作するためのハック
---

# 概要

[DEPARTURE Advent Calendar 2022 | 5 日目](https://qiita.com/advent-calendar/2022/departure-development)

最近 NovelAI の prompt を並び替え・強調するための chrome 拡張を作りました。

NovelAI は react で実装されているようなので、単純に `input.value = 'foo'` のように値を書き換えても上手く動作しません。

この問題を解消するために react の form の値を外部から操作する方法を調べたので紹介します。

# 実装

実装はこんな感じになります。

内部 API をゴニョゴニョする感じであまり嬉しくはありませんが、参考リンクにある中で一番わかりやすかったのでこれで良しとします。

```typescript
const dom = document.querySelector<HTMLInputElement>("#prompt-input-0");

if (dom) {
  dom.value = "foo";
  // @ts-expect-error NOTE: clear the interal value to force an actual change
  dom._valueTracker?.setValue("");
  dom.dispatchEvent(new Event("input", { bubbles: true }));
}
```

# 参考リンク

https://github.com/facebook/react/issues/11488

https://github.com/mogurastore/novelai-support
