---
pubDate: 2026-03-08
tags: [git, jj]
title: gitからjjに移行して驚いたこと
---

最近jjを試してかなり気に入ったのでなるべくgitのコマンドは使わずjjのコマンドを使うようにしています。

しかしながらかなり面食らった違いもあったので今回はそれらを紹介します。

## diffで確認すると差分があるのにすでにcommit済み

最初は誤解してたのですがjj diffで差分が出ても、それはすでにcommitされてるという設計みたいです。

jj diffでもgit diffしても差分があると表示されますが、とにかくこれはすでにcommitが完了しているのです。

当然commitが完了しているのでpushしたらリモートに送られます。

気付く前は毎回jj commitコマンドを使っちゃってたのですが、いちいち一つ前のcommitを指定してbookmark（gitで言うbranch）を作ったりしてなんか不便だなと思ってました。

実際はこの差分がある状態でcommit messageを書いてpushするのが正解っぽいです。

## ファイルを保存しただけでamend

jjではファイルを保存したらgitで言うところのcommit --amendが自動で実行され最新のcommitが更新されます。

ちなみに.envファイルなんかも作成した瞬間にcommitされるので、ファイル作成前に.gitignoreに指定する癖をつけた方が良さそうです。

## デフォルトでforce push

jjではforceオプションを付けなくてもデフォルトでforce pushになります。（厳密に言うとforce-with-leaseの方が近いっぽい）

最新のcommitをカジュアルに書き換える設計なのでまあそうなるかという仕様ではありますが、あまりforce pushは使わない派だったのでデフォルトがforce pushなのはカルチャーショックでした。

実はgithubだとforce pushした時も差分見れるみたいだしもっとforce pushしてもいいのかもと思いました。

## fetchしただけでpullされる

gitだとfetchしただけではリモートの変更はローカルのbranchに反映されませんがjjだと反映されます。

なので同じfetchというコマンド名になっていますがpullと近い挙動だと思いました。

一気に全てのbookmarkが更新されるのも便利だと思いつつ驚きです。

## jj git pushと入力した時の動き

オプションを付けずにjj git pushすると、以下の条件に一致する全てのbookmarkがpushされます。

- リモートとtrackされている
- リモートよりローカルの方が進んでいる

mainがリモートより進むのはあまりないと思いますが、うっかりmainが進んだ状態なのを忘れてjj git pushとかすると大惨事になりそうです。

対応策としてはbookmarkオプションを使い明示的にどのbookmarkをpushするか書く、もしくはdry-runオプションを使い意図してないbookmarkはpushされないのを確認してからjj git pushするなどがあります。

mainには絶対に直接pushしないと決めてるならjjやgithubの設定で保護するのも有効だと思います。
