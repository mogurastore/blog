---
pubDate: 2021-12-02
tags: [vscode]
title: SpacemacsライクなVSpaceCodeの紹介
---

[DEPARTURE Advent Calendar 2021 | 2 日目](https://qiita.com/advent-calendar/2021/departure-development)

## 概要

VSpaceCode という vscode の拡張機能が良い感じなので紹介します。

## インストール

この拡張機能をインストールします。

https://marketplace.visualstudio.com/items?itemName=VSpaceCode.vspacecode

インストール後に推奨の設定をマージするかのダイアログが表示されます。

マージした方が便利に使えると思いますが結構な量なのでご注意ください。

## 特徴

### vim ベースの操作感

VSpaceCode をインストールすると vim 拡張機能もインストールされます。

そのため基本的には vim と同じキーバインドを使うことになります。

### space を起点としたキー入力

space を押すと次のキー入力受付が始まります。

![](https://i.imgur.com/gebimkg.png)

大まかに言うと space > ジャンル選択 > 操作と入力していく感じです。

例えば file を保存したい時は下記のように入力します。

space > f > s

キーバインドがかなり豊富で様々な操作にキーバインドが割り当てられています。

多すぎて数えてませんが余裕で 100 個以上は割り当てられていると思います。

それでいて buffer の操作なら b、file の操作なら f、project の操作なら p とキーバインドがジャンル分けされているので、キーバインドが多くても覚えやすくなっています。

### 動かなくなるキーバインドもある

一部デフォルトのキーバインドは動かなくなります。

例えば ctrl + f はデフォルトでは検索ですが、vim だとスクロールなので vim のキーバインドが優先されます。

## リンク

https://vspacecode.github.io/
