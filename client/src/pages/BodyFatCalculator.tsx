import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Activity, Scale, TrendingUp, AlertCircle, User } from "lucide-react";
import { Link } from "wouter";

export default function BodyFatCalculator() {
  const [formData, setFormData] = useState({
    gender: "male",
    height: "",
    weight: "",
    waist: "",
    neck: "",
    hip: ""
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
      const response = await fetch("/api/calc/body-fat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender: formData.gender,
          height: parseFloat(formData.height) || 0,
          weight: parseFloat(formData.weight) || 0,
          waist: parseFloat(formData.waist) || 0,
          neck: parseFloat(formData.neck) || 0,
          hip: parseFloat(formData.hip) || 0
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
      question: "体脂肪率とは何ですか？", 
      answer: "体脂肪率は、体重に占める脂肪の割合をパーセントで表したものです。体重60kgで体脂肪率20%の場合、体脂肪は12kgとなります。体脂肪率は健康状態を評価する重要な指標で、BMIだけでは分からない体組成を把握できます。" 
    },
    { 
      question: "理想的な体脂肪率はどのくらいですか？", 
      answer: "理想的な体脂肪率は性別と年齢によって異なります。成人男性は10〜20%、成人女性は20〜30%が標準とされています。アスリートはより低い値を目指すこともありますが、極端に低い体脂肪率は健康上のリスクがあるため注意が必要です。" 
    },
    { 
      question: "この計算方法はどのくらい正確ですか？", 
      answer: "当計算機は米国海軍の体脂肪率推定式を使用しています。この方法は簡便で、特別な機器なしに推定できますが、あくまで概算値です。より正確な測定には、体組成計、DEXA法、水中体重測定法などの専門的な方法があります。" 
    },
    { 
      question: "体脂肪率を下げるにはどうすればいいですか？", 
      answer: "体脂肪率を健康的に下げるには、①バランスの取れた食事で適度なカロリー制限、②有酸素運動（ウォーキング、ジョギング等）、③筋力トレーニングで基礎代謝向上、④十分な睡眠とストレス管理が効果的です。急激な減量は避け、月1〜2%程度の緩やかな減少を目指しましょう。" 
    },
    { 
      question: "体脂肪率とBMIの違いは何ですか？", 
      answer: "BMIは身長と体重から算出される指標で、体格全体を評価します。一方、体脂肪率は体重に占める脂肪の割合を示します。筋肉質な人はBMIが高くても体脂肪率は低いことがあり、逆に見た目は細くても体脂肪率が高い「隠れ肥満」もあります。両方の指標を併用することで、より正確な健康評価ができます。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "体脂肪率計算機 - 体脂肪率を簡単推定｜無料ツール",
    "description": "身長、体重、ウエスト、首周りを入力するだけで、体脂肪率を推定計算。米国海軍式の計算方法で、健康管理やダイエットに役立つ無料オンラインツールです。",
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

  const getBodyFatCategory = (bf: number, gender: string) => {
    if (gender === "male") {
      if (bf < 6) return { label: "必須脂肪", color: "text-blue-600" };
      if (bf < 14) return { label: "アスリート", color: "text-green-600" };
      if (bf < 18) return { label: "フィットネス", color: "text-green-500" };
      if (bf < 25) return { label: "標準", color: "text-yellow-600" };
      return { label: "肥満", color: "text-red-600" };
    } else {
      if (bf < 14) return { label: "必須脂肪", color: "text-blue-600" };
      if (bf < 21) return { label: "アスリート", color: "text-green-600" };
      if (bf < 25) return { label: "フィットネス", color: "text-green-500" };
      if (bf < 32) return { label: "標準", color: "text-yellow-600" };
      return { label: "肥満", color: "text-red-600" };
    }
  };

  return (
    <>
      <SEOHead
        title="体脂肪率計算機 - 体脂肪率を簡単推定｜無料ツール"
        description="身長、体重、ウエスト、首周りを入力するだけで、体脂肪率を推定計算。米国海軍式の計算方法で、健康管理やダイエットの目標設定に役立つ無料オンラインツールです。"
        keywords="体脂肪率計算, 体脂肪率計算機, 体脂肪率, ボディファット, 体組成, ダイエット, 健康管理, 肥満度"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Activity className="w-4 h-4" />
                健康管理ツール
              </div>
              <h1 className="mb-3">体脂肪率計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                身体のサイズを入力するだけで、体脂肪率を推定計算。
                米国海軍式の信頼性の高い計算方法を採用しています。
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
                    <h2 className="text-xl font-bold">身体データを入力</h2>
                    <p className="text-sm text-muted-foreground">各部位のサイズを入力してください</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label className="text-base font-medium mb-3 block">性別</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: "male" })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.gender === "male" 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <User className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">男性</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: "female" })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.gender === "female" 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <User className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">女性</div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
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
                          className="form-input pr-12"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">cm</span>
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
                          className="form-input pr-12"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">kg</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="waist" className="text-base font-medium mb-2 block">ウエスト</Label>
                      <div className="relative">
                        <Input
                          id="waist"
                          type="number"
                          step="0.1"
                          placeholder="80"
                          value={formData.waist}
                          onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                          className="form-input pr-12"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">cm</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="neck" className="text-base font-medium mb-2 block">首周り</Label>
                      <div className="relative">
                        <Input
                          id="neck"
                          type="number"
                          step="0.1"
                          placeholder="38"
                          value={formData.neck}
                          onChange={(e) => setFormData({ ...formData, neck: e.target.value })}
                          className="form-input pr-12"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">cm</span>
                      </div>
                    </div>
                  </div>
                  
                  {formData.gender === "female" && (
                    <div>
                      <Label htmlFor="hip" className="text-base font-medium mb-2 block">ヒップ</Label>
                      <div className="relative">
                        <Input
                          id="hip"
                          type="number"
                          step="0.1"
                          placeholder="95"
                          value={formData.hip}
                          onChange={(e) => setFormData({ ...formData, hip: e.target.value })}
                          className="form-input pr-12"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">cm</span>
                      </div>
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full btn-primary h-14 text-lg" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        計算中...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 h-5 w-5" />
                        体脂肪率を計算する
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
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">推定体脂肪率と判定</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">{result.bodyFatPercentage}%</div>
                      <div className="result-label">推定体脂肪率</div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-muted/30">
                      <div className={`font-semibold text-lg ${getBodyFatCategory(parseFloat(result.bodyFatPercentage), formData.gender).color}`}>
                        {result.category}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.gender === "male" ? "男性" : "女性"}の基準による判定
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.fatMass}kg</div>
                        <div className="text-sm text-muted-foreground mt-1">体脂肪量</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.leanMass}kg</div>
                        <div className="text-sm text-muted-foreground mt-1">除脂肪体重</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Activity className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに身体データを入力して<br />
                      「体脂肪率を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>体脂肪率とは？健康管理の重要指標</h2>
                <p>
                  体脂肪率は、体重に占める脂肪の割合をパーセントで表した指標です。BMI（体格指数）が身長と体重だけで
                  算出されるのに対し、体脂肪率は実際の体組成を反映するため、より詳細な健康評価が可能です。
                </p>
                <p>
                  同じ体重でも、筋肉質な人と脂肪が多い人では健康状態が大きく異なります。体脂肪率を把握することで、
                  見た目だけでは分からない「隠れ肥満」を発見したり、ダイエットや筋トレの効果を正確に測定したりできます。
                </p>
              </div>

              <div className="content-section">
                <h2>体脂肪率の基準値</h2>
                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="p-5 rounded-xl bg-blue-50 border border-blue-200">
                    <h4 className="font-bold text-blue-700 mb-3">男性の基準</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>必須脂肪：2〜5%</li>
                      <li>アスリート：6〜13%</li>
                      <li>フィットネス：14〜17%</li>
                      <li>標準：18〜24%</li>
                      <li>肥満：25%以上</li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl bg-pink-50 border border-pink-200">
                    <h4 className="font-bold text-pink-700 mb-3">女性の基準</h4>
                    <ul className="space-y-2 text-pink-800 text-sm">
                      <li>必須脂肪：10〜13%</li>
                      <li>アスリート：14〜20%</li>
                      <li>フィットネス：21〜24%</li>
                      <li>標準：25〜31%</li>
                      <li>肥満：32%以上</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h2>体脂肪率の測定方法</h2>
                <p>
                  体脂肪率を測定する方法はいくつかあります。当計算機で使用している米国海軍式は、
                  特別な機器なしに推定できる便利な方法です。
                </p>
                <ul>
                  <li><strong>米国海軍式（本計算機）：</strong>身体の各部位のサイズから推定。簡便だが概算値</li>
                  <li><strong>体組成計：</strong>生体電気インピーダンス法。家庭でも測定可能</li>
                  <li><strong>DEXA法：</strong>X線を使用した高精度測定。医療機関で実施</li>
                  <li><strong>水中体重測定法：</strong>水中での体重から算出。研究レベルの精度</li>
                  <li><strong>キャリパー法：</strong>皮下脂肪をつまんで測定。トレーナーが使用</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <p>
                  健康管理には、以下のツールも併せてご活用ください：
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/bmi-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">BMI計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">体格指数を計算</p>
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
