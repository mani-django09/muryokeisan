import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '時間計算機 - 経過時間・時刻差を瞬時に計算｜無料オンラインツール',
  description: '開始時刻と終了時刻を入力するだけで、経過時間を時間・分・合計分数で瞬時に計算。勤怠管理・作業時間記録・タイムスケジュール作成に役立つ無料ツールです。スマホ対応、登録不要。',
  keywords: '時間計算, 経過時間, 時刻差, 勤怠管理, 作業時間, タイムシート, 時間計算機, 無料',
};

const faqItems = [
  {
    question: '24時間を超える計算はできますか？',
    answer: 'はい、可能です。24時間を超える場合は自動的に日数に換算され、「○日○時間○分」という形式で表示されます。長時間の勤務や複数日にまたがる作業時間の計算にも対応しています。',
  },
  {
    question: '日をまたぐ計算（例：22:00〜翌2:00）はできますか？',
    answer: '日をまたぐ計算は、終了時刻が開始時刻より前の場合、自動的に翌日として処理されます。例えば22:00〜翌2:00は4時間として計算されます。',
  },
  {
    question: '勤務時間の計算に使えますか？',
    answer: 'はい、出勤時刻と退勤時刻を入力することで、拘束時間を計算できます。ただし休憩時間は計算結果から別途差し引く必要があります。休憩1時間の場合は合計分数から60分を引いてください。',
  },
  {
    question: '秒単位の計算はできますか？',
    answer: 'このツールは時間と分単位での計算に対応しています。秒単位の精密な計算が必要な場合は、専用の秒計算ツールをご利用ください。',
  },
  {
    question: '時間計算の結果を時給計算に使えますか？',
    answer: 'はい、計算結果の時間数に時給を掛けることで給与計算ができます。当サイトの時給計算ツールと組み合わせてご活用ください。',
  },
];

const useCases = [
  { icon: '◑', label: '勤怠管理',       desc: '出退勤時刻から実働時間を算出' },
  { icon: '◐', label: '作業ログ',       desc: 'タスクごとの所要時間を記録' },
  { icon: '◒', label: 'プロジェクト',   desc: '工数見積もりと実績比較' },
  { icon: '◓', label: '時給計算補助',   desc: '労働時間×時給で給与を試算' },
];

const timeFormulas = [
  { label: '経過時間', formula: '終了時刻 − 開始時刻', color: '#4caf7d' },
  { label: '分換算',   formula: '時間 × 60 ＋ 分',    color: '#c9a96e' },
  { label: '日数換算', formula: '合計分数 ÷ 1440',     color: '#74a8e8' },
];

const relatedCalcs = [
  { href: '/jikyu-keisan',      emoji: '◈', label: '時給計算',       desc: '時給から日給・月給・年収を算出' },
  { href: '/age-keisan',        emoji: '◷', label: '年齢計算',       desc: '生年月日から正確な年齢を算出' },
  { href: '/percentage-keisan', emoji: '◉', label: 'パーセント計算', desc: '割合・増減率を簡単計算' },
];

export default function TimeCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── Hero ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>時間計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>無料計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>時間計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            開始・終了時刻を入力するだけで、経過時間を<br />
            時間・分・合計分数で瞬時に計算します。
          </p>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main>
        <div className={`${styles.mainLayout} ${styles.animateIn}`}>

          {/* ── Reference Card ── */}
          <div className={styles.refCard}>
            <div className={styles.refCardHead}>
              <div className={styles.refCardAccent} />
              <h2 className={styles.refCardTitle}>時間計算の基本式</h2>
            </div>

            {/* Formula rows */}
            <div className={styles.refCardBody}>
              {timeFormulas.map((f) => (
                <div key={f.label} className={styles.bmiRow}>
                  <div className={styles.bmiRowLeft}>
                    <span className={styles.bmiDot} style={{ background: f.color }} />
                    <span className={styles.bmiLabel}>{f.label}</span>
                  </div>
                  <span style={{
                    fontFamily: "'Noto Sans JP', monospace",
                    fontSize: '0.78rem',
                    color: f.color,
                    letterSpacing: '0.03em',
                  }}>{f.formula}</span>
                </div>
              ))}
            </div>

            {/* Use-case grid */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1rem 1.5rem 0.5rem', background: 'rgba(201,169,110,0.02)' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'rgba(201,169,110,0.45)', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: "'Noto Sans JP', sans-serif" }}>
                主な活用シーン
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', paddingBottom: '0.75rem' }}>
                {useCases.map((u) => (
                  <div key={u.label} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10,
                    padding: '0.75rem 0.875rem',
                  }}>
                    <div style={{ fontSize: '1rem', color: '#c9a96e', marginBottom: 4, opacity: 0.75 }}>{u.icon}</div>
                    <div style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '0.8rem', fontWeight: 600, color: '#e8e4df', letterSpacing: '0.04em' }}>{u.label}</div>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(138,134,128,0.6)', marginTop: 3, lineHeight: 1.55 }}>{u.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Calculator Card ── */}
          <div className={styles.calcCardOuter}>
            <div className={styles.wrap}>
              <div className={styles.card}>
                <div className={styles.calcCardHeader}>
                  <div className={styles.iconBox}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9"/>
                      <polyline points="12 7 12 12 15.5 15.5"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.calcMeta}>Calculator</p>
                    <h2 className={styles.calcTitle}>時刻を入力する</h2>
                  </div>
                </div>

                <div className={styles.infoStrip}>
                  <strong>時間計算について — </strong>
                  24時間以内の時刻差はもちろん、日をまたぐ計算（22:00〜翌2:00 = 4時間）にも自動対応します。
                </div>

                <CalculatorClient
                  apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/time`}
                  fields={[
                    { name: 'startTime', label: '開始時刻', type: 'text', placeholder: '09:00', required: true },
                    { name: 'endTime',   label: '終了時刻', type: 'text', placeholder: '17:30', required: true },
                  ]}
                  resultFields={[
                    { key: 'hours',        label: '経過時間', unit: '時間' },
                    { key: 'minutes',      label: '端数分',   unit: '分' },
                    { key: 'totalMinutes', label: '合計分数', unit: '分' },
                  ]}
                  buttonText="時間を計算する"
                />

                <div className={styles.footnote}>
                  ※ 時刻は「HH:MM」形式で入力してください。日またぎ計算は自動処理されます。
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── Article ── */}
      <article className={styles.articleSection}>
        <div className={styles.articleInner}>
          <p className={styles.sectionKnowledge}>Knowledge</p>
          <h2 className={styles.sectionH2}>時間計算にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />
          <div className={styles.articleGrid}>
            <div>
              <h3 className={styles.articleHeading}>時間計算の仕組み</h3>
              <p className={styles.articleText}>
                時間計算は「終了時刻 − 開始時刻」で求められます。例えば9:00〜17:30は<strong>8時間30分（510分）</strong>です。分が60を超えると時間に繰り上がり、24時間を超えると日数換算されます。このツールはすべての変換を自動処理します。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>勤怠管理での活用</h3>
              <p className={styles.articleText}>
                出勤・退勤時刻を入力すれば拘束時間を即座に算出できます。<strong>休憩時間は合計分数から差し引いて</strong>実働時間を求めてください。例えば9:00〜18:00で休憩60分なら、実働8時間となります。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>日をまたぐ計算の注意点</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: '夜勤シフト', text: '22:00〜翌6:00 = 8時間（自動認識）' },
                  { label: '深夜残業',   text: '17:00〜翌0:30 = 7時間30分' },
                  { label: 'サマータイム', text: '時計の切替がある地域では手動補正を' },
                  { label: '複数日合算', text: '各日の時間を個別計算し合計してください' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div className={styles.timelineDot} style={{ marginTop: 7 }} />
                    <div>
                      <span style={{ fontFamily: '"Shippori Mincho B1","Noto Serif JP",serif', color: '#1a1f6e', fontWeight: 600, fontSize: '0.875rem' }}>{item.label}</span>
                      <span style={{ color: '#4a4a5e', fontSize: '0.82rem', marginLeft: 8 }}>— {item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className={styles.articleHeading}>プロジェクト管理への応用</h3>
              <p className={styles.articleText}>
                タスクごとに開始・終了時刻を記録し、<strong>合計分数を集計</strong>することで正確な工数把握ができます。見積もり時間と実績の差を分析すれば、次回スケジュールの精度向上につながります。
              </p>
            </div>
            <div className={styles.colSpanFull}>
              <h3 className={styles.articleHeading}>時間計算と給与計算の連携</h3>
              <p className={styles.articleText}>
                このツールで算出した実働時間数に時給を掛けることで、簡易的な給与計算が可能です。残業時間（1日8時間超・週40時間超）は通常時給の1.25倍、深夜時間帯（22時〜翌5時）は1.25倍、休日労働は1.35倍が法定割増率です。当サイトの時給計算ツールと組み合わせることで、より詳細な収入シミュレーションができます。
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* ── FAQ ── */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className={styles.sectionKnowledge}>FAQ</p>
            <h2 className={styles.sectionH2} style={{ color: '#e8e4df' }}>よくあるご質問</h2>
            <div className={styles.goldRule} style={{ margin: '1rem auto 0', width: 48 }} />
          </div>
          {faqItems.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <div className={styles.faqQuestion}>
                <span className={styles.faqQMark}>Q</span>
                <span>{item.question}</span>
              </div>
              <div className={styles.faqAnswer}>{item.answer}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related ── */}
      <section className={styles.relatedSection}>
        <div className={styles.relatedInner}>
          <div style={{ textAlign: 'center' }}>
            <p className={styles.sectionKnowledge}>Related</p>
            <h2 className={styles.sectionH2} style={{ color: '#e8e4df' }}>関連する計算ツール</h2>
            <div className={styles.goldRule} style={{ margin: '1rem auto 0', width: 48 }} />
          </div>
          <div className={styles.relatedGrid}>
            {relatedCalcs.map(c => (
              <Link key={c.href} href={c.href} className={styles.statChip}>
                <div style={{ fontSize: '1.4rem', marginBottom: 12, color: '#c9a96e', opacity: 0.7 }}>{c.emoji}</div>
                <p style={{ fontFamily: '"Shippori Mincho B1","Noto Serif JP",serif', fontSize: '0.95rem', color: '#e8e4df', fontWeight: 600, marginBottom: 6, letterSpacing: '0.04em' }}>{c.label}</p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(232,228,223,0.4)', lineHeight: 1.65 }}>{c.desc}</p>
                <div style={{ marginTop: 14, fontSize: '0.68rem', color: 'rgba(201,169,110,0.45)', letterSpacing: '0.15em' }}>詳しく見る →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.siteFooter}>
        <p className={styles.footerText}>© MuryoKeisan — 無料計算サイト</p>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: faqItems.map(item => ({
            '@type': 'Question', name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }),
      }} />
    </div>
  );
}