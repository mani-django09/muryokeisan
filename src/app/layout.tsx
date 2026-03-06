import type { Metadata } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP, Shippori_Mincho_B1 } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─── Fonts ──────────────────────────────────────────────── */
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-noto',
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-noto-serif',
});

const shippori = Shippori_Mincho_B1({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-shippori',
});

/* ─── Metadata ───────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://muryokeisan.online'),
  title: {
    default: '無料計算ツール一覧 | MuryoKeisan',
    template: '%s | MuryoKeisan',
  },
  description:
    '日常生活やビジネスで役立つ14種類の計算ツールを完全無料で提供。消費税・BMI・年齢・日数・所得税など、正確な計算結果が瞬時に得られます。登録不要・スマホ対応。',
  keywords:
    '計算, 消費税, BMI, 日数, 時間, パーセント, 体脂肪率, 出産予定日, 割引, 年齢, 固定資産税, 所得税, 時給, 失業保険, 無料計算ツール',
  openGraph: {
    title: '無料計算ツール一覧 | MuryoKeisan',
    description: '日常生活やビジネスで役立つ14種類の計算ツールを完全無料で提供。登録不要・スマホ対応。',
    url: 'https://muryokeisan.online',
    siteName: 'MuryoKeisan',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '無料計算ツール一覧 | MuryoKeisan',
    description: '日常生活やビジネスで役立つ14種類の計算ツールを完全無料で提供。登録不要・スマホ対応。',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://muryokeisan.online' },

  // ── Favicon — App Router auto-wires favicon.ico / icon.png / apple-icon.png
  // from /app directory. Manifest referenced explicitly for PWA support.
  manifest: '/site.webmanifest',

  icons: {
    icon: [
      { url: '/favicon.ico',      sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.ico' },
    ],
  },
};

/* ─── Root Layout ────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${notoSerifJP.variable} ${shippori.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0d0f1a" />
      </head>
      <body
        style={{ fontFamily: 'var(--font-noto), "Hiragino Sans", sans-serif' }}
      >
        <div className="relative flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}