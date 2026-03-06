import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '固定資産税計算機 - 年間税額と納付額を簡単計算｜無料オンラインツール',
  description: '固定資産税評価額と税率を入力するだけで、年間の固定資産税額と四半期ごとの納付額を瞬時に計算。住宅用地の軽減措置も考慮した詳細な税額をお届けします。不動産購入・管理に役立つ無料ツールです。スマホ対応、登録不要。',
  keywords: '固定資産税, 計算, 評価額, 税率, 不動産, 住宅, 税額計算, 固定資産税計算機, 無料',
};

const faqItems = [
  {
    question: '固定資産税とは何ですか？どのように計算されますか？',
    answer: '固定資産税は、土地や建物などの固定資産を所有している人に課される地方税です。毎年1月1日時点の所有者が納税義務者となり、市町村に納付します。計算式は「固定資産税評価額 × 税率」で、標準税率は1.4%です。例えば評価額2,000万円の場合、2,000万円 × 1.4% = 28万円が年間税額となります。',
  },
  {
    question: '固定資産税評価額はどのように決まりますか？',
    answer: '固定資産税評価額は、市町村が3年ごとに評価替えを行い決定します。土地は公示価格（国土交通省が発表する標準地の価格）の約70%が目安とされています。建物の評価額は、再建築価格（同じ建物を新築する場合の費用）から経年劣化を考慮した額となり、一般的に再建築価格の50〜70%程度です。評価額は固定資産税納税通知書に記載されており、市町村の固定資産課税台帳で確認することもできます。',
  },
  {
    question: '固定資産税の軽減措置にはどのようなものがありますか？',
    answer: '代表的な軽減措置として、①新築住宅の軽減（一定要件を満たせば3年間、マンションは5年間、税額が1/2に軽減）、②小規模住宅用地の軽減（200㎡以下の部分は課税標準が評価額の1/6）、③一般住宅用地の軽減（200㎡超の部分は課税標準が評価額の1/3）があります。これらの軽減措置により、実際の税負担は大幅に軽減されることが多いです。',
  },
  {
    question: '固定資産税はいつ、どのように支払うのですか？',
    answer: '通常、年4回（4月・7月・12月・翌年2月）に分けて納付します。納付期限は市町村によって異なるため、送付される納税通知書で確認しましょう。一括払いも可能で、自治体によっては早期納付割引が適用される場合があります。納付方法は、金融機関・コンビニでの現金払い、口座振替、クレジットカード払い、スマートフォン決済など多様な選択肢があります。',
  },
  {
    question: '都市計画税とは何ですか？固定資産税と合算されますか？',
    answer: '都市計画税は、都市計画区域内（市街化区域）の土地・建物に対して課される税金です。税率は最大0.3%で、固定資産税と合わせて納税通知書に記載されます。対象かどうかは市町村によって異なるため、購入予定の土地・建物が都市計画区域内にあるか確認することが重要です。固定資産税と都市計画税を合算すると実質税率は最大1.7%となります。',
  },
];

const taxRates = [
  { label: '標準税率',     rate: '1.4%',  note: '全国共通の基準',     color: '#4caf7d' },
  { label: '都市計画税',   rate: '最大0.3%', note: '市街化区域に加算', color: '#c9a96e' },
  { label: '実質最大',     rate: '1.7%',  note: '固定資産税＋都計税', color: '#e8624a' },
  { label: '軽減後（小規模住宅）', rate: '×1/6', note: '200㎡以下の住宅地', color: '#74a8e8' },
];

const taxBreakdown = [
  { label: '4月', desc: '第1期納付' },
  { label: '7月', desc: '第2期納付' },
  { label: '12月', desc: '第3期納付' },
  { label: '翌2月', desc: '第4期納付' },
];

const relatedCalcs = [
  { href: '/bmi-keisan',        emoji: '◉', label: 'BMI計算',        desc: '身長・体重から肥満度を算出' },
  { href: '/age-keisan',        emoji: '◷', label: '年齢計算',       desc: '生年月日から正確な年齢を算出' },
  { href: '/percentage-keisan', emoji: '◈', label: 'パーセント計算', desc: '割合・増減率を簡単計算' },
];

export default function PropertyTaxCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── Hero ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>固定資産税計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>無料計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>固定資産税計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            固定資産税評価額と税率を入力するだけで、年間税額と<br />
            四半期ごとの納付額を瞬時に計算します。
          </p>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main>
        <div className={`${styles.mainLayout} ${styles.animateIn}`}>

          {/* ── Reference Card: 税率早見表 ── */}
          <div className={styles.refCard}>
            <div className={styles.refCardHead}>
              <div className={styles.refCardAccent} />
              <h2 className={styles.refCardTitle}>固定資産税の税率区分</h2>
            </div>

            {/* Tax rate rows */}
            <div className={styles.refCardBody}>
              {taxRates.map((r) => (
                <div key={r.label} className={styles.bmiRow}>
                  <div className={styles.bmiRowLeft}>
                    <span className={styles.bmiDot} style={{ background: r.color }} />
                    <span className={styles.bmiLabel}>{r.label}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className={styles.bmiRange} style={{ color: r.color }}>{r.rate}</span>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(138,134,128,0.55)', letterSpacing: '0.05em', marginTop: 2 }}>{r.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/*납付 schedule strip */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              padding: '1rem 1.5rem 0.5rem',
              background: 'rgba(201,169,110,0.02)',
            }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'rgba(201,169,110,0.45)', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: "'Noto Sans JP', sans-serif" }}>
                年間納付スケジュール
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem' }}>
                {taxBreakdown.map((t) => (
                  <div key={t.label} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 8,
                    padding: '0.6rem 0.5rem',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '1rem', fontWeight: 600, color: '#c9a96e', lineHeight: 1 }}>{t.label}</div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(138,134,128,0.6)', marginTop: 4, letterSpacing: '0.04em' }}>{t.desc}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.65rem', color: 'rgba(138,134,128,0.4)', marginTop: '0.75rem', lineHeight: 1.6, fontFamily: "'Noto Serif JP', serif", paddingBottom: '0.5rem' }}>
                ※ 納付期限は市町村によって異なります。一括払いも可能です。
              </p>
            </div>
          </div>

          {/* ── Calculator Card ── */}
          <div className={styles.calcCardOuter}>
            <div className={styles.wrap}>
              <div className={styles.card}>
                {/* Card header */}
                <div className={styles.calcCardHeader}>
                  <div className={styles.iconBox}>
                    {/* House / property icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9.75L12 3l9 6.75V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.75z"/>
                      <path d="M9 22V12h6v10"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.calcMeta}>Calculator</p>
                    <h2 className={styles.calcTitle}>数値を入力する</h2>
                  </div>
                </div>

                {/* Info strip */}
                <div className={styles.infoStrip}>
                  <strong>固定資産税計算について — </strong>
                  評価額に標準税率1.4%を乗じた額が基本税額です。住宅用地の軽減措置や都市計画税が別途適用される場合があります。
                </div>

                {/* Calculator */}
                <CalculatorClient
                  apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/property-tax`}
                  fields={[
                    {
                      name: 'assessedValue',
                      label: '固定資産税評価額',
                      type: 'number',
                      placeholder: '20000000',
                      unit: '円',
                      required: true,
                    },
                    {
                      name: 'taxRate',
                      label: '税率',
                      type: 'number',
                      placeholder: '1.4',
                      unit: '%',
                      required: true,
                      defaultValue: '1.4',
                    },
                  ]}
                  resultFields={[
                    { key: 'annualTax',    label: '年間税額',     unit: '円' },
                    { key: 'quarterlyTax', label: '四半期納付額', unit: '円' },
                  ]}
                  buttonText="固定資産税を計算する"
                />

                {/* Footnote */}
                <div className={styles.footnote}>
                  ※ 住宅用地の軽減措置・都市計画税は別途考慮が必要です。あくまで参考値としてご活用ください。
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
          <h2 className={styles.sectionH2}>固定資産税にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />

          <div className={styles.articleGrid}>
            <div>
              <h3 className={styles.articleHeading}>固定資産税の計算方法</h3>
              <p className={styles.articleText}>
                固定資産税は「固定資産税評価額 × 税率」で算出されます。標準税率は1.4%で、例えば評価額2,000万円の場合、2,000万円 × 1.4% = <strong>年間28万円</strong>が目安となります。評価額は市町村が3年ごとに評価替えを行い、公示価格の約70%（土地）または再建築価格の50〜70%（建物）が基準です。
              </p>
            </div>

            <div>
              <h3 className={styles.articleHeading}>住宅用地の軽減特例</h3>
              <p className={styles.articleText}>
                住宅用地には強力な軽減措置が設けられています。<strong>小規模住宅用地</strong>（200㎡以下）は課税標準が評価額の1/6に、<strong>一般住宅用地</strong>（200㎡超）は1/3に軽減されます。実質的な税負担は大幅に減少するため、住宅購入時の維持費試算では必ず確認が必要です。
              </p>
            </div>

            <div>
              <h3 className={styles.articleHeading}>固定資産税が影響する場面</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: '不動産購入',    text: '物件価格以外の年間維持コストとして必ず試算' },
                  { label: '賃貸経営',      text: '収益物件では経費として損益計算に算入可能' },
                  { label: '相続・贈与',    text: '評価額が相続税・贈与税の基礎控除に影響する' },
                  { label: '空き家管理',    text: '特定空家指定で軽減措置が外れ税額が最大6倍に' },
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
              <h3 className={styles.articleHeading}>都市計画税との関係</h3>
              <p className={styles.articleText}>
                都市計画区域（市街化区域）内の土地・建物には、固定資産税に加えて<strong>都市計画税（最大0.3%）</strong>が課されます。固定資産税と合算すると実質税率は最大1.7%となります。対象エリアかどうかは物件の登記簿や市町村窓口で確認できます。
              </p>
            </div>

            <div className={styles.colSpanFull}>
              <h3 className={styles.articleHeading}>固定資産税の納付と節税対策</h3>
              <p className={styles.articleText}>
                固定資産税は年4回（4月・7月・12月・翌年2月）に分割納付するのが一般的ですが、一括払いも可能です。節税対策としては、①評価額に疑問がある場合の審査申出制度の活用、②住宅用地特例の正確な適用確認、③リフォームによる新築特例の取得、④農地転用を伴わない農地保有などが有効です。不動産を所有する場合は毎年の税負担を正確に把握し、キャッシュフロー計画に組み込むことが重要です。
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

      {/* ── Footer ── */}
      <footer className={styles.siteFooter}>
        <p className={styles.footerText}>© MuryoKeisan — 無料計算サイト</p>
      </footer>

      {/* ── JSON-LD FAQ ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map(item => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }),
        }}
      />
    </div>
  );
}