import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Wallet, Clock, TrendingUp, AlertCircle, Calculator } from "lucide-react";
import { Link } from "wouter";

export default function WageCalculator() {
  const [formData, setFormData] = useState({
    hourlyWage: "",
    hoursPerDay: "",
    daysPerWeek: ""
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/calc/wage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hourlyWage: parseFloat(formData.hourlyWage) || 0,
          hoursPerDay: parseFloat(formData.hoursPerDay) || 0,
          daysPerWeek: parseFloat(formData.daysPerWeek) || 0
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "計算エラーが発生しました");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const faqItems = [
    { 
      question: "最低賃金はいくらですか？", 
      answer: "最低賃金は都道府県ごとに異なります。2024年10月時点で、東京都は1,163円、神奈川県は1,162円、大阪府は1,114円などとなっています。全国加重平均は1,055円です。最低賃金は毎年10月頃に改定されるため、最新情報は厚生労働省のウェブサイトでご確認ください。" 
    },
    { 
      question: "時給から月収を計算する方法は？", 
      answer: "月収は「時給 × 1日の勤務時間 × 月の勤務日数」で計算できます。例えば、時給1,200円で1日8時間、週5日勤務の場合、1,200円 × 8時間 × 約21.7日（週5日×52週÷12ヶ月）= 約208,320円となります。当計算機では、この計算を自動で行います。" 
    },
    { 
      question: "手取りと額面の違いは何ですか？", 
      answer: "額面（総支給額）は、会社から支払われる給与の総額です。手取り（差引支給額）は、額面から社会保険料（健康保険、厚生年金、雇用保険）と税金（所得税、住民税）を差し引いた実際に受け取る金額です。一般的に手取りは額面の75〜85%程度になります。" 
    },
    { 
      question: "残業代の計算方法は？", 
      answer: "残業代は、法定労働時間（1日8時間、週40時間）を超えた分に対して支払われます。通常の残業は時給の1.25倍、深夜（22時〜5時）は1.5倍、休日労働は1.35倍、深夜の休日労働は1.6倍となります。例えば時給1,000円の場合、通常残業は1,250円/時間です。" 
    },
    { 
      question: "103万円・130万円の壁とは何ですか？", 
      answer: "103万円の壁は、年収が103万円を超えると所得税が発生し、配偶者控除の対象外になる基準です。130万円の壁は、年収が130万円を超えると社会保険の扶養から外れ、自分で健康保険・年金に加入する必要がある基準です。パート・アルバイトの方は、これらの基準を意識して働く時間を調整することがあります。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "時給計算機 - 時給から月収・年収を簡単計算｜無料ツール",
    "description": "時給と勤務時間を入力するだけで、日給・週給・月収・年収を瞬時に計算。パート・アルバイトの収入シミュレーションに便利な無料オンラインツールです。",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title="時給計算機 - 時給から月収・年収を簡単計算｜無料ツール"
        description="時給と勤務時間を入力するだけで、日給・週給・月収・年収を瞬時に計算。パート・アルバイトの収入シミュレーション、扶養内での働き方の検討に便利な無料オンラインツールです。"
        keywords="時給計算, 時給計算機, 月収計算, 年収計算, パート収入, アルバイト収入, 給与計算, 賃金計算"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Wallet className="w-4 h-4" />
                お金・給与ツール
              </div>
              <h1 className="mb-3">時給計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                時給と勤務時間を入力するだけで、月収・年収を瞬時に計算。
                パート・アルバイトの収入シミュレーションに最適です。
              </p>
            </div>
          </div>
        </section>

        <div className="container py-12">
          <AdTop />

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <Card className="calculator-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">勤務条件を入力</h2>
                    <p className="text-sm text-muted-foreground">時給と勤務時間を入力してください</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="hourlyWage" className="text-base font-medium mb-2 block">時給</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">¥</span>
                      <Input
                        id="hourlyWage"
                        type="number"
                        step="1"
                        placeholder="1200"
                        value={formData.hourlyWage}
                        onChange={(e) => setFormData({ ...formData, hourlyWage: e.target.value })}
                        className="form-input pl-10 text-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="hoursPerDay" className="text-base font-medium mb-2 block">1日の勤務時間</Label>
                    <div className="relative">
                      <Input
                        id="hoursPerDay"
                        type="number"
                        step="0.5"
                        placeholder="8"
                        value={formData.hoursPerDay}
                        onChange={(e) => setFormData({ ...formData, hoursPerDay: e.target.value })}
                        className="form-input pr-14 text-lg"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">時間</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="daysPerWeek" className="text-base font-medium mb-2 block">週の勤務日数</Label>
                    <div className="relative">
                      <Input
                        id="daysPerWeek"
                        type="number"
                        step="0.5"
                        placeholder="5"
                        value={formData.daysPerWeek}
                        onChange={(e) => setFormData({ ...formData, daysPerWeek: e.target.value })}
                        className="form-input pr-10 text-lg"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">日</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setFormData({ ...formData, daysPerWeek: days.toString() })}
                        className={`p-3 rounded-xl border-2 transition-all text-center ${
                          formData.daysPerWeek === days.toString()
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="font-bold">{days}日</div>
                      </button>
                    ))}
                  </div>
                  
                  <Button type="submit" className="w-full btn-primary h-14 text-lg" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        計算中...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 h-5 w-5" />
                        収入を計算する
                      </>
                    )}
                  </Button>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-4 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </div>
                  )}
                </form>
              </Card>

              <Card className="calculator-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">予想収入（税引前）</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">¥{result.monthlyIncome.toLocaleString()}</div>
                      <div className="result-label">月収（税引前）</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">¥{result.dailyIncome.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">日給</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">¥{result.weeklyIncome.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">週給</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                      <div className="text-2xl font-bold text-green-700">¥{result.yearlyIncome.toLocaleString()}</div>
                      <div className="text-sm text-green-600 mt-1">年収（税引前）</div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Calculator className="w-4 h-4" />
                        計算条件
                      </div>
                      <div className="text-muted-foreground space-y-1">
                        <p>時給: ¥{Number(formData.hourlyWage).toLocaleString()}</p>
                        <p>勤務: {formData.hoursPerDay}時間/日 × {formData.daysPerWeek}日/週</p>
                        <p>月間勤務日数: 約{result.monthlyDays}日</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm">
                      <p className="text-amber-800">
                        ※ 表示金額は税引前の額面です。実際の手取りは社会保険料・税金控除後の金額となります。
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Wallet className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに勤務条件を入力して<br />
                      「収入を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>時給から収入を計算する方法</h2>
                <p>
                  時給制で働く場合、月収や年収を把握することは家計管理や将来設計において非常に重要です。
                  当計算機では、時給と勤務時間から日給、週給、月収、年収を自動的に算出します。
                </p>
                <p>
                  計算式は以下の通りです：
                </p>
                <ul>
                  <li><strong>日給</strong> = 時給 × 1日の勤務時間</li>
                  <li><strong>週給</strong> = 日給 × 週の勤務日数</li>
                  <li><strong>月収</strong> = 週給 × 52週 ÷ 12ヶ月</li>
                  <li><strong>年収</strong> = 週給 × 52週</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>扶養内で働く場合の年収の壁</h2>
                <p>
                  パート・アルバイトで働く場合、税金や社会保険の観点から意識すべき「年収の壁」があります：
                </p>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left border">年収の壁</th>
                        <th className="p-4 text-left border">影響</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border font-bold">103万円</td>
                        <td className="p-4 border">所得税が発生、配偶者控除の対象外に</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border font-bold">106万円</td>
                        <td className="p-4 border">一定条件で社会保険加入義務（大企業）</td>
                      </tr>
                      <tr>
                        <td className="p-4 border font-bold">130万円</td>
                        <td className="p-4 border">社会保険の扶養から外れる</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border font-bold">150万円</td>
                        <td className="p-4 border">配偶者特別控除が段階的に減少</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="content-section">
                <h2>最低賃金について</h2>
                <p>
                  日本では最低賃金法により、都道府県ごとに最低賃金が定められています。
                  使用者は、この最低賃金以上の賃金を支払う義務があります。
                </p>
                <p>
                  最低賃金は毎年10月頃に改定され、近年は引き上げ傾向にあります。
                  2024年10月時点の主要都市の最低賃金は以下の通りです：
                </p>
                <ul>
                  <li>東京都：1,163円</li>
                  <li>神奈川県：1,162円</li>
                  <li>大阪府：1,114円</li>
                  <li>愛知県：1,077円</li>
                  <li>福岡県：1,004円</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <p>
                  お金や税金に関連するツールもご活用ください：
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/tax-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">消費税計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">消費税を計算</p>
                  </Link>
                  <Link href="/time-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">時間計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">勤務時間を計算</p>
                  </Link>
                </div>
              </div>
            </div>

            <FAQ items={faqItems} />

            <AdBottom />
          </div>
        </div>
      </div>
    </>
  );
}
