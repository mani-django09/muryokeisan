export default function TrustSignals() {
  const signals = [
    {
      icon: '👥',
      value: '100万+',
      label: '年間利用者数',
      sub: '多くの方にご活用いただいています',
    },
    {
      icon: '🛠️',
      value: '14種類',
      label: '計算ツール',
      sub: '生活・ビジネスの幅広いニーズに対応',
    },
    {
      icon: '🆓',
      value: '完全無料',
      label: '会員登録不要',
      sub: '登録・課金一切なし',
    },
    {
      icon: '🔒',
      value: 'SSL',
      label: '暗号化通信',
      sub: '入力情報は保存されません',
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-100 bg-gradient-to-br from-slate-50 to-indigo-50 p-6 shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {signals.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm"
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-xl font-black text-gray-900 leading-tight">{s.value}</div>
            <div className="text-xs font-bold text-indigo-600 mt-0.5">{s.label}</div>
            <div className="text-[10px] text-gray-400 mt-1 leading-snug">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}