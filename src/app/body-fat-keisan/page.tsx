import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '体脂肪率計算機 — 体組成を科学的に分析 | 無料計算',
  description: '身長・体重・年齢・性別を入力するだけで体脂肪率を即時計算。Deurenberg推定式を用いた信頼性の高い体組成分析ツール。ダイエット・健康管理・フィットネス目標の設定に最適な無料サービスです。',
  keywords: ['体脂肪率計算', '体組成', 'BMI', 'ダイエット', '肥満判定', '健康管理', '無料計算機'],
  openGraph: {
    title: '体脂肪率計算機 — 体組成を科学的に分析',
    description: '身長・体重・年齢・性別から体脂肪率を即時算出。健康管理に役立つ無料ツール。',
    type: 'website',
    locale: 'ja_JP',
  },
};

const faqItems = [
  { question: '体脂肪率の標準値はどのくらいですか？', answer: '成人男性の理想的な体脂肪率は10〜20%、成人女性は20〜30%とされています。アスリートは男性で6〜13%、女性で14〜20%程度が一般的です。年齢・体格・運動習慣によって適正範囲は個人差があるため、数値を参考にしながら医師や専門家にご相談ください。' },
  { question: '体脂肪率が高いとどんな健康リスクがありますか？', answer: '体脂肪、特に内臓脂肪の過剰な蓄積は、2型糖尿病・高血圧・脂質異常症・動脈硬化などの生活習慣病リスクを顕著に高めます。また、関節への負担増加や睡眠時無呼吸症候群との関連も指摘されています。早期の生活習慣改善が重要です。' },
  { question: '体脂肪率を効果的に下げる方法はありますか？', answer: '週150分以上の中強度有酸素運動（ウォーキング・水泳・サイクリング）と週2〜3回の筋力トレーニングを組み合わせることが最も効果的です。食事面では総カロリーを抑えつつタンパク質を体重1kgあたり1.2〜1.6g確保しましょう。急激な減量（月2〜3%以上）は筋肉量減少を招くため禁物です。' },
  { question: '体脂肪率とBMIは何が違いますか？', answer: 'BMIは身長と体重のみから算出する肥満指数で、計算が簡単な反面、筋肉量・骨密度・体型の差を反映できません。筋肉質な人が「肥満」と判定されるケースも存在します。体脂肪率は体内の脂肪組織の割合を直接示すため、より精度の高い体組成評価が可能です。両指標を併用して健康状態を総合的に把握するのが理想です。' },
  { question: 'このツールの計算式はどれくらい正確ですか？', answer: '本ツールはDeurenberg（1991年）が提唱した推定式を採用しており、大規模な臨床データを基に開発された信頼性の高い計算方法です。ただし、推定値であるため実際の体脂肪率とは誤差が生じる場合があります。精密な測定が必要な場合は、体組成計（InBody等）やDEXA法など専門的な測定をお勧めします。' },
];

type FatRange = { range: string; label: string; color: string; bg: string; border: string };

const maleRanges: FatRange[] = [
  { range: '〜10%未満', label: '低い',    color: '#5b9bd5', bg: 'rgba(91,155,213,0.1)',  border: 'rgba(91,155,213,0.2)'  },
  { range: '10〜20%',  label: '標準',    color: '#4caf7d', bg: 'rgba(76,175,125,0.1)',  border: 'rgba(76,175,125,0.2)'  },
  { range: '20〜25%',  label: 'やや高い', color: '#c9a96e', bg: 'rgba(201,169,110,0.1)', border: 'rgba(201,169,110,0.2)' },
  { range: '25%以上',  label: '高い',    color: '#c44a3a', bg: 'rgba(196,74,58,0.1)',   border: 'rgba(196,74,58,0.2)'   },
];

const femaleRanges: FatRange[] = [
  { range: '〜20%未満', label: '低い',    color: '#5b9bd5', bg: 'rgba(91,155,213,0.1)',  border: 'rgba(91,155,213,0.2)'  },
  { range: '20〜30%',  label: '標準',    color: '#4caf7d', bg: 'rgba(76,175,125,0.1)',  border: 'rgba(76,175,125,0.2)'  },
  { range: '30〜35%',  label: 'やや高い', color: '#c9a96e', bg: 'rgba(201,169,110,0.1)', border: 'rgba(201,169,110,0.2)' },
  { range: '35%以上',  label: '高い',    color: '#c44a3a', bg: 'rgba(196,74,58,0.1)',   border: 'rgba(196,74,58,0.2)'   },
];

const articleBlocks = [
  {
    title: '体脂肪率計算ツールとは？',
    body: [
      '体脂肪率計算ツールは、身長・体重・年齢・性別という4つの基本情報を入力するだけで、推定体脂肪率をリアルタイムに算出します。BMIが「体型の大きさ」を表す指標に留まるのに対し、体脂肪率は「体内の脂肪組織が占める割合」を直接示すため、健康状態の把握やダイエット目標の設定においてより実用的な指標として広く活用されています。',
      'このツールは特別なアカウント登録や個人情報の提供を一切必要とせず、スマートフォン・タブレット・PCからいつでも無料でご利用いただけます。日々の健康管理習慣の一つとして、定期的な体脂肪率チェックにご活用ください。',
    ],
  },
  {
    title: '体脂肪率と生活習慣病リスクの関係',
    body: [
      '厚生労働省の調査によれば、日本人成人男性の約3割、女性の約2割が体脂肪率の基準値を超えているとされています。特に問題となるのは皮下脂肪よりも内臓脂肪の蓄積であり、これがメタボリックシンドロームの主要な要因となります。内臓脂肪は見た目に現れにくい一方で、インスリン抵抗性の上昇・炎症性サイトカインの分泌・血中脂質の悪化など、複数の代謝異常を引き起こすことが医学的に証明されています。',
      '一方、体脂肪率が低すぎることも健康リスクを伴います。女性の場合、過度に体脂肪率が低下すると女性ホルモンの分泌が抑制され、無月経・骨粗しょう症・免疫機能低下などの問題が発生しやすくなります。適正な体脂肪率の維持が、長期的な健康寿命の確保につながります。',
    ],
  },
  {
    title: '体脂肪率を改善する科学的アプローチ',
    body: [
      '体脂肪率の改善において最も効果的と証明されているのは、有酸素運動と筋力トレーニングの組み合わせです。有酸素運動（中強度・週150分以上）は直接的な脂肪燃焼を促進し、筋力トレーニングは基礎代謝を底上げすることで安静時の脂肪消費量を増加させます。中高年以降は加齢に伴う筋肉量の低下（サルコペニア）が体脂肪率上昇の主要原因となるため、筋力維持のトレーニングが特に重要です。',
      '食事管理においては、総カロリーの適切なコントロールに加え、タンパク質の十分な摂取（体重1kgあたり1.2〜1.6g）が筋肉量の維持・向上に不可欠です。炭水化物を極端に制限するローカーボ食は短期的な体重減少に有効ですが、長期継続性の観点から個人に合ったバランスを見つけることが持続的な成功の鍵となります。',
    ],
  },
  {
    title: '体脂肪率測定タイミングと注意点',
    body: [
      '体脂肪率は測定タイミングによって大きく変動します。食事後や運動直後、入浴後は体内の水分バランスが変化するため測定値が不安定になりがちです。最も再現性の高い測定タイミングは「起床後・排泄後・空腹時」です。同じ条件で週1〜2回測定し、数週間の平均値で変化を評価するアプローチが最も信頼性があります。',
      '体脂肪率は体重ほど短期間で劇的に変化しません。1ヶ月で1〜2%変化すれば実質的には大きな前進です。数値に一喜一憂せず、長期的なトレンドを見守りながら生活習慣の改善を継続することが、健康的な体組成実現への確実な道です。',
    ],
  },
];

export default function BodyFatCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── COMPACT HERO ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>体脂肪率計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>体組成分析ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>体脂肪率計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            Deurenberg推定式による科学的な体組成評価 —<br />
            身長・体重・年齢・性別を入力するだけで即時算出。
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
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.calcMeta}>Calculator</p>
                  <h2 className={styles.calcTitle}>数値を入力する</h2>
                </div>
              </div>
              <div className={styles.infoStrip}>
                <strong>体脂肪率計算について — </strong>
                Deurenberg（1991年）が提唱した推定式を採用。BMI・年齢・性別から体脂肪率を高精度で推定します。
              </div>
            </div>

            <CalculatorClient
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/body-fat`}
              fields={[
                { name: 'height', label: '身長', type: 'number', required: true, unit: 'cm', placeholder: '例：170' },
                { name: 'weight', label: '体重', type: 'number', required: true, unit: 'kg', placeholder: '例：65'  },
                { name: 'age',    label: '年齢', type: 'number', required: true, unit: '歳', placeholder: '例：30'  },
                {
                  name: 'gender', label: '性別', type: 'select', required: true,
                  options: [
                    { value: 'male',   label: '男性' },
                    { value: 'female', label: '女性' },
                  ],
                },
              ]}
              resultFields={[
                { key: 'bodyFat',  label: '体脂肪率', unit: '%' },
                { key: 'category', label: '判定',     unit: ''  },
              ]}
              buttonText="体脂肪率を計算する"
            />

            <div className={styles.calcCardFootnote}>
              ※ Deurenberg推定式による算出値です。実測値との誤差は±3〜5%程度あります。
            </div>
          </div>

          {/* Reference tables — below calculator */}
          <div className={styles.refCard}>
            <div className={styles.refCardHead}>
              <div className={styles.refCardAccent} />
              <h2 className={styles.refCardTitle}>体脂肪率の判定基準</h2>
            </div>
            <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
              <div className={styles.fatRefTables}>
                {/* Male */}
                <div className={styles.fatRefTable}>
                  <div className={styles.fatRefTableHead}>男性</div>
                  {maleRanges.map(r => (
                    <div key={r.range} className={styles.fatRefRow}>
                      <span className={styles.fatRefRowRange}>{r.range}</span>
                      <span className={styles.fatRefRowLabel} style={{ color: r.color, background: r.bg, border: `1px solid ${r.border}` }}>{r.label}</span>
                    </div>
                  ))}
                </div>
                {/* Female */}
                <div className={styles.fatRefTable}>
                  <div className={styles.fatRefTableHead}>女性</div>
                  {femaleRanges.map(r => (
                    <div key={r.range} className={styles.fatRefRow}>
                      <span className={styles.fatRefRowRange}>{r.range}</span>
                      <span className={styles.fatRefRowLabel} style={{ color: r.color, background: r.bg, border: `1px solid ${r.border}` }}>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── KNOWLEDGE ── */}
      <article className={styles.articleSection} itemScope itemType="https://schema.org/Article">
        <div className={styles.articleInner}>
          <p className={styles.sectionKnowledge}>Knowledge</p>
          <h2 className={styles.sectionH2}>体脂肪率にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />

          {/* Formula block — featured */}
          <div className={styles.articleGrid} style={{ marginBottom: '3rem' }}>
            <div className={styles.colSpanFull}>
              <h3 className={styles.articleHeading}>体脂肪率の計算方法（Deurenberg式）</h3>
              <p className={styles.articleText}>
                本ツールはオランダの栄養学者Deurenbergらが1991年に発表した体脂肪率推定式を採用しています。
                この計算式は大規模な臨床研究データを基に開発され、BMI・年齢・性別から体脂肪率を高精度で推定できることが複数の研究で検証されています。
              </p>
              <div className={styles.formulaBlock}>
                <p className={styles.formulaText}><strong>体脂肪率（%）＝（1.20 × BMI）＋（0.23 × 年齢）− 性別定数</strong></p>
                <p className={styles.formulaNote}>※ 性別定数：男性 16.2 ／ 女性 5.4　　推定誤差：±3〜5%程度</p>
              </div>
              <p className={styles.articleText}>
                より正確な測定には、生体電気インピーダンス法（BIA）を採用した体組成計やX線吸収測定法（DEXA）などの専門的な機器が必要となります。
              </p>
            </div>
          </div>

          <div className={styles.articleGrid}>
            {articleBlocks.map((block, i) => (
              <div key={i} className={i === articleBlocks.length - 1 ? styles.colSpanFull : ''}>
                <h3 className={styles.articleHeading}>{block.title}</h3>
                {block.body.map((p, j) => (
                  <p key={j} className={styles.articleText} style={{ marginBottom: j < block.body.length - 1 ? '1rem' : 0 }}>{p}</p>
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

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: faqItems.map(item => ({
            '@type': 'Question', name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }),
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'WebApplication',
          name: '体脂肪率計算機',
          description: '身長・体重・年齢・性別を入力するだけで体脂肪率を即時計算。Deurenberg推定式を用いた無料体組成分析ツール。',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Any',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
          inLanguage: 'ja',
        }),
      }} />
    </div>
  );
}