import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Clock, Timer, TrendingUp, AlertCircle, Hourglass } from "lucide-react";
import { Link } from "wouter";

export default function TimeCalculator() {
  const [formData, setFormData] = useState({
    hours1: "",
    minutes1: "",
    hours2: "",
    minutes2: "",
    operation: "add"
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
      const response = await fetch("/api/calc/time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hours1: parseInt(formData.hours1) || 0,
          minutes1: parseInt(formData.minutes1) || 0,
          hours2: parseInt(formData.hours2) || 0,
          minutes2: parseInt(formData.minutes2) || 0,
          operation: formData.operation
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
      question: "時間計算で60分を超えた場合はどうなりますか？", 
      answer: "60分を超えた場合は自動的に時間に繰り上げられます。例えば、2時間45分 + 1時間30分 = 4時間15分となります。当計算機では、この繰り上げ処理を自動で行いますので、複雑な計算も簡単に行えます。" 
    },
    { 
      question: "マイナスの時間は計算できますか？", 
      answer: "引き算の結果がマイナスになる場合も計算可能です。例えば、1時間から2時間を引くと-1時間（マイナス1時間）と表示されます。勤務時間の過不足計算などに活用できます。" 
    },
    { 
      question: "24時間を超える時間も計算できますか？", 
      answer: "はい、24時間を超える時間も問題なく計算できます。例えば、18時間 + 12時間 = 30時間として表示されます。長時間のプロジェクト管理や累計作業時間の計算に便利です。" 
    },
    { 
      question: "秒単位の計算はできますか？", 
      answer: "現在の計算機は時間と分の単位に対応しています。秒単位の精密な計算が必要な場合は、分を小数点で入力することで近似的に計算できます（例：30秒 = 0.5分）。" 
    },
    { 
      question: "勤務時間の計算に使えますか？", 
      answer: "はい、勤務時間の計算に最適です。出勤時刻と退勤時刻の差を計算したり、複数日の勤務時間を合計したりできます。残業時間の計算や月間労働時間の集計にもご活用いただけます。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "時間計算機 - 時間の足し算・引き算を簡単計算｜無料ツール",
    "description": "時間と分を入力するだけで、時間の加算・減算を瞬時に計算。勤務時間の計算や作業時間の集計に便利な無料オンラインツールです。",
    "applicationCategory": "UtilityApplication",
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
        title="時間計算機 - 時間の足し算・引き算を簡単計算｜無料ツール"
        description="時間と分を入力するだけで、時間の加算・減算を瞬時に計算。勤務時間の計算、作業時間の集計、残業時間の計算に便利な無料オンラインツールです。"
        keywords="時間計算, 時間計算機, 時間足し算, 時間引き算, 勤務時間計算, 作業時間, 残業計算, 時間合計"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Clock className="w-4 h-4" />
                日付・時間ツール
              </div>
              <h1 className="mb-3">時間計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                時間と分を入力するだけで、足し算・引き算を瞬時に計算。
                勤務時間の管理や作業時間の集計に最適なツールです。
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
                    <Timer className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">時間を入力</h2>
                    <p className="text-sm text-muted-foreground">2つの時間と計算方法を選択</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label className="text-base font-medium mb-2 block">時間1</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.hours1}
                          onChange={(e) => setFormData({ ...formData, hours1: e.target.value })}
                          className="form-input pr-12 text-lg"
                          required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">時間</span>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.minutes1}
                          onChange={(e) => setFormData({ ...formData, minutes1: e.target.value })}
                          className="form-input pr-10 text-lg"
                          required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">分</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium mb-3 block">計算方法</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, operation: "add" })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.operation === "add" 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="font-bold text-2xl">＋</div>
                        <div className="text-sm text-muted-foreground">足し算</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, operation: "subtract" })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.operation === "subtract" 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="font-bold text-2xl">−</div>
                        <div className="text-sm text-muted-foreground">引き算</div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium mb-2 block">時間2</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.hours2}
                          onChange={(e) => setFormData({ ...formData, hours2: e.target.value })}
                          className="form-input pr-12 text-lg"
                          required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">時間</span>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.minutes2}
                          onChange={(e) => setFormData({ ...formData, minutes2: e.target.value })}
                          className="form-input pr-10 text-lg"
                          required
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">分</span>
                      </div>
                    </div>
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
                        時間を計算する
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
                    <Hourglass className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">計算された時間</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">{result.hours}時間{result.minutes}分</div>
                      <div className="result-label">計算結果</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.totalMinutes}分</div>
                        <div className="text-sm text-muted-foreground mt-1">分換算</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.decimalHours}時間</div>
                        <div className="text-sm text-muted-foreground mt-1">小数時間</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Clock className="w-4 h-4" />
                        計算式
                      </div>
                      <p className="text-muted-foreground">
                        {formData.hours1}時間{formData.minutes1}分 {formData.operation === "add" ? "+" : "−"} {formData.hours2}時間{formData.minutes2}分 = {result.hours}時間{result.minutes}分
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Clock className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに時間を入力して<br />
                      「時間を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>時間計算とは？60進法の基本</h2>
                <p>
                  時間計算は、私たちの日常生活やビジネスで頻繁に必要となる計算です。しかし、時間は60進法（1時間=60分、1分=60秒）を
                  使用しているため、通常の10進法の計算とは異なる注意が必要です。例えば、45分 + 30分は75分ではなく、1時間15分となります。
                </p>
                <p>
                  当計算機では、この60進法の繰り上げ・繰り下げを自動的に処理し、正確な結果を瞬時に表示します。
                  勤務時間の計算、作業時間の集計、残業時間の管理など、様々な場面でお役立てください。
                </p>
              </div>

              <div className="content-section">
                <h2>時間計算の活用シーン</h2>
                <h3>勤怠管理での活用</h3>
                <p>
                  勤怠管理は時間計算が最も活用される場面の一つです：
                </p>
                <ul>
                  <li>1日の勤務時間の計算（退勤時刻 − 出勤時刻 − 休憩時間）</li>
                  <li>週間・月間の総労働時間の集計</li>
                  <li>残業時間の計算と管理</li>
                  <li>有給休暇の時間単位取得の計算</li>
                  <li>フレックスタイムの過不足計算</li>
                </ul>
                
                <h3>プロジェクト管理での活用</h3>
                <p>
                  プロジェクトの時間管理にも時間計算は欠かせません：
                </p>
                <ul>
                  <li>タスクごとの作業時間の記録と集計</li>
                  <li>見積もり時間と実績時間の比較</li>
                  <li>チームメンバーの稼働時間の把握</li>
                  <li>工数の予実管理</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>時間計算の具体例</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left border">計算</th>
                        <th className="p-4 text-left border">時間1</th>
                        <th className="p-4 text-left border">時間2</th>
                        <th className="p-4 text-left border">結果</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border">足し算</td>
                        <td className="p-4 border">2時間45分</td>
                        <td className="p-4 border">1時間30分</td>
                        <td className="p-4 border font-bold">4時間15分</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border">引き算</td>
                        <td className="p-4 border">8時間00分</td>
                        <td className="p-4 border">1時間00分</td>
                        <td className="p-4 border font-bold">7時間00分</td>
                      </tr>
                      <tr>
                        <td className="p-4 border">足し算</td>
                        <td className="p-4 border">5時間50分</td>
                        <td className="p-4 border">2時間40分</td>
                        <td className="p-4 border font-bold">8時間30分</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="content-section">
                <h2>時間の単位変換</h2>
                <p>
                  時間計算では、様々な単位への変換が必要になることがあります：
                </p>
                <div className="bg-muted/30 p-6 rounded-xl my-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold mb-2">分から時間への変換</h4>
                      <p className="text-sm text-muted-foreground">90分 = 1時間30分</p>
                      <p className="text-sm text-muted-foreground">150分 = 2時間30分</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">小数時間への変換</h4>
                      <p className="text-sm text-muted-foreground">1時間30分 = 1.5時間</p>
                      <p className="text-sm text-muted-foreground">2時間15分 = 2.25時間</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <p>
                  時間や日付に関する計算には、以下のツールもご活用ください：
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/days-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">日数計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">2つの日付間の日数を計算</p>
                  </Link>
                  <Link href="/wage-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">時給計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">時給から月収を計算</p>
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
