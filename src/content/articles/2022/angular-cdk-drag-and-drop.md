---
pubDate: 2022-12-13
tags: [angular]
title: angular cdk で drag & drop を実装する
---

## 概要

[DEPARTURE Advent Calendar 2022 | 13 日目](https://qiita.com/advent-calendar/2022/departure-development)

angular cdk は angular 公式の UI ライブラリです。

UI ライブラリというとデザインと機能をセットで提供するものが一般的かと思いますが、 angular cdk は基本的に機能のみを提供してくれる UI ライブラリになっています。

angular cdk を使うと drag & drop での並び替え機能を簡単に実装することができます。

## インストール

まずは angular cdk をインストールします。

```bash
npm i @angular/cdk
```

## module の読み込み

`app.module.ts` に DragDropModule を追加します。

```typescript
import { DragDropModule } from "@angular/cdk/drag-drop";

// 中略

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## html

cdkDropList と cdkDrag を追加すると table が並び替え可能になります。

しかし、それだけでは component のデータは変更されません。

cdkDropListDropped を追加して drop した時にデータを並び替える処理を追加してあげる必要があります。

```html
<table>
  <tbody cdkDropList (cdkDropListDropped)="onDrop($event)">
    <tr *ngFor="let item of items" cdkDrag>
      <td>{{ item.text }}</td>
    </tr>
  </tbody>
</table>
```

## typescript

drop した時に component のデータを並べ替えるメソッドを定義します。

moveItemInArray を使うと簡単に並び替え処理を実装することができます。

```typescript
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// 中略

onDrop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.items, event.previousIndex, event.currentIndex);
}
```

## 参考リンク

https://material.angular.io/cdk/drag-drop/overview
