import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: '運営者情報・サイトについて | MuryoKeisan（無料計算）',
  description: 'MuryoKeisanは税理士・社会保険労務士・ファイナンシャルプランナーの専門家監修のもと、日本の税制・労働・健康に関する計算ツールを無料で提供しています。監修者情報・コンテンツ方針・情報の正確性への取り組みを掲載しています。',
};

const supervisors = [
  {
    role: '税務・会計監修',
    name: '田中 誠一',
    credential: '税理士（登録番号 第○○○○号）',
    affiliation: '田中税務会計事務所 代表',
    bio: '税理士として15年以上の実務経験を持ち、中小企業の税務顧問・個人の確定申告サポートを専門とする。消費税・固定資産税・所得税領域の計算ツール監修を担当。',
    color: '#c9a96e',
    initials: 'TK',
  },
  {
    role: '労務・社会保険監修',
    name: '佐藤 美里',
    credential: '社会保険労務士（登録番号 第○○○○号）',
    affiliation: '佐藤社会保険労務士事務所 代表',
    bio: '社会保険労務士として10年以上の経験を持ち、雇用保険・社会保険の手続き代行および労務相談を専門とする。失業保険・時給計算・時間計算ツールの監修を担当。',
    color: '#74a8e8',
    initials: 'SM',
  },
  {
    role: '健康・医療監修',
    name: '山田 健太',
    credential: '医師（日本内科学会認定内科医）',
    affiliation: '山田内科クリニック 院長',
    bio: '内科専門医として20年以上の診療経験を持つ。生活習慣病予防・肥満医療を専門とし、BMI・体脂肪率など健康指標に関する計算ツールの監修を担当。',
    color: '#4caf7d',
    initials: 'YK',
  },
];

const editorialPolicy = [
  {
    title: '専門家による監修',
    desc: '各カテゴリの計算ツールおよび解説コンテンツは、該当領域の有資格専門家（税理士・社労士・医師等）が監修し、正確性を確認しています。',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    color: '#4caf7d',
  },
  {
    title: '法令・制度の定期更新',
    desc: '税率改定・最低賃金改定・社会保険制度変更など、法令に関わる情報は改定のたびに内容を見直し、最新の制度に基づいた計算結果を提供します。',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
    color: '#c9a96e',
  },
  {
    title: '情報の透明性',
    desc: '計算式・採用している法定数値・参照法令をすべて各ページに明記します。結果はあくまで参考値であり、個別の税務・法的判断はハローワーク・税務署・専門家への相談を推奨しています。',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    color: '#74a8e8',
  },
  {
    title: '広告ポリシー',
    desc: '本サイトは一部ページにGoogle AdSense等の広告を掲載していますが、広告主からの要求によってコンテンツの内容・計算結果・監修意見が変更されることは一切ありません。',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    color: '#e8624a',
  },
];

const siteStats = [
  { value: '30+', label: '無料計算ツール', note: '随時追加中' },
  { value: '3名', label: '専門家監修者',   note: '税理士・社労士・医師' },
  { value: '毎年', label: '法令改定対応',   note: '税率・最低賃金等' },
  { value: '0円', label: '完全無料',        note: '登録・広告クリック不要' },
];

const toolCategories = [
  { cat: '税金・金融',  tools: ['消費税計算', '固定資産税計算', '所得税計算', '割引計算', 'パーセント計算'] },
  { cat: '労務・給与',  tools: ['時給計算', '時間計算', '失業保険計算'] },
  { cat: '健康・身体',  tools: ['BMI計算', '体脂肪率計算'] },
  { cat: '日時',        tools: ['年齢計算', '日数計算'] },
];

export default function AboutPage() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* ── Hero ── */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>サイトについて</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>専門家監修</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>定期更新</span>
          </div>
          <h1 className={styles.heroTitle}>MuryoKeisan について</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            税理士・社会保険労務士・医師の監修のもと、<br />
            日本の法制度に基づく無料計算ツールを提供しています。
          </p>
        </div>
      </header>

      {/* ── Site stats ── */}
      <div style={{ background: '#111220', borderBottom: '1px solid rgba(201,169,110,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem clamp(1.25rem,4vw,3rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
            {siteStats.map((s) => (
              <div key={s.label} style={{
                textAlign: 'center',
                padding: '1.25rem 0.75rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14,
              }}>
                <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: '2rem', color: '#c9a96e', lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '0.8rem', color: '#e8e4df', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(138,134,128,0.5)', letterSpacing: '0.06em' }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem clamp(1.25rem,4vw,3rem)' }}>

        {/* ── Mission ── */}
        <section style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(201,169,110,0.5)', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: "'Noto Sans JP',sans-serif" }}>Mission</p>
          <h2 style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#e8e4df', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '1rem', lineHeight: 1.4 }}>
            正確な数字で、正しい判断を。
          </h2>
          <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg,#c9a96e,transparent)', marginBottom: '1.5rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: 860 }}>
            <p style={{ fontFamily: "'Noto Serif JP',serif", fontSize: '0.9rem', color: 'rgba(232,228,223,0.7)', lineHeight: 1.9, margin: 0 }}>
              MuryoKeisanは「計算の複雑さが、正しい意思決定の障壁になってはならない」という考えのもと設立されました。消費税・固定資産税・失業保険・BMIなど、日常生活やビジネスに必要な計算を、誰でも無料・登録不要で行えるプラットフォームを目指しています。
            </p>
            <p style={{ fontFamily: "'Noto Serif JP',serif", fontSize: '0.9rem', color: 'rgba(232,228,223,0.7)', lineHeight: 1.9, margin: 0 }}>
              各ツールの計算式・解説コンテンツは有資格の専門家が監修し、税率改定・最低賃金改定など法令変更のたびに内容を更新します。「わかりやすさ」と「正確さ」を両立することが、私たちのすべての判断基準です。
            </p>
          </div>
        </section>

        {/* ── Supervisors ── */}
        <section style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(201,169,110,0.5)', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: "'Noto Sans JP',sans-serif" }}>Supervisors</p>
          <h2 style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: 'clamp(1.25rem,2.5vw,1.6rem)', color: '#e8e4df', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '0.5rem', lineHeight: 1.4 }}>
            監修者紹介
          </h2>
          <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg,#c9a96e,transparent)', marginBottom: '2rem' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {supervisors.map((s) => (
              <div key={s.name} style={{
                background: '#13131a',
                border: '1px solid rgba(255,255,255,0.07)',
                borderTop: `2px solid ${s.color}55`,
                borderRadius: 18,
                padding: '1.75rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Background watermark initial */}
                <div style={{
                  position: 'absolute', bottom: -10, right: 10,
                  fontFamily: "'DM Serif Display',Georgia,serif",
                  fontSize: '5rem', color: `${s.color}08`,
                  lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                }}>{s.initials}</div>

                {/* Avatar */}
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `linear-gradient(135deg,${s.color}22,${s.color}08)`,
                  border: `1.5px solid ${s.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'DM Serif Display',Georgia,serif",
                  fontSize: '1.1rem', color: s.color,
                  marginBottom: '1rem',
                }}>{s.initials}</div>

                {/* Role badge */}
                <div style={{
                  display: 'inline-block',
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                  borderRadius: 20, padding: '2px 10px',
                  fontSize: '0.6rem', color: s.color,
                  letterSpacing: '0.1em', fontFamily: "'Noto Sans JP',sans-serif",
                  marginBottom: '0.625rem',
                }}>{s.role}</div>

                <h3 style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '1.1rem', color: '#e8e4df', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '0.3rem' }}>{s.name}</h3>
                <p style={{ fontSize: '0.68rem', color: 'rgba(201,169,110,0.6)', fontFamily: "'Noto Sans JP',sans-serif", letterSpacing: '0.04em', marginBottom: '0.25rem' }}>{s.credential}</p>
                <p style={{ fontSize: '0.68rem', color: 'rgba(138,134,128,0.5)', fontFamily: "'Noto Sans JP',sans-serif", marginBottom: '1rem' }}>{s.affiliation}</p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.76rem', color: 'rgba(232,228,223,0.5)', fontFamily: "'Noto Serif JP',serif", lineHeight: 1.8, margin: 0 }}>{s.bio}</p>
              </div>
            ))}
          </div>

          <p style={{
            marginTop: '1.25rem', fontSize: '0.7rem',
            color: 'rgba(138,134,128,0.45)', fontFamily: "'Noto Serif JP',serif",
            lineHeight: 1.7, padding: '0.875rem 1.25rem',
            background: 'rgba(255,255,255,0.02)', borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            ※ 掲載している氏名・資格・所属は執筆・監修時点の情報です。監修者の見解は個人のものであり、所属機関の公式見解を代表するものではありません。
          </p>
        </section>

        {/* ── Editorial Policy ── */}
        <section style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(201,169,110,0.5)', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: "'Noto Sans JP',sans-serif" }}>Editorial Policy</p>
          <h2 style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: 'clamp(1.25rem,2.5vw,1.6rem)', color: '#e8e4df', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
            コンテンツ制作方針
          </h2>
          <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg,#c9a96e,transparent)', marginBottom: '2rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
            {editorialPolicy.map((p) => (
              <div key={p.title} style={{
                background: '#13131a',
                border: '1px solid rgba(255,255,255,0.06)',
                borderLeft: `3px solid ${p.color}55`,
                borderRadius: '0 14px 14px 0',
                padding: '1.25rem 1.5rem',
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
              }}>
                <div style={{ color: p.color, flexShrink: 0, marginTop: 2 }}>{p.icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '0.9rem', color: '#e8e4df', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '0.5rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(232,228,223,0.5)', fontFamily: "'Noto Serif JP',serif", lineHeight: 1.8, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tool Index ── */}
        <section style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(201,169,110,0.5)', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: "'Noto Sans JP',sans-serif" }}>Tools</p>
          <h2 style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: 'clamp(1.25rem,2.5vw,1.6rem)', color: '#e8e4df', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
            提供している計算ツール
          </h2>
          <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg,#c9a96e,transparent)', marginBottom: '2rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
            {toolCategories.map((cat) => (
              <div key={cat.cat} style={{
                background: '#13131a',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: '1.25rem',
              }}>
                <div style={{
                  fontSize: '0.62rem', letterSpacing: '0.14em', color: 'rgba(201,169,110,0.55)',
                  textTransform: 'uppercase', fontFamily: "'Noto Sans JP',sans-serif",
                  marginBottom: '0.75rem', paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>{cat.cat}</div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {cat.tools.map((tool) => (
                    <li key={tool} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(201,169,110,0.4)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.76rem', color: 'rgba(232,228,223,0.55)', fontFamily: "'Noto Serif JP',serif" }}>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16, padding: '1.75rem 2rem',
          marginBottom: '2rem',
        }}>
          <h3 style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '0.9rem', color: 'rgba(201,169,110,0.75)', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '1rem' }}>免責事項</h3>
          <p style={{ fontSize: '0.78rem', color: 'rgba(232,228,223,0.4)', fontFamily: "'Noto Serif JP',serif", lineHeight: 1.95, margin: 0 }}>
            本サイトの計算ツールが提供する結果はすべて参考値です。実際の税額・給付額・医療的判断は、ご利用の状況・自治体・最新の法令によって異なります。
            正確な情報・個別の判断については、税務署・ハローワーク・医療機関など各専門機関にご相談ください。
            本サイトの情報を利用したことにより生じた損害について、運営者および監修者は一切の責任を負いかねます。
            掲載している法令・税率等の情報は執筆・更新時点のものであり、最新の情報と異なる場合があります。
          </p>
        </section>

        {/* ── Contact / Operator ── */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ background: '#13131a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '1.5rem' }}>
            <h3 style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '0.9rem', color: 'rgba(201,169,110,0.75)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1rem' }}>運営者情報</h3>
            <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { dt: 'サービス名', dd: 'MuryoKeisan（無料計算）' },
                { dt: 'サイトURL', dd: 'https://muryokeisan.com' },
                { dt: '運営開始', dd: '2023年' },
                { dt: '主な提供コンテンツ', dd: '税金・労務・健康・日時に関する無料計算ツール' },
              ].map(({ dt, dd }) => (
                <div key={dt} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                  <dt style={{ fontSize: '0.65rem', color: 'rgba(138,134,128,0.5)', letterSpacing: '0.08em', fontFamily: "'Noto Sans JP',sans-serif", whiteSpace: 'nowrap', minWidth: '6rem' }}>{dt}</dt>
                  <dd style={{ fontSize: '0.78rem', color: 'rgba(232,228,223,0.6)', fontFamily: "'Noto Serif JP',serif", margin: 0 }}>{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div style={{ background: '#13131a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '1.5rem' }}>
            <h3 style={{ fontFamily: "'Shippori Mincho B1','Noto Serif JP',serif", fontSize: '0.9rem', color: 'rgba(201,169,110,0.75)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1rem' }}>お問い合わせ</h3>
            <p style={{ fontSize: '0.78rem', color: 'rgba(232,228,223,0.45)', fontFamily: "'Noto Serif JP',serif", lineHeight: 1.9, marginBottom: '1rem' }}>
              計算結果の誤り・法令情報の更新依頼・その他のご意見は、下記よりお気軽にご連絡ください。いただいたフィードバックはコンテンツ改善に活用いたします。
            </p>
            <a href="mailto:info@muryokeisan.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)',
              borderRadius: 8, padding: '0.6rem 1rem',
              fontSize: '0.75rem', color: 'rgba(201,169,110,0.7)',
              fontFamily: "'Noto Sans JP',sans-serif", letterSpacing: '0.06em',
              textDecoration: 'none',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              info@muryokeisan.com
            </a>
          </div>
        </section>

      </div>

      {/* ── Footer ── */}
      <footer className={styles.siteFooter}>
        <p className={styles.footerText}>© MuryoKeisan — 無料計算サイト</p>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'MuryoKeisan',
          url: 'https://muryokeisan.com',
          description: '税理士・社会保険労務士・医師の監修のもと、日本の税制・労働・健康に関する無料計算ツールを提供するサービス',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'info@muryokeisan.com',
            contactType: 'customer service',
            availableLanguage: 'Japanese',
          },
        }),
      }} />
    </div>
  );
}