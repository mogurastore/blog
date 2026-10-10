---
pubDate: 2024-03-09
tags: [vr]
title: Virtual DesktopのBetaでフルトラを試す
---

# 概要

Virtual Desktop の Beta 1.30.3 にてフルトラッキングのエミュレート機能が実装されました。

今回はそのやり方を紹介します。

なお、自分は Meta Quest3 で試したので Meta Quest3 の場合のやり方になります。

# やり方

## discord のサーバーへ参加する

ダウンロードのリンクが分かってればいいので必須ではないのですが一応。

公式サイトから参加できます。

[Home | Virtual Desktop (vrdesktop.net)](https://www.vrdesktop.net/)

## Beta 版の Virtual Desktop をインストールする

下記のページにアクセスしバージョンとリリースノートで Beta バージョンを選択します。

[Meta Quest の「Virtual Desktop 」| Quest VR ゲーム | Meta Store](https://www.meta.com/ja-jp/experiences/2017050365004772/)

![enter image description here](https://i.imgur.com/fJg66JN.png)

すると Meta Quest3 に Beta バージョンの Virtual Desktop がインストールされます。

## PC に Beta の Virtual Desktop Streamer をインストール

下記の URL から Beta 版の Virtual Desktop Streamer をダウンロードしインストールします。

<a href="https://download.vrdesktop.net/files/beta/VirtualDesktop.Streamer.Setup.exe">https://download.vrdesktop.net/files/beta/VirtualDesktop.Streamer.Setup.exe</a>

## Virtual Desktop を起動し設定

Meta Quest3 を被り Virtual Desktop を起動します。

STREAMING > Advanced Options > Emulate SteamVR Vive trackers にチェックを入れます。

今回はフルトラの設定なので Index controllers のチェックは不要ですが、ハンドトラッキングを試したい方は Index controllers もチェックを入れてください。

## VRChat を起動し Calibrate FBT を実行

LaunchPad から Calibrate FBT を選択し表示されたトラッカーの位置をアバターに合わせます。

位置を合わせたらコントローラーのトリガーを引いて位置を確定させます。

![](https://i.imgur.com/p8Kq2xJ.png)

# 詰まったところ

## Calibrate FBT が表示されない

SteamVR の Virtual Desktop Streamer (Quest) アドオンが無効になっていたのが原因でした。

クラッシュが起きると前回のクラッシュを元に一部のアドオンが無効化されるので、ちゃんとアドオンが有効になっているか確認しましょう。

こんな感じで SteamVR にトラッカーが表示されていれば OK です。

![enter image description here](https://i.imgur.com/pWor0db.png)

## 設定が反映されない

SteamVR を再起動すると Virtual Desktop の設定が反映されます。
