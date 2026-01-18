import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";

// Calculator pages
import BMICalculator from "./pages/BMICalculator";
import TaxCalculator from "./pages/TaxCalculator";
import DaysCalculator from "./pages/DaysCalculator";
import TimeCalculator from "./pages/TimeCalculator";
import PercentageCalculator from "./pages/PercentageCalculator";
import BodyFatCalculator from "./pages/BodyFatCalculator";
import DueDateCalculator from "./pages/DueDateCalculator";
import DiscountCalculator from "./pages/DiscountCalculator";
import AgeCalculator from "./pages/AgeCalculator";
import WageCalculator from "./pages/WageCalculator";
import PropertyTaxCalculator from "./pages/PropertyTaxCalculator";
import IncomeTaxCalculator from "./pages/IncomeTaxCalculator";
import UnemploymentCalculator from "./pages/UnemploymentCalculator";

// Legal pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function Router() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          
          {/* Health & Body calculators */}
          <Route path="/bmi-keisan" component={BMICalculator} />
          <Route path="/body-fat-keisan" component={BodyFatCalculator} />
          <Route path="/due-date-keisan" component={DueDateCalculator} />
          
          {/* Date & Time calculators */}
          <Route path="/days-keisan" component={DaysCalculator} />
          <Route path="/time-keisan" component={TimeCalculator} />
          <Route path="/age-keisan" component={AgeCalculator} />
          
          {/* Money & Tax calculators */}
          <Route path="/tax-keisan" component={TaxCalculator} />
          <Route path="/percentage-keisan" component={PercentageCalculator} />
          <Route path="/discount-keisan" component={DiscountCalculator} />
          <Route path="/wage-keisan" component={WageCalculator} />
          <Route path="/property-tax-keisan" component={PropertyTaxCalculator} />
          <Route path="/income-tax-keisan" component={IncomeTaxCalculator} />
          <Route path="/unemployment-keisan" component={UnemploymentCalculator} />
          
          {/* Legal pages */}
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
