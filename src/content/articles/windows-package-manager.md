---
pubDate: 2022-07-14
tags: [windows, wsl]
title: windows と wsl のパッケージ管理について
---

## 概要

自分が windows のパッケージ管理に使っているパッケージマネージャーを紹介します。なお、windows と wsl で複数のパッケージマネージャーを使い分けているのでちょっと多いです。

## windows 側で使っているもの

### winget

microsoft 謹製なので導入が非常に簡単なのと microsoft store のアプリをインストールできるのが特徴です。store アプリ以外ではいわゆるインストーラーで入れるようなアプリをインストールするのに使っています。ただ、現状はパッケージ数や機能面で物足りなさを感じます。

インストールする主なアプリ

- docker
- git
- powershell
- slack
- vscode

### scoop

scoop は winget に比べて気軽に使えるパッケージマネージャーです。基本的に portable なパッケージを扱っているので環境を汚す心配が少なく、パッケージのインストールの際に権限の昇格を求められることもありません。

インストールする主なアプリ

- gh
- gibo

## wsl 側で使っているもの

### apt

wsl は ubuntu を使っているので基本的なパッケージマネージャーは apt を使っています。後述の homebrew に比べるとインストールが速い印象があります。

インストールする主なアプリ

- ansible
- fzf
- git

### homebrew

apt でインストール出来なかった場合は homebrew を使っています。apt に比べると新しいパッケージが多い印象があります。

インストールする主なアプリ

- gh
- lazydocker
- lazygit

## 以前使っていたもの

### chocolatey

winget 登場前は使っていました。

今でもパッケージ数なら winget より多いと思われますが、今のところ winget で間に合っているので使っていません。
