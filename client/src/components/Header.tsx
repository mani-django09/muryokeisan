import { Link } from "wouter";
import { Calculator, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

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

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">計算ツール</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="nav-link">
            ホーム
          </Link>
          
          {/* Calculators Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="nav-link flex items-center gap-1">
              計算ツール
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-background border rounded-md shadow-lg max-h-[400px] overflow-y-auto">
                {calculators.map((calc) => (
                  <Link 
                    key={calc.path} 
                    href={calc.path} 
                    className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/privacy" className="nav-link">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="nav-link">
            利用規約
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="text-lg font-semibold">
                ホーム
              </Link>
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-muted-foreground mb-3">計算ツール</p>
                <div className="flex flex-col space-y-2">
                  {calculators.map((calc) => (
                    <Link key={calc.path} href={calc.path} className="nav-link text-sm">
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <Link href="/privacy" className="block py-2 nav-link">
                  プライバシーポリシー
                </Link>
                <Link href="/terms" className="block py-2 nav-link">
                  利用規約
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}