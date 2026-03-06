import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '消費税計算機 - 税込・税抜・消費税額を瞬時に計算｜無料オンラインツール',
  description: '金額と税率を入力するだけで、税込価格・税抜価格・消費税額を瞬時に計算。標準税率10%・軽減税率8%に対応。インボイス制度・端数処理の解説付き。スマホ対応、登録不要。',
  keywords: '消費税計算, 税込, 税抜, 軽減税率, インボイス, 消費税額, 消費税計算機, 無料',
};

const faqItems = [
  {
    question: '消費税率は何%ですか？標準税率と軽減税率の違いは？',
    answer: '日本の消費税率は標準税率10%と軽減税率8%の2段階です。食料品（酒類・外食を除く）と新聞（週2回以上発行で定期購読契約）には8%の軽減税率が適用されます。それ以外の一般的な商品・サービスはすべて10%が対象です。',
  },
  {
    question: '税込価格から税抜価格を計算するには？',
    answer: '税込価格を1.10（10%の場合）または1.08（8%の場合）で割ることで税抜価格を算出できます。例：11,000円 ÷ 1.10 = 10,000円（税抜）。このツールでは税込・税抜どちらの入力にも対応しています。',
  },
  {
    question: '端数処理はどうすればいいですか？',
    answer: '消費税の端数処理に法律上の統一規定はありません。事業者ごとに切り捨て・切り上げ・四捨五入のいずれかを選択し、社内で統一することが重要です。インボイス制度では1インボイスあたり税率ごとに1回の端数処理が認められています。',
  },
  {
    question: '軽減税率の対象品目はどのように判断しますか？',
    answer: '飲食料品（酒類・外食・ケータリングを除く）と新聞（週2回以上発行・定期購読契約）が軽減税率8%の対象です。テイクアウトは8%、イートインは10%と、同じ商品でも提供方法によって税率が変わる点に注意が必要です。',
  },
  {
    question: 'インボイス制度とは何ですか？何が変わりましたか？',
    answer: '2023年10月から開始された適格請求書等保存方式（インボイス制度）では、仕入税額控除を受けるために適格請求書（インボイス）の受領・保存が必要になりました。発行には税務署への登録が必要で、登録番号・税率ごとの消費税額・適用税率の明記が義務付けられています。',
  },
];

/* ── Reference data ── */
const taxRateCards = [
  {
    rate: '10%',
    label: '標準税率',
    note: '一般商品・サービス全般',
    multiplier: '× 1.10',
    divider: '÷ 1.10',
    color: '#e8624a',
  },
  {
    rate: '8%',
    label: '軽減税率',
    note: '食料品（酒・外食除く）・新聞',
    multiplier: '× 1.08',
    divider: '÷ 1.08',
    color: '#4caf7d',
  },
];

const calcExamples = [
  { label: '1,000円の商品（10%）',  tax: '100円',   total: '1,100円' },
  { label: '5,000円の食品（8%）',   tax: '400円',   total: '5,400円' },
  { label: '100,000円の家電（10%）', tax: '10,000円', total: '110,000円' },
  { label: '3,240円の税込価格（10%）', tax: '294円', total: '税抜 2,945円' },
];

const invoiceRequirements = [
  { item: '発行者の氏名または名称',   required: true  },
  { item: '登録番号（T+13桁）',       required: true  },
  { item: '取引年月日',               required: true  },
  { item: '取引内容（軽減税率の旨）', required: true  },
  { item: '税率ごとの合計額と消費税額', required: true },
  { item: '受領者の氏名または名称',   required: true  },
];

const relatedCalcs = [
  { href: '/discount-keisan',    emoji: '◐', label: '割引計算',       desc: '割引率から割引後の価格を算出' },
  { href: '/percentage-keisan',  emoji: '◈', label: 'パーセント計算', desc: '割合・増減率を簡単計算' },
  { href: '/income-tax-keisan',  emoji: '◉', label: '所得税計算',     desc: '課税所得から所得税額を算出' },
];

export default function TaxCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── Hero ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>消費税計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>無料計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>軽減税率対応</span>
          </div>
          <h1 className={styles.heroTitle}>消費税計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            金額と税率を入力するだけで、税込・税抜・消費税額を瞬時に算出。<br />
            標準10%・軽減8%、インボイス制度にも完全対応します。
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
              <h2 className={styles.refCardTitle}>税率・計算式の早見表</h2>
            </div>

            {/* Tax rate cards */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {taxRateCards.map((t) => (
                <div key={t.rate} style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: `1px solid ${t.color}25`,
                  borderTop: `2px solid ${t.color}60`,
                  borderRadius: 12,
                  padding: '1rem 1.25rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        fontFamily: "'DM Serif Display',Georgia,serif",
                        fontSize: '1.75rem', color: t.color, lineHeight: 1,
                      }}>{t.rate}</span>
                      <div>
                        <div style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '0.85rem', color: '#e8e4df', fontWeight: 600, letterSpacing: '0.04em' }}>{t.label}</div>
                        <div style={{ fontSize: '0.62rem', color: 'rgba(138,134,128,0.55)', marginTop: 2 }}>{t.note}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '0.45rem 0.75rem' }}>
                      <div style={{ fontSize: '0.58rem', color: 'rgba(138,134,128,0.5)', letterSpacing: '0.08em', marginBottom: 3 }}>税抜 → 税込</div>
                      <div style={{ fontFamily: "'Noto Sans JP',monospace", fontSize: '0.8rem', color: t.color }}>{t.multiplier}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '0.45rem 0.75rem' }}>
                      <div style={{ fontSize: '0.58rem', color: 'rgba(138,134,128,0.5)', letterSpacing: '0.08em', marginBottom: 3 }}>税込 → 税抜</div>
                      <div style={{ fontFamily: "'Noto Sans JP',monospace", fontSize: '0.8rem', color: t.color }}>{t.divider}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick examples */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1rem 1.5rem 0', background: 'rgba(201,169,110,0.02)' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'rgba(201,169,110,0.45)', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: "'Noto Sans JP', sans-serif" }}>
                計算例
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingBottom: '1rem' }}>
                {calcExamples.map((ex) => (
                  <div key={ex.label} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto auto',
                    alignItems: 'center', gap: '0.625rem',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 8, padding: '0.5rem 0.875rem',
                  }}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(232,228,223,0.55)', fontFamily: "'Noto Serif JP',serif" }}>{ex.label}</span>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(201,169,110,0.5)', fontFamily: "'Noto Sans JP',monospace", whiteSpace: 'nowrap' }}>税{ex.tax}</span>
                    <span style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: '0.95rem', color: '#c9a96e', whiteSpace: 'nowrap' }}>{ex.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoice checklist */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1rem 1.5rem 1.25rem', background: 'rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'rgba(201,169,110,0.45)', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: "'Noto Sans JP', sans-serif" }}>
                インボイス必須記載事項
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {invoiceRequirements.map((r) => (
                  <div key={r.item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(76,175,125,0.15)', border: '1px solid rgba(76,175,125,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.55rem', color: '#4caf7d',
                    }}>✓</div>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(232,228,223,0.6)', fontFamily: "'Noto Serif JP',serif", letterSpacing: '0.02em' }}>{r.item}</span>
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
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      <path d="M12 6v6l4 2"/>
                      <text x="7" y="14" fontSize="7" fill="#c9a96e" stroke="none" fontFamily="sans-serif">¥</text>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.calcMeta}>Calculator</p>
                    <h2 className={styles.calcTitle}>金額を入力する</h2>
                  </div>
                </div>

                {/* infoStrip with inline examples */}
                <div className={styles.infoStrip}>
                  <strong>消費税計算について — </strong>
                  税抜価格から税込を求めるには税率を選んで入力してください。税込から逆算も可能です。
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {[
                      { label: '標準税率 10%', eg: '10,000円 → 税込', ans: '11,000円' },
                      { label: '軽減税率 8%',  eg: '10,000円 → 税込', ans: '10,800円' },
                    ].map(ex => (
                      <div key={ex.label} style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 8, padding: '0.5rem 0.75rem',
                      }}>
                        <div style={{ fontSize: '0.6rem', color: 'rgba(201,169,110,0.5)', letterSpacing: '0.1em', marginBottom: 4 }}>{ex.label}</div>
                        <div style={{ fontFamily: "'Noto Sans JP',monospace", fontSize: '0.73rem', color: 'rgba(232,228,223,0.65)' }}>{ex.eg}</div>
                        <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: '1.05rem', color: '#c9a96e', marginTop: 2 }}>{ex.ans}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <CalculatorClient
                  apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/tax`}
                  fields={[
                    {
                      name: 'amount',
                      label: '金額',
                      type: 'number',
                      placeholder: '10000',
                      unit: '円',
                      required: true,
                    },
                    {
                      name: 'rate',
                      label: '税率',
                      type: 'select',
                      required: true,
                      defaultValue: '10',
                      options: [
                        { value: '10', label: '10%（標準税率）' },
                        { value: '8',  label: '8%（軽減税率）' },
                      ],
                    },
                  ]}
                  resultFields={[
                    { key: 'taxAmount',        label: '消費税額',  unit: '円' },
                    { key: 'totalWithTax',     label: '税込価格',  unit: '円' },
                    { key: 'totalWithoutTax',  label: '税抜価格',  unit: '円' },
                  ]}
                  buttonText="消費税を計算する"
                />

                {/* Tax rate quick-switch hint */}
                <div style={{
                  marginTop: 20,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  padding: '0.875rem 1.25rem',
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', color: '#c9a96e',
                  }}>!</div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(201,169,110,0.7)', fontFamily: "'Noto Serif JP',serif", lineHeight: 1.7, margin: 0 }}>
                      <strong style={{ color: 'rgba(201,169,110,0.9)' }}>軽減税率（8%）の対象：</strong>
                      食料品（酒類・外食を除く）、定期購読の新聞。テイクアウトは8%、イートインは10%と提供方法によって変わります。
                    </p>
                  </div>
                </div>

                <div className={styles.footnote}>
                  ※ 端数は小数点以下を切り捨てて表示しています。事業者ごとの端数処理方針に合わせてご確認ください。
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
          <h2 className={styles.sectionH2}>消費税にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />
          <div className={styles.articleGrid}>
            <div>
              <h3 className={styles.articleHeading}>消費税の計算式</h3>
              <p className={styles.articleText}>
                税込価格は「税抜価格 × 1.10」（10%の場合）で求まります。例えば税抜10,000円なら税込<strong>11,000円</strong>、消費税額は<strong>1,000円</strong>です。逆算は税込価格 ÷ 1.10 で税抜価格が得られます。軽減税率8%の場合は1.08を使います。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>軽減税率の判断基準</h3>
              <p className={styles.articleText}>
                同じ食品でも<strong>テイクアウト（持ち帰り）は8%</strong>、<strong>イートイン（店内飲食）は10%</strong>と税率が変わります。コンビニのイートインスペース利用も10%対象です。判断に迷う場合は事業者がお客様に確認する義務があります。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>端数処理の3パターン</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: '切り捨て', text: '最も一般的。消費者に有利な処理方法' },
                  { label: '切り上げ', text: '事業者が端数分を多く受け取る方法' },
                  { label: '四捨五入', text: '0.5以上で繰り上げ、統計的に公平' },
                  { label: 'インボイス', text: '1インボイスにつき税率ごとに1回のみ端数処理可' },
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
              <h3 className={styles.articleHeading}>総額表示義務とは</h3>
              <p className={styles.articleText}>
                消費者向けの価格表示は<strong>税込価格を必ず表示</strong>する義務があります（2021年4月〜完全義務化）。「10,000円＋税」のみの表示は違反です。税抜価格を併記する場合も税込価格を明瞭に表示する必要があります。
              </p>
            </div>
            <div className={styles.colSpanFull}>
              <h3 className={styles.articleHeading}>インボイス制度（適格請求書等保存方式）の概要</h3>
              <p className={styles.articleText}>
                2023年10月から開始されたインボイス制度では、仕入税額控除を受けるために<strong>適格請求書（インボイス）</strong>の受領・保存が必要です。発行するには税務署へ登録し「T+13桁の登録番号」を取得する必要があります。記載が必要な項目は、発行者の氏名・登録番号・取引年月日・取引内容・税率ごとの税額・受領者名の6点です。登録番号がない事業者（免税事業者）からの仕入れは、仕入税額控除に制限が生じるため、取引先の登録状況を確認しましょう。
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