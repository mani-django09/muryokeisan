import Link from 'next/link';

const TOOLS = [
  { href: '/bmi-keisan', label: 'BMI計算' },
  { href: '/tax-keisan', label: '消費税計算' },
  { href: '/days-keisan', label: '日数計算' },
  { href: '/time-keisan', label: '時間計算' },
  { href: '/percentage-keisan', label: 'パーセント計算' },
  { href: '/body-fat-keisan', label: '体脂肪率計算' },
  { href: '/due-date-keisan', label: '出産予定日計算' },
  { href: '/discount-keisan', label: '割引計算' },
  { href: '/age-keisan', label: '年齢計算' },
  { href: '/property-tax-keisan', label: '固定資産税計算' },
  { href: '/income-tax-keisan', label: '所得税計算' },
  { href: '/wage-keisan', label: '時給計算' },
  { href: '/unemployment-keisan', label: '失業保険計算' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1e] text-gray-400 mt-16">
      {/* Top divider glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-black text-sm">M</span>
              </div>
              <span className="font-black text-white text-lg tracking-tight">
                Muryo<span className="text-indigo-400">Keisan</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              日常生活やビジネスで役立つ計算ツールを完全無料でご提供。税理士・FP・健康管理士が監修した正確な情報をお届けします。
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              SSL暗号化通信・登録不要・完全無料
            </div>
          </div>

          {/* Tools grid */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">計算ツール一覧</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
              {TOOLS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors py-0.5 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors flex-shrink-0" />
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} MuryoKeisan.com All rights reserved.</p>
          <div className="flex gap-5">
            {[
              { label: 'サイトについて', href: '/about' },
              { label: 'プライバシーポリシー', href: '/privacy' },
              { label: '利用規約', href: '/terms' },
              { label: 'お問い合わせ', href: '/contact' },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-gray-400 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}