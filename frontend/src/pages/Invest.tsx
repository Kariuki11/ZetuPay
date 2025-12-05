import { TrendingUp, Clock, Shield, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { InvestmentCard } from "@/components/invest/InvestmentCard";

const investments = [
  { title: "High-Yield Savings", apy: 8.5, duration: "Flexible", minAmount: 100, riskLevel: "low" as const, type: "savings" as const },
  { title: "30-Day Fixed", apy: 10, duration: "30 days lock", minAmount: 500, riskLevel: "low" as const, type: "fixed" as const },
  { title: "90-Day Fixed", apy: 12, duration: "90 days lock", minAmount: 1000, riskLevel: "medium" as const, type: "fixed" as const },
  { title: "180-Day Fixed", apy: 15, duration: "180 days lock", minAmount: 2500, riskLevel: "medium" as const, type: "fixed" as const },
  { title: "Crypto Index", apy: 25, duration: "Flexible", minAmount: 100, riskLevel: "high" as const, type: "crypto" as const },
];

export default function Invest() {
  return (
    <AppLayout title="Invest">
      <div className="space-y-6">
        {/* Portfolio Summary */}
        <div className="fintech-card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Invested</p>
              <p className="text-2xl font-bold text-foreground">$5,250.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Returns</p>
              <p className="text-xl font-bold text-success">+$487.50</p>
            </div>
          </div>
          
          {/* Simple Growth Chart */}
          <div className="h-20 flex items-end gap-1">
            {[35, 45, 40, 55, 50, 65, 60, 75, 70, 85, 80, 90].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-accent/20 rounded-t-sm transition-all duration-300 hover:bg-accent/40"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Active Investments */}
        <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground">Active Investments</h2>
            <button className="flex items-center gap-1 text-xs text-accent font-medium">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="fintech-card">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <p className="text-sm font-medium text-foreground">High-Yield</p>
              <p className="text-lg font-bold text-foreground">$2,500</p>
              <p className="text-xs text-success mt-1">+$175 earned</p>
            </div>
            <div className="fintech-card">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <p className="text-sm font-medium text-foreground">90-Day Fixed</p>
              <p className="text-lg font-bold text-foreground">$2,750</p>
              <p className="text-xs text-success mt-1">+$312.50 earned</p>
            </div>
          </div>
        </section>

        {/* Investment Options */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Investment Plans</h2>
          <div className="space-y-4">
            {investments.map((inv) => (
              <InvestmentCard key={inv.title} {...inv} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
