---
pubDate: 2021-08-13
tags: [docker, windows, wsl]
title: windows で開発環境を整える
---

## 概要

自分が windows で開発環境を構築する時の手順を紹介します。

## windows update

まずは設定から windows update を実行します。

その後、再起動。

## Microsoft Store

Microsoft Store からアプリをインストールします。

インストールするアプリはこちら。

- dbeaver
- powershell
- slack
- visual studio code
- windows terminal

## policy の変更

powershell のスクリプトを実行できるように policy を変更します。

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

ローカルで作成したスクリプトを許可、リモートから取得したスクリプトは署名済みなら許可という感じです。

## chocolatey

管理者権限で下記を実行して chocolatey をインストールします。

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

chocolatey でインストールするのは下記です。

- git

docker も後でインストールします。

## scoop

scoop をインストール。

```powershell
iwr -useb get.scoop.sh | iex
```

scoop でインストールするのは下記です。

- lazydocker

ちょっと試したいツールなどをインストールするのに scoop を使っています。そのため setup の段階ではあまりインストールしません。

## 設定ファイルをコピー

github で管理している各種設定ファイルをコピーします。

https://github.com/lisp719/win/

- git
- powershell
- windows terminal
- wsl

## wsl

wsl をインストールしてきます。

管理者権限で下記を実行。

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

その後、再起動を実行します。

ちなみに下記のコマンドで再起動できます。

```powershell
Restart-Computer
```

再起動後、管理者権限で下記を実行して ubuntu をインストールします。

```powershell
wsl --update
wsl --shutdown
wsl --set-default-version 2
wsl --install -d ubuntu
```

windows 側の.gitconfig をコピー後、認証情報を共有するように設定します。

[wsl と windows で git の認証情報を共有する](/articles/wsl-git-credential/)

## docker

chocolatey で docker をインストールします。

管理者権限で下記を実行。

```powershell
choco install docker-desktop
```

インストール後、再起動します。
