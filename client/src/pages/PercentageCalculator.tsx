import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Percent, Calculator, TrendingUp, AlertCircle, PieChart } from "lucide-react";
import { Link } from "wouter";

export default function PercentageCalculator() {
  const [formData, setFormData] = useState({
    value: "",
    percentage: "",
    calcType: "of"
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
      const response = await fetch("/api/calc/percentage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: parseFloat(formData.value) || 0,
          percentage: parseFloat(formData.percentage) || 0,
          calcType: formData.calcType
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
      question: "パーセントとは何ですか？", 
      answer: "パーセント（%）は「100分のいくつ」を表す単位です。例えば、50%は100分の50、つまり半分を意味します。パーセントは割合を表現する最も一般的な方法で、割引率、利率、成長率など様々な場面で使用されています。" 
    },
    { 
      question: "「AのB%」と「AはBの何%」の違いは？", 
      answer: "「AのB%」は、Aという数値のB%を求める計算です（例：100の20% = 20）。一方、「AはBの何%」は、AがBに対してどれくらいの割合かを求める計算です（例：20は100の何% = 20%）。当計算機では両方の計算に対応しています。" 
    },
    { 
      question: "パーセントの計算式を教えてください", 
      answer: "基本的な計算式は以下の通りです。①AのB% = A × B ÷ 100、②AはBの何% = A ÷ B × 100、③A%増加後の値 = 元の値 × (1 + A/100)、④A%減少後の値 = 元の値 × (1 - A/100)。当計算機ではこれらの計算を自動で行います。" 
    },
    { 
      question: "パーセントと小数・分数の変換方法は？", 
      answer: "パーセントを小数に変換するには100で割ります（例：25% = 0.25）。分数に変換するには、パーセントの数値を分子、100を分母にします（例：25% = 25/100 = 1/4）。逆に、小数をパーセントにするには100を掛けます（例：0.25 × 100 = 25%）。" 
    },
    { 
      question: "ビジネスでよく使うパーセント計算は？", 
      answer: "ビジネスでは、売上の前年比（成長率）、利益率、原価率、割引率、達成率などのパーセント計算が頻繁に使われます。例えば、売上1000万円で利益100万円なら利益率は10%、目標100に対して実績80なら達成率は80%となります。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "パーセント計算機 - 割合・百分率を簡単計算｜無料ツール",
    "description": "数値とパーセントを入力するだけで、割合計算を瞬時に実行。「AのB%」「AはBの何%」など様々なパーセント計算に対応した無料オンラインツールです。",
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
        title="パーセント計算機 - 割合・百分率を簡単計算｜無料ツール"
        description="数値とパーセントを入力するだけで、割合計算を瞬時に実行。「AのB%」「AはBの何%」など様々なパーセント計算に対応。ビジネスや日常生活で役立つ無料オンラインツールです。"
        keywords="パーセント計算, パーセント計算機, 割合計算, 百分率, %計算, 割引計算, 比率計算, パーセンテージ"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Percent className="w-4 h-4" />
                数学・計算ツール
              </div>
              <h1 className="mb-3">パーセント計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                数値とパーセントを入力するだけで、様々な割合計算を瞬時に実行。
                ビジネスから日常生活まで幅広く活用できます。
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
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">数値を入力</h2>
                    <p className="text-sm text-muted-foreground">計算したい数値とパーセントを入力</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label className="text-base font-medium mb-3 block">計算タイプ</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, calcType: "of" })}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          formData.calcType === "of" 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="font-bold">AのB%を計算</div>
                        <div className="text-sm text-muted-foreground">例：100の20% = 20</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, calcType: "is" })}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          formData.calcType === "is" 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="font-bold">AはBの何%か計算</div>
                        <div className="text-sm text-muted-foreground">例：20は100の何% = 20%</div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="value" className="text-base font-medium mb-2 block">
                      {formData.calcType === "of" ? "元の数値 (A)" : "比較する数値 (A)"}
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      step="any"
                      placeholder={formData.calcType === "of" ? "100" : "20"}
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      className="form-input text-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="percentage" className="text-base font-medium mb-2 block">
                      {formData.calcType === "of" ? "パーセント (B%)" : "基準となる数値 (B)"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="percentage"
                        type="number"
                        step="any"
                        placeholder={formData.calcType === "of" ? "20" : "100"}
                        value={formData.percentage}
                        onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                        className="form-input pr-10 text-lg"
                        required
                      />
                      {formData.calcType === "of" && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
                      )}
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
                        パーセントを計算する
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
                    <PieChart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">パーセント計算の結果</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">
                        {formData.calcType === "of" ? result.result : `${result.percentage}%`}
                      </div>
                      <div className="result-label">
                        {formData.calcType === "of" ? `${formData.value}の${formData.percentage}%` : `${formData.value}は${formData.percentage}の`}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-muted/30">
                      <h4 className="font-semibold mb-2">計算式</h4>
                      <p className="text-muted-foreground text-sm">
                        {formData.calcType === "of" 
                          ? `${formData.value} × ${formData.percentage}% = ${formData.value} × ${Number(formData.percentage) / 100} = ${result.result}`
                          : `${formData.value} ÷ ${formData.percentage} × 100 = ${result.percentage}%`
                        }
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Percent className="w-4 h-4" />
                        関連情報
                      </div>
                      <p className="text-muted-foreground">
                        {formData.calcType === "of" 
                          ? `${formData.percentage}%は小数で${Number(formData.percentage) / 100}、分数で${formData.percentage}/100です。`
                          : `${result.percentage}%は小数で${(Number(result.percentage) / 100).toFixed(4)}です。`
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Percent className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに数値を入力して<br />
                      「パーセントを計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>パーセント（百分率）とは？基本を理解する</h2>
                <p>
                  パーセント（percent）は、ラテン語の「per centum」（100あたり）に由来する言葉で、
                  全体を100としたときの割合を表す単位です。記号「%」で表され、日常生活からビジネス、
                  科学まで幅広い分野で使用されています。
                </p>
                <p>
                  例えば、「売上が前年比120%」は前年の1.2倍、「合格率30%」は受験者の10人中3人が合格、
                  「割引20%」は元の価格の80%で購入できることを意味します。パーセントを正しく理解することで、
                  様々な情報を正確に把握できるようになります。
                </p>
              </div>

              <div className="content-section">
                <h2>パーセント計算の基本公式</h2>
                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="p-5 rounded-xl bg-muted/30">
                    <h4 className="font-bold text-primary mb-3">AのB%を求める</h4>
                    <div className="text-lg font-mono mb-2">A × B ÷ 100</div>
                    <p className="text-sm text-muted-foreground">例：500の20% = 500 × 20 ÷ 100 = 100</p>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/30">
                    <h4 className="font-bold text-primary mb-3">AはBの何%か</h4>
                    <div className="text-lg font-mono mb-2">A ÷ B × 100</div>
                    <p className="text-sm text-muted-foreground">例：100は500の何% = 100 ÷ 500 × 100 = 20%</p>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h2>パーセント計算の具体例</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left border">シーン</th>
                        <th className="p-4 text-left border">計算</th>
                        <th className="p-4 text-left border">結果</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border">割引計算</td>
                        <td className="p-4 border">10,000円の30%引き</td>
                        <td className="p-4 border font-bold">7,000円</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border">達成率</td>
                        <td className="p-4 border">目標100万円に対し80万円達成</td>
                        <td className="p-4 border font-bold">80%</td>
                      </tr>
                      <tr>
                        <td className="p-4 border">増加率</td>
                        <td className="p-4 border">100から120への増加</td>
                        <td className="p-4 border font-bold">20%増</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border">利益率</td>
                        <td className="p-4 border">売上1000万円、利益150万円</td>
                        <td className="p-4 border font-bold">15%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="content-section">
                <h2>パーセントと小数・分数の変換</h2>
                <p>
                  パーセント、小数、分数は相互に変換できます。これらの変換を理解しておくと、
                  様々な計算がスムーズに行えます。
                </p>
                <div className="bg-muted/30 p-6 rounded-xl my-6">
                  <div className="grid sm:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-bold text-lg mb-1">パーセント</div>
                      <div className="text-2xl text-primary">25%</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">小数</div>
                      <div className="text-2xl text-primary">0.25</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">分数</div>
                      <div className="text-2xl text-primary">1/4</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    変換方法：% → 小数は÷100、小数 → %は×100
                  </p>
                </div>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <p>
                  パーセント計算に関連するツールもご活用ください：
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/discount-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">割引計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">割引後の価格を計算</p>
                  </Link>
                  <Link href="/tax-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">消費税計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">消費税を計算</p>
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
