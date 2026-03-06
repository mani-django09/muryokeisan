import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorClient from '@/components/CalculatorClient';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '年齢計算ツール | 生年月日から正確な年齢を瞬時に計算 - 無料計算サイト',
  description: '生年月日を入力するだけで、満年齢・月数・日数・総日数をリアルタイム計算。法律上の成人年齢、年金受給開始年齢など年齢にまつわる豆知識も豊富。完全無料・登録不要で即使えます。',
  keywords: '年齢計算, 満年齢, 生年月日, 年齢計算ツール, 無料, 年齢早見表',
  openGraph: {
    title: '年齢計算ツール | 生年月日から正確な年齢を瞬時に計算',
    description: '生年月日を入力するだけで、満年齢・月数・日数・総日数をリアルタイム計算。完全無料・登録不要。',
    type: 'website',
  },
};

const faqItems = [
  { question: '満年齢と数え年の違いはなんですか？', answer: '満年齢は生まれた瞬間を「0歳」とし、誕生日を迎えるたびに1歳ずつ増えていく現代の一般的な数え方です。一方、数え年は生まれた年を「1歳」とし、元旦（1月1日）を迎えるたびに1歳加算する伝統的な日本の数え方です。現代の日本では法律・行政・医療など公式の場面では満年齢が使われますが、神社の厄払いや七五三など伝統行事では今も数え年が用いられることがあります。' },
  { question: '法律上、年齢はいつ更新されますか？', answer: '日本の「年齢計算ニ関スル法律」（明治35年施行）により、法律上の年齢は誕生日の前日の午後12時（深夜0時）に更新されます。たとえば4月1日生まれの方は3月31日の深夜0時に年齢が加算されるため、学年区分では3月31日生まれと同じ扱いになります。これが「4月2日生まれから新学年」という制度の根拠です。' },
  { question: '成人年齢は何歳ですか？また、何が変わりますか？', answer: '2022年4月1日より、日本の成人年齢は20歳から18歳に引き下げられました。18歳になると、親の同意なく契約を締結できる、クレジットカードの作成、10年間有効なパスポートの申請、選挙権の行使（18歳から既に付与済み）などが可能になります。ただし、飲酒・喫煙・公営ギャンブルは従来通り20歳からです。' },
  { question: '健康寿命と平均寿命の差はどれくらいですか？', answer: '厚生労働省の最新データによると、日本人の平均寿命は男性約81歳・女性約87歳ですが、「健康寿命」（日常生活に制限なく健康に過ごせる期間）は男性約73歳・女性約75歳です。つまり、人生の最後の約10年間は何らかの健康上の制限を抱えて過ごすことになります。この差を縮めるためにも、30〜40代からの生活習慣の見直しが重要とされています。' },
  { question: '年齢によってどんな権利・義務が変わりますか？', answer: '年齢ごとの主な変化をまとめると：15歳（労働可・ただし深夜・危険業務は禁止）、18歳（成人・選挙権・契約権）、20歳（飲酒・喫煙・公営ギャンブル）、25歳（衆議院議員被選挙権）、30歳（参議院議員被選挙権）、60歳（企業の定年退職基準の目安）、65歳（公的年金受給開始）、75歳（後期高齢者医療制度の対象）などがあります。' },
  { question: '年齢計算ツールの結果はどの程度正確ですか？', answer: '当ツールは現在の日付と入力された生年月日をもとに、年・月・日それぞれ正確に計算します。うるう年（2月29日生まれの方）も適切に処理しており、法律上の満年齢と一致する計算を行います。なお、結果はあくまで参考値としてご使用いただき、法的・医療的な判断が必要な場合は専門家への相談をおすすめします。' },
];

const ageMilestones = [
  { label: '成人年齢',    value: '18歳', note: '2022年改正' },
  { label: '飲酒・喫煙',  value: '20歳', note: '法律上の基準' },
  { label: '年金受給開始', value: '65歳', note: '原則支給開始' },
  { label: '後期高齢者',  value: '75歳', note: '医療制度の区分' },
  { label: '衆議院被選挙権', value: '25歳', note: '立候補資格' },
  { label: '参議院被選挙権', value: '30歳', note: '立候補資格' },
];

export default function AgeCalculator() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* COMPACT HERO */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>年齢計算</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>無料計算ツール</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>登録不要</span>
          </div>
          <h1 className={styles.heroTitle}>年齢計算機</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            生年月日を入力するだけで、満年齢・総月数・総日数を瞬時に計算。<br />
            法律上の年齢も正確に算出します。
          </p>
        </div>
      </header>

     

      {/* MAIN: Single centred column — calculator + reference below */}
      <main>
        <div className={styles.calcSingleCol}>

          {/* Calculator */}
          <div className={styles.calcCardOuter}>
            <div className={styles.calcCardInner}>
              <div className={styles.calcCardHeader}>
                <div className={styles.iconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.calcMeta}>Calculator</p>
                  <h2 className={styles.calcTitle}>年齢を計算する</h2>
                </div>
              </div>
              <div className={styles.infoStrip}>
                <strong>年齢計算について — </strong>
                生年月日と基準日を選択すると、満年齢・誕生日からの月数・総日数などを正確に算出します。うるう年も適切に処理されます。
              </div>
            </div>
            <CalculatorClient
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/calc/age`}
              fields={[
                { name: 'birthDate',     label: '生年月日',        type: 'date', required: true },
                { name: 'referenceDate', label: '基準日（計算日）', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
              ]}
              resultFields={[
                { key: 'years',       label: '満年齢',       unit: '歳' },
                { key: 'months',      label: '誕生日から',   unit: 'ヶ月' },
                { key: 'days',        label: 'さらに',       unit: '日' },
                { key: 'totalMonths', label: '総月数',       unit: 'ヶ月' },
                { key: 'totalWeeks',  label: '総週数',       unit: '週' },
                { key: 'totalDays',   label: '生まれてから', unit: '日' },
              ]}
              buttonText="年齢を計算する"
            />
            <div className={styles.calcCardFootnote}>
              ※ 法律上の満年齢を算出しています。うるう年も正確に処理されます。
            </div>
          </div>

          {/* Reference card — below the calculator */}
          <div className={styles.refCard}>
            <div className={styles.refCardHead}>
              <div className={styles.refCardAccent} />
              <h2 className={styles.refCardTitle}>年齢と権利・制度の基準</h2>
            </div>
            <div className={styles.ageMilestoneGrid}>
              {ageMilestones.map((m) => (
                <div key={m.label} className={styles.ageMilestone}>
                  <span className={styles.ageMilestoneLabel}>{m.label}</span>
                  <span className={styles.ageMilestoneValue}>{m.value}</span>
                  <span className={styles.ageMilestoneNote}>{m.note}</span>
                </div>
              ))}
            </div>
            <div className={styles.ageLawStrip}>
              <p className={styles.ageLawStripText}>
                <strong>法律上の年齢更新 —</strong>{' '}
                「年齢計算ニ関スル法律」により、誕生日の前日深夜0時に年齢が加算されます。
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* KNOWLEDGE */}
      <article className={styles.articleSection}>
        <div className={styles.articleInner}>
          <p className={styles.sectionKnowledge}>Knowledge</p>
          <h2 className={styles.sectionH2}>年齢にまつわる基礎知識</h2>
          <div className={styles.goldRuleDark} />
          <div className={styles.articleGrid}>
            <div>
              <h3 className={styles.articleHeading}>年齢計算の仕組み</h3>
              <p className={styles.articleText}>
                日本で一般的に使われる「満年齢」は、生まれた瞬間を0歳とし、誕生日を迎えるごとに1歳加算される数え方です。
                法律上は「年齢計算ニ関スル法律」（1902年施行）に基づき、誕生日の
                <strong>前日の午後12時（深夜0時）</strong>に年齢が更新されると規定されています。
                この細かなルールが、学年区分や選挙権のタイミングに影響を与えています。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>満年齢 vs 数え年</h3>
              <p className={styles.articleText}>
                かつての日本では「数え年」が標準でした。生まれた瞬間に1歳とし、毎年1月1日に全員が一斉に1歳増える方式です。
                最大で満年齢より2歳多くなるため、現代人には馴染みが薄い感覚かもしれません。
                現在でも神社の<strong>厄払いや長寿のお祝い（還暦・古希など）</strong>では数え年が使われる場合があります。
              </p>
            </div>
            <div>
              <h3 className={styles.articleHeading}>年齢と法律・権利</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { age: '15歳', text: '労働可能（深夜・危険業務は除く）' },
                  { age: '18歳', text: '成人・選挙権・単独契約可' },
                  { age: '20歳', text: '飲酒・喫煙・公営ギャンブル' },
                  { age: '65歳', text: '公的年金の原則受給開始' },
                  { age: '75歳', text: '後期高齢者医療制度の対象' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div className={styles.timelineDot} style={{ marginTop: 7 }} />
                    <div>
                      <span style={{ fontFamily: '"Shippori Mincho B1","Noto Serif JP",serif', color: '#1a1f6e', fontWeight: 600, fontSize: '0.875rem' }}>{item.age}</span>
                      <span style={{ color: '#4a4a5e', fontSize: '0.82rem', marginLeft: 8 }}>— {item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className={styles.articleHeading}>健康寿命という考え方</h3>
              <p className={styles.articleText}>
                平均寿命（男性約81歳・女性約87歳）に加え、近年注目されているのが
                <strong>健康寿命</strong>という概念です。
                日常生活に制限なく健康に過ごせる期間のことで、男性約73歳・女性約75歳とされています。
                平均寿命との差は約10年。30〜40代からの運動習慣・バランスの取れた食事・定期健診が、
                この差を縮める最も効果的な手段です。
              </p>
            </div>
            <div className={styles.colSpanFull}>
              <h3 className={styles.articleHeading}>年齢計算が役立つシーン</h3>
              <p className={styles.articleText}>
                年齢計算は、日常のさまざまな場面で活用されています。保険加入時には年齢によって保険料が大きく変動するため、正確な年齢確認が必要です。
                また、子どもの学年判定（4月2日〜翌年4月1日生まれが同学年）、定年退職までの残り年数の把握、年金受給開始時期の試算など、ライフプランニング全般に欠かせない計算です。
                さらに、お子様の100日記念・1000日記念など、記念日計算にも広く活用されています。
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ */}
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


      {/* FOOTER */}
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