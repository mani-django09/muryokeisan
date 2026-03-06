import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Home, Building, TrendingUp, AlertCircle, Calculator } from "lucide-react";
import { Link } from "wouter";

export default function PropertyTaxCalculator() {
  const [formData, setFormData] = useState({
    assessedValue: "",
    isResidential: "true"
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
      const response = await fetch("/api/calc/property-tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessedValue: parseFloat(formData.assessedValue) || 0,
          isResidential: formData.isResidential === "true"
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
      question: "固定資産税の計算方法を教えてください", 
      answer: "固定資産税は「課税標準額 × 税率（標準1.4%）」で計算されます。課税標準額は固定資産税評価額を基に算出されますが、住宅用地の場合は軽減措置があり、200㎡以下の小規模住宅用地は評価額の1/6、200㎡超の一般住宅用地は1/3が課税標準額となります。" 
    },
    { 
      question: "固定資産税評価額はどこで確認できますか？", 
      answer: "固定資産税評価額は、毎年4〜5月頃に届く「固定資産税・都市計画税 納税通知書」に記載されています。また、市区町村の税務課で「固定資産評価証明書」を取得することでも確認できます。なお、評価額は3年ごとに見直されます（評価替え）。" 
    },
    { 
      question: "都市計画税とは何ですか？", 
      answer: "都市計画税は、都市計画区域内の土地・建物に課される地方税で、都市計画事業や土地区画整理事業の費用に充てられます。税率は市区町村によって異なりますが、上限は0.3%です。固定資産税と一緒に納付します。" 
    },
    { 
      question: "新築住宅の固定資産税軽減措置とは？", 
      answer: "新築住宅には固定資産税の軽減措置があります。一般住宅は新築後3年間、認定長期優良住宅は5年間、マンション等の耐火・準耐火建築物は5年間（長期優良住宅は7年間）、建物部分の固定資産税が1/2に軽減されます。" 
    },
    { 
      question: "固定資産税の支払い方法と時期は？", 
      answer: "固定資産税は通常、年4回に分けて納付します（4月、7月、12月、翌年2月頃。自治体により異なる）。一括納付も可能です。支払い方法は、金融機関窓口、コンビニ、口座振替、クレジットカード、電子マネー、スマホ決済など多様化しています。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "固定資産税計算機 - 土地・建物の固定資産税を簡単計算｜無料ツール",
    "description": "固定資産税評価額を入力するだけで、固定資産税と都市計画税を瞬時に計算。住宅用地の軽減措置にも対応した無料オンラインツールです。",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <>
      <SEOHead
        title="固定資産税計算機 - 土地・建物の固定資産税を簡単計算｜無料ツール"
        description="固定資産税評価額を入力するだけで、固定資産税と都市計画税を瞬時に計算。住宅用地の軽減措置にも対応。不動産購入前のシミュレーションに便利な無料オンラインツールです。"
        keywords="固定資産税計算, 固定資産税計算機, 都市計画税, 住宅用地, 固定資産税評価額"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Home className="w-4 h-4" />
                不動産・税金ツール
              </div>
              <h1 className="mb-3">固定資産税計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                固定資産税評価額を入力するだけで、固定資産税と都市計画税を瞬時に計算。
                住宅用地の軽減措置にも対応しています。
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
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">評価額を入力</h2>
                    <p className="text-sm text-muted-foreground">固定資産税評価額を入力してください</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="assessedValue" className="text-base font-medium mb-2 block">固定資産税評価額</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">¥</span>
                      <Input
                        id="assessedValue"
                        type="number"
                        step="1"
                        placeholder="10000000"
                        value={formData.assessedValue}
                        onChange={(e) => setFormData({ ...formData, assessedValue: e.target.value })}
                        className="form-input pl-10 text-lg"
                        required
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">納税通知書に記載の評価額を入力</p>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium mb-3 block">用途区分</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isResidential: "true" })}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          formData.isResidential === "true"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <Home className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-bold">住宅用地</div>
                        <div className="text-xs text-muted-foreground mt-1">軽減措置あり</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isResidential: "false" })}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          formData.isResidential === "false"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <Building className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-bold">非住宅用地</div>
                        <div className="text-xs text-muted-foreground mt-1">商業・事業用等</div>
                      </button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full btn-primary h-14 text-lg" disabled={loading}>
                    {loading ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" />計算中...</>
                    ) : (
                      <><TrendingUp className="mr-2 h-5 w-5" />固定資産税を計算する</>
                    )}
                  </Button>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-4 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />{error}
                    </div>
                  )}
                </form>
              </Card>

              <Card className="calculator-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">年間の税額</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">¥{result.totalTax.toLocaleString()}</div>
                      <div className="result-label">年間合計税額</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">¥{result.propertyTax.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">固定資産税</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">¥{result.cityPlanningTax.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">都市計画税</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-muted/30 text-center">
                      <div className="text-2xl font-bold text-foreground">¥{Math.round(result.totalTax / 4).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground mt-1">1期あたりの納付額（年4回）</div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Calculator className="w-4 h-4" />計算内訳
                      </div>
                      <div className="text-muted-foreground space-y-1">
                        <p>評価額: ¥{Number(formData.assessedValue).toLocaleString()}</p>
                        <p>課税標準額: ¥{result.taxableValue.toLocaleString()}</p>
                        <p>固定資産税率: 1.4% / 都市計画税率: 0.3%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Home className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに評価額を入力して<br />「固定資産税を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>固定資産税とは</h2>
                <p>
                  固定資産税は、毎年1月1日時点で土地、家屋、償却資産を所有している人に課される地方税です。
                  市区町村が課税主体となり、その税収は地方自治体の重要な財源となっています。
                  固定資産税の標準税率は1.4%ですが、市区町村によっては異なる税率を設定している場合があります。
                </p>
              </div>

              <div className="content-section">
                <h2>住宅用地の軽減措置</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left border">区分</th>
                        <th className="p-4 text-left border">固定資産税</th>
                        <th className="p-4 text-left border">都市計画税</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border font-bold">小規模住宅用地（200㎡以下）</td>
                        <td className="p-4 border">評価額 × 1/6</td>
                        <td className="p-4 border">評価額 × 1/3</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border font-bold">一般住宅用地（200㎡超）</td>
                        <td className="p-4 border">評価額 × 1/3</td>
                        <td className="p-4 border">評価額 × 2/3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/tax-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">消費税計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">消費税を計算</p>
                  </Link>
                  <Link href="/percentage-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">パーセント計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">割合を計算</p>
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
