import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '日数計算 - 2つの日付間の日数を計算 | MuryoKeisan',
  description: '2つの日付間の日数を簡単に計算できる無料ツール。営業日計算、期間計算、年齢計算など様々な用途に対応。',
};

const faqItems = [
  { question: '営業日だけを計算することはできますか？', answer: 'このツールは暦日（カレンダー上の日数）を計算します。営業日計算には土日祝日を除く必要があるため、別途営業日計算ツールをご利用ください。' },
  { question: '過去の日付から今日までの日数を計算できますか？', answer: 'はい、可能です。開始日に過去の日付を入力し、終了日に今日の日付を入力することで、経過日数を計算できます。' },
  { question: '計算結果が1日ずれることがあるのはなぜですか？', answer: '日数計算には「当日を含む」か「当日を含まない」かの違いがあります。このツールは開始日を含まず、終了日を含む計算方式を採用しています。' },
  { question: '年をまたいだ日数計算はできますか？', answer: 'はい、年をまたいだ計算も正確に行えます。うるう年も自動的に考慮されます。' },
  { question: '日数計算はどのような場面で使われますか？', answer: '契約期間の計算、プロジェクトの工期計算、賞味期限までの日数確認、記念日までのカウントダウンなど、様々な場面で活用されています。' },
];

const articleBlocks = [
  {
    title: '日数計算ツールとは？',
    body: [
      '日数計算ツールは、2つの日付を指定するだけで、その間の日数を自動的に計算します。契約期間の確認、プロジェクトの工期管理、イベントまでのカウントダウンなど、日常生活やビジネスシーンで頻繁に必要となる計算を瞬時に行います。うるう年も自動的に考慮されるため、正確な日数を簡単に把握できます。',
    ],
  },
  {
    title: '日数計算の方法',
    body: [
      '日数計算は、終了日から開始日を引くことで求められます。ただし、「当日を含むか含まないか」によって結果が1日異なる場合があります。このツールは、開始日を含まず終了日を含む方式で計算しています。',
      '例えば、1月1日から1月10日までの日数は、10 − 1 = 9日となります。うるう年の場合、2月は29日まであるため、年をまたぐ計算では自動的に調整されます。',
    ],
  },
  {
    title: 'ビジネスでの活用方法',
    body: [
      '契約書には「契約締結日から90日間」といった期間指定が多く見られます。このツールを使えば、契約終了日を正確に把握できます。また、プロジェクト管理では、開始日と納期から実働日数を算出し、スケジュール調整に活用できます。賞味期限管理や在庫管理でも、製造日から何日経過したかを瞬時に確認できます。',
    ],
  },
  {
    title: '日数計算の注意点',
    body: [
      '日数計算では、開始日と終了日の扱いに注意が必要です。「当日を含む」か「当日を含まない」かで結果が異なります。契約書や法令では、起算日の扱いが明確に定められている場合があるため、重要な計算では必ず確認してください。また、時差のある国際的な取引では、タイムゾーンの違いにも注意が必要です。',
    ],
  },
];

export default function DaysCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── COMPACT HERO ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>日数計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>日付計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>日数計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            2つの日付を選ぶだけで、間の日数・週数・月数を瞬時に算出。<br />
            うるう年も自動的に考慮されます。
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
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <line x1="8" y1="14" x2="16" y2="14"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.calcMeta}>Calculator</p>
                  <h2 className={styles.calcTitle}>日付を選択する</h2>
                </div>
              </div>
              <div className={styles.infoStrip}>
                <strong>日数計算について — </strong>
                開始日を含まず終了日を含む方式で計算します。年をまたぐ計算・うるう年にも対応しています。
              </div>
            </div>

            <CalculatorClient
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/days`}
              fields={[
                { name: 'startDate', label: '開始日', type: 'date', required: true },
                { name: 'endDate',   label: '終了日', type: 'date', required: true },
              ]}
              resultFields={[
                { key: 'days',   label: '日数',      unit: '日'  },
                { key: 'weeks',  label: '週数',      unit: '週'  },
                { key: 'months', label: '月数（概算）', unit: 'ヶ月' },
              ]}
              buttonText="日数を計算する"
            />

            <div className={styles.calcCardFootnote}>
              ※ 開始日は含まず、終了日を含む計算方式です。重要な用途では必ず条件をご確認ください。
            </div>
          </div>

          {/* Quick reference below calculator */}
          <div className={styles.refCard}>
            <div className={styles.refCardHead}>
              <div className={styles.refCardAccent} />
              <h2 className={styles.refCardTitle}>よく使われる期間の目安</h2>
            </div>
            <div className={styles.ageMilestoneGrid}>
              {[
                { label: '1週間',   value: '7日',   note: '7 days' },
                { label: '1ヶ月',   value: '30日',  note: '約 30 days' },
                { label: '3ヶ月',   value: '90日',  note: '約 90 days' },
                { label: '半年',    value: '180日', note: '約 180 days' },
                { label: '1年',     value: '365日', note: '平年' },
                { label: 'うるう年', value: '366日', note: '2月29日あり' },
              ].map(m => (
                <div key={m.label} className={styles.ageMilestone}>
                  <span className={styles.ageMilestoneLabel}>{m.label}</span>
                  <span className={styles.ageMilestoneValue}>{m.value}</span>
                  <span className={styles.ageMilestoneNote}>{m.note}</span>
                </div>
              ))}
            </div>
            <div className={styles.ageLawStrip}>
              <p className={styles.ageLawStripText}>
                <strong>起算日の扱い —</strong>{' '}
                法律・契約上の期間計算では「初日不算入」が原則です（民法第140条）。
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* ── KNOWLEDGE ── */}
      <article className={styles.articleSection}>
        <div className={styles.articleInner}>
          <p className={styles.sectionKnowledge}>Knowledge</p>
          <h2 className={styles.sectionH2}>日数計算にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />
          <div className={styles.articleGrid}>
            {articleBlocks.map((block, i) => (
              <div key={i} className={i >= 2 ? styles.colSpanFull : ''}>
                <h3 className={styles.articleHeading}>{block.title}</h3>
                {block.body.map((p, j) => (
                  <p key={j} className={styles.articleText}
                    style={{ marginBottom: j < block.body.length - 1 ? '1rem' : 0 }}>
                    {p}
                  </p>
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