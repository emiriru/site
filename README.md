# 個人サイト

GitHub Pagesで公開する前提の個人サイト試作です。

## ローカルで確認する

`site/index.html`をブラウザで開くか、プロジェクトのルートで次を実行します。

```sh
python3 -m http.server 8000 --directory site
```

ブラウザで `http://localhost:8000` を開いてください。

## 問い合わせフォーム

現在は入力画面のみ設定しています。Formspreeなどのフォームサービスで発行した送信先URLを、`index.html`の`data-form-endpoint`に設定すると送信できます。