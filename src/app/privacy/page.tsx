import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | MuryoKeisan',
  description: 'MuryoKeisanのプライバシーポリシー。収集する情報、利用目的、Cookie、Google Analytics、広告について説明します。',
};

const sections = [
  {
    id: '1',
    title: '収集する情報',
    body: '当サイトでは以下の情報を収集する場合があります。なお、計算ツールに入力された数値（身長・体重・年収など）はサーバーに送信・保存されることはなく、お客様のブラウザ上でのみ処理されます。',
    items: [
      'アクセスログ情報（IPアドレス、ブラウザ種別、OS、アクセス日時、参照URL）',
      'Cookie情報（セッション管理・サイト改善目的）',
      '計算ツールの利用状況（入力値を除く匿名の利用統計）',
    ],
  },
  {
    id: '2',
    title: '情報の利用目的',
    items: [
      'サービスの提供・運営・維持',
      'サービスの品質改善・機能最適化',
      '不正利用・セキュリティ脅威の検出・防止',
      'アクセス傾向の分析による利便性向上',
    ],
  },
  {
    id: '3',
    title: 'Cookieについて',
    body: '当サイトでは利用状況の把握・サービス改善のためにCookieを使用しています。Cookieはお客様のコンピュータを識別するための小さなテキストファイルです。ブラウザの設定からCookieを無効にすることができますが、一部機能が正常に動作しない場合があります。当サイトはCookieを通じて個人を特定できる情報を収集することはありません。',
  },
  {
    id: '4',
    title: 'Google Analyticsの使用',
    body: '当サイトではアクセス解析のためにGoogle Analytics（Google LLC提供）を使用しています。Google Analyticsはデータ収集のためにCookieを使用しますが、収集されるデータは匿名化されており、個人を特定することはできません。Google Analyticsのデータ収集を拒否する場合は、Google Analyticsオプトアウトアドオンをご利用ください。詳細はGoogleプライバシーポリシー（policies.google.com）をご確認ください。',
  },
  {
    id: '5',
    title: '広告について',
    body: '当サイトでは第三者配信の広告サービス（Google AdSense等）を利用する場合があります。広告配信事業者は、ユーザーの過去のアクセス情報に基づいた興味関心広告を表示するためにCookieを使用することがあります。広告のCookie使用については、Googleの広告設定ページ（adssettings.google.com）よりオプトアウトできます。',
  },
  {
    id: '6',
    title: '第三者への情報提供',
    body: '当サイトは、以下の場合を除き、ユーザーの同意なく収集した情報を第三者に提供することはありません。①法令に基づく開示が必要な場合、②人の生命・身体・財産の保護のために必要な場合、③公衆衛生の向上または児童の健全な育成の推進のために必要な場合。',
  },
  {
    id: '7',
    title: 'セキュリティ',
    body: '当サイトは、収集した情報の漏えい・滅失・き損の防止のため、適切なセキュリティ対策を実施しています。通信はSSL/TLSで暗号化されています。ただし、インターネット上での完全なセキュリティを保証するものではありません。',
  },
  {
    id: '8',
    title: 'プライバシーポリシーの変更',
    body: '当サイトは、法令改正や事業内容の変更に応じて本ポリシーを変更することがあります。重要な変更がある場合は、当サイト上でお知らせします。変更後のポリシーはサイト掲載時点で効力を生じます。',
  },
  {
    id: '9',
    title: 'お問い合わせ',
    body: '本プライバシーポリシーに関するご質問・ご意見は、当サイトのお問い合わせフォームよりご連絡ください。個人情報の開示・訂正・削除等のご請求も同様にお問い合わせフォームよりお申し出ください。合理的な期間内に対応いたします。',
  },
];

export default function Privacy() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* Hero */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>プライバシーポリシー</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>Privacy</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>最終更新：2025年1月1日</span>
          </div>
          <h1 className={styles.heroTitle}>プライバシーポリシー</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            当サイトにおける個人情報・データの取り扱いについて説明します。<br />
            計算ツールに入力した数値はサーバーに保存されません。
          </p>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '3rem clamp(1.25rem,4vw,3rem)' }}>

        {/* EEAT trust strip — data transparency */}
        <div style={{
          background: 'rgba(76,175,125,0.04)',
          border: '1px solid rgba(76,175,125,0.15)',
          borderLeft: '3px solid rgba(76,175,125,0.4)',
          borderRadius: '0 8px 8px 0',
          padding: '1rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(76,175,125,0.8)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>データ透明性宣言</p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(232,228,223,0.6)', lineHeight: 1.75, margin: 0, fontFamily: '"Noto Serif JP", serif' }}>
            当サイトの計算ツール（BMI・体脂肪率・年齢・所得税など）に入力された数値は、<strong style={{ color: 'rgba(76,175,125,0.9)', fontWeight: 400 }}>お客様のブラウザ上でのみ処理され、サーバーへの送信・外部への共有は一切行いません。</strong>
            アカウント登録・個人情報の提供も不要です。
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {sections.map((sec) => (
            <div key={sec.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2.5rem' }}>
              <h2 style={{
                fontFamily: '"Shippori Mincho B1","Noto Serif JP",serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#e8e4df',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <span style={{ width: 24, height: 24, background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.25)', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#c9a96e', flexShrink: 0, letterSpacing: 0 }}>{sec.id}</span>
                {sec.title}
              </h2>
              {sec.body && (
                <p style={{ fontSize: '0.875rem', color: 'rgba(232,228,223,0.55)', lineHeight: 1.95, letterSpacing: '0.025em', fontFamily: '"Noto Serif JP",serif', fontWeight: 300, margin: sec.items ? '0 0 1rem' : 0 }}>
                  {sec.body}
                </p>
              )}
              {sec.items && (
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {sec.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.875rem', color: 'rgba(232,228,223,0.55)', lineHeight: 1.75, fontFamily: '"Noto Serif JP",serif', fontWeight: 300 }}>
                      <span style={{ width: 5, height: 5, background: 'rgba(201,169,110,0.5)', borderRadius: '50%', flexShrink: 0, marginTop: 9 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer meta */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(201,169,110,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.7rem', color: 'rgba(201,169,110,0.35)', letterSpacing: '0.1em', fontFamily: '"Noto Sans JP",sans-serif', margin: 0 }}>
            最終更新日：2025年1月1日
          </p>
          <Link href="/terms" style={{ fontSize: '0.75rem', color: 'rgba(201,169,110,0.5)', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.2)' }}>
            利用規約 →
          </Link>
        </div>
      </div>

      <footer className={styles.siteFooter}>
        <p className={styles.footerText}>© MuryoKeisan — 無料計算サイト</p>
      </footer>
    </div>
  );
}