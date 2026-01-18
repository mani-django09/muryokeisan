import { Link } from "wouter";
import { Calculator, TrendingUp, Heart, Calendar, Percent, DollarSign, Clock, Users, Baby, Home as HomeIcon, Briefcase, Receipt, Scale, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { AdTop, AdMiddle, AdBottom } from "@/components/AdPlaceholder";
import { FAQ } from "@/components/FAQ";

const calculators = [
  {
    name: "BMI計算",
    path: "/bmi-keisan",
    description: "身長と体重から体格指数（BMI）を計算し、肥満度を判定します",
    icon: Scale,
    category: "健康",
    color: "from-rose-500 to-pink-500"
  },
  {
    name: "消費税計算",
    path: "/tax-keisan",
    description: "税込・税抜価格を瞬時に計算。軽減税率にも対応",
    icon: Receipt,
    category: "税金",
    color: "from-blue-500 to-indigo-500"
  },
  {
    name: "日数計算",
    path: "/days-keisan",
    description: "2つの日付間の日数を正確に計算。営業日計算も可能",
    icon: Calendar,
    category: "日時",
    color: "from-emerald-500 to-teal-500"
  },
  {
    name: "時間計算",
    path: "/time-keisan",
    description: "時間の加算・減算を簡単計算。勤怠管理に便利",
    icon: Clock,
    category: "日時",
    color: "from-amber-500 to-orange-500"
  },
  {
    name: "パーセント計算",
    path: "/percentage-keisan",
    description: "割合・増減率を簡単計算。ビジネスに必須のツール",
    icon: Percent,
    category: "基本",
    color: "from-violet-500 to-purple-500"
  },
  {
    name: "体脂肪率計算",
    path: "/body-fat-keisan",
    description: "身体データから体脂肪率を推定。健康管理に活用",
    icon: Heart,
    category: "健康",
    color: "from-rose-500 to-pink-500"
  },
  {
    name: "出産予定日計算",
    path: "/due-date-keisan",
    description: "最終月経日から出産予定日と妊娠週数を計算",
    icon: Baby,
    category: "健康",
    color: "from-pink-500 to-rose-400"
  },
  {
    name: "割引計算",
    path: "/discount-keisan",
    description: "割引後の価格とお得額を瞬時に計算。買い物に便利",
    icon: DollarSign,
    category: "金融",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "年齢計算",
    path: "/age-keisan",
    description: "生年月日から正確な年齢を計算。干支も表示",
    icon: Users,
    category: "基本",
    color: "from-cyan-500 to-blue-500"
  },
  {
    name: "固定資産税計算",
    path: "/property-tax-keisan",
    description: "土地・建物の固定資産税を試算。住宅用地軽減対応",
    icon: HomeIcon,
    category: "税金",
    color: "from-slate-500 to-gray-600"
  },
  {
    name: "所得税計算",
    path: "/income-tax-keisan",
    description: "年収から所得税を概算。確定申告の参考に",
    icon: TrendingUp,
    category: "税金",
    color: "from-indigo-500 to-blue-600"
  },
  {
    name: "時給計算",
    path: "/wage-keisan",
    description: "時給から月収・年収を試算。アルバイト・パートに",
    icon: Briefcase,
    category: "金融",
    color: "from-teal-500 to-cyan-500"
  },
  {
    name: "失業保険計算",
    path: "/unemployment-keisan",
    description: "失業給付金の日額と総額を試算。退職準備に",
    icon: Users,
    category: "保険",
    color: "from-orange-500 to-amber-500"
  },
];

const categories = [
  { name: "健康", icon: Heart, count: 3, description: "BMI、体脂肪率、出産予定日" },
  { name: "税金", icon: Receipt, count: 3, description: "消費税、所得税、固定資産税" },
  { name: "金融", icon: DollarSign, count: 3, description: "割引、時給、失業保険" },
  { name: "日時", icon: Calendar, count: 3, description: "日数、時間、年齢計算" },
];

const faqItems = [
  { 
    question: "計算ツールは無料で使えますか？", 
    answer: "はい、当サイトのすべての計算ツールは完全無料でご利用いただけます。会員登録も不要で、何度でもお使いいただけます。" 
  },
  { 
    question: "計算結果は正確ですか？", 
    answer: "一般的な計算式に基づいて計算しておりますが、あくまで参考値としてご利用ください。税金計算など重要な判断には、税理士等の専門家にご相談されることをお勧めします。" 
  },
  { 
    question: "入力したデータは保存されますか？", 
    answer: "いいえ、入力されたデータはサーバーに保存されません。計算処理のみを行い、プライバシーを保護しています。安心してご利用ください。" 
  },
  { 
    question: "スマートフォンでも使えますか？", 
    answer: "はい、すべての計算ツールはスマートフォン、タブレット、パソコンなど、あらゆるデバイスに対応しています。いつでもどこでも計算できます。" 
  },
  { 
    question: "計算ツールの使い方がわかりません", 
    answer: "各計算ツールのページには、詳しい使い方の説明と計算例を掲載しています。また、よくある質問（FAQ）も用意していますので、ご参照ください。" 
  }
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "計算ツール - 無料オンライン計算機",
    "description": "BMI、消費税、所得税など様々な計算を無料で行えるオンラインツール集",
    "url": typeof window !== "undefined" ? window.location.origin : "",
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
        title="計算ツール - 無料オンライン計算機ポータル | 14種類の便利な計算ツール"
        description="BMI、消費税、所得税、時給など日常生活やビジネスで役立つ14種類の計算ツールを無料で提供。簡単操作で正確な計算結果をすぐに取得できます。スマホ対応。"
        keywords="計算, ツール, 無料, BMI, 消費税, 所得税, 時給, 固定資産税, 失業保険, 日数計算, 年齢計算"
        jsonLd={[jsonLd, faqSchema]}
      />

      {/* Hero Section */}
      <section className="hero-gradient py-10 md:py-16 relative overflow-hidden">
        <div className="decorative-blob blob-1" />
        <div className="decorative-blob blob-2" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              無料オンライン計算ツール
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              日常生活やビジネスで役立つ様々な計算ツールを無料で提供。
              簡単操作で正確な計算結果をすぐに取得できます。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.name} className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">({cat.count})</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <AdTop />

        {/* Calculator Grid */}
        <section className="py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">すべての計算ツール</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              目的に合った計算ツールをお選びください。すべて無料でご利用いただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link key={calc.path} href={calc.path}>
                  <Card className="group cursor-pointer h-full p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${calc.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{calc.name}</h3>
                          <span className="text-xs px-2.5 py-1 bg-muted rounded-full font-medium text-muted-foreground">
                            {calc.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {calc.description}
                        </p>
                        <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          計算する <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <AdMiddle />

        {/* Features Section */}
        <section className="py-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">当サイトの特徴</h2>
              <p className="text-muted-foreground">
                使いやすさと正確性を追求した計算ツールをお届けします
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">完全無料</h3>
                <p className="text-muted-foreground text-sm">
                  すべての計算ツールを無料でご利用いただけます。会員登録も不要です。
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">正確な計算</h3>
                <p className="text-muted-foreground text-sm">
                  一般的な計算式に基づいた正確な計算結果を提供します。
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">使いやすさ</h3>
                <p className="text-muted-foreground text-sm">
                  シンプルで直感的なデザイン。スマホにも完全対応しています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="content-section">
              <h2>計算ツールについて</h2>
              <p>
                当サイトでは、日常生活やビジネスシーンで必要となる様々な計算を簡単に行えるツールを提供しています。
                すべてのツールは無料でご利用いただけ、会員登録なども不要です。
              </p>
              <p>
                健康管理のためのBMI計算や体脂肪率計算、金融関連の消費税計算や所得税計算、
                日常的に使える日数計算や時間計算など、幅広いニーズに対応しています。
                各計算ツールには詳しい説明と使い方、よくある質問を掲載していますので、
                初めての方でも安心してご利用いただけます。
              </p>
            </div>

            <div className="content-section">
              <h2>カテゴリ別計算ツール</h2>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.name} className="p-6 bg-muted/30 rounded-xl border border-border/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold">{cat.name}関連</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{cat.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="content-section">
              <h2>ご利用にあたって</h2>
              <p>
                すべての計算ツールは無料でご利用いただけます。計算結果は一般的な計算式に基づいており、
                参考値としてご利用ください。正式な手続きや重要な判断には、専門家にご相談されることをお勧めします。
              </p>
              <p>
                入力されたデータはサーバーに保存されませんので、安心してご利用ください。
                モバイル端末にも対応しており、いつでもどこでも計算を行うことができます。
              </p>
            </div>
          </div>
        </section>

        <FAQ items={faqItems} />

        <AdBottom />
      </div>
    </>
  );
}
