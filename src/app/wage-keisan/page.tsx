import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '時給計算機 - 日給・週給・月給・年収を自動計算｜無料オンラインツール',
  description: '時給・労働時間・週労働日数を入力するだけで、日給・週給・月給・年収を瞬時に計算。アルバイト・パート・派遣の収入シミュレーションに最適な無料ツールです。スマホ対応、登録不要。',
  keywords: '時給計算, 日給, 月給, 年収, アルバイト, パート, 給与計算, 時給計算機, 無料',
};

const faqItems = [
  {
    question: '最低賃金はどのように決まりますか？',
    answer: '最低賃金は都道府県ごとに定められており、毎年10月頃に改定されます。2024年の全国平均は1,054円で、東京都は1,163円です。最低賃金以下での雇用は労働基準法違反となり、使用者には罰則が科されます。自分の時給が最低賃金を下回っていないか必ず確認しましょう。',
  },
  {
    question: '残業代の計算方法を教えてください',
    answer: '通常の残業（1日8時間超・週40時間超）は時給の1.25倍、深夜労働（22時〜翌5時）は1.25倍、休日労働は1.35倍が法定割増率です。深夜残業（時間外＋深夜）は1.5倍となります。例えば時給1,500円の場合、通常残業は1,875円、深夜残業は2,250円になります。',
  },
  {
    question: '年収103万円の壁とは何ですか？',
    answer: '年収103万円を超えると所得税が課税され、配偶者の扶養控除から外れる可能性があります。また106万円で一定条件下の社会保険加入義務、130万円で配偶者の社会保険扶養除外、150万円で配偶者特別控除の段階的減少が始まります。自分の働き方と家庭状況に応じて最適な年収水準を確認しましょう。',
  },
  {
    question: '月給の概算はどのように計算されますか？',
    answer: 'このツールでは「週給 × 52週 ÷ 12ヶ月」（週給 × 4.333）で月給を概算しています。実際の月によって労働日数が異なるため、あくまで目安としてご利用ください。正確な月収は各月の労働日数に日給を掛けて算出してください。',
  },
  {
    question: 'パートとアルバイトの違いは何ですか？',
    answer: '労働法上の区別はなく、どちらも「短時間労働者」として同じ権利が保障されます。一般的にパートは主婦層・継続的勤務のイメージ、アルバイトは学生・短期のイメージがありますが、有給休暇・残業代・社会保険加入権などは同等に適用されます。',
  },
];

const wageWalls = [
  { amount: '103万円', label: '所得税・扶養控除',   color: '#c9a96e' },
  { amount: '106万円', label: '社会保険加入義務',   color: '#e8624a' },
  { amount: '130万円', label: '社会保険扶養除外',   color: '#e87474' },
  { amount: '150万円', label: '配偶者特別控除減少', color: '#74a8e8' },
];

const overtimeRates = [
  { type: '通常残業',   rate: '× 1.25', note: '1日8h・週40h超' },
  { type: '深夜労働',   rate: '× 1.25', note: '22時〜翌5時' },
  { type: '休日労働',   rate: '× 1.35', note: '法定休日' },
  { type: '深夜残業',   rate: '× 1.50', note: '時間外＋深夜' },
];

const relatedCalcs = [
  { href: '/time-keisan',       emoji: '◷', label: '時間計算',       desc: '開始・終了時刻から経過時間を算出' },
  { href: '/bmi-keisan',        emoji: '◉', label: 'BMI計算',        desc: '身長・体重から肥満度を算出' },
  { href: '/percentage-keisan', emoji: '◈', label: 'パーセント計算', desc: '割合・増減率を簡単計算' },
];

export default function WageCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── Hero ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>時給計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>無料計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>時給計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            時給・労働時間・週労働日数を入力するだけで、<br />
            日給・週給・月給・年収を瞬時に計算します。
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
              <h2 className={styles.refCardTitle}>年収の壁と割増賃金率</h2>
            </div>

            {/* 年収の壁 */}
            <div className={styles.refCardBody}>
              {wageWalls.map((w) => (
                <div key={w.amount} className={styles.bmiRow}>
                  <div className={styles.bmiRowLeft}>
                    <span className={styles.bmiDot} style={{ background: w.color }} />
                    <span className={styles.bmiLabel}>{w.label}</span>
                  </div>
                  <span className={styles.bmiRange} style={{ color: w.color }}>{w.amount}</span>
                </div>
              ))}
            </div>

            {/* Overtime rates */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1rem 1.5rem 1rem', background: 'rgba(201,169,110,0.02)' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'rgba(201,169,110,0.45)', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: "'Noto Sans JP', sans-serif" }}>
                法定割増賃金率
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {overtimeRates.map((o) => (
                  <div key={o.type} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 8,
                    padding: '0.55rem 0.875rem',
                  }}>
                    <div>
                      <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '0.8rem', color: '#e8e4df', letterSpacing: '0.03em' }}>{o.type}</span>
                      <span style={{ fontSize: '0.6rem', color: 'rgba(138,134,128,0.5)', marginLeft: 8 }}>{o.note}</span>
                    </div>
                    <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: '1.05rem', color: '#c9a96e', letterSpacing: '0.04em' }}>{o.rate}</span>
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
                      <rect x="2" y="5" width="20" height="14" rx="2"/>
                      <line x1="2" y1="10" x2="22" y2="10"/>
                      <line x1="7" y1="15" x2="7" y2="15" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="12" y1="15" x2="12" y2="15" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="17" y1="15" x2="17" y2="15" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.calcMeta}>Calculator</p>
                    <h2 className={styles.calcTitle}>数値を入力する</h2>
                  </div>
                </div>

                <div className={styles.infoStrip}>
                  <strong>時給計算について — </strong>
                  月給は「週給 × 52 ÷ 12」で概算しています。実際の月収は労働日数により変動します。
                </div>

                <CalculatorClient
                  apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/wage`}
                  fields={[
                    { name: 'hourlyRate',   label: '時給',         type: 'number', placeholder: '1500', unit: '円',  required: true },
                    { name: 'hoursPerDay',  label: '1日の労働時間', type: 'number', placeholder: '8',    unit: '時間', required: true },
                    { name: 'daysPerWeek',  label: '週の労働日数', type: 'number', placeholder: '5',    unit: '日',  required: true },
                  ]}
                  resultFields={[
                    { key: 'dailyWage',   label: '日給',       unit: '円' },
                    { key: 'weeklyWage',  label: '週給',       unit: '円' },
                    { key: 'monthlyWage', label: '月給（概算）', unit: '円' },
                    { key: 'annualWage',  label: '年収（概算）', unit: '円' },
                  ]}
                  buttonText="給与を計算する"
                />

                <div className={styles.footnote}>
                  ※ 月給・年収は概算値です。所得税・社会保険料は含まれていません。
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
          <h2 className={styles.sectionH2}>時給・給与にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />
          <div className={styles.articleGrid}>
            <div>
              <h3 className={styles.articleHeading}>時給から年収への換算</h3>
              <p className={styles.articleText}>
                時給から月給を計算する際は「日給 × 週労働日数 × 4.33」が基本です。例えば時給1,500円・1日8時間・週5日なら、日給12,000円 → 週給60,000円 → 月給約<strong>259,800円</strong> → 年収約<strong>312万円</strong>となります。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>最低賃金制度</h3>
              <p className={styles.articleText}>
                最低賃金は都道府県ごとに毎年10月に改定されます。2024年全国平均は<strong>1,054円</strong>、東京都は1,163円です。アルバイト・パートにも同様に適用され、違反した使用者には50万円以下の罰金が科されます。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>年収の壁を理解する</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: '103万円', text: '所得税課税・配偶者控除に影響' },
                  { label: '106万円', text: '週20h以上等の条件で社会保険加入' },
                  { label: '130万円', text: '配偶者の社会保険扶養から外れる' },
                  { label: '150万円', text: '配偶者特別控除が段階的に減少' },
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
              <h3 className={styles.articleHeading}>時給制 vs 月給制</h3>
              <p className={styles.articleText}>
                時給制は働いた時間が収入に直結し、繁忙期に増収が見込めます。月給制は収入が安定する一方、残業代計算が複雑になることも。<strong>福利厚生・有給・社会保険</strong>の有無も含めて総合的に比較することが大切です。
              </p>
            </div>
            <div className={styles.colSpanFull}>
              <h3 className={styles.articleHeading}>残業代・割増賃金の正しい理解</h3>
              <p className={styles.articleText}>
                労働基準法は、1日8時間・週40時間を超えた労働に割増賃金を義務付けています。通常残業は1.25倍、深夜（22時〜翌5時）は1.25倍、休日は1.35倍、深夜残業（時間外＋深夜）は1.5倍です。給与明細で「残業代」が正しく計算・支給されているか確認し、不備があれば労働基準監督署または「労働条件相談ほっとライン」（0120-811-610）に相談できます。
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