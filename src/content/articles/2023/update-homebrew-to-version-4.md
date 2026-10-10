---
pubDate: 2023-03-03
tags: [homebrew]
title: homebrew を version 4 にアップデートしてみました
---

homebrew の version 4 がリリースされたのでアップデートしてみました。

下記のコマンドでアップデートすることができます。

```shell
brew update
```

homebrew 4 ではパッケージ管理まわりで大きな変化がありました。

バージョン 4 以前は homebrew-core の git リポジトリを clone する必要がありましたが、バージョン 4 ではパッケージ情報を JSON で管理するようになったため clone は不要になりました。

homebrew-core は 600MB くらいあるのでセットアップの時間短縮になりますし、ディスク容量の節約にもなります。

バージョン 4 へ移行した後は下記のコマンドで homebrew-core を削除することができます。

```shell
brew untap homebrew/core
```

また、自分は使用していませんが homebrew-cask も untap して大丈夫なようです。

## 参考リンク

https://brew.sh/2023/02/16/homebrew-4.0.0/
