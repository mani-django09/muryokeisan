import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '無料計算ツール一覧 | 登録不要・即時計算 | MuryoKeisan',
  description: 'BMI・消費税・年齢・所得税・日数・時給など14種類の計算ツールを完全無料で提供。登録不要、スマホ対応、専門家監修。',
  keywords: '計算ツール, 無料計算機, BMI計算, 消費税計算, 年齢計算, 所得税計算, 日数計算, 時給計算, 体脂肪率, 出産予定日, 割引計算',
  openGraph: {
    title: '無料計算ツール一覧 | MuryoKeisan',
    description: 'BMI・消費税・年齢・所得税など14種類の計算ツールを完全無料で提供。登録不要・スマホ対応。',
    url: 'https://MuryoKeisan.com',
    siteName: 'MuryoKeisan',
    locale: 'ja_JP',
    type: 'website',
  },
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
type Cat = '健康' | '税金' | '金融' | '日時' | '基本';

const calculators: { name: string; path: string; desc: string; icon: string; cat: Cat }[] = [
  { name: 'BMI計算',       path: '/bmi-keisan',         desc: '身長・体重から肥満度を判定',          icon: '⚖',  cat: '健康' },
  { name: '消費税計算',    path: '/tax-keisan',          desc: '税込・税抜を瞬時に算出',              icon: '🧾', cat: '税金' },
  { name: '年齢計算',      path: '/age-keisan',          desc: '生年月日から満年齢・総日数',           icon: '◷',  cat: '基本' },
  { name: '日数計算',      path: '/days-keisan',         desc: '2つの日付間の日数・週数',             icon: '▦',  cat: '日時' },
  { name: '時間計算',      path: '/time-keisan',         desc: '時間の加算・減算。勤怠管理に',         icon: '◔',  cat: '日時' },
  { name: 'パーセント計算', path: '/percentage-keisan',  desc: '割合・増減率を即時計算',              icon: '◉',  cat: '基本' },
  { name: '体脂肪率計算',  path: '/body-fat-keisan',     desc: '身体データから体脂肪率を推定',         icon: '♡',  cat: '健康' },
  { name: '出産予定日計算', path: '/due-date-keisan',    desc: '最終月経日から出産予定日を計算',        icon: '✦',  cat: '健康' },
  { name: '割引計算',      path: '/discount-keisan',     desc: '割引後の価格と節約額を算出',           icon: '◈',  cat: '金融' },
  { name: '固定資産税計算', path: '/property-tax-keisan',desc: '土地・建物の固定資産税を試算',         icon: '⌂',  cat: '税金' },
  { name: '所得税計算',    path: '/income-tax-keisan',   desc: '年収から所得税・手取りを概算',         icon: '¥',  cat: '税金' },
  { name: '時給計算',      path: '/wage-keisan',         desc: '時給から日収・月収・年収を試算',        icon: '◎',  cat: '金融' },
  { name: '失業保険計算',  path: '/unemployment-keisan', desc: '給付日数・総支給額を試算',            icon: '⛨',  cat: '金融' },
];

const catClass: Record<Cat, string> = {
  健康: styles.catHealth,
  税金: styles.catTax,
  金融: styles.catFinance,
  日時: styles.catDate,
  基本: styles.catBasic,
};

const faqItems = [
  { q: '登録やアカウント作成は必要ですか？', a: '一切不要です。サイトにアクセスしてすぐご利用いただけます。' },
  { q: '入力した数値はサーバーに保存されますか？', a: '保存されません。入力値は計算処理にのみ使用され、SSLで保護されています。' },
  { q: '計算結果の精度はどの程度ですか？', a: '税理士・FP・健康管理士が計算ロジックを監修。ただし試算値のため重要な判断は専門家にご相談ください。' },
  { q: 'スマートフォンでも使えますか？', a: 'はい。全ツールがスマートフォン・タブレット・PCに対応しています。' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MuryoKeisan',
  url: 'https://MuryoKeisan.com',
  description: '日常生活やビジネスで役立つ無料計算ツールを提供するポータルサイト',
};

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Home() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ══════════ HERO ══════════ */}
      <header className={styles.homeHero}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />

        {/* Large kamon — left side */}
        <div aria-hidden="true" style={{
          position: 'absolute', width: 480, height: 480,
          border: '1px solid rgba(201,169,110,0.06)', borderRadius: '50%',
          top: '50%', left: '-120px', transform: 'translateY(-50%)', pointerEvents: 'none',
        }}>
          <div style={{ position: 'absolute', inset: 40, border: '1px solid rgba(201,169,110,0.04)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', inset: 80, border: '1px solid rgba(201,169,110,0.03)', borderRadius: '50%' }} />
        </div>

        <div className={styles.homeHeroInner}>
          {/* Left: text */}
          <div>
            <p className={styles.homeEyebrow}>無料計算ポータル &nbsp;·&nbsp; 14種類のツール &nbsp;·&nbsp; 登録不要</p>
            <h1 className={styles.homeHeroTitle}>
              日常の計算を、<br />
              <span className={styles.homeHeroAccent}>もっとシンプルに。</span>
            </h1>
            <p className={styles.homeHeroDesc}>
              BMI・消費税・年齢・所得税・日数など<strong style={{ color: '#e8e4df', fontWeight: 400 }}>14種類</strong>の計算ツールを完全無料で提供。
              専門家監修、登録不要、スマホ対応。
            </p>
            <div className={styles.homeHeroCta}>
              <a href="#tools" className={styles.homeCtaBtn}>
                計算ツールを選ぶ
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 9l-7 7-7-7"/></svg>
              </a>
              <span className={styles.homeCtaTrust}>SSL暗号化 &nbsp;·&nbsp; 入力データは保存されません</span>
            </div>
          </div>

          {/* Right: stats */}
          <div className={styles.homeStats}>
            {[
              { v: '14',    l: 'ツール' },
              { v: '0円',   l: '完全無料' },
              { v: '即時',  l: '計算結果' },
            ].map(s => (
              <div key={s.l} className={styles.homeStatItem}>
                <div className={styles.homeStatValue}>{s.v}</div>
                <div className={styles.homeStatLabel}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════ TOOL GRID ══════════ */}
      <section id="tools">
        <div className={styles.toolsSection}>
          <p className={styles.sectionEyebrow}>計算ツール一覧</p>
          <div className={styles.toolGrid}>
            {calculators.map((c) => (
              <Link key={c.path} href={c.path} className={styles.toolCard}>
                <div className={styles.toolCardTop}>
                  <span className={styles.toolIcon}>{c.icon}</span>
                  <span className={`${styles.toolCatBadge} ${catClass[c.cat]}`}>{c.cat}</span>
                </div>
                <div className={styles.toolName}>{c.name}</div>
                <div className={styles.toolDesc}>{c.desc}</div>
                <div className={styles.toolArrow}>計算する →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <p className={styles.sectionEyebrow}>使い方</p>
          <div className={styles.howGrid}>
            {[
              { n: '01', title: 'ツールを選択', desc: '14種類のツールからお目当てのものを選ぶだけ。カテゴリ別（健康・税金・金融・日時・基本）に整理されています。' },
              { n: '02', title: '数値を入力',   desc: '日本語の案内に従って数値を入力。直感的なUIで迷わず操作でき、日付はカレンダーから選択可能です。' },
              { n: '03', title: '結果を確認',   desc: '瞬時に正確な計算結果が表示されます。結果はそのまま画面上で確認でき、ページを離れるとデータは消去されます。' },
            ].map(s => (
              <div key={s.n} className={styles.howStep}>
                <div className={styles.howNum}>{s.n}</div>
                <div>
                  <div className={styles.howTitle}>{s.title}</div>
                  <div className={styles.howDesc}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT + TRUST ══════════ */}
      <div className={styles.aboutSection}>
        {/* Left: copy */}
        <div>
          <p className={styles.sectionEyebrow}>サービスについて</p>
          <h2 className={styles.aboutH2}>MuryoKeisan とは</h2>
          <p className={styles.aboutText}>
            MuryoKeisan（無料計算）は、日常生活からビジネスシーンまでのあらゆる計算ニーズを一か所で解決できる、日本の無料計算ポータルです。
            税理士・ファイナンシャルプランナー・健康管理士が監修した正確な計算ロジックと、誰でも迷わず使えるシンプルなUIにこだわっています。
          </p>
          <p className={styles.aboutText}>
            「計算という行為に障壁があってはならない」という信念のもと、全機能・全ツールを永続的に無料で提供することをお約束します。
            入力データはサーバーに保存されず、SSLで暗号化された安全な環境でご利用いただけます。
          </p>

          <div className={styles.audienceList}>
            {[
              { title: '健康管理をしたい方',   desc: 'BMI・体脂肪率を定期チェックして目標達成度を管理' },
              { title: 'ビジネスパーソン',     desc: '消費税・割引・パーセント計算は毎日の業務で即戦力' },
              { title: '妊娠中の方・ご家族',   desc: '出産予定日・妊娠週数を手軽に確認' },
              { title: '不動産オーナー',       desc: '固定資産税を試算して年間コストを把握' },
              { title: '就活・転職中の方',     desc: '時給から年収を逆算、失業保険の給付額も試算可能' },
            ].map(a => (
              <div key={a.title} className={styles.audienceItem}>
                <div className={styles.audienceItemDot} />
                <div>
                  <span className={styles.audienceItemTitle}>{a.title}</span>
                  <span className={styles.audienceItemDesc}> — {a.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: trust + FAQ */}
        <div>
          {/* Trust card */}
          <div className={styles.trustCard}>
            <div className={styles.trustCardHead}>信頼と安全</div>
            {[
              { icon: '🎓', title: '専門家監修', sub: '税理士・CFP®・健康管理士' },
              { icon: '🔒', title: 'SSL暗号化',  sub: '入力データは保存されません' },
              { icon: '🆓', title: '完全無料',   sub: '会員登録・課金一切なし' },
              { icon: '📱', title: 'スマホ対応', sub: '全デバイスで快適に利用可能' },
            ].map(t => (
              <div key={t.title} className={styles.trustItem}>
                <span className={styles.trustItemIcon}>{t.icon}</span>
                <div>
                  <div className={styles.trustItemTitle}>{t.title}</div>
                  <div className={styles.trustItemSub}>{t.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ card */}
          <div className={styles.homeFaqCard}>
            <div className={styles.homeFaqHead}>よくある質問</div>
            {faqItems.map(f => (
              <div key={f.q} className={styles.homeFaqItem}>
                <div className={styles.homeFaqQ}>{f.q}</div>
                <div className={styles.homeFaqA}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ══════════ FINAL CTA ══════════ */}
      <section className={styles.ctaStrip}>
        <div className={styles.ctaStripInner}>
          <div>
            <p className={styles.ctaStripEyebrow}>今すぐ無料で利用できます</p>
            <h2 className={styles.ctaStripTitle}>計算を始めましょう。</h2>
            <p className={styles.ctaStripSub}>登録不要 · 完全無料 · 即時計算</p>
          </div>
          <a href="#tools" className={styles.homeCtaBtn}>
            全ツールを見る
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className={styles.siteFooter}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p className={styles.footerText}>© MuryoKeisan — 無料計算サイト</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { href: '/terms',   label: '利用規約' },
              { href: '/privacy', label: 'プライバシーポリシー' },
              { href: '/contact', label: 'お問い合わせ' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: '0.7rem', color: 'rgba(201,169,110,0.35)', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.12)' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}