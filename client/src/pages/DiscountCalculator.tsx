import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Tag, ShoppingCart, TrendingUp, AlertCircle, Percent } from "lucide-react";
import { Link } from "wouter";

export default function DiscountCalculator() {
  const [formData, setFormData] = useState({
    originalPrice: "",
    discountPercent: ""
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
      const response = await fetch("/api/calc/discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalPrice: parseFloat(formData.originalPrice) || 0,
          discountPercent: parseFloat(formData.discountPercent) || 0
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
      question: "割引率と割引額の違いは何ですか？", 
      answer: "割引率は元の価格に対するパーセンテージで表される値引きの割合です（例：20%オフ）。割引額は実際に値引きされる金額です（例：1,000円引き）。同じ割引率でも、元の価格が高いほど割引額は大きくなります。" 
    },
    { 
      question: "「3割引」と「30%オフ」は同じですか？", 
      answer: "はい、同じ意味です。日本では「〇割引」という表現がよく使われますが、これは「〇×10%オフ」と同じです。3割引=30%オフ、5割引=50%オフとなります。半額は5割引（50%オフ）です。" 
    },
    { 
      question: "複数の割引を重ねて計算できますか？", 
      answer: "複数の割引を重ねる場合、通常は順番に計算します。例えば、10,000円の商品に20%オフ→さらに10%オフの場合、10,000円×0.8=8,000円、8,000円×0.9=7,200円となります。単純に30%オフ（7,000円）とは異なるので注意が必要です。" 
    },
    { 
      question: "消費税込みの価格から割引する場合は？", 
      answer: "通常、割引は税込価格に対して適用されます。例えば、税込11,000円の商品が20%オフなら、11,000円×0.8=8,800円（税込）となります。ただし、店舗によっては税抜価格から割引して税を加算する場合もあるので、確認が必要です。" 
    },
    { 
      question: "お得な割引の見分け方はありますか？", 
      answer: "割引率だけでなく、割引後の価格と他店の通常価格を比較することが重要です。また、「最大〇%オフ」は一部商品のみの場合が多いです。ポイント還元と現金値引きでは、現金値引きの方が即座にお得です。セール前に価格が上がっていないかも確認しましょう。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "割引計算機 - 割引後の価格を簡単計算｜無料ツール",
    "description": "元の価格と割引率を入力するだけで、割引後の価格と割引額を瞬時に計算。セールやクーポン利用時に便利な無料オンラインツールです。",
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
        title="割引計算機 - 割引後の価格を簡単計算｜無料ツール"
        description="元の価格と割引率を入力するだけで、割引後の価格と割引額を瞬時に計算。セール、クーポン、バーゲンでのお買い物に便利な無料オンラインツールです。"
        keywords="割引計算, 割引計算機, 割引率, パーセントオフ, セール計算, 値引き計算, クーポン計算, お得計算"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Tag className="w-4 h-4" />
                お買い物ツール
              </div>
              <h1 className="mb-3">割引計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                元の価格と割引率を入力するだけで、割引後の価格を瞬時に計算。
                セールやクーポン利用時のお買い物に便利なツールです。
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
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">価格と割引率を入力</h2>
                    <p className="text-sm text-muted-foreground">元の価格と割引率を入力してください</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="originalPrice" className="text-base font-medium mb-2 block">元の価格</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">¥</span>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="1"
                        placeholder="10000"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        className="form-input pl-10 text-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="discountPercent" className="text-base font-medium mb-2 block">割引率</Label>
                    <div className="relative">
                      <Input
                        id="discountPercent"
                        type="number"
                        step="0.1"
                        placeholder="20"
                        value={formData.discountPercent}
                        onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                        className="form-input pr-12 text-lg"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%オフ</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 30, 50].map((percent) => (
                      <button
                        key={percent}
                        type="button"
                        onClick={() => setFormData({ ...formData, discountPercent: percent.toString() })}
                        className={`p-3 rounded-xl border-2 transition-all text-center ${
                          formData.discountPercent === percent.toString()
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="font-bold">{percent}%</div>
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
                        割引後の価格を計算する
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
                    <Tag className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">割引後の価格と割引額</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">¥{result.discountedPrice.toLocaleString()}</div>
                      <div className="result-label">割引後の価格</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                        <div className="text-2xl font-bold text-green-700">¥{result.savings.toLocaleString()}</div>
                        <div className="text-sm text-green-600 mt-1">お得額</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{formData.discountPercent}%</div>
                        <div className="text-sm text-muted-foreground mt-1">割引率</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-muted/30">
                      <h4 className="font-semibold mb-2">計算式</h4>
                      <p className="text-sm text-muted-foreground">
                        ¥{Number(formData.originalPrice).toLocaleString()} × (1 - {formData.discountPercent}%) = ¥{result.discountedPrice.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Percent className="w-4 h-4" />
                        割引の表現
                      </div>
                      <p className="text-muted-foreground">
                        {formData.discountPercent}%オフ = {Number(formData.discountPercent) / 10}割引
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Tag className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに価格と割引率を入力して<br />
                      「割引後の価格を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>割引計算の基本</h2>
                <p>
                  割引計算は、お買い物の際に欠かせない計算です。セール、クーポン、ポイント還元など、
                  様々な場面で割引が適用されますが、実際にいくらお得になるのかを正確に把握することで、
                  賢いお買い物ができます。
                </p>
                <p>
                  割引後の価格は「元の価格 × (1 - 割引率)」で計算できます。例えば、10,000円の商品が
                  20%オフなら、10,000円 × 0.8 = 8,000円となります。
                </p>
              </div>

              <div className="content-section">
                <h2>割引率の早見表</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left border">割引率</th>
                        <th className="p-4 text-left border">日本語表現</th>
                        <th className="p-4 text-left border">支払う割合</th>
                        <th className="p-4 text-left border">10,000円の場合</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border">10%オフ</td>
                        <td className="p-4 border">1割引</td>
                        <td className="p-4 border">90%</td>
                        <td className="p-4 border font-bold">9,000円</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border">20%オフ</td>
                        <td className="p-4 border">2割引</td>
                        <td className="p-4 border">80%</td>
                        <td className="p-4 border font-bold">8,000円</td>
                      </tr>
                      <tr>
                        <td className="p-4 border">30%オフ</td>
                        <td className="p-4 border">3割引</td>
                        <td className="p-4 border">70%</td>
                        <td className="p-4 border font-bold">7,000円</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border">50%オフ</td>
                        <td className="p-4 border">半額</td>
                        <td className="p-4 border">50%</td>
                        <td className="p-4 border font-bold">5,000円</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="content-section">
                <h2>賢いお買い物のコツ</h2>
                <p>
                  割引を上手に活用するためのポイントをご紹介します：
                </p>
                <ul>
                  <li><strong>事前に価格をチェック：</strong>セール前に価格が上がっていないか確認</li>
                  <li><strong>複数店舗を比較：</strong>割引後の価格が他店の通常価格より高いことも</li>
                  <li><strong>「最大〇%オフ」に注意：</strong>一部商品のみの場合が多い</li>
                  <li><strong>ポイントと現金値引きの違い：</strong>現金値引きの方が即座にお得</li>
                  <li><strong>送料を含めて計算：</strong>割引額より送料が高いことも</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <p>
                  お買い物に関連するツールもご活用ください：
                </p>
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
