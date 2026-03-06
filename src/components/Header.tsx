'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/bmi-keisan', label: 'BMI計算' },
  { href: '/tax-keisan', label: '消費税' },
  { href: '/age-keisan', label: '年齢' },
  { href: '/income-tax-keisan', label: '所得税' },
  { href: '/days-keisan', label: '日数' },
  { href: '/wage-keisan', label: '時給' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
              <span className="text-white font-black text-sm">M</span>
            </div>
            <div>
              <span className="font-black text-gray-900 text-lg tracking-tight leading-none">
                Muryo<span className="text-indigo-600">Keisan</span>
              </span>
              <div className="text-[10px] text-gray-400 leading-none mt-0.5 tracking-widest uppercase">
                Free Calculators
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-150"
            >
              <span>全ツール一覧</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="メニュー"
            >
              <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 pb-4">
            <nav className="flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="mt-2 mx-0 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl text-center"
              >
                全ツール一覧を見る →
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}