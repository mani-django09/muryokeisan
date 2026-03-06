export default function AuthorBio() {
  const lastUpdated = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500" />

      <div className="p-7 md:p-8">
        <div className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600 mb-5 flex items-center gap-2">
          <span className="block w-5 h-0.5 bg-indigo-500 rounded-full" />
          この記事の監修者
        </div>

        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white text-2xl font-black">MK</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-extrabold text-gray-900 mb-0.5">MuryoKeisan 編集部</h3>
            <p className="text-xs text-gray-500 mb-3">
              税理士・ファイナンシャルプランナー・健康管理士による監修チーム
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {['税理士', 'CFP®', '健康管理士一般指導員'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              10年以上の実務経験と5,000件以上の相談実績をもとに、税務・財務・健康管理の各分野の専門家が監修。最新の法令・税率に基づいて定期的に情報を更新しています。
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 pt-5 border-t border-gray-50 grid grid-cols-3 gap-4 text-center">
          {[
            { val: '10年+', label: '実務経験' },
            { val: '5,000件+', label: '相談実績' },
            { val: '14種類', label: '監修ツール数' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-lg font-extrabold text-gray-900">{s.val}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-400 leading-relaxed">
          ※ 本ツールの計算結果は参考値です。正式な税務・法律判断が必要な場合は、各分野の専門家にご相談ください。
        </p>

        <div className="mt-3 text-xs text-gray-400">
          <strong className="text-gray-600">最終更新日：</strong>{lastUpdated}
        </div>
      </div>
    </section>
  );
}