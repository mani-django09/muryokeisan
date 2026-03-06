import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '失業保険計算機 - 基本手当日額・給付日数を瞬時に計算｜無料オンラインツール',
  description: '離職前の平均日給・年齢・被保険者期間を入力するだけで、失業保険の基本手当日額・給付日数・総給付額を瞬時に計算。退職後の生活設計に役立つ無料ツールです。スマホ対応、登録不要。',
  keywords: '失業保険, 計算, 基本手当, 給付日数, 雇用保険, 失業給付, 失業保険計算機, 無料',
};

const faqItems = [
  {
    question: '失業保険の受給資格はどのように決まりますか？',
    answer: '離職日以前2年間に、雇用保険の被保険者期間が通算12か月以上あることが必要です。会社都合退職（倒産・解雇等）の場合は、離職日以前1年間に6か月以上で受給資格が得られます。なお、週20時間以上・31日以上の雇用見込みがある方が被保険者の対象です。',
  },
  {
    question: '失業保険はいつから受け取れますか？',
    answer: '自己都合退職の場合、待期期間7日＋給付制限2か月（5年間のうち2回目以降は3か月）後から受給開始です。会社都合退職の場合は待期期間7日後から即受給できます。受給期間は離職日の翌日から原則1年間のため、申請は早めに行いましょう。',
  },
  {
    question: '失業保険受給中にアルバイトはできますか？',
    answer: 'はい、週20時間未満であれば可能です。1日4時間未満の労働なら基本手当は全額支給されます。4時間以上働いた日はその日分の手当が支給されず給付日数が後ろへスライドします。必ずハローワークへ申告し、不正受給は返還＋3倍加算の厳しいペナルティがあります。',
  },
  {
    question: '給付日数はどのように決まりますか？',
    answer: '離職理由（自己都合・会社都合）、年齢、被保険者期間の3要素で決まります。自己都合退職は最大150日、会社都合退職は年齢・被保険者期間によって最大330日まで設定されています。特定受給資格者（倒産・解雇等）は給付日数が優遇されます。',
  },
  {
    question: '再就職手当とは何ですか？失業保険と何が違いますか？',
    answer: '失業保険（基本手当）は失業中に継続支給される手当です。再就職手当は、所定給付日数の3分の1以上を残して早期再就職した場合に、残日数の60〜70%を一時金として受け取れる制度です。早期再就職には積極的に活用しましょう。',
  },
];

const benefitDaysTable = [
  { reason: '自己都合',   period: '1〜10年', days: '90日',  color: '#74a8e8' },
  { reason: '自己都合',   period: '10〜20年', days: '120日', color: '#74a8e8' },
  { reason: '自己都合',   period: '20年以上', days: '150日', color: '#74a8e8' },
  { reason: '会社都合',   period: '1〜5年',  days: '90〜180日', color: '#4caf7d' },
  { reason: '会社都合45歳以上', period: '20年以上', days: '最大330日', color: '#c9a96e' },
];

const timeline = [
  { step: '01', label: 'ハローワーク申請',   note: '離職票を持参・求職申込み' },
  { step: '02', label: '待期期間（7日）',     note: '全員に適用される待機' },
  { step: '03', label: '給付制限（自己都合）', note: '2か月（3か月）の制限期間' },
  { step: '04', label: '認定日・受給開始',    note: '4週ごとの失業認定' },
  { step: '05', label: '再就職手当申請',      note: '早期再就職で残日数を一時金化' },
];

const relatedCalcs = [
  { href: '/jikyu-keisan',      emoji: '◈', label: '時給計算',       desc: '時給から日給・月給・年収を算出' },
  { href: '/time-keisan',       emoji: '◷', label: '時間計算',       desc: '開始・終了時刻から経過時間を算出' },
  { href: '/percentage-keisan', emoji: '◉', label: 'パーセント計算', desc: '割合・増減率を簡単計算' },
];

export default function UnemploymentCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── Hero ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>失業保険計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>無料計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>失業保険計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            平均日給・年齢・被保険者期間を入力するだけで、<br />
            基本手当日額・給付日数・総給付額を瞬時に算出します。
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
              <h2 className={styles.refCardTitle}>給付日数の目安</h2>
            </div>

            {/* Table rows */}
            <div className={styles.refCardBody}>
              {benefitDaysTable.map((r, i) => (
                <div key={i} className={styles.bmiRow}>
                  <div className={styles.bmiRowLeft}>
                    <span className={styles.bmiDot} style={{ background: r.color }} />
                    <div>
                      <span className={styles.bmiLabel}>{r.reason}</span>
                      <div style={{ fontSize: '0.6rem', color: 'rgba(138,134,128,0.5)', letterSpacing: '0.04em', marginTop: 2 }}>{r.period}</div>
                    </div>
                  </div>
                  <span className={styles.bmiRange} style={{ color: r.color }}>{r.days}</span>
                </div>
              ))}
            </div>

            {/* Procedure timeline */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1rem 1.5rem 1rem', background: 'rgba(201,169,110,0.02)' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: 'rgba(201,169,110,0.45)', textTransform: 'uppercase', marginBottom: '0.875rem', fontFamily: "'Noto Sans JP', sans-serif" }}>
                受給までの流れ
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {timeline.map((t) => (
                  <div key={t.step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.55rem', color: 'rgba(201,169,110,0.7)', fontFamily: "'Noto Sans JP',sans-serif", letterSpacing: 0,
                    }}>{t.step}</div>
                    <div>
                      <span style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '0.8rem', color: '#e8e4df', fontWeight: 600 }}>{t.label}</span>
                      <span style={{ fontSize: '0.62rem', color: 'rgba(138,134,128,0.55)', marginLeft: 8 }}>{t.note}</span>
                    </div>
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.calcMeta}>Calculator</p>
                    <h2 className={styles.calcTitle}>数値を入力する</h2>
                  </div>
                </div>

                <div className={styles.infoStrip}>
                  <strong>失業保険計算について — </strong>
                  基本手当日額は賃金日額に給付率（45〜80%）を乗じて算出します。年齢・賃金区分で上限額が異なります。
                </div>

                <CalculatorClient
                  apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/unemployment`}
                  fields={[
                    { name: 'dailyWage',   label: '離職前6ヶ月の平均日給', type: 'number', placeholder: '12000', unit: '円', required: true },
                    { name: 'age',         label: '年齢',                  type: 'number', placeholder: '35',    unit: '歳', required: true },
                    { name: 'yearsWorked', label: '被保険者期間',          type: 'number', placeholder: '5',     unit: '年', required: true },
                  ]}
                  resultFields={[
                    { key: 'dailyBenefit', label: '基本手当日額', unit: '円' },
                    { key: 'benefitDays',  label: '給付日数',     unit: '日' },
                    { key: 'totalBenefit', label: '総給付額',     unit: '円' },
                  ]}
                  buttonText="失業保険を計算する"
                />

                <div className={styles.footnote}>
                  ※ 本ツールの結果はあくまで概算です。正確な金額はハローワークにてご確認ください。
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
          <h2 className={styles.sectionH2}>失業保険にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />
          <div className={styles.articleGrid}>
            <div>
              <h3 className={styles.articleHeading}>基本手当日額の計算方法</h3>
              <p className={styles.articleText}>
                基本手当日額は「離職前6か月の賃金総額 ÷ 180」で求めた賃金日額に、給付率（45〜80%）を乗じます。賃金が低いほど給付率が高く設定されており、年齢区分（〜29歳・30〜44歳・45〜59歳・60〜64歳）ごとに<strong>上限額</strong>が定められています。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>自己都合と会社都合の違い</h3>
              <p className={styles.articleText}>
                会社都合退職（倒産・整理解雇・ハラスメント等）は<strong>特定受給資格者</strong>として扱われ、給付制限なし・給付日数の大幅優遇が受けられます。自己都合でも「正当な理由」があれば特定理由離職者として扱われる場合があるため、ハローワークへの相談が重要です。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>受給中の注意事項</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: '就職活動実績',   text: '認定日までに原則2回以上の求職活動が必要' },
                  { label: 'アルバイト申告', text: '週20時間未満でも必ずハローワークへ申告' },
                  { label: '不正受給',       text: '返還＋3倍加算の厳しいペナルティあり' },
                  { label: '受給期間延長',   text: '病気・妊娠時は最大3年間の延長申請が可能' },
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
              <h3 className={styles.articleHeading}>再就職手当の活用</h3>
              <p className={styles.articleText}>
                所定給付日数の<strong>3分の1以上</strong>を残して再就職すると残日数の60%、<strong>3分の2以上</strong>残すと70%が一時金として支給されます。早期再就職を積極的に目指すことで、トータルの受取額が増える可能性があります。
              </p>
            </div>
            <div className={styles.colSpanFull}>
              <h3 className={styles.articleHeading}>失業保険を受給できないケースと対処法</h3>
              <p className={styles.articleText}>
                病気・ケガ・妊娠・出産・育児などですぐに就職できない場合、そのままでは受給できませんが<strong>受給期間延長申請</strong>（最大3年）で権利を保全できます。自営業開始・役員就任・求職活動の不実施なども受給停止事由です。判断に迷う場合は必ずハローワーク（全国0120-985-268）に事前相談しましょう。
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