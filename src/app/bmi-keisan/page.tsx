import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: 'BMI計算機 - 体格指数を簡単計算｜無料オンラインツール',
  description: '身長と体重を入力するだけで、BMI（体格指数）を瞬時に計算。日本肥満学会の基準に基づいた判定結果をお届けします。健康管理に役立つ無料ツールです。スマホ対応、登録不要。',
  keywords: 'BMI, 計算, 体格指数, 肥満度, 健康管理, ダイエット, BMI計算機, 無料',
};

const faqItems = [
  { question: 'BMIとは何ですか？どのように計算されますか？', answer: 'BMI（Body Mass Index：体格指数）は、体重と身長から算出される肥満度を表す国際的な指標です。計算式は「体重(kg) ÷ 身長(m)の2乗」で、例えば身長170cm、体重65kgの場合、65 ÷ (1.70 × 1.70) = 22.5となります。世界保健機関（WHO）が定めた基準で、健康状態の目安として広く使用されています。' },
  { question: '日本人の理想的なBMI値はいくつですか？', answer: '日本肥満学会の基準では、BMI 22が最も病気になりにくい「標準体重」とされています。18.5未満は「低体重（やせ）」、18.5〜25未満が「普通体重」、25以上が「肥満」と分類されます。ただし、筋肉量が多いアスリートなどはBMIが高くても健康な場合があるため、あくまで目安としてお考えください。' },
  { question: 'BMIが高いとどのような健康リスクがありますか？', answer: 'BMIが25以上の肥満状態が続くと、糖尿病、高血圧、脂質異常症、心臓病、脳卒中などの生活習慣病のリスクが高まります。また、睡眠時無呼吸症候群や関節への負担増加、一部のがんのリスク上昇も報告されています。定期的な健康診断と適切な体重管理が重要です。' },
  { question: 'BMIが低すぎる場合の問題点は何ですか？', answer: 'BMI 18.5未満の低体重は、栄養不足による免疫力低下、骨粗しょう症、貧血、月経不順（女性の場合）、筋力低下などのリスクがあります。特に若い女性の過度なダイエットは将来の健康に影響を与える可能性があるため、バランスの取れた食事と適度な運動を心がけましょう。' },
  { question: 'BMI以外に体型を評価する方法はありますか？', answer: 'BMIは簡便な指標ですが、体脂肪率、ウエスト周囲径、ウエスト・ヒップ比なども重要な指標です。特に内臓脂肪型肥満（メタボリックシンドローム）の評価には、男性85cm以上、女性90cm以上のウエスト周囲径が基準となります。当サイトの体脂肪率計算機も併せてご活用ください。' },
];

const bmiRanges = [
  { range: '18.5未満', label: '低体重',          color: '#5b9bd5' },
  { range: '18.5〜25', label: '普通体重',        color: '#4caf7d' },
  { range: '25〜30',   label: '肥満（1度）',     color: '#c9a96e' },
  { range: '30〜35',   label: '肥満（2度）',     color: '#d97b3a' },
  { range: '35以上',   label: '肥満（3度以上）', color: '#c44a3a' },
];

const relatedCalcs = [
  { href: '/body-fat-keisan',   emoji: '⬡', label: '体脂肪率計算',   desc: '身体データから体脂肪率を推定' },
  { href: '/age-keisan',        emoji: '◷', label: '年齢計算',       desc: '生年月日から正確な年齢を算出' },
  { href: '/percentage-keisan', emoji: '◈', label: 'パーセント計算', desc: '割合・増減率を簡単計算' },
];

export default function BMICalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>BMI計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>無料計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>BMI計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            身長と体重を入力するだけで、BMI（体格指数）を瞬時に計算。<br />
            日本肥満学会の基準に基づいた判定をお届けします。
          </p>
        </div>
      </header>

      <main>
        <div className={`${styles.mainLayout} ${styles.animateIn}`}>

          <div className={styles.refCard}>
            <div className={styles.refCardHead}>
              <div className={styles.refCardAccent} />
              <h2 className={styles.refCardTitle}>BMI判定基準（日本肥満学会）</h2>
            </div>
            <div className={styles.refCardBody}>
              {bmiRanges.map((r) => (
                <div key={r.label} className={styles.bmiRow}>
                  <div className={styles.bmiRowLeft}>
                    <span className={styles.bmiDot} style={{ background: r.color }} />
                    <span className={styles.bmiLabel}>{r.label}</span>
                  </div>
                  <span className={styles.bmiRange} style={{ color: r.color }}>{r.range}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.calcCardOuter}>
            <div className={styles.wrap}>
              <div className={styles.card}>
                <div className={styles.calcCardHeader}>
                  <div className={styles.iconBox}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z"/>
                      <path d="M12 14c-6 0-8 2.5-8 4v1h16v-1c0-1.5-2-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.calcMeta}>Calculator</p>
                    <h2 className={styles.calcTitle}>数値を入力する</h2>
                  </div>
                </div>
                <div className={styles.infoStrip}>
                  <strong>BMI計算について — </strong>
                  BMI（Body Mass Index）はWHOが定めた肥満度を表す国際的な指標です。身長と体重から算出し、健康管理の目安として活用されています。
                </div>
                <CalculatorClient
                  apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/bmi`}
                  fields={[
                    { name: 'height', label: '身長', type: 'number', placeholder: '170', unit: 'cm', required: true },
                    { name: 'weight', label: '体重', type: 'number', placeholder: '65',  unit: 'kg', required: true },
                  ]}
                  resultFields={[
                    { key: 'bmi',      label: 'BMI値' },
                    { key: 'category', label: '判定' },
                  ]}
                  buttonText="BMIを計算する"
                />
                <div className={styles.footnote}>
                  ※ 日本肥満学会の基準に基づき判定しています。あくまで参考値としてご活用ください。
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <article className={styles.articleSection}>
        <div className={styles.articleInner}>
          <p className={styles.sectionKnowledge}>Knowledge</p>
          <h2 className={styles.sectionH2}>BMIにまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />
          <div className={styles.articleGrid}>
            <div>
              <h3 className={styles.articleHeading}>BMIの計算方法</h3>
              <p className={styles.articleText}>BMIは「体重(kg) ÷ 身長(m)²」で算出されます。例えば身長170cm・体重65kgの場合、65 ÷ (1.70 × 1.70) = <strong>BMI 22.5（普通体重）</strong>となります。1835年にベルギーの統計学者ケトレーが考案し、現在WHOをはじめ各国の医療機関で広く使用されています。</p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>標準体重BMI 22の根拠</h3>
              <p className={styles.articleText}>日本肥満学会はBMI 22を「標準体重」と定めています。これは日本人の疫学データをもとに、<strong>最も疾病罹患率が低い</strong>値として算出されたものです。ただし筋肉量が多いアスリートや高齢者では体脂肪率と乖離することがあります。</p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>肥満と健康リスク</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: '糖尿病', text: 'BMI 25以上で発症リスクが約2〜3倍上昇' },
                  { label: '高血圧', text: '内臓脂肪が増えると血圧上昇につながる' },
                  { label: '脂質異常症', text: 'HDLコレステロール低下・中性脂肪増加' },
                  { label: '睡眠時無呼吸', text: '気道周囲の脂肪が上気道を圧迫する' },
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
              <h3 className={styles.articleHeading}>BMIの限界と補助指標</h3>
              <p className={styles.articleText}>BMIは体脂肪の分布や筋肉量を考慮しないため、単独では不十分な場合があります。<strong>ウエスト周囲径</strong>（男性85cm・女性90cm以上が内臓脂肪型肥満の基準）や体脂肪率と組み合わせることで、より正確な健康状態の把握が可能です。</p>
            </div>
            <div className={styles.colSpanFull}>
              <h3 className={styles.articleHeading}>BMI計算が活用される場面</h3>
              <p className={styles.articleText}>BMI計算は健康診断・特定健診（メタボ健診）での肥満度評価、生命保険の引受審査における体格確認、医療機関での薬剤投与量算出、ダイエット・フィットネス目標の設定など幅広い場面で活用されています。定期的にBMIを測定し、体重変化を記録することで早期の健康管理につながります。</p>
            </div>
          </div>
        </div>
      </article>

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