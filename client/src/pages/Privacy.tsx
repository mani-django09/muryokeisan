import { SEOHead } from "@/components/SEOHead";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="プライバシーポリシー | 計算ツール"
        description="計算ツールのプライバシーポリシーページです。個人情報の取り扱いについて説明しています。"
      />

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8">プライバシーポリシー</h1>

          <div className="content-section">
            <h2>個人情報の取り扱いについて</h2>
            <p>
              当サイト（以下「本サイト」）では、ユーザーの個人情報保護を重要視し、
              個人情報保護法を遵守して適切な取り扱いを行っています。
            </p>
          </div>

          <div className="content-section">
            <h2>収集する情報</h2>
            <p>
              本サイトでは、計算ツールの利用にあたり、以下の情報を収集する場合があります：
            </p>
            <ul>
              <li>アクセスログ情報（IPアドレス、ブラウザ情報、アクセス日時など）</li>
              <li>Cookie情報</li>
              <li>計算ツールに入力されたデータ（一時的な処理のみに使用）</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>情報の利用目的</h2>
            <p>
              収集した情報は、以下の目的で利用します：
            </p>
            <ul>
              <li>サービスの提供・運営</li>
              <li>サービスの改善・最適化</li>
              <li>利用状況の分析</li>
              <li>不正利用の防止</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>計算データの取り扱い</h2>
            <p>
              本サイトの計算ツールに入力されたデータ（身長、体重、金額など）は、
              計算処理のためにのみ使用され、サーバーに保存されることはありません。
              計算結果の表示後、入力データは破棄されます。
            </p>
          </div>

          <div className="content-section">
            <h2>Cookieについて</h2>
            <p>
              本サイトでは、サービスの利便性向上のためにCookieを使用する場合があります。
              Cookieは、ユーザーのブラウザに保存される小さなテキストファイルです。
              ブラウザの設定により、Cookieの受け入れを拒否することができますが、
              一部機能が正常に動作しない場合があります。
            </p>
          </div>

          <div className="content-section">
            <h2>第三者への提供</h2>
            <p>
              本サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
            </p>
          </div>

          <div className="content-section">
            <h2>広告について</h2>
            <p>
              本サイトでは、第三者配信の広告サービスを利用する場合があります。
              これらの広告配信事業者は、ユーザーの興味に応じた広告を表示するために、
              Cookieを使用することがあります。
            </p>
          </div>

          <div className="content-section">
            <h2>セキュリティ</h2>
            <p>
              本サイトは、個人情報の漏洩、滅失、毀損を防止するため、
              適切なセキュリティ対策を実施しています。
            </p>
          </div>

          <div className="content-section">
            <h2>プライバシーポリシーの変更</h2>
            <p>
              本プライバシーポリシーは、法令の変更や サービス内容の変更に応じて、
              予告なく変更される場合があります。変更後のプライバシーポリシーは、
              本ページに掲載した時点で効力を生じるものとします。
            </p>
          </div>

          <div className="content-section">
            <h2>お問い合わせ</h2>
            <p>
              本プライバシーポリシーに関するお問い合わせは、本サイトのお問い合わせフォームよりご連絡ください。
            </p>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>最終更新日：2025年1月15日</p>
          </div>
        </div>
      </div>
    </>
  );
}
