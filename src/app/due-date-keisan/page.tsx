import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '出産予定日計算 - 妊娠週数と予定日を簡単計算 | MuryoKeisan',
  description: '最終月経日から出産予定日と現在の妊娠週数を自動計算。妊娠中の健康管理とスケジュール管理に最適。',
};

const faqItems = [
  { question: '出産予定日はどのように計算されますか？', answer: '最終月経開始日から280日（40週）後が出産予定日とされています。これはネーゲレ概算法と呼ばれる一般的な計算方法です。' },
  { question: '出産予定日通りに生まれる確率は？', answer: '出産予定日ぴったりに生まれる赤ちゃんは約5%程度です。予定日の前後2週間（妊娠38〜42週）に約90%の赤ちゃんが生まれます。' },
  { question: '妊娠週数の数え方を教えてください', answer: '妊娠週数は最終月経開始日を0週0日として数えます。妊娠期間は通常40週（280日）で、初期（0〜13週）、中期（14〜27週）、後期（28週以降）に分けられます。' },
  { question: '予定日が変更されることはありますか？', answer: 'はい、初期の超音波検査で胎児の大きさを測定し、予定日が修正されることがあります。特に月経周期が不規則な場合は、超音波検査による予定日の方が正確です。' },
  { question: '双子の場合、出産予定日は異なりますか？', answer: '双子の場合、単胎妊娠より早く生まれる傾向があり、平均して妊娠37週前後で出産することが多いです。ただし、予定日の計算方法は単胎と同じです。' },
];

const trimesterMilestones = [
  { label: '妊娠初期',   value: '0〜13週',  note: '器官形成・つわり' },
  { label: '妊娠中期',   value: '14〜27週', note: '安定期・胎動開始' },
  { label: '妊娠後期',   value: '28〜36週', note: '急速成長・出産準備' },
  { label: '正期産',     value: '37〜41週', note: '出産推奨期間' },
  { label: '予定日',     value: '40週0日',  note: '最終月経+280日' },
  { label: '過期産',     value: '42週以降', note: '管理入院の目安' },
];

const articleBlocks = [
  {
    title: '出産予定日の計算方法（ネーゲレ概算法）',
    body: [
      '出産予定日はネーゲレ概算法で計算されます。最終月経開始日に280日（40週）を加えた日が出産予定日となります。具体的には最終月経開始日の月から3を引き、日に7を加えることで簡易計算できます。例えば最終月経開始日が2024年1月1日の場合、出産予定日は2024年10月8日となります。',
    ],
  },
  {
    title: '出産予定日の精度について',
    body: [
      '出産予定日はあくまで目安であり、予定日ぴったりに生まれる赤ちゃんは約5%程度です。実際には予定日の前後2週間（妊娠38〜42週）に約90%の赤ちゃんが生まれます。月経周期が不規則な場合は、超音波検査による予定日の修正が行われることがあります。',
    ],
  },
  {
    title: '妊娠中の定期健診スケジュール',
    body: [
      '妊娠期間中は定期的な健診が重要です。妊娠初期は4週間に1回、中期は2週間に1回、後期は1週間に1回の健診が推奨されます。健診では胎児の成長、母体の健康状態、血圧・体重・尿検査などがチェックされます。',
    ],
  },
  {
    title: '出産準備のスケジュール',
    body: [
      '出産予定日が分かったら計画的に準備を進めましょう。妊娠20週頃には出産する病院を決定し、母親学級に参加すると良いでしょう。30週頃からは入院準備品の用意・赤ちゃん用品の購入を始め、予定日の1ヶ月前にはいつでも入院できるよう準備を整えておくことが重要です。',
    ],
  },
];

export default function DueDateCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── COMPACT HERO ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>出産予定日計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>妊娠計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>出産予定日計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            最終月経開始日を入力するだけで、出産予定日・妊娠週数・妊娠期を瞬時に算出。<br />
            ネーゲレ概算法による標準的な計算方式を採用しています。
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
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.calcMeta}>Calculator</p>
                  <h2 className={styles.calcTitle}>日付を入力する</h2>
                </div>
              </div>
              <div className={styles.infoStrip}>
                <strong>計算方法 — </strong>
                最終月経開始日 + 280日（40週）= 出産予定日。ネーゲレ概算法による標準計算です。
              </div>
            </div>

            <CalculatorClient
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/due-date`}
              fields={[
                { name: 'lastPeriodDate', label: '最終月経開始日', type: 'date', required: true },
              ]}
              resultFields={[
                { key: 'dueDate',       label: '出産予定日',    unit: '' },
                { key: 'weeksPregnant', label: '現在の妊娠週数', unit: '週' },
                { key: 'trimester',     label: '妊娠期',        unit: '' },
              ]}
              buttonText="出産予定日を計算する"
            />

            <div className={styles.calcCardFootnote}>
              ※ 本ツールの結果は目安です。正確な予定日は産科医・助産師にご確認ください。
            </div>
          </div>

          {/* Reference card — trimester milestones */}
          <div className={styles.refCard}>
            <div className={styles.refCardHead}>
              <div className={styles.refCardAccent} />
              <h2 className={styles.refCardTitle}>妊娠週数と時期の目安</h2>
            </div>
            <div className={styles.ageMilestoneGrid}>
              {trimesterMilestones.map(m => (
                <div key={m.label} className={styles.ageMilestone}>
                  <span className={styles.ageMilestoneLabel}>{m.label}</span>
                  <span className={styles.ageMilestoneValue} style={{ fontSize: '1.1rem' }}>{m.value}</span>
                  <span className={styles.ageMilestoneNote}>{m.note}</span>
                </div>
              ))}
            </div>
            <div className={styles.ageLawStrip}>
              <p className={styles.ageLawStripText}>
                <strong>予定日の精度 —</strong>{' '}
                予定日ぴったりの出産は約5%。前後2週間（38〜42週）に約90%が生まれます。
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* ── KNOWLEDGE ── */}
      <article className={styles.articleSection}>
        <div className={styles.articleInner}>
          <p className={styles.sectionKnowledge}>Knowledge</p>
          <h2 className={styles.sectionH2}>出産予定日にまつわる基礎知識</h2>
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