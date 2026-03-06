import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '割引計算 - セール価格と割引額を瞬時に計算 | MuryoKeisan',
  description: '元の価格と割引率から、割引後の価格と割引額を自動計算。ショッピングやセールでの節約額がすぐわかる。',
};

const faqItems = [
  { question: '割引率と割引額の違いは何ですか？', answer: '割引率はパーセント（%）で表される割合で、割引額は実際に値引きされる金額です。例えば、10,000円の商品が20%オフの場合、割引額は2,000円、割引後の価格は8,000円となります。' },
  { question: '複数の割引を重ねて適用する場合の計算方法は？', answer: '複数の割引は順番に適用します。例えば、10,000円の商品に20%オフ、さらに10%オフを適用する場合、まず10,000円×0.8=8,000円、次に8,000円×0.9=7,200円となります。単純に30%オフではありません。' },
  { question: 'セールでお得かどうかを判断するコツは？', answer: '割引率だけでなく、元の価格が適正かどうかを確認しましょう。また、本当に必要なものかを考え、衝動買いを避けることが重要です。割引額が大きくても、不要なものを買っては節約になりません。' },
  { question: 'ポイント還元と割引はどちらがお得ですか？', answer: '即座に値引きされる割引の方が、一般的にはお得です。ポイント還元は使用期限や使用条件があることが多く、実際の還元率は表示より低くなる場合があります。' },
  { question: '消費税は割引前と割引後のどちらに適用されますか？', answer: '通常、割引後の価格に消費税が適用されます。例えば、10,000円の商品が20%オフの場合、8,000円に消費税10%が加算され、最終価格は8,800円となります。' },
];

const discountTiers = [
  { label: '10%オフ',  value: '×0.90', note: '10,000円 → 9,000円' },
  { label: '20%オフ',  value: '×0.80', note: '10,000円 → 8,000円' },
  { label: '30%オフ',  value: '×0.70', note: '10,000円 → 7,000円' },
  { label: '50%オフ',  value: '×0.50', note: '10,000円 → 5,000円' },
  { label: '70%オフ',  value: '×0.30', note: '10,000円 → 3,000円' },
  { label: '消費税10%', value: '×1.10', note: '8,000円 → 8,800円' },
];

const articleBlocks = [
  {
    title: '割引の基本計算',
    body: [
      '割引計算の基本式は「割引額 = 元の価格 × (割引率 ÷ 100)」です。割引後の価格は「元の価格 − 割引額」で求められます。例えば10,000円の商品が30%オフの場合、割引額は3,000円、割引後の価格は7,000円となります。',
    ],
  },
  {
    title: '複数割引の計算方法',
    body: [
      'セールでは複数の割引が重ねて適用されることがあります。この場合、割引は順番に適用され、割引率を単純に足し算することはできません。20%オフ後にさらに10%オフは合計28%オフであり、30%オフではありません。',
    ],
  },
  {
    title: '賢いショッピングのコツ',
    body: [
      '割引率が高いからといって必ずしもお得とは限りません。元の価格が適正かどうかを確認し、本当に必要なものかどうかを考えて衝動買いを避けることが大切です。価格比較サイトやアプリを活用して他店の価格と比較することも有効です。',
    ],
  },
  {
    title: '割引計算の注意点',
    body: [
      '割引後の価格には通常、消費税が別途加算されます。表示価格が税込みか税抜きかを確認し、最終的な支払額を正確に把握しましょう。ポイント還元と割引を混同しないよう注意が必要です。ポイント還元は後日使用できるポイントが付与されるもので、即座に値引きされる割引とは異なります。',
    ],
  },
];

export default function DiscountCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── COMPACT HERO ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>割引計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>ショッピング計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>割引計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            元の価格と割引率を入力するだけで、割引後の価格と節約額を瞬時に算出。<br />
            消費税込みの最終金額も確認できます。
          </p>
        </div>
      </header>

      {/* ── MAIN: Single centred column ── */}
      <main>
        <div className={styles.calcSingleCol}>

          {/* Calculator */}
          <div className={styles.calcCardOuter}>
            <div className={styles.calcCardInner}>
              <div className={styles.calcCardHeader}>
                <div className={styles.iconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 12V22H4V12"/>
                    <path d="M22 7H2v5h20V7z"/>
                    <path d="M12 22V7"/>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.calcMeta}>Calculator</p>
                  <h2 className={styles.calcTitle}>数値を入力する</h2>
                </div>
              </div>
              <div className={styles.infoStrip}>
                <strong>割引計算について — </strong>
                割引額 = 元の価格 × (割引率 ÷ 100)。割引後の価格 = 元の価格 − 割引額。複数割引は順番に適用されます。
              </div>
            </div>

            <CalculatorClient
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/discount`}
              fields={[
                { name: 'originalPrice',   label: '元の価格', type: 'number', required: true, unit: '円', placeholder: '例：10000' },
                { name: 'discountPercent', label: '割引率',   type: 'number', required: true, unit: '%',  placeholder: '例：30'    },
              ]}
              resultFields={[
                { key: 'discountAmount', label: '割引額',      unit: '円' },
                { key: 'finalPrice',     label: '割引後の価格', unit: '円' },
                { key: 'savedAmount',    label: '節約額',       unit: '円' },
              ]}
              buttonText="割引価格を計算する"
            />

            <div className={styles.calcCardFootnote}>
              ※ 消費税は含まれていません。税込み価格は割引後の金額に1.10を掛けてください。
            </div>
          </div>

          {/* Reference card — discount tiers */}
          <div className={styles.refCard}>
            <div className={styles.refCardHead}>
              <div className={styles.refCardAccent} />
              <h2 className={styles.refCardTitle}>よくある割引率の目安（10,000円の場合）</h2>
            </div>
            <div className={styles.ageMilestoneGrid}>
              {discountTiers.map(m => (
                <div key={m.label} className={styles.ageMilestone}>
                  <span className={styles.ageMilestoneLabel}>{m.label}</span>
                  <span className={styles.ageMilestoneValue}>{m.value}</span>
                  <span className={styles.ageMilestoneNote}>{m.note}</span>
                </div>
              ))}
            </div>
            <div className={styles.ageLawStrip}>
              <p className={styles.ageLawStripText}>
                <strong>複数割引の注意 —</strong>{' '}
                20%オフ後にさらに10%オフは、合計30%オフではなく28%オフになります。
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* ── KNOWLEDGE ── */}
      <article className={styles.articleSection}>
        <div className={styles.articleInner}>
          <p className={styles.sectionKnowledge}>Knowledge</p>
          <h2 className={styles.sectionH2}>割引計算にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />
          <div className={styles.articleGrid}>
            {articleBlocks.map((block, i) => (
              <div key={i}>
                <h3 className={styles.articleHeading}>{block.title}</h3>
                {block.body.map((p, j) => (
                  <p key={j} className={styles.articleText}>{p}</p>
                ))}
              </div>
            ))}
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

      {/* ── FOOTER ── */}
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