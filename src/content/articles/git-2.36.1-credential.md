---
pubDate: 2022-05-16
tags: [git, windows]
title: Git for Windows 2.36.1 で git-credential-manager-core の path が変わった
---

## 概要

以前に wsl と windows で git の認証情報を共有する方法を記事にしました。

[wsl と windows で git の認証情報を共有する](/articles/wsl-git-credential/)

しかし Git for Windows 2.36.1 にバージョンアップしたところ上手く動かなくなったので、修正方法を紹介します。

## 修正

### 2.36.1 以前

```bash
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/libexec/git-core/git-credential-manager-core.exe"
```

### 2.36.1 以降

```bash
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager-core.exe"
```

`libexec/git-core` の部分が `bin` になったみたいです。

## 参考リンク

https://github.com/GitCredentialManager/git-credential-manager/blob/main/docs/wsl.md

https://github.com/GitCredentialManager/git-credential-manager/issues/692
