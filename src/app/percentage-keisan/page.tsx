import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: 'パーセント計算機 - 割合・増減率・値引き率を瞬時に計算｜無料オンラインツール',
  description: '値と全体を入力するだけでパーセントを瞬時に計算。試験の得点率・売上増減率・消費税・値引き率など日常からビジネスまで対応した無料ツールです。スマホ対応、登録不要。',
  keywords: 'パーセント計算, 割合, 増減率, 値引き, 消費税, パーセント計算機, 無料',
};

const faqItems = [
  {
    question: 'パーセントと割合の違いは何ですか？',
    answer: 'パーセント（%）は割合を100倍した値です。例えば0.25という割合は25%と表現されます。日常生活ではパーセントの方が直感的に理解しやすく、ビジネスや教育の現場で広く使われています。',
  },
  {
    question: '増加率と減少率の計算方法は同じですか？',
    answer: 'はい、基本式は同じです。(新しい値 − 元の値) ÷ 元の値 × 100 で計算します。結果がプラスなら増加率、マイナスなら減少率です。例えば100万円が120万円になれば+20%、80万円になれば−20%となります。',
  },
  {
    question: 'パーセントポイントとパーセントの違いは？',
    answer: 'パーセントポイントは2つのパーセント値の絶対差を表します。例えば支持率が10%から15%に上昇した場合「5パーセントポイント増加」または「50%増加」と表現できます。メディアや統計では混同しやすいため注意が必要です。',
  },
  {
    question: '消費税込みの価格はどう計算しますか？',
    answer: '税抜き価格 × 1.10（消費税10%の場合）で税込み価格が求まります。例えば1,000円の商品なら1,000 × 1.10 = 1,100円です。逆に税込み価格から税抜き価格を求める場合は税込み価格 ÷ 1.10 で計算します。',
  },
  {
    question: '連続した変化率を計算するときの注意点は？',
    answer: '連続した変化率は単純に足し算できません。例えば10%増加後に10%減少しても元の値には戻らず、1.10 × 0.90 = 0.99 となり実際は1%減少します。複利計算や株価変動などでは特に注意が必要です。',
  },
];

const usageExamples = [
  { scene: '試験の得点率',   formula: '得点 ÷ 満点 × 100',          example: '80 ÷ 100 × 100 = 80%',      color: '#4caf7d' },
  { scene: '消費税計算',     formula: '税抜価格 × 1.10',             example: '1,000 × 1.10 = 1,100円',    color: '#c9a96e' },
  { scene: '値引き率',       formula: '(定価 − 売価) ÷ 定価 × 100', example: '(1,000 − 800) ÷ 1,000 = 20%', color: '#e8624a' },
  { scene: '売上増減率',     formula: '(新 − 旧) ÷ 旧 × 100',       example: '(120 − 100) ÷ 100 = 20%',   color: '#74a8e8' },
];

const conversionTable = [
  { percent: '10%',  decimal: '0.10', fraction: '1/10' },
  { percent: '20%',  decimal: '0.20', fraction: '1/5'  },
  { percent: '25%',  decimal: '0.25', fraction: '1/4'  },
  { percent: '50%',  decimal: '0.50', fraction: '1/2'  },
  { percent: '75%',  decimal: '0.75', fraction: '3/4'  },
];

const relatedCalcs = [
  { href: '/bmi-keisan',          emoji: '◉', label: 'BMI計算',    desc: '身長・体重から肥満度を算出' },
  { href: '/jikyu-keisan',        emoji: '◈', label: '時給計算',   desc: '時給から日給・月給・年収を算出' },
  { href: '/shitsugyo-keisan',    emoji: '◒', label: '失業保険計算', desc: '給付日額・給付日数を試算' },
];

export default function PercentageCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── Hero ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>パーセント計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>無料計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>パーセント計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            値と全体を入力するだけで割合・増減率を瞬時に計算。<br />
            消費税・値引き・得点率など幅広い用途に対応します。
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
              <h2 className={styles.refCardTitle}>主な活用シーンと計算式</h2>
            </div>

            {/* Usage examples */}
            <div className={styles.refCardBody}>
              {usageExamples.map((u) => (
                <div key={u.scene} className={styles.bmiRow} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4, padding: '0.9rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'space-between' }}>
                    <div className={styles.bmiRowLeft}>
                      <span className={styles.bmiDot} style={{ background: u.color }} />
                      <span className={styles.bmiLabel}>{u.scene}</span>
                    </div>
                  </div>
                  <div style={{ paddingLeft: 20 }}>
                    <div style={{ fontFamily: "'Noto Sans JP', monospace", fontSize: '0.72rem', color: u.color, letterSpacing: '0.02em', marginBottom: 2 }}>{u.formula}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(138,134,128,0.5)', letterSpacing: '0.03em' }}>例: {u.example}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick conversion table */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1rem 1.5rem 1rem', background: 'rgba(201,169,110,0.02)' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'rgba(201,169,110,0.45)', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: "'Noto Sans JP', sans-serif" }}>
                パーセント早見表
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                {/* Header */}
                {['%', '小数', '分数'].map(h => (
                  <div key={h} style={{ padding: '0.4rem 0.5rem', background: 'rgba(201,169,110,0.06)', fontSize: '0.6rem', color: 'rgba(201,169,110,0.6)', textAlign: 'center', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</div>
                ))}
                {conversionTable.map((r, i) => (
                  [r.percent, r.decimal, r.fraction].map((val, j) => (
                    <div key={`${i}-${j}`} style={{
                      padding: '0.45rem 0.5rem', textAlign: 'center',
                      fontSize: '0.75rem', fontFamily: "'Noto Sans JP', monospace",
                      color: j === 0 ? '#c9a96e' : 'rgba(232,228,223,0.65)',
                      borderBottom: i < conversionTable.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      borderRight: j < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    }}>{val}</div>
                  ))
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
                      <line x1="19" y1="5" x2="5" y2="19"/>
                      <circle cx="6.5" cy="6.5" r="2.5"/>
                      <circle cx="17.5" cy="17.5" r="2.5"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.calcMeta}>Calculator</p>
                    <h2 className={styles.calcTitle}>数値を入力する</h2>
                  </div>
                </div>

                <div className={styles.infoStrip}>
                  <strong>パーセント計算について — </strong>
                  「値 ÷ 全体 × 100」の基本式で割合を算出します。増減率や値引き率も同じ仕組みで計算できます。
                </div>

                <CalculatorClient
                  apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/percentage`}
                  fields={[
                    { name: 'value', label: '値（部分）', type: 'number', placeholder: '80',  required: true },
                    { name: 'total', label: '全体',       type: 'number', placeholder: '100', required: true },
                  ]}
                  resultFields={[
                    { key: 'percentage', label: 'パーセント', unit: '%' },
                    { key: 'decimal',    label: '小数表記',   unit: ''  },
                  ]}
                  buttonText="パーセントを計算する"
                />

                <div className={styles.footnote}>
                  ※ 小数点以下2桁で四捨五入して表示しています。
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
          <h2 className={styles.sectionH2}>パーセント計算にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />
          <div className={styles.articleGrid}>
            <div>
              <h3 className={styles.articleHeading}>パーセント計算の基本式</h3>
              <p className={styles.articleText}>
                パーセントは「部分 ÷ 全体 × 100」で求まります。例えば100点満点で80点なら<strong>80%</strong>です。逆に全体の値の一定%を求める場合は「全体 × (% ÷ 100)」で計算します。10,000円の20%は10,000 × 0.20 = 2,000円です。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>増減率の正しい計算</h3>
              <p className={styles.articleText}>
                売上や数値の変化率は「(新しい値 − 元の値) ÷ 元の値 × 100」で求めます。100万円から120万円への増加は<strong>+20%</strong>、80万円への減少は<strong>−20%</strong>です。結果のプラス・マイナスで増加・減少を判断します。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>身近な活用シーン</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: '消費税計算',   text: '税抜価格 × 1.10 で税込み価格を算出' },
                  { label: '値引き率',     text: '(定価 − 売価) ÷ 定価 × 100 で割引率' },
                  { label: '試験の得点率', text: '得点 ÷ 満点 × 100 で正答率を確認' },
                  { label: '利益率',       text: '(売上 − 原価) ÷ 売上 × 100 で利益率' },
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
              <h3 className={styles.articleHeading}>パーセントポイントとの違い</h3>
              <p className={styles.articleText}>
                支持率が10%から15%に変わった場合、「<strong>5パーセントポイント増加</strong>」かつ「<strong>50%増加</strong>」と言えます。パーセントポイントは絶対差、パーセントは相対変化率です。ニュースや統計では混同されやすいため注意が必要です。
              </p>
            </div>
            <div className={styles.colSpanFull}>
              <h3 className={styles.articleHeading}>連続した変化率の落とし穴</h3>
              <p className={styles.articleText}>
                「10%増加後に10%減少すると元に戻る」は誤りです。正しくは 1.10 × 0.90 = 0.99 となり、<strong>1%の減少</strong>が生じます。株価・複利計算・インフレ率など連続した変化率を扱う場合は必ず掛け算で計算してください。パーセントの単純加算は連続変化には適用できません。
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