import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '所得税計算 - 課税所得と税額を簡単計算 | MuryoKeisan',
  description: '年収と控除額から所得税を自動計算。課税所得、税額、手取り額を瞬時に表示。確定申告の準備に最適。',
};

const faqItems = [
  { question: '所得税の税率はどのように決まりますか？', answer: '所得税は累進課税制度を採用しており、課税所得が高いほど税率が上がります。税率は5%から45%まで7段階に分かれています。' },
  { question: '所得控除にはどんなものがありますか？', answer: '基礎控除（48万円）、給与所得控除、配偶者控除、扶養控除、社会保険料控除、生命保険料控除、医療費控除などがあります。' },
  { question: '確定申告が必要なのはどんな人ですか？', answer: '給与所得が2,000万円を超える人、副業収入が20万円を超える人、2か所以上から給与を受けている人、医療費控除などを受ける人などが該当します。' },
  { question: '所得税と住民税の違いは何ですか？', answer: '所得税は国税で累進課税、住民税は地方税で一律10%（都道府県税4%+市区町村税6%）です。住民税は前年の所得に基づいて課税されます。' },
  { question: '節税対策にはどんな方法がありますか？', answer: 'iDeCo（個人型確定拠出年金）、ふるさと納税、医療費控除、住宅ローン控除、生命保険料控除などを活用することで、合法的に税負担を軽減できます。' },
];

// 7 progressive tax brackets in Japan
const taxBrackets = [
  { range: '195万円以下',          rate: '5%',  color: '#4caf7d' },
  { range: '195万〜330万円',       rate: '10%', color: '#7ec9a0' },
  { range: '330万〜695万円',       rate: '20%', color: '#c9a96e' },
  { range: '695万〜900万円',       rate: '23%', color: '#c9a96e' },
  { range: '900万〜1,800万円',     rate: '33%', color: '#d97b3a' },
  { range: '1,800万〜4,000万円',   rate: '40%', color: '#c44a3a' },
  { range: '4,000万円超',          rate: '45%', color: '#a83228' },
];

const articleBlocks = [
  {
    title: '所得税の仕組み（累進課税）',
    body: ['所得税は個人の1年間の所得に対して課される国税です。日本の所得税は累進課税制度を採用しており、所得が高いほど税率が上がります。ただし高い税率はその区分の所得にのみ適用されるため、課税所得全体に最高税率が掛かるわけではありません。'],
  },
  {
    title: '課税所得の計算方法',
    body: ['課税所得は総所得金額から所得控除を差し引いて算出します。給与所得者はまず給与収入から給与所得控除（55万〜195万円）を引いて給与所得を求め、次に基礎控除・配偶者控除・社会保険料控除などを差し引いて課税所得を算出します。'],
  },
  {
    title: '主な所得控除の種類',
    body: ['基礎控除（所得2,400万円以下で48万円）、配偶者控除（最大38万円）、扶養控除（1人あたり38〜63万円）、社会保険料控除（全額）、生命保険料控除（最大12万円）、医療費控除（10万円超の医療費）などがあります。'],
  },
  {
    title: '節税対策と確定申告',
    body: ['iDeCoの掛金は全額所得控除の対象で運用益も非課税です。ふるさと納税は自己負担2,000円で寄附額から2,000円を引いた額が控除されます。住宅ローン控除はローン年末残高の0.7%が最大13年間控除されます。確定申告は翌年2月16日〜3月15日に行います。'],
  },
];

export default function IncomeTaxCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── COMPACT HERO ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>所得税計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>税金計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>所得税計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            年収と所得控除額を入力するだけで、課税所得・所得税額・手取り額を瞬時に算出。<br />
            累進課税の複雑な計算を自動で処理します。
          </p>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main>
        <div className={styles.calcSingleCol}>

          {/* Calculator */}
          <div className={styles.calcCardOuter}>
            <div className={styles.calcCardInner}>
              <div className={styles.calcCardHeader}>
                <div className={styles.iconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.calcMeta}>Calculator</p>
                  <h2 className={styles.calcTitle}>数値を入力する</h2>
                </div>
              </div>
              <div className={styles.infoStrip}>
                <strong>計算方法 — </strong>
                課税所得 = 年収 − 給与所得控除 − 所得控除。所得税 = 課税所得 × 累進税率 − 控除額。
              </div>
            </div>

            <CalculatorClient
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/income-tax`}
              fields={[
                { name: 'income',     label: '年収',     type: 'number', required: true, unit: '円', placeholder: '例：5000000' },
                { name: 'deductions', label: '所得控除額', type: 'number', required: true, unit: '円', placeholder: '例：1200000' },
              ]}
              resultFields={[
                { key: 'taxableIncome', label: '課税所得',      unit: '円' },
                { key: 'incomeTax',     label: '所得税額',      unit: '円' },
                { key: 'netIncome',     label: '手取り額（概算）', unit: '円' },
              ]}
              buttonText="所得税を計算する"
            />

            <div className={styles.calcCardFootnote}>
              ※ 住民税・社会保険料は含みません。実際の手取りは勤務先の条件により異なります。
            </div>
          </div>

          {/* Reference card — tax brackets */}
          <div className={styles.refCard}>
            <div className={styles.refCardHead}>
              <div className={styles.refCardAccent} />
              <h2 className={styles.refCardTitle}>所得税の累進税率（2024年度）</h2>
            </div>
            <div className={styles.refCardBody}>
              {taxBrackets.map((b) => (
                <div key={b.range} className={styles.bmiRow}>
                  <div className={styles.bmiRowLeft}>
                    <span className={styles.bmiDot} style={{ background: b.color }} />
                    <span className={styles.bmiLabel}>{b.range}</span>
                  </div>
                  <span className={styles.bmiRange} style={{ color: b.color, fontSize: '0.9rem', fontWeight: 600 }}>{b.rate}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* ── KNOWLEDGE ── */}
      <article className={styles.articleSection}>
        <div className={styles.articleInner}>
          <p className={styles.sectionKnowledge}>Knowledge</p>
          <h2 className={styles.sectionH2}>所得税にまつわる基礎知識</h2>
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