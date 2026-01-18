import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Calendar, Cake, TrendingUp, AlertCircle, Clock } from "lucide-react";
import { Link } from "wouter";

export default function AgeCalculator() {
  const [formData, setFormData] = useState({
    birthDate: "",
    targetDate: new Date().toISOString().split("T")[0]
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
      const response = await fetch("/api/calc/age", {
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
      question: "満年齢と数え年の違いは何ですか？", 
      answer: "満年齢は生まれた日を0歳とし、誕生日ごとに1歳ずつ加算する現代の一般的な数え方です。数え年は生まれた年を1歳とし、元日（1月1日）に1歳加算する伝統的な数え方です。現在の日本では法律上も満年齢が使用されますが、七五三や厄年など一部の伝統行事では数え年が使われることがあります。" 
    },
    { 
      question: "年齢計算で誕生日当日は何歳ですか？", 
      answer: "法律上、年齢は誕生日の前日の終了時（午後12時）に加算されます。つまり、4月1日生まれの人は3月31日の終わりに1歳年を取ります。これは「年齢計算ニ関スル法律」に基づいています。そのため、4月1日生まれの人は「早生まれ」として前の学年に入ります。" 
    },
    { 
      question: "2月29日生まれの人の誕生日はいつですか？", 
      answer: "うるう年の2月29日生まれの人は、平年（うるう年でない年）では法律上2月28日の終了時に年齢が加算されます。ただし、誕生日のお祝いは3月1日に行う人も多いです。4年に1度しか「本当の誕生日」が来ないため、特別な存在として知られています。" 
    },
    { 
      question: "年齢確認が必要な場面はどんな時ですか？", 
      answer: "年齢確認が必要な主な場面は、①お酒・タバコの購入（20歳以上）、②選挙権の行使（18歳以上）、③運転免許の取得（18歳以上）、④映画の年齢制限（R15+、R18+等）、⑤各種保険の加入、⑥年金の受給資格確認などがあります。" 
    },
    { 
      question: "干支（えと）の計算方法は？", 
      answer: "干支は12年周期で繰り返されます。西暦年を12で割った余りで干支が分かります。余り0=申、1=酉、2=戌、3=亥、4=子、5=丑、6=寅、7=卯、8=辰、9=巳、10=午、11=未です。例えば、2024年は2024÷12=168余り8なので「辰年」となります。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "年齢計算機 - 生年月日から年齢を簡単計算｜無料ツール",
    "description": "生年月日を入力するだけで、現在の年齢を瞬時に計算。年・月・日単位での詳細な年齢表示、次の誕生日までの日数も表示する無料オンラインツールです。",
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
        title="年齢計算機 - 生年月日から年齢を簡単計算｜無料ツール"
        description="生年月日を入力するだけで、現在の年齢を瞬時に計算。年・月・日単位での詳細な年齢表示、次の誕生日までの日数、干支も表示する無料オンラインツールです。"
        keywords="年齢計算, 年齢計算機, 生年月日, 誕生日計算, 何歳, 満年齢, 数え年, 干支計算"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Cake className="w-4 h-4" />
                日付・時間ツール
              </div>
              <h1 className="mb-3">年齢計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                生年月日を入力するだけで、現在の年齢を瞬時に計算。
                詳細な年齢表示と次の誕生日までの日数も確認できます。
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
                    <h2 className="text-xl font-bold">生年月日を入力</h2>
                    <p className="text-sm text-muted-foreground">誕生日を選択してください</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="birthDate" className="text-base font-medium mb-2 block">生年月日</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="form-input text-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="targetDate" className="text-base font-medium mb-2 block">基準日（オプション）</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="form-input text-lg"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      特定の日付時点での年齢を計算したい場合に入力
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
                        年齢を計算する
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
                    <Cake className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">年齢と詳細情報</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">{result.years}歳</div>
                      <div className="result-label">満年齢</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-muted/30 text-center">
                        <div className="text-xl font-bold text-foreground">{result.years}</div>
                        <div className="text-xs text-muted-foreground">年</div>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/30 text-center">
                        <div className="text-xl font-bold text-foreground">{result.months}</div>
                        <div className="text-xs text-muted-foreground">ヶ月</div>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/30 text-center">
                        <div className="text-xl font-bold text-foreground">{result.days}</div>
                        <div className="text-xs text-muted-foreground">日</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.totalDays.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">生きた日数</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.daysToNextBirthday}</div>
                        <div className="text-sm text-muted-foreground mt-1">次の誕生日まで</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Clock className="w-4 h-4" />
                        追加情報
                      </div>
                      <div className="text-muted-foreground space-y-1">
                        <p>干支：{result.zodiac}</p>
                        <p>星座：{result.constellation}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Cake className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに生年月日を入力して<br />
                      「年齢を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>年齢計算の基本知識</h2>
                <p>
                  年齢計算は一見シンプルに見えますが、実は法律的な定義や文化的な背景があります。
                  日本では「年齢計算ニ関スル法律」（明治35年法律第50号）により、年齢の計算方法が定められています。
                </p>
                <p>
                  この法律によると、年齢は誕生日の前日の終了時（午後12時）に加算されます。
                  つまり、4月1日生まれの人は、法律上3月31日の終わりに1歳年を取ることになります。
                  これが「早生まれ」の仕組みの根拠となっています。
                </p>
              </div>

              <div className="content-section">
                <h2>満年齢と数え年</h2>
                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="p-5 rounded-xl bg-muted/30">
                    <h4 className="font-bold text-primary mb-3">満年齢</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>生まれた日を0歳とする</li>
                      <li>誕生日ごとに1歳加算</li>
                      <li>現代の標準的な数え方</li>
                      <li>法律上の年齢</li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/30">
                    <h4 className="font-bold text-primary mb-3">数え年</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>生まれた年を1歳とする</li>
                      <li>元日（1月1日）に1歳加算</li>
                      <li>伝統的な数え方</li>
                      <li>七五三、厄年などで使用</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h2>年齢に関する豆知識</h2>
                <p>
                  年齢に関連する様々な情報をご紹介します：
                </p>
                <ul>
                  <li><strong>早生まれ：</strong>1月1日〜4月1日生まれの人。同じ学年でも前年生まれの人より若い</li>
                  <li><strong>2月29日生まれ：</strong>平年は2月28日の終了時に年齢加算</li>
                  <li><strong>厄年：</strong>数え年で男性25・42・61歳、女性19・33・37・61歳</li>
                  <li><strong>還暦：</strong>満60歳（数え年61歳）。干支が一巡する年</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>関連する計算ツール</h2>
                <p>
                  年齢や日付に関連するツールもご活用ください：
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/days-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">日数計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">2つの日付間の日数を計算</p>
                  </Link>
                  <Link href="/due-date-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">出産予定日計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">出産予定日を計算</p>
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
