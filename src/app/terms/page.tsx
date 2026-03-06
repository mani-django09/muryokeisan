import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '利用規約 | MuryoKeisan',
  description: 'MuryoKeisan（無料計算サイト）の利用規約。サービスの利用条件、免責事項、禁止事項について定めています。',
};

const sections = [
  {
    id: '1',
    title: '第1条（適用）',
    body: '本規約は、ユーザーと当サイトとの間の当サイトの利用に関わる一切の関係に適用されるものとします。当サイトはこの規約のほか、ご利用にあたってのルール等、各種の定めを設けることがあります。これらはすべて本規約の一部を構成するものとします。',
  },
  {
    id: '2',
    title: '第2条（利用登録）',
    body: '当サイトの計算ツールは、利用登録・会員登録一切不要で無料でご利用いただけます。入力された数値はサーバーに保存されず、ページを離れると自動的に消去されます。',
  },
  {
    id: '3',
    title: '第3条（禁止事項）',
    items: [
      '法令または公序良俗に違反する行為',
      '犯罪行為に関連する行為',
      '当サイトのサーバーまたはネットワークの機能を破壊・妨害する行為',
      '当サイトのサービスの運営を妨害するおそれのある行為',
      '他のユーザーに関する個人情報等を収集または蓄積する行為',
      '不正アクセスをし、またはこれを試みる行為',
      '反社会的勢力に対して直接または間接に利益を供与する行為',
      'その他、当サイトが不適切と判断する行為',
    ],
  },
  {
    id: '4',
    title: '第4条（免責事項）',
    body: '当サイトは、計算結果の正確性について最善の努力を払っていますが、その正確性・完全性・有用性を保証するものではありません。計算結果は参考情報としてご利用いただき、税務・医療・法律など重要な判断を行う際は必ず専門家（税理士・医師・弁護士等）にご相談ください。当サイトの利用により発生したいかなる損害についても、当サイトは一切の責任を負いません。',
  },
  {
    id: '5',
    title: '第5条（サービス内容の変更等）',
    body: '当サイトは、ユーザーへの事前通知なく、サービスの内容を変更し、または提供を中止することができます。これにより生じた損害について、当サイトは一切の責任を負いません。',
  },
  {
    id: '6',
    title: '第6条（利用規約の変更）',
    body: '当サイトは、必要と判断した場合にはユーザーへの通知なく本規約を変更することができます。変更後の本規約は、当サイトに掲載した時点で効力を生じます。重要な変更がある場合は、サイト上でお知らせします。',
  },
  {
    id: '7',
    title: '第7条（準拠法・裁判管轄）',
    body: '本規約の解釈にあたっては、日本法を準拠法とします。当サイトに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。',
  },
];

export default function Terms() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* Hero */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>利用規約</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>Legal</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>最終更新：2025年1月1日</span>
          </div>
          <h1 className={styles.heroTitle}>利用規約</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            MuryoKeisanのご利用にあたっての規約です。<br />
            ご利用前に必ずお読みください。
          </p>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '3rem clamp(1.25rem,4vw,3rem)' }}>

        {/* EEAT trust strip */}
        <div style={{
          background: 'rgba(201,169,110,0.04)',
          border: '1px solid rgba(201,169,110,0.15)',
          borderLeft: '3px solid rgba(201,169,110,0.5)',
          borderRadius: '0 8px 8px 0',
          padding: '1rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(201,169,110,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>サイト運営情報</p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(232,228,223,0.6)', lineHeight: 1.75, margin: 0, fontFamily: '"Noto Serif JP", serif' }}>
            本規約はMuryoKeisan（無料計算サイト）が定めるものです。当サイトは日本国内のユーザーを対象としたオンライン計算ツールサービスです。
            本規約は日本法に準拠して作成されています。ご不明な点はお問い合わせフォームよりご連絡ください。
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
                <p style={{ fontSize: '0.875rem', color: 'rgba(232,228,223,0.55)', lineHeight: 1.95, letterSpacing: '0.025em', fontFamily: '"Noto Serif JP",serif', fontWeight: 300, margin: 0 }}>
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
          <Link href="/privacy" style={{ fontSize: '0.75rem', color: 'rgba(201,169,110,0.5)', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.2)' }}>
            プライバシーポリシー →
          </Link>
        </div>
      </div>

      <footer className={styles.siteFooter}>
        <p className={styles.footerText}>© MuryoKeisan — 無料計算サイト</p>
      </footer>
    </div>
  );
}