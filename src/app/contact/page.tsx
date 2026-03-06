import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/components/CalculatorClient.module.css';

export const metadata: Metadata = {
  title: 'お問い合わせ | MuryoKeisan',
  description: 'MuryoKeisanへのお問い合わせはこちら。計算ツールに関するご質問、ご意見、不具合報告など、お気軽にご連絡ください。',
};

export default function Contact() {
  return (
    <div className={styles.page} suppressHydrationWarning>

      {/* Hero */}
      <header className={styles.heroBg}>
        <div className={styles.seigaihaPattern} aria-hidden="true" />
        <div className={styles.kamonDecoration} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.heroBreadcrumb}>
            <Link href="/">ホーム</Link><span>/</span><span>お問い合わせ</span>
          </nav>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>Contact</span>
            <span className={`${styles.heroBadge} ${styles.heroBadgeGhost}`}>通常2営業日以内に返信</span>
          </div>
          <h1 className={styles.heroTitle}>お問い合わせ</h1>
          <div className={styles.goldRule} />
          <p className={styles.heroDesc}>
            ご質問・ご意見・不具合のご報告など、お気軽にお送りください。<br />
            いただいた内容は通常2営業日以内にご返信いたします。
          </p>
        </div>
      </header>

      {/* Main */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '3rem clamp(1.25rem,4vw,3rem)' }}>

        {/* Contact reasons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '◎', label: '計算結果について', desc: '結果に疑問・誤りを発見した場合' },
            { icon: '◈', label: '機能のご要望',     desc: '新しい計算ツールや改善案' },
            { icon: '⚠', label: '不具合の報告',     desc: 'エラーや表示崩れのご連絡' },
          ].map(c => (
            <div key={c.label} style={{
              background: '#13131a',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding: '1.25rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.2rem', color: '#c9a96e', opacity: 0.7, marginBottom: 8 }}>{c.icon}</div>
              <p style={{ fontFamily: '"Shippori Mincho B1","Noto Serif JP",serif', fontSize: '0.82rem', color: '#e8e4df', fontWeight: 600, marginBottom: 4, letterSpacing: '0.04em' }}>{c.label}</p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(232,228,223,0.35)', lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div style={{
          background: '#13131a',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          {/* Gold top bar */}
          <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)' }} />

          <div style={{ padding: '2rem 2.5rem' }}>
            <form
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {/* Name + Email row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label htmlFor="name" style={labelStyle}>
                    <span style={dotStyle} />お名前
                  </label>
                  <input
                    id="name" name="name" type="text"
                    placeholder="山田 太郎"
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label htmlFor="email" style={labelStyle}>
                    <span style={dotStyle} />メールアドレス
                  </label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="example@email.com"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="category" style={labelStyle}>
                  <span style={dotStyle} />お問い合わせ種別
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="category" name="category"
                    required
                    style={{ ...inputStyle, paddingRight: 44, appearance: 'none', WebkitAppearance: 'none' }}
                    defaultValue=""
                  >
                    <option value="" disabled>選択してください</option>
                    <option value="calculation">計算結果について</option>
                    <option value="feature">機能のご要望</option>
                    <option value="bug">不具合の報告</option>
                    <option value="privacy">プライバシー・個人情報</option>
                    <option value="other">その他</option>
                  </select>
                  <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#c9a96e', fontSize: 12, pointerEvents: 'none' }}>▾</span>
                </div>
              </div>

              {/* Subject */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="subject" style={labelStyle}>
                  件名
                </label>
                <input
                  id="subject" name="subject" type="text"
                  placeholder="例：BMI計算機の結果について"
                  style={inputStyle}
                />
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="message" style={labelStyle}>
                  <span style={dotStyle} />お問い合わせ内容
                </label>
                <textarea
                  id="message" name="message"
                  placeholder="ご質問・ご意見・不具合の詳細をご記入ください。&#10;&#10;（不具合の場合：ご利用の端末・ブラウザ・発生状況もお知らせいただけると助かります）"
                  required
                  rows={7}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 160, lineHeight: 1.8 }}
                />
              </div>

              {/* Privacy note */}
              <div style={{
                background: 'rgba(201,169,110,0.03)',
                border: '1px solid rgba(201,169,110,0.1)',
                borderRadius: 8,
                padding: '0.875rem 1rem',
                fontSize: '0.72rem',
                color: 'rgba(232,228,223,0.35)',
                lineHeight: 1.75,
                fontFamily: '"Noto Serif JP",serif',
              }}>
                送信いただいた情報はお問い合わせへの返信目的のみに使用し、第三者への提供は行いません。
                詳しくは<Link href="/privacy" style={{ color: 'rgba(201,169,110,0.5)', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.2)' }}>プライバシーポリシー</Link>をご確認ください。
              </div>

              {/* Submit */}
              <button type="submit" style={{
                width: '100%',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #e8624a, #c8432a)',
                border: 'none',
                borderRadius: 14,
                fontFamily: '"Noto Serif JP",serif',
                fontSize: '0.95rem',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(232,98,74,0.35)',
                transition: 'opacity 0.2s, transform 0.15s',
              }}>
                送信する →
              </button>
            </form>
          </div>
        </div>

        {/* Footer note */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.7rem', color: 'rgba(201,169,110,0.3)', letterSpacing: '0.08em', margin: 0 }}>
            ※ 返信には通常2営業日ほどいただきます。スパム対策のため自動返信は行っておりません。
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/terms" style={{ fontSize: '0.72rem', color: 'rgba(201,169,110,0.4)', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.15)' }}>利用規約</Link>
            <Link href="/privacy" style={{ fontSize: '0.72rem', color: 'rgba(201,169,110,0.4)', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.15)' }}>プライバシーポリシー</Link>
          </div>
        </div>
      </div>

      <footer className={styles.siteFooter}>
        <p className={styles.footerText}>© MuryoKeisan — 無料計算サイト</p>
      </footer>
    </div>
  );
}

/* ── Shared inline styles ── */
const labelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  letterSpacing: '0.12em',
  color: 'rgba(138,134,128,0.9)',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const dotStyle: React.CSSProperties = {
  display: 'inline-block',
  width: 5,
  height: 5,
  background: '#e8624a',
  borderRadius: '50%',
  flexShrink: 0,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1a1a24',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 20px',
  fontFamily: '"Noto Sans JP",sans-serif',
  fontSize: 15,
  color: '#e8e4df',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};