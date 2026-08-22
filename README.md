# Shohei ポートフォリオサイト

GitHub Pagesでそのまま公開できる、Shoheiのシングルページ・ポートフォリオサイトです。
ビルド不要(HTML + Tailwind CSS CDN + プレーンJavaScript)。

## 構成

```
site/
├── index.html      本体(全セクション)
├── js/script.js    モバイルメニュー・実績フィルタ・お問い合わせフォームの挙動
└── README.md       このファイル
```

## ローカルで確認する

`index.html` をダブルクリックしてブラウザで開くだけで確認できます。Tailwind CSS・Google Fonts・実績画像はすべて外部URL読み込みのため、サーバーなしでも見た目・動作(メニュー開閉、実績タブ切り替え、フォームのダミー送信)は問題なく確認できます。

サーバー経由で確認したい場合は、以下でも起動できます。

```sh
cd site
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開くか、VS CodeのLive Server拡張を使ってください。

## 内容について

お名前・経歴・保有資格・執筆実績(note記事へのリンク)・単価目安・稼働条件・SNSリンクは、いずれも実際の内容を反映しています(プレースホルダーではありません)。プロフィール写真・実績カードの画像・Heroイラストも実際のAI生成イラストに差し替え済みです。

まだプレースホルダーのままなのは以下です。

- `og:url` / `og:image`(GitHub Pagesの標準URL規則`https://<ユーザー名>.github.io/<リポジトリ名>/`に基づく想定値。独自ドメインを使う場合は`index.html`の該当コメント箇所を差し替え)

お問い合わせフォームはGoogleフォームとの連携設定まで完了しています(下記参照)。

## お問い合わせフォームについて

**Googleフォームとの連携は動作確認済みです（2026-08-22）。** `action`・各項目の`name`属性には実際のフォームID・entry IDが設定されており、実際に送信してGoogleフォーム側の「回答」タブに届くことを確認済みです。フォームを作り直す・項目を変更する場合は、以下の手順を参考にしてください。

1. [Googleフォーム](https://forms.google.com/)で新しいフォームを作成し、「お名前」「メールアドレス」「ご依頼内容」「メッセージ」の4項目を用意する(順番・種類は`index.html`のフォームに合わせる)
2. 各項目の`entry.数字ID`を取得する
   - 作成したフォームを開き、右上の「⋮」→「事前入力したリンクを取得」を選ぶ
   - 各項目にダミーの値を入力し、「リンクを取得」する
   - 生成されたURLの末尾に並ぶ`entry.XXXXXXXXX=入力した値`から、項目ごとのentry IDがわかる
3. フォームIDを控える(編集画面のURL `https://docs.google.com/forms/d/{フォームID}/edit` から取得できる)
4. `index.html`の`<form id="contact-form" ...>`タグを編集する
   - `action`属性を `https://docs.google.com/forms/d/e/{フォームID}/formResponse` に変更
   - 各`input`・`select`・`textarea`の`name`属性(`entry.REPLACE_WITH_◯◯_ID`)を、手順2で調べた実際の`entry.数字ID`に差し替え
5. 実際に送信し、Googleフォームの「回答」タブに反映されるか確認する

送信は非表示の`iframe`(`hidden_iframe`)を経由するネイティブなフォーム送信のため、ページ遷移は発生しません。Googleフォーム側からJSで応答を読み取ることはできない仕様のため、送信自体が完了した時点(iframeの読み込み完了)で成功メッセージを表示しています。実際に相手に届いたかどうかは、Googleフォームの回答一覧で確認してください。詳細は`js/script.js`内のコメントを参照してください。

## GitHub Pagesでの公開

1. このリポジトリをGitHubにpushする
2. GitHubリポジトリの Settings → Pages で、公開ブランチ(例: `main`)とルートディレクトリを指定する
3. 発行されたURLでサイトを確認する
