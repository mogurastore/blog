---
pubDate: 2025-06-03
tags: [devcontainer, zellij]
title: devcontainer と zellij の相性問題に遭遇しました
---

なかなかニッチな問題に遭遇したので記録に残しておきます。

自分は WSL 環境で発生しましたが、もしかしたら他の環境でも発生するかもしれません。

# 現象

それまで普通に使えていた devcontainer の features が使えなくなりました。

試しにこんな感じで features を指定した devcontainer.json を用意して `devcontainer build` を実行します。

```json
{
  "name": "Ruby",
  "image": "mcr.microsoft.com/devcontainers/ruby:1-3.4-bullseye",
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {}
  }
}
```

するとビルドは失敗してしまいました。エラー出力には下記のように表示されています。

```log
[2025-06-02T22:01:53.628Z] #2 ERROR: error getting credentials - err: exec: "docker-credential-desktop.exe": executable file not found in $PATH, out: `
```

`docker-credential-desktop.exe` に PATH が通っていないようなエラーが出てます。しかし確認してみると PATH は通っているようでコマンドとして実行可能な状態です。

# 原因

いろいろ試行錯誤した結果、どうやら zellij の自動起動と相性が悪かったみたいです。

zellij を自動起動するためにこんな感じの設定を `~/.bashrc` に追加していたのですが、なぜかこの設定があると今回の現象が発生しました。

```bash
eval "$(zellij setup --generate-auto-start bash)"
```

ちなみに `zellij setup --generate-auto-start bash` の実行結果はこんな感じです。

```bash
if [[ -z "$ZELLIJ" ]]; then
    if [[ "$ZELLIJ_AUTO_ATTACH" == "true" ]]; then
        zellij attach -c
    else
        zellij
    fi

    if [[ "$ZELLIJ_AUTO_EXIT" == "true" ]]; then
        exit
    fi
fi
```

単純に zellij が起動されていなければ起動するだけの設定っぽいです。

一応手動で zellij を起動したり attach して `devcontainer build` を実行してみましたが、その場合は問題なくビルドできました。

# 対応策

自動起動はやめて `wsl zellij` と明示的に指定して起動するようにしました。

なお自分は zellij を homebrew でインストールしたのですが、homebrew でインストールしたパッケージは `wsl zellij` という風に入力しても起動できません。

`wsl zellij` という風に入力した時は `.bashrc` などが反映されていない状態なので PATH が通ってなくてコマンドが見つからないからです。

`/etc/environment` で指定すればいけるかなと思ったのですが、それもだめそうだったのでシンボリックリンクを張って対処しました。

```bash
sudo ln -s /home/linuxbrew/.linuxbrew/bin/zellij /usr/local/bin/zellij
```
