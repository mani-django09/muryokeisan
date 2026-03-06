import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Baby, Calendar, TrendingUp, AlertCircle, Heart } from "lucide-react";
import { Link } from "wouter";

export default function DueDateCalculator() {
  const [formData, setFormData] = useState({
    lastPeriodDate: ""
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
      const response = await fetch("/api/calc/due-date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      question: "出産予定日はどのように計算されますか？", 
      answer: "出産予定日は、最終月経開始日に280日（40週）を加えて計算します。これはネーゲレの概算法と呼ばれ、世界中で広く使用されている標準的な計算方法です。ただし、月経周期が28日と異なる場合は、医師が調整することがあります。" 
    },
    { 
      question: "出産予定日は正確ですか？", 
      answer: "出産予定日はあくまで「予定」であり、実際の出産日とは異なることが多いです。統計的に、予定日ぴったりに生まれる赤ちゃんは約5%程度です。正期産（37週〜41週6日）の範囲内であれば正常とされ、この期間内に約80%の赤ちゃんが生まれます。" 
    },
    { 
      question: "妊娠週数と月数の違いは何ですか？", 
      answer: "妊娠週数は最終月経開始日から数え、40週が満期です。一方、妊娠月数は4週を1ヶ月として数えるため、「妊娠10ヶ月」となります。医療現場では主に週数が使用されますが、一般的な会話では月数も使われます。" 
    },
    { 
      question: "超音波検査で予定日が変わることがありますか？", 
      answer: "はい、妊娠初期（8〜12週頃）の超音波検査で胎児の大きさを測定し、予定日が修正されることがあります。特に月経周期が不規則な方や、最終月経日が不確かな場合は、超音波検査による修正がより正確とされています。" 
    },
    { 
      question: "予定日を過ぎても生まれない場合はどうなりますか？", 
      answer: "予定日を過ぎることは珍しくありません。41週を過ぎると「過期産」のリスクが高まるため、医師の判断で陣痛促進剤の使用や帝王切開が検討されることがあります。42週以降は胎盤機能の低下リスクがあるため、通常は何らかの医療介入が行われます。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "出産予定日計算機 - 最終月経日から予定日を計算｜無料ツール",
    "description": "最終月経開始日を入力するだけで、出産予定日と現在の妊娠週数を自動計算。妊娠の経過を把握するのに便利な無料オンラインツールです。",
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

  return (
    <>
      <SEOHead
        title="出産予定日計算機 - 最終月経日から予定日を計算｜無料ツール"
        description="最終月経開始日を入力するだけで、出産予定日と現在の妊娠週数を自動計算。ネーゲレの概算法に基づく信頼性の高い計算で、妊娠の経過を把握できる無料オンラインツールです。"
        keywords="出産予定日計算, 出産予定日計算機, 妊娠週数, 妊娠計算, 予定日, 最終月経, 妊娠カレンダー, マタニティ"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Baby className="w-4 h-4" />
                マタニティツール
              </div>
              <h1 className="mb-3">出産予定日計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                最終月経開始日を入力するだけで、出産予定日と妊娠週数を瞬時に計算。
                妊娠の経過を把握するのに便利なツールです。
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
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">最終月経日を入力</h2>
                    <p className="text-sm text-muted-foreground">最後の生理が始まった日を選択</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="lastPeriodDate" className="text-base font-medium mb-2 block">最終月経開始日</Label>
                    <Input
                      id="lastPeriodDate"
                      type="date"
                      value={formData.lastPeriodDate}
                      onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
                      className="form-input text-lg"
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      最後の生理が始まった日を入力してください
                    </p>
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
                        出産予定日を計算する
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
                
                <div className="mt-6 p-4 rounded-xl bg-muted/30">
                  <h4 className="font-semibold text-sm mb-2">計算方法について</h4>
                  <p className="text-sm text-muted-foreground">
                    当計算機は「ネーゲレの概算法」を使用しています。最終月経開始日に280日（40週）を加えて出産予定日を算出します。
                    これは標準的な28日周期を前提としています。
                  </p>
                </div>
              </Card>

              <Card className="calculator-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Baby className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">出産予定日と妊娠週数</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value text-3xl">{result.dueDate}</div>
                      <div className="result-label">出産予定日</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.currentWeeks}週{result.currentDays}日</div>
                        <div className="text-sm text-muted-foreground mt-1">現在の妊娠週数</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.daysRemaining}日</div>
                        <div className="text-sm text-muted-foreground mt-1">予定日まで</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-pink-50 border border-pink-200">
                      <div className="flex items-center gap-2 text-pink-700 font-medium mb-2">
                        <Heart className="w-4 h-4" />
                        妊娠期間の目安
                      </div>
                      <div className="text-sm text-pink-800 space-y-1">
                        <p>妊娠初期（〜15週）：器官形成期</p>
                        <p>妊娠中期（16〜27週）：安定期</p>
                        <p>妊娠後期（28週〜）：出産準備期</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Calendar className="w-4 h-4" />
                        重要な時期
                      </div>
                      <p className="text-muted-foreground">
                        正期産は37週0日〜41週6日です。この期間内の出産は正常とされています。
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Baby className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに最終月経開始日を入力して<br />
                      「出産予定日を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>出産予定日の計算方法</h2>
                <p>
                  出産予定日の計算には、「ネーゲレの概算法」が世界中で広く使用されています。この方法は、
                  19世紀のドイツの産科医フランツ・カール・ネーゲレにちなんで名付けられました。
                </p>
                <p>
                  計算式は非常にシンプルで、最終月経開始日に280日（40週）を加えるだけです。これは、
                  妊娠期間が平均して280日であることに基づいています。ただし、この計算は28日周期を
                  前提としているため、月経周期が異なる場合は調整が必要なことがあります。
                </p>
              </div>

              <div className="content-section">
                <h2>妊娠週数の数え方</h2>
                <p>
                  妊娠週数は、最終月経開始日を「妊娠0週0日」として数えます。実際に受精が起こるのは
                  排卵日（月経開始から約2週間後）なので、妊娠2週目頃に受精し、妊娠3週目頃に着床します。
                </p>
                <div className="bg-muted/30 p-6 rounded-xl my-6">
                  <h4 className="font-bold mb-3">妊娠期間の区分</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-background rounded-lg">
                      <div className="font-bold text-primary">妊娠初期</div>
                      <div className="text-sm text-muted-foreground">0〜15週</div>
                      <p className="text-xs mt-2">つわり、器官形成</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="font-bold text-primary">妊娠中期</div>
                      <div className="text-sm text-muted-foreground">16〜27週</div>
                      <p className="text-xs mt-2">安定期、胎動開始</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="font-bold text-primary">妊娠後期</div>
                      <div className="text-sm text-muted-foreground">28〜40週</div>
                      <p className="text-xs mt-2">出産準備、成長期</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h2>出産予定日の注意点</h2>
                <p>
                  出産予定日はあくまで「予定」であり、実際の出産日とは異なることがほとんどです。
                  統計によると、予定日ぴったりに生まれる赤ちゃんは全体の約5%程度です。
                </p>
                <ul>
                  <li>正期産（37週0日〜41週6日）の範囲内であれば正常</li>
                  <li>初産婦は予定日より遅れる傾向がある</li>
                  <li>経産婦は予定日より早まる傾向がある</li>
                  <li>超音波検査で予定日が修正されることがある</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <p>
                  妊娠・出産に関連するツールもご活用ください：
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/days-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">日数計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">2つの日付間の日数を計算</p>
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
