import { Link } from "wouter";

const calculators = [
  { name: "BMI計算", path: "/bmi-keisan" },
  { name: "消費税計算", path: "/tax-keisan" },
  { name: "日数計算", path: "/days-keisan" },
  { name: "時間計算", path: "/time-keisan" },
  { name: "パーセント計算", path: "/percentage-keisan" },
  { name: "体脂肪率計算", path: "/body-fat-keisan" },
  { name: "出産予定日計算", path: "/due-date-keisan" },
  { name: "割引計算", path: "/discount-keisan" },
  { name: "年齢計算", path: "/age-keisan" },
  { name: "固定資産税計算", path: "/property-tax-keisan" },
  { name: "所得税計算", path: "/income-tax-keisan" },
  { name: "時給計算", path: "/wage-keisan" },
  { name: "失業保険計算", path: "/unemployment-keisan" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4">計算ツールについて</h3>
            <p className="text-sm text-muted-foreground">
              日常生活やビジネスで役立つ様々な計算ツールを無料で提供しています。
            </p>
          </div>

          {/* Health & Lifestyle */}
          <div>
            <h3 className="font-semibold text-lg mb-4">健康・ライフスタイル</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/bmi-keisan" className="nav-link">
                  BMI計算
                </Link>
              </li>
              <li>
                <Link href="/body-fat-keisan" className="nav-link">
                  体脂肪率計算
                </Link>
              </li>
              <li>
                <Link href="/due-date-keisan" className="nav-link">
                  出産予定日計算
                </Link>
              </li>
              <li>
                <Link href="/age-keisan" className="nav-link">
                  年齢計算
                </Link>
              </li>
            </ul>
          </div>

          {/* Financial & Tax */}
          <div>
            <h3 className="font-semibold text-lg mb-4">金融・税金</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tax-keisan" className="nav-link">
                  消費税計算
                </Link>
              </li>
              <li>
                <Link href="/income-tax-keisan" className="nav-link">
                  所得税計算
                </Link>
              </li>
              <li>
                <Link href="/property-tax-keisan" className="nav-link">
                  固定資産税計算
                </Link>
              </li>
              <li>
                <Link href="/discount-keisan" className="nav-link">
                  割引計算
                </Link>
              </li>
              <li>
                <Link href="/wage-keisan" className="nav-link">
                  時給計算
                </Link>
              </li>
              <li>
                <Link href="/unemployment-keisan" className="nav-link">
                  失業保険計算
                </Link>
              </li>
            </ul>
          </div>

          {/* Math & Time */}
          <div>
            <h3 className="font-semibold text-lg mb-4">数学・時間</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/percentage-keisan" className="nav-link">
                  パーセント計算
                </Link>
              </li>
              <li>
                <Link href="/days-keisan" className="nav-link">
                  日数計算
                </Link>
              </li>
              <li>
                <Link href="/time-keisan" className="nav-link">
                  時間計算
                </Link>
              </li>
            </ul>
            
            <h3 className="font-semibold text-lg mb-4 mt-6">法的情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="nav-link">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="nav-link">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} 計算ツール. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}