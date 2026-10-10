---
pubDate: 2021-08-12
tags: [git, windows]
title: wsl と windows で git の認証情報を共有する
---

## 概要

wsl の git でパスワードを入力しなくても済むように、windows 側と認証情報を共有する方法を紹介します。

## 前提条件

- wsl と windows に git はインストール済み
- windows 側は git 認証済み

## 方法

wsl でこちらのコマンドを実行すれば ok です。

```bash
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager-core.exe"
```

credential helper に windows 側の git-credential-manager-core を指定することで、git の認証情報を共有出来るようになります。

## 参考

https://github.com/GitCredentialManager/git-credential-manager/blob/main/docs/wsl.md
