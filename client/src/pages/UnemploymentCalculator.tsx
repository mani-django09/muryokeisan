import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Briefcase, TrendingUp, AlertCircle, Calculator, Shield } from "lucide-react";
import { Link } from "wouter";

export default function UnemploymentCalculator() {
  const [formData, setFormData] = useState({
    dailyWage: "",
    age: "",
    yearsWorked: ""
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
      const response = await fetch("/api/calc/unemployment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dailyWage: parseFloat(formData.dailyWage) || 0,
          age: parseInt(formData.age) || 0,
          yearsWorked: parseFloat(formData.yearsWorked) || 0
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
      question: "失業保険（雇用保険）の受給資格は？", 
      answer: "失業保険を受給するには、①離職前2年間に12ヶ月以上の被保険者期間があること（会社都合の場合は1年間に6ヶ月以上）、②働く意思と能力があること、③求職活動を行っていることが必要です。自己都合退職の場合は、7日間の待機期間後、さらに2〜3ヶ月の給付制限期間があります。" 
    },
    { 
      question: "基本手当日額の計算方法は？", 
      answer: "基本手当日額は、離職前6ヶ月間の賃金総額を180で割った「賃金日額」に、年齢と賃金日額に応じた給付率（45〜80%）を掛けて計算します。賃金日額が低いほど給付率は高くなります。また、年齢によって上限額が設定されています。" 
    },
    { 
      question: "失業保険の給付日数は？", 
      answer: "給付日数は、離職理由、年齢、被保険者期間によって90日〜360日の範囲で決まります。自己都合退職の場合は90〜150日、会社都合（倒産・解雇等）の場合は90〜330日です。障害者等の就職困難者は150〜360日となります。" 
    },
    { 
      question: "失業保険の手続きの流れは？", 
      answer: "①離職票を会社から受け取る、②ハローワークで求職申込みと受給資格の決定、③7日間の待機期間、④雇用保険説明会に参加、⑤失業認定日にハローワークへ行き求職活動を報告、⑥基本手当の振込、という流れです。4週間に1回の認定日に求職活動の報告が必要です。" 
    },
    { 
      question: "失業保険を受給中にアルバイトはできますか？", 
      answer: "週20時間未満かつ1日4時間未満のアルバイトであれば、失業保険を受給しながら働くことができます。ただし、収入があった日は基本手当が減額または支給されません。週20時間以上働くと就職とみなされ、受給資格を失う可能性があります。必ずハローワークに申告してください。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "失業保険計算機 - 基本手当日額を簡単計算｜無料ツール",
    "description": "賃金日額と年齢、勤続年数を入力するだけで、失業保険（雇用保険）の基本手当日額と給付日数を瞬時に計算する無料オンラインツールです。",
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
        title="失業保険計算機 - 基本手当日額を簡単計算｜無料ツール"
        description="賃金日額と年齢、勤続年数を入力するだけで、失業保険（雇用保険）の基本手当日額と給付日数を瞬時に計算。退職後の生活設計に便利な無料オンラインツールです。"
        keywords="失業保険計算, 雇用保険計算, 基本手当, 失業給付, 給付日数, ハローワーク, 退職"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Shield className="w-4 h-4" />
                雇用・社会保険ツール
              </div>
              <h1 className="mb-3">失業保険計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                賃金日額と年齢、勤続年数を入力するだけで、基本手当日額と給付日数を瞬時に計算。
                退職後の生活設計にお役立てください。
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
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">情報を入力</h2>
                    <p className="text-sm text-muted-foreground">賃金日額と年齢、勤続年数を入力</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="dailyWage" className="text-base font-medium mb-2 block">賃金日額</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">¥</span>
                      <Input
                        id="dailyWage"
                        type="number"
                        step="1"
                        placeholder="10000"
                        value={formData.dailyWage}
                        onChange={(e) => setFormData({ ...formData, dailyWage: e.target.value })}
                        className="form-input pl-10 text-lg"
                        required
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">離職前6ヶ月の賃金総額÷180</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="age" className="text-base font-medium mb-2 block">年齢</Label>
                    <div className="relative">
                      <Input
                        id="age"
                        type="number"
                        placeholder="35"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="form-input pr-10 text-lg"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">歳</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="yearsWorked" className="text-base font-medium mb-2 block">被保険者期間</Label>
                    <div className="relative">
                      <Input
                        id="yearsWorked"
                        type="number"
                        placeholder="5"
                        value={formData.yearsWorked}
                        onChange={(e) => setFormData({ ...formData, yearsWorked: e.target.value })}
                        className="form-input pr-10 text-lg"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">年</span>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full btn-primary h-14 text-lg" disabled={loading}>
                    {loading ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" />計算中...</>
                    ) : (
                      <><TrendingUp className="mr-2 h-5 w-5" />失業保険を計算する</>
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
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">基本手当の概算</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">¥{result.dailyBenefit.toLocaleString()}</div>
                      <div className="result-label">基本手当日額</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.benefitDays}日</div>
                        <div className="text-sm text-muted-foreground mt-1">給付日数</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.benefitRate}%</div>
                        <div className="text-sm text-muted-foreground mt-1">給付率</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                      <div className="text-2xl font-bold text-green-700">¥{result.totalBenefit.toLocaleString()}</div>
                      <div className="text-sm text-green-600 mt-1">総支給額（概算）</div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Calculator className="w-4 h-4" />計算内訳
                      </div>
                      <div className="text-muted-foreground space-y-1">
                        <p>賃金日額: ¥{Number(formData.dailyWage).toLocaleString()}</p>
                        <p>年齢: {formData.age}歳</p>
                        <p>被保険者期間: {formData.yearsWorked}年</p>
                        <p>月額概算: ¥{Math.round(result.dailyBenefit * 21.7).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm">
                      <p className="text-amber-800">
                        ※ 概算値です。実際の金額は離職理由や個別の状況により異なります。詳細はハローワークにご確認ください。
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Shield className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに情報を入力して<br />「失業保険を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>失業保険（雇用保険）とは</h2>
                <p>
                  失業保険（正式名称：雇用保険の基本手当）は、労働者が失業した場合に、生活の安定を図りながら
                  再就職活動ができるよう支給される給付金です。雇用保険に加入していた期間や離職理由、
                  年齢などによって給付額や給付日数が決まります。
                </p>
              </div>

              <div className="content-section">
                <h2>給付日数の目安（自己都合退職の場合）</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left border">被保険者期間</th>
                        <th className="p-4 text-left border">給付日数</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-4 border">1年以上5年未満</td><td className="p-4 border font-bold">90日</td></tr>
                      <tr className="bg-muted/20"><td className="p-4 border">5年以上10年未満</td><td className="p-4 border font-bold">90日</td></tr>
                      <tr><td className="p-4 border">10年以上20年未満</td><td className="p-4 border font-bold">120日</td></tr>
                      <tr className="bg-muted/20"><td className="p-4 border">20年以上</td><td className="p-4 border font-bold">150日</td></tr>
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
                  <Link href="/income-tax-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">所得税計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">所得税を計算</p>
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
