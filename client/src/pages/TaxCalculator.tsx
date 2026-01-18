import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Receipt, Calculator, TrendingUp, AlertCircle, Banknote } from "lucide-react";
import { Link } from "wouter";

export default function TaxCalculator() {
  const [formData, setFormData] = useState({
    amount: "",
    rate: "10"
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
      const response = await fetch("/api/calc/tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(formData.amount) || 0,
          rate: parseFloat(formData.rate) || 10
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
      question: "消費税の税率は何パーセントですか？", 
      answer: "2019年10月1日より、消費税の標準税率は10%となっています。ただし、食料品（酒類・外食を除く）と定期購読の新聞には軽減税率8%が適用されます。当計算機では両方の税率に対応しており、用途に応じて切り替えてご利用いただけます。" 
    },
    { 
      question: "税込価格から税抜価格を計算するには？", 
      answer: "税込価格から税抜価格を求めるには、税込価格を「1 + 税率」で割ります。例えば、税込1,100円（税率10%）の場合、1,100 ÷ 1.10 = 1,000円が税抜価格となります。当計算機では自動的に両方の価格を表示しますので、簡単に確認できます。" 
    },
    { 
      question: "軽減税率の対象となる商品は何ですか？", 
      answer: "軽減税率8%の対象は、①飲食料品（酒類を除く）で、外食やケータリングを除くもの、②週2回以上発行される新聞で定期購読契約に基づくものです。テイクアウトは軽減税率、イートインは標準税率が適用されるなど、購入形態によって税率が異なる場合があります。" 
    },
    { 
      question: "消費税の端数処理はどうなりますか？", 
      answer: "消費税の端数処理は、事業者が「切り捨て」「切り上げ」「四捨五入」のいずれかを選択できます。ただし、総額表示が義務化されているため、消費者が支払う金額は明確に表示されています。当計算機では小数点以下を四捨五入して表示しています。" 
    },
    { 
      question: "インボイス制度と消費税の関係は？", 
      answer: "2023年10月から開始されたインボイス制度（適格請求書等保存方式）では、仕入税額控除を受けるために適格請求書（インボイス）の保存が必要です。事業者間取引では、登録番号や税率ごとの消費税額が記載された請求書が重要になります。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "消費税計算機 - 税込・税抜価格を簡単計算｜無料ツール",
    "description": "商品価格から消費税額、税込価格、税抜価格を瞬時に計算。標準税率10%と軽減税率8%に対応した無料オンライン計算ツールです。",
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
        title="消費税計算機 - 税込・税抜価格を簡単計算｜無料ツール"
        description="商品価格から消費税額、税込価格、税抜価格を瞬時に計算。標準税率10%と軽減税率8%に対応。買い物や経理業務に便利な無料オンライン計算ツールです。"
        keywords="消費税計算, 消費税計算機, 税込価格, 税抜価格, 軽減税率, 10%消費税, 8%消費税, 税金計算"
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
                金融・税金ツール
              </div>
              <h1 className="mb-3">消費税計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                商品価格を入力するだけで、消費税額と税込・税抜価格を瞬時に計算。
                標準税率10%と軽減税率8%の両方に対応しています。
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
                    <h2 className="text-xl font-bold">金額を入力</h2>
                    <p className="text-sm text-muted-foreground">税抜価格と税率を入力してください</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="amount" className="text-base font-medium mb-2 block">税抜価格</Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="number"
                        placeholder="10000"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="form-input pr-12 text-lg"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">円</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="rate" className="text-base font-medium mb-3 block">消費税率</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, rate: "10" })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.rate === "10" 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="font-bold text-xl">10%</div>
                        <div className="text-sm text-muted-foreground">標準税率</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, rate: "8" })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.rate === "8" 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="font-bold text-xl">8%</div>
                        <div className="text-sm text-muted-foreground">軽減税率</div>
                      </button>
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
                        消費税を計算する
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
                    <Banknote className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">消費税額と税込価格</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">{Number(result.totalAmount).toLocaleString()}円</div>
                      <div className="result-label">税込価格</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{Number(result.baseAmount).toLocaleString()}円</div>
                        <div className="text-sm text-muted-foreground mt-1">税抜価格</div>
                      </div>
                      <div className="p-4 rounded-xl bg-primary/10 text-center">
                        <div className="text-2xl font-bold text-primary">{Number(result.taxAmount).toLocaleString()}円</div>
                        <div className="text-sm text-muted-foreground mt-1">消費税額</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-muted/20 text-sm text-muted-foreground">
                      <p>計算式: {Number(result.baseAmount).toLocaleString()}円 × {formData.rate}% = {Number(result.taxAmount).toLocaleString()}円</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Receipt className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに金額を入力して<br />
                      「消費税を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>消費税とは？日本の間接税制度を理解する</h2>
                <p>
                  消費税は、商品の購入やサービスの利用時に課される間接税です。日本では1989年4月に税率3%で導入され、
                  その後1997年に5%、2014年に8%、そして2019年10月に現在の10%へと段階的に引き上げられてきました。
                  消費税は最終的に消費者が負担しますが、事業者が税務署に納付する仕組みとなっています。
                </p>
                <p>
                  2019年の税率引き上げと同時に、低所得者への配慮として「軽減税率制度」が導入されました。
                  これにより、食料品や新聞など生活必需品の一部には8%の軽減税率が適用されています。
                  当計算機では、標準税率10%と軽減税率8%の両方に対応しており、用途に応じて簡単に切り替えられます。
                </p>
              </div>

              <div className="content-section">
                <h2>消費税の計算方法</h2>
                <h3>税抜価格から税込価格を計算</h3>
                <div className="bg-muted/30 p-6 rounded-xl my-6">
                  <div className="text-xl font-bold text-primary mb-2">税込価格 = 税抜価格 × (1 + 税率)</div>
                  <p className="text-sm text-muted-foreground">例：10,000円 × 1.10 = 11,000円（税率10%の場合）</p>
                </div>
                
                <h3>税込価格から税抜価格を計算</h3>
                <div className="bg-muted/30 p-6 rounded-xl my-6">
                  <div className="text-xl font-bold text-primary mb-2">税抜価格 = 税込価格 ÷ (1 + 税率)</div>
                  <p className="text-sm text-muted-foreground">例：11,000円 ÷ 1.10 = 10,000円（税率10%の場合）</p>
                </div>
              </div>

              <div className="content-section">
                <h2>軽減税率8%が適用される商品・サービス</h2>
                <p>
                  軽減税率は、日常生活に欠かせない商品の税負担を軽減するために設けられた制度です。
                  以下の商品・サービスには8%の軽減税率が適用されます：
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="p-5 rounded-xl bg-green-50 border border-green-200">
                    <h4 className="font-bold text-green-700 mb-3">軽減税率8%の対象</h4>
                    <ul className="space-y-2 text-green-800">
                      <li>• 飲食料品（酒類を除く）</li>
                      <li>• テイクアウト・宅配</li>
                      <li>• 週2回以上発行の定期購読新聞</li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl bg-orange-50 border border-orange-200">
                    <h4 className="font-bold text-orange-700 mb-3">標準税率10%の対象</h4>
                    <ul className="space-y-2 text-orange-800">
                      <li>• 外食・イートイン</li>
                      <li>• 酒類</li>
                      <li>• ケータリング</li>
                      <li>• その他の商品・サービス</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h2>消費税計算の具体例</h2>
                <p>
                  日常的な買い物での消費税計算例をご紹介します：
                </p>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left border">商品</th>
                        <th className="p-4 text-left border">税抜価格</th>
                        <th className="p-4 text-left border">税率</th>
                        <th className="p-4 text-left border">消費税</th>
                        <th className="p-4 text-left border">税込価格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border">食料品（スーパー）</td>
                        <td className="p-4 border">3,000円</td>
                        <td className="p-4 border">8%</td>
                        <td className="p-4 border">240円</td>
                        <td className="p-4 border font-bold">3,240円</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border">家電製品</td>
                        <td className="p-4 border">50,000円</td>
                        <td className="p-4 border">10%</td>
                        <td className="p-4 border">5,000円</td>
                        <td className="p-4 border font-bold">55,000円</td>
                      </tr>
                      <tr>
                        <td className="p-4 border">レストラン（外食）</td>
                        <td className="p-4 border">2,000円</td>
                        <td className="p-4 border">10%</td>
                        <td className="p-4 border">200円</td>
                        <td className="p-4 border font-bold">2,200円</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="content-section">
                <h2>事業者向け：インボイス制度について</h2>
                <p>
                  2023年10月から開始されたインボイス制度（適格請求書等保存方式）は、消費税の仕入税額控除を受けるために
                  重要な制度です。事業者間取引では、登録番号や税率ごとの消費税額が記載された適格請求書（インボイス）の
                  発行・保存が必要となります。
                </p>
                <p>
                  免税事業者から課税事業者への転換を検討されている方や、インボイス発行事業者の登録を検討されている方は、
                  税理士や税務署にご相談されることをお勧めします。
                </p>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <p>
                  税金や金融に関する計算には、以下のツールもご活用ください：
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/income-tax-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">所得税計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">年収から所得税を概算</p>
                  </Link>
                  <Link href="/discount-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">割引計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">割引後の価格を計算</p>
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
