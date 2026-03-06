import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Heart, Scale, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function BMICalculator() {
  const [formData, setFormData] = useState({
    weight: "",
    height: ""
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
      const response = await fetch("/api/calc/bmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight: parseFloat(formData.weight) || 0,
          height: parseFloat(formData.height) || 0
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
      question: "BMIとは何ですか？どのように計算されますか？", 
      answer: "BMI（Body Mass Index：体格指数）は、体重と身長から算出される肥満度を表す国際的な指標です。計算式は「体重(kg) ÷ 身長(m)の2乗」で、例えば身長170cm、体重65kgの場合、65 ÷ (1.70 × 1.70) = 22.5となります。世界保健機関（WHO）が定めた基準で、健康状態の目安として広く使用されています。" 
    },
    { 
      question: "日本人の理想的なBMI値はいくつですか？", 
      answer: "日本肥満学会の基準では、BMI 22が最も病気になりにくい「標準体重」とされています。18.5未満は「低体重（やせ）」、18.5〜25未満が「普通体重」、25以上が「肥満」と分類されます。ただし、筋肉量が多いアスリートなどはBMIが高くても健康な場合があるため、あくまで目安としてお考えください。" 
    },
    { 
      question: "BMIが高いとどのような健康リスクがありますか？", 
      answer: "BMIが25以上の肥満状態が続くと、糖尿病、高血圧、脂質異常症、心臓病、脳卒中などの生活習慣病のリスクが高まります。また、睡眠時無呼吸症候群や関節への負担増加、一部のがんのリスク上昇も報告されています。定期的な健康診断と適切な体重管理が重要です。" 
    },
    { 
      question: "BMIが低すぎる場合の問題点は何ですか？", 
      answer: "BMI 18.5未満の低体重は、栄養不足による免疫力低下、骨粗しょう症、貧血、月経不順（女性の場合）、筋力低下などのリスクがあります。特に若い女性の過度なダイエットは将来の健康に影響を与える可能性があるため、バランスの取れた食事と適度な運動を心がけましょう。" 
    },
    { 
      question: "BMI以外に体型を評価する方法はありますか？", 
      answer: "BMIは簡便な指標ですが、体脂肪率、ウエスト周囲径、ウエスト・ヒップ比なども重要な指標です。特に内臓脂肪型肥満（メタボリックシンドローム）の評価には、男性85cm以上、女性90cm以上のウエスト周囲径が基準となります。当サイトの体脂肪率計算機も併せてご活用ください。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BMI計算機 - 体格指数を簡単計算｜無料オンラインツール",
    "description": "身長と体重を入力するだけで、BMI（体格指数）を瞬時に計算。日本肥満学会の基準に基づいた判定結果と健康アドバイスを提供します。",
    "applicationCategory": "HealthApplication",
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

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "低体重（やせ）", color: "text-blue-600", icon: AlertCircle };
    if (bmi < 25) return { label: "普通体重", color: "text-green-600", icon: CheckCircle };
    if (bmi < 30) return { label: "肥満（1度）", color: "text-yellow-600", icon: AlertCircle };
    if (bmi < 35) return { label: "肥満（2度）", color: "text-orange-600", icon: AlertCircle };
    return { label: "肥満（3度以上）", color: "text-red-600", icon: AlertCircle };
  };

  return (
    <>
      <SEOHead
        title="BMI計算機 - 体格指数を簡単計算｜無料オンラインツール"
        description="身長と体重を入力するだけで、BMI（体格指数）を瞬時に計算。日本肥満学会の基準に基づいた判定結果と健康アドバイスを無料で提供。スマホ対応で外出先でも簡単に使えます。"
        keywords="BMI計算, BMI計算機, 体格指数, 肥満度チェック, 標準体重, ダイエット, 健康管理, BMI判定"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Heart className="w-4 h-4" />
                健康管理ツール
              </div>
              <h1 className="mb-3">BMI計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                身長と体重を入力するだけで、あなたのBMI（体格指数）を瞬時に計算。
                日本肥満学会の基準に基づいた判定結果をお届けします。
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
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">数値を入力</h2>
                    <p className="text-sm text-muted-foreground">身長と体重を入力してください</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="height" className="text-base font-medium mb-2 block">身長</Label>
                    <div className="relative">
                      <Input
                        id="height"
                        type="number"
                        step="0.1"
                        placeholder="170"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="form-input pr-12 text-lg"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">cm</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-base font-medium mb-2 block">体重</Label>
                    <div className="relative">
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="65"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="form-input pr-12 text-lg"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">kg</span>
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
                        BMIを計算する
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
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">あなたのBMI値と判定</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-6">
                    <div className="result-display">
                      <div className="result-value">{result.bmi}</div>
                      <div className="result-label">あなたのBMI値</div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-muted/30">
                      <div className={`flex items-center gap-2 font-semibold text-lg ${getBMICategory(parseFloat(result.bmi)).color}`}>
                        {(() => {
                          const Icon = getBMICategory(parseFloat(result.bmi)).icon;
                          return <Icon className="w-5 h-5" />;
                        })()}
                        {result.category}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        日本肥満学会の基準による判定結果です
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-center text-sm">
                      <div className="p-3 rounded-lg bg-blue-50">
                        <div className="font-bold text-blue-600">&lt;18.5</div>
                        <div className="text-muted-foreground">低体重</div>
                      </div>
                      <div className="p-3 rounded-lg bg-green-50">
                        <div className="font-bold text-green-600">18.5-25</div>
                        <div className="text-muted-foreground">普通</div>
                      </div>
                      <div className="p-3 rounded-lg bg-orange-50">
                        <div className="font-bold text-orange-600">&gt;25</div>
                        <div className="text-muted-foreground">肥満</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Scale className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに身長と体重を入力して<br />
                      「BMIを計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>BMI（体格指数）とは？健康管理の基本指標</h2>
                <p>
                  BMI（Body Mass Index：ボディマス指数）は、身長と体重の関係から算出される体格を評価するための国際的な指標です。
                  1835年にベルギーの統計学者アドルフ・ケトレーによって考案され、現在では世界保健機関（WHO）をはじめ、
                  各国の医療機関で肥満度の判定に広く使用されています。
                </p>
                <p>
                  日本では、日本肥満学会が独自の基準を設けており、BMI 22を「標準体重」として、
                  この値が最も病気になりにくい理想的な体格とされています。当計算機では、この日本基準に基づいて
                  あなたの体格を判定し、健康管理に役立つ情報を提供します。
                </p>
              </div>

              <div className="content-section">
                <h2>BMIの計算方法と判定基準</h2>
                <h3>計算式</h3>
                <p>
                  BMIは以下の計算式で求められます：
                </p>
                <div className="bg-muted/30 p-6 rounded-xl my-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">BMI = 体重(kg) ÷ 身長(m)²</div>
                  <p className="text-sm text-muted-foreground">※身長はメートル単位で計算します（170cm = 1.70m）</p>
                </div>
                
                <h3>日本肥満学会の判定基準</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="font-bold text-blue-700 text-lg">18.5未満</div>
                    <div className="text-blue-600">低体重（やせ）</div>
                  </div>
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                    <div className="font-bold text-green-700 text-lg">18.5〜25未満</div>
                    <div className="text-green-600">普通体重</div>
                  </div>
                  <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                    <div className="font-bold text-yellow-700 text-lg">25〜30未満</div>
                    <div className="text-yellow-600">肥満（1度）</div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                    <div className="font-bold text-red-700 text-lg">30以上</div>
                    <div className="text-red-600">肥満（2度以上）</div>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h2>BMI計算の具体例</h2>
                <p>
                  実際の計算例をご紹介します。身長170cm、体重65kgの場合：
                </p>
                <div className="bg-muted/30 p-6 rounded-xl my-6">
                  <div className="space-y-2">
                    <p><strong>Step 1:</strong> 身長をメートルに変換 → 170cm = 1.70m</p>
                    <p><strong>Step 2:</strong> 身長を2乗 → 1.70 × 1.70 = 2.89</p>
                    <p><strong>Step 3:</strong> 体重を身長の2乗で割る → 65 ÷ 2.89 = <span className="text-primary font-bold">22.5</span></p>
                  </div>
                  <p className="mt-4 text-green-600 font-medium">
                    → BMI 22.5は「普通体重」の範囲で、理想的な体格です！
                  </p>
                </div>
              </div>

              <div className="content-section">
                <h2>BMIを活用した健康管理のポイント</h2>
                <p>
                  BMIは健康管理の重要な指標ですが、これだけで全ての健康状態を判断することはできません。
                  以下のポイントを参考に、総合的な健康管理を心がけましょう。
                </p>
                <ul>
                  <li>定期的にBMIを測定し、体重の変化を記録する</li>
                  <li>BMIだけでなく、体脂肪率やウエスト周囲径も確認する</li>
                  <li>急激な体重変化がある場合は医療機関に相談する</li>
                  <li>バランスの取れた食事と適度な運動を継続する</li>
                  <li>年に一度は健康診断を受け、総合的な健康チェックを行う</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>BMI計算時の注意点</h2>
                <p>
                  BMIは便利な指標ですが、以下の点に注意が必要です：
                </p>
                <ul>
                  <li><strong>筋肉量を考慮しない：</strong>アスリートや筋トレをしている方は、筋肉が重いためBMIが高く出ることがあります</li>
                  <li><strong>年齢による違い：</strong>高齢者は筋肉量が減少するため、同じBMIでも体脂肪率が異なる場合があります</li>
                  <li><strong>体脂肪の分布：</strong>内臓脂肪型肥満はBMIが正常でも健康リスクが高い場合があります</li>
                  <li><strong>成長期の子供：</strong>子供のBMI判定には年齢・性別を考慮した別の基準が必要です</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <p>
                  より詳しい健康管理のために、以下の計算ツールもご活用ください：
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/body-fat-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">体脂肪率計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">体脂肪率を推定計算</p>
                  </Link>
                  <Link href="/age-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">年齢計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">生年月日から年齢を計算</p>
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
