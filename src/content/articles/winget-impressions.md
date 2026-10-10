---
pubDate: 2022-02-14
tags: [windows]
title: winget の感想や使いこなすためのコツ
---

## 概要

最近 chocolatey から winget へ移行中なので感想や運用のコツなどを書きます。

## 導入が容易

microsoft 謹製なので導入までの手間はかなり少ないです。

microsoft store からアプリインストーラーを更新するだけで使えるようになります。

## アプリの特定が難しい

winget は search や install の際になかなかアプリを特定しにくいです。

source オプションで source を指定したり、名前ではなく ID で指定しないとなかなか特定できないです。

```powershell
## bad
winget install firefox

## good
winget install firefox -s msstore
winget install Mozilla.Firefox
```

## コードにして管理するなら import が便利

winget install ではすでにインストール済みのアプリは再インストールしてしまいます。

winget import ならインストール済みのアプリはスキップしてくれるので、コード化するなら import の方が便利です。

```json
{
  "$schema": "https://aka.ms/winget-packages.schema.2.0.json",
  "CreationDate": "2022-02-01T09:28:04.857-00:00",
  "Sources": [
    {
      "Packages": [
        { "PackageIdentifier": "Docker.DockerDesktop" },
        { "PackageIdentifier": "Git.Git" },
        { "PackageIdentifier": "Microsoft.VisualStudioCode" }
      ],
      "SourceDetails": {
        "Argument": "https://winget.azureedge.net/cache",
        "Identifier": "Microsoft.Winget.Source_8wekyb3d8bbwe",
        "Name": "winget",
        "Type": "Microsoft.PreIndexed.Package"
      }
    }
  ],
  "WinGetVersion": "1.1.13405"
}
```

## import で Store アプリをインストールする

今のところ winget export を実行しても Store アプリは export されません。

ですが、下記のように SourceDetails を指定すると import は可能です。

また、PackageIdentifier を見ても何のアプリか判別不能なので、適当に Comment という key でアプリ名を書いておくと便利です。

```json
{
  "Packages": [{ "PackageIdentifier": "9WZDNCRDK3WP", "Comment": "Slack" }],
  "SourceDetails": {
    "Argument": "https://storeedgefd.dsx.mp.microsoft.com/v9.0",
    "Identifier": "StoreEdgeFD",
    "Name": "msstore",
    "Type": "Microsoft.Rest"
  }
}
```

## 確認ダイアログをスキップする

普通に winget でアプリを install しようとすると確認ダイアログが出てくるので、スキップする方法を紹介します。

1. 管理者権限で terminal を起動する
1. accept-package-agreements オプションを指定する

winget の確認ダイアログは 2 種類あるので一括インストールする時は両方やった方が良いです。

## おわり

winget の感想などを書きました。

まあまあ癖があるなと思いましたが現時点でも便利ですし、今後も改良されていくと思うので期待しています。
