import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Receipt, TrendingUp, AlertCircle, Calculator, Wallet } from "lucide-react";
import { Link } from "wouter";

export default function IncomeTaxCalculator() {
  const [formData, setFormData] = useState({ annualIncome: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/calc/income-tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          annualIncome: parseFloat(formData.annualIncome) || 0
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
      question: "所得税の計算方法を教えてください", 
      answer: "所得税は「課税所得 × 税率 - 控除額」で計算されます。課税所得は、総収入から給与所得控除、基礎控除（48万円）、社会保険料控除などを差し引いた金額です。税率は所得に応じて5%〜45%の7段階の累進課税となっています。" 
    },
    { 
      question: "給与所得控除とは何ですか？", 
      answer: "給与所得控除は、給与収入から自動的に差し引かれる控除です。サラリーマンの必要経費に相当するもので、収入金額に応じて控除額が決まります。例えば、年収500万円の場合、給与所得控除は144万円となります。" 
    },
    { 
      question: "確定申告が必要な人は？", 
      answer: "確定申告が必要なのは、①年収2,000万円超の給与所得者、②2か所以上から給与を受けている人、③副業収入が20万円超の人、④医療費控除やふるさと納税の還付を受けたい人、⑤住宅ローン控除を初めて受ける人などです。" 
    },
    { 
      question: "所得税と住民税の違いは？", 
      answer: "所得税は国に納める国税で、住民税は都道府県・市区町村に納める地方税です。所得税は累進課税（5〜45%）ですが、住民税は一律10%（都道府県4%、市区町村6%）です。また、所得税は当年の所得に課税されますが、住民税は前年の所得に課税されます。" 
    },
    { 
      question: "年末調整と確定申告の違いは？", 
      answer: "年末調整は、会社が従業員に代わって所得税の過不足を精算する制度です。確定申告は、個人が自分で所得と税額を計算して申告する制度です。会社員は通常年末調整で完結しますが、医療費控除など年末調整で対応できない控除がある場合は確定申告が必要です。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "所得税計算機 - 年収から所得税を簡単計算｜無料ツール",
    "description": "年収を入力するだけで、所得税の概算額を瞬時に計算。給与所得控除、基礎控除を考慮した無料オンラインツールです。",
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
        title="所得税計算機 - 年収から所得税を簡単計算｜無料ツール"
        description="年収を入力するだけで、所得税の概算額を瞬時に計算。給与所得控除、基礎控除を考慮。確定申告や年末調整の参考に便利な無料オンラインツールです。"
        keywords="所得税計算, 所得税計算機, 年収, 給与所得控除, 確定申告, 年末調整, 税金計算"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Receipt className="w-4 h-4" />
                税金・確定申告ツール
              </div>
              <h1 className="mb-3">所得税計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                年収を入力するだけで、所得税の概算額を瞬時に計算。
                確定申告や年末調整の参考にご活用ください。
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
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">年収を入力</h2>
                    <p className="text-sm text-muted-foreground">税引前の年収を入力してください</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="annualIncome" className="text-base font-medium mb-2 block">年収（税引前）</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">¥</span>
                      <Input
                        id="annualIncome"
                        type="number"
                        step="10000"
                        placeholder="5000000"
                        value={formData.annualIncome}
                        onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                        className="form-input pl-10 text-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[300, 500, 700].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setFormData({ ...formData, annualIncome: (amount * 10000).toString() })}
                        className={`p-3 rounded-xl border-2 transition-all text-center ${
                          formData.annualIncome === (amount * 10000).toString()
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="font-bold">{amount}万円</div>
                      </button>
                    ))}
                  </div>
                  
                  <Button type="submit" className="w-full btn-primary h-14 text-lg" disabled={loading}>
                    {loading ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" />計算中...</>
                    ) : (
                      <><TrendingUp className="mr-2 h-5 w-5" />所得税を計算する</>
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
                    <Receipt className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">所得税の概算額</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">¥{result.incomeTax.toLocaleString()}</div>
                      <div className="result-label">所得税（年額）</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">¥{Math.round(result.incomeTax / 12).toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">月額</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.taxRate}%</div>
                        <div className="text-sm text-muted-foreground mt-1">適用税率</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Calculator className="w-4 h-4" />計算内訳
                      </div>
                      <div className="text-muted-foreground space-y-1">
                        <p>年収: ¥{Number(formData.annualIncome).toLocaleString()}</p>
                        <p>給与所得控除: ¥{result.salaryDeduction.toLocaleString()}</p>
                        <p>基礎控除: ¥480,000</p>
                        <p>課税所得: ¥{result.taxableIncome.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm">
                      <p className="text-amber-800">
                        ※ 概算値です。社会保険料控除、配偶者控除、扶養控除等は含まれていません。
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Receipt className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに年収を入力して<br />「所得税を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>所得税の仕組み</h2>
                <p>
                  所得税は、個人の所得に対して課される国税です。日本では累進課税制度を採用しており、
                  所得が高くなるほど税率も高くなります。給与所得者の場合、毎月の給与から源泉徴収され、
                  年末調整で過不足が精算されます。
                </p>
              </div>

              <div className="content-section">
                <h2>所得税の税率表（2024年）</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left border">課税所得</th>
                        <th className="p-4 text-left border">税率</th>
                        <th className="p-4 text-left border">控除額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-4 border">195万円以下</td><td className="p-4 border">5%</td><td className="p-4 border">0円</td></tr>
                      <tr className="bg-muted/20"><td className="p-4 border">195万円超〜330万円</td><td className="p-4 border">10%</td><td className="p-4 border">97,500円</td></tr>
                      <tr><td className="p-4 border">330万円超〜695万円</td><td className="p-4 border">20%</td><td className="p-4 border">427,500円</td></tr>
                      <tr className="bg-muted/20"><td className="p-4 border">695万円超〜900万円</td><td className="p-4 border">23%</td><td className="p-4 border">636,000円</td></tr>
                      <tr><td className="p-4 border">900万円超〜1,800万円</td><td className="p-4 border">33%</td><td className="p-4 border">1,536,000円</td></tr>
                      <tr className="bg-muted/20"><td className="p-4 border">1,800万円超〜4,000万円</td><td className="p-4 border">40%</td><td className="p-4 border">2,796,000円</td></tr>
                      <tr><td className="p-4 border">4,000万円超</td><td className="p-4 border">45%</td><td className="p-4 border">4,796,000円</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/wage-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">時給計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">時給から月収・年収を計算</p>
                  </Link>
                  <Link href="/property-tax-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">固定資産税計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">固定資産税を計算</p>
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
