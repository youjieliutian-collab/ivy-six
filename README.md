# Ivy Six - 明日の6つを決めるTodo

アイビー・リー・メソッドをベースにした、自分専用のPWA Todoアプリです。

## 方針

- 夜に「明日やること」を6つだけ書き出す
- 最終的に達成したい目標、1ヶ月後の目標、今週の目標を設定する
- 最終的に達成したい目標は画面上部に大きく固定表示する
- 所要時間、重要度、緊急度は入力しない
- 入力したタスクは直接やる事リストに入る
- 手動で並び替えできる
- 終わったタスクはチェックできる
- 翌日は1番から順番に実行する
- 終わらなかったものは次の日に回せる

## デザイン方針

- 和風ミニマル
- ダークモード / ライトモード切り替え
- 水墨画・日本画風の背景
- 蓮と金魚、白狐と鳥居、月と鶴の背景から起動ごとにランダム表示
- 中央の操作エリアは読みやすいように背景をぼかして馴染ませる

## いつでも使う方法

一番簡単な使い方は、次のファイルをダブルクリックすることです。

```text
start-server.bat
```

このファイルを実行すると、自動でブラウザが開きます。

```text
http://localhost:8000/?v=wabi-4
```

## 手動起動

PowerShellで以下を実行します。

```powershell
cd "C:\Users\youji\OneDrive\Desktop\yusuke.Brain\project\ivy-lee-todo-app"
node server.js
```

ブラウザで以下を開きます。

```text
http://localhost:8000/?v=wabi-4
```

## スマホで使う方法

PCとスマホを同じWi-Fiに接続し、スマホのブラウザで以下を開きます。

```text
http://PCのIPアドレス:8000/?v=wabi-4
```

その後、ブラウザメニューから「ホーム画面に追加」してください。

## 背景画像

背景画像は `assets/` に保存します。

- `assets/bg-lotus-goldfish.png`
- `assets/bg-fox-torii.png`
- `assets/bg-moon-cranes.png`

## データ保存

現MVPではブラウザの `localStorage` に保存します。

PC/スマホ間で自動同期したい場合は、次の段階でSupabaseやFirebaseを追加する想定です。
