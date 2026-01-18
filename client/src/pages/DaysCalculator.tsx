import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Loader2, Calendar, Clock, TrendingUp, AlertCircle, CalendarDays } from "lucide-react";
import { Link } from "wouter";

export default function DaysCalculator() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: ""
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
      const response = await fetch("/api/calc/days", {
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
      question: "開始日と終了日の両方が計算に含まれますか？", 
      answer: "この計算ツールでは、2つの日付の間隔を測定します。例として、1月1日から1月5日を選ぶと、実際には4日間という結果になります。これは、1日目をスタート地点として、そこから5日目までの距離を計測するためです。もし両端を含めた日数が必要なら、答えに1日プラスしてみてください。" 
    },
    { 
      question: "2月29日がある年も正確に計算できますか？", 
      answer: "もちろんです。このツールは閏年の特別なルールをしっかり組み込んでいます。4年ごとに訪れる2月29日も、100年単位や400年単位の例外ルールも、全て自動で判定して計算に反映されます。だから、どんな期間を入力しても安心して正確な答えが得られるんです。" 
    },
    { 
      question: "すごく昔の日付や未来の日付でも大丈夫？", 
      answer: "はい、何十年も前の日付から、遠い未来の日付まで対応しています。誕生日から今日までの日数を知りたいとか、歴史上の出来事からどれくらい経ったか調べたいときにも使えます。ただ、あまりにも古すぎる時代（例えば紀元前とか）だと、システムの制限で計算できないこともあるので注意してください。" 
    },
    { 
      question: "土日を除いた営業日だけ計算することはできる？", 
      answer: "今のバージョンでは、カレンダー通りの全日数を計算する仕様になっています。もし平日だけの日数が知りたい場合は、週の数に2をかけて土日を引くという手があります。ただ、この方法だと祝日は考慮されないので、あくまで目安として使ってくださいね。将来的には営業日計算機能も追加したいと考えています。" 
    },
    { 
      question: "日数計算って実際どんな時に役立つの？", 
      answer: "意外といろんな場面で活躍します。仕事だと、プロジェクトがあと何日で終わるか確認したり、契約の更新日までカウントしたり。プライベートでは、旅行の計画を立てる時や、大事なイベントまでのカウントダウン、赤ちゃんの出産予定日の計算なんかにも使えます。毎日の習慣を何日続けたか記録するのにも便利ですよ。" 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "日数計算機 - 2つの日付間の日数を簡単計算｜無料ツール",
    "description": "開始日と終了日を入力するだけで、2つの日付間の日数を瞬時に計算。週数や月数も同時に表示。プロジェクト管理や期間計算に便利な無料ツールです。",
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
        title="日数計算機 - 2つの日付間の日数を簡単計算｜無料ツール"
        description="開始日と終了日を入力するだけで、2つの日付間の日数を瞬時に計算。週数や月数も同時に表示。プロジェクト管理、契約期間の確認、イベントまでのカウントダウンに便利な無料オンラインツールです。"
        keywords="日数計算, 日数計算機, 期間計算, 日付計算, 経過日数, カウントダウン, 何日間, 日数カウント"
        jsonLd={[jsonLd, faqSchema]}
      />
      
      <div className="min-h-screen">
        <section className="hero-gradient py-6 md:py-10 relative overflow-hidden">
          <div className="decorative-blob blob-1" />
          <div className="decorative-blob blob-2" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Calendar className="w-4 h-4" />
                日付・時間ツール
              </div>
              <h1 className="mb-3">日数計算機</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                2つの日付を入力するだけで、その間の日数を瞬時に計算。
                週数や月数も同時に表示される便利なツールです。
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
                    <h2 className="text-xl font-bold">日付を入力</h2>
                    <p className="text-sm text-muted-foreground">開始日と終了日を選択してください</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="startDate" className="text-base font-medium mb-2 block">開始日</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="form-input text-lg"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-base font-medium mb-2 block">終了日</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="form-input text-lg"
                      required
                    />
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
                        日数を計算する
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
                    <CalendarDays className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">計算結果</h2>
                    <p className="text-sm text-muted-foreground">日数・週数・月数</p>
                  </div>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="result-display">
                      <div className="result-value">{result.days}日</div>
                      <div className="result-label">期間の日数</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.weeks}週間</div>
                        <div className="text-sm text-muted-foreground mt-1">週数換算</div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 text-center">
                        <div className="text-2xl font-bold text-foreground">{result.months}ヶ月</div>
                        <div className="text-sm text-muted-foreground mt-1">月数換算（概算）</div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/5 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Clock className="w-4 h-4" />
                        詳細情報
                      </div>
                      <p className="text-muted-foreground">
                        {formData.startDate} から {formData.endDate} までの期間です。
                        時間に換算すると約{result.days * 24}時間、分に換算すると約{(result.days * 24 * 60).toLocaleString()}分となります。
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Calendar className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">
                      左のフォームに開始日と終了日を入力して<br />
                      「日数を計算する」ボタンをクリックしてください
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <AdMiddle />

            <div className="prose prose-lg max-w-none">
              <div className="content-section">
                <h2>日数計算ってどういうもの？</h2>
                <p>
                  日数計算は、2つの日付の間にどれだけの日が挟まっているかを数える作業です。
                  パッと見は簡単そうに思えるんですが、実は結構奥が深いんですよ。
                  月によって30日だったり31日だったり、2月なんて28日か29日かで変わりますし、
                  計算に開始日や終了日を入れるかどうかでも答えが変わってきます。
                </p>
                <p>
                  このツールを使えば、そういった面倒な部分を全部自動でやってくれるので、
                  誰でも正確な日数がすぐにわかります。
                  仕事でプロジェクトの残り日数を確認したい時、契約の期限をチェックしたい時、
                  あるいはイベントまであと何日かカウントダウンしたい時など、
                  色々な場面で活用できますよ。
                </p>
              </div>

              <div className="content-section">
                <h2>こんな時に日数計算が役立ちます</h2>
                <h3>仕事で使う場面</h3>
                <p>
                  ビジネスの現場では、日数を正確に把握することが大切な場面がたくさんあります：
                </p>
                <ul>
                  <li>プロジェクトの開始から完了までの日程管理</li>
                  <li>契約書に書かれている期間や保証がいつまで有効か確認</li>
                  <li>商品の納品日まであと何日残っているか計算</li>
                  <li>出勤した日数や取得できる休暇の日数チェック</li>
                  <li>請求書の支払い期限までの猶予期間を把握</li>
                </ul>
                
                <h3>普段の生活で使う場面</h3>
                <p>
                  プライベートでも日数計算が必要になることは意外と多いです：
                </p>
                <ul>
                  <li>誕生日や結婚記念日など大切な日までのカウントダウン</li>
                  <li>妊娠がわかってから出産予定日までの週数計算</li>
                  <li>旅行の計画を立てる時に何泊何日になるか確認</li>
                  <li>ダイエットや勉強など、習慣を何日続けられたか記録</li>
                  <li>生まれてから今日までの人生の日数を知る</li>
                </ul>
              </div>

              <div className="content-section">
                <h2>実際の計算例を見てみましょう</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left border">開始日</th>
                        <th className="p-4 text-left border">終了日</th>
                        <th className="p-4 text-left border">日数</th>
                        <th className="p-4 text-left border">週数</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border">2024年1月1日</td>
                        <td className="p-4 border">2024年1月31日</td>
                        <td className="p-4 border font-bold">30日</td>
                        <td className="p-4 border">約4.3週</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="p-4 border">2024年4月1日</td>
                        <td className="p-4 border">2024年6月30日</td>
                        <td className="p-4 border font-bold">90日</td>
                        <td className="p-4 border">約12.9週</td>
                      </tr>
                      <tr>
                        <td className="p-4 border">2024年1月1日</td>
                        <td className="p-4 border">2024年12月31日</td>
                        <td className="p-4 border font-bold">365日</td>
                        <td className="p-4 border">約52.1週</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="content-section">
                <h2>閏年（うるう年）のしくみを知ろう</h2>
                <p>
                  地球が太陽の周りを一周するのに、実は365日ぴったりじゃなくて、365.2422日くらいかかるんです。
                  このズレを放っておくと、何年も経つうちに季節がどんどんずれていってしまいます。
                  それを調整するために作られたのが閏年という仕組みです。
                  閏年かどうかを判断するルールは次のようになっています：
                </p>
                <div className="bg-muted/30 p-6 rounded-xl my-6">
                  <ol className="space-y-2">
                    <li><strong>1.</strong> 西暦が4で割り切れたら閏年になる</li>
                    <li><strong>2.</strong> でも100で割り切れる年は例外で平年扱い</li>
                    <li><strong>3.</strong> さらに400で割り切れる年は例外の例外で閏年になる</li>
                  </ol>
                  <p className="mt-4 text-sm text-muted-foreground">
                    具体例：2024年（閏年）、2100年（平年）、2000年（閏年）
                  </p>
                </div>
              </div>

              <div className="content-section">
                <h2>他の便利な計算ツールも使ってみてください</h2>
                <p>
                  日付や時間に関する計算には、こんなツールも用意しています：
                </p>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Link href="/time-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">時間計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">時間の足し算・引き算ができます</p>
                  </Link>
                  <Link href="/age-keisan" className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="font-semibold text-primary">年齢計算機</div>
                    <p className="text-sm text-muted-foreground mt-1">生年月日から今の年齢を算出</p>
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