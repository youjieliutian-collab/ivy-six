# Ivy Six をネット上に公開する手順

このアプリは静的ファイルだけで動くため、GitHub Pages / Netlify / Vercel に公開できます。

## 重要

現時点のデータ保存はブラウザの `localStorage` です。

- 同じ端末・同じブラウザではデータが残る
- PCとスマホのデータは自動同期されない
- データ同期まで必要な場合は、次の段階で Supabase / Firebase を追加する

## 推奨：GitHub Pages

無料で公開でき、PWAとしても使いやすい方法です。

### 1. GitHubで新規リポジトリを作る

例：

```text
ivy-six
```

### 2. このフォルダの中身をリポジトリに入れる

対象フォルダ：

```text
C:\Users\youji\OneDrive\Desktop\yusuke.Brain\project\ivy-lee-todo-app
```

アップロードする主なファイル：

```text
index.html
app.js
styles.css
manifest.webmanifest
sw.js
icon.svg
assets/
.nojekyll
README.md
```

`server.js` と `start-server.bat` はローカル起動用なので、公開には必須ではありません。

### 3. GitHub Pagesを有効化

GitHubのリポジトリ画面で：

```text
Settings → Pages → Deploy from a branch
```

Branch:

```text
main
```

Folder:

```text
/root
```

### 4. 公開URL

しばらくすると、以下のようなURLで開けます。

```text
https://ユーザー名.github.io/ivy-six/
```

## スマホで使う

スマホで公開URLを開き、ブラウザメニューから「ホーム画面に追加」します。

## 次の改善候補

- Supabase / Firebase でPC・スマホ間のデータ同期
- Googleログイン
- 背景画像の手動選択
- タスク履歴のクラウド保存
