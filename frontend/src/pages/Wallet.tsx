import { Plus } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CurrencyCard } from "@/components/wallet/CurrencyCard";
import { FundCategory } from "@/components/wallet/FundCategory";
import { Button } from "@/components/ui/button";
import { TransactionItem, Transaction } from "@/components/dashboard/TransactionItem";

const currencies = [
  { currency: "US Dollar", symbol: "$", balance: 8234.50, flag: "🇺🇸", change: 2.5 },
  { currency: "Kenyan Shilling", symbol: "KES", balance: 245000, flag: "🇰🇪", change: -0.8 },
  { currency: "Tether USDT", symbol: "₮", balance: 3500, flag: "💎", change: 0.1 },
];

const fundCategories = [
  { type: "earnings" as const, amount: 6500, percentage: 52 },
  { type: "savings" as const, amount: 4200, percentage: 34 },
  { type: "goals" as const, amount: 1758.50, percentage: 14 },
];

const transactions: Transaction[] = [
  { id: "1", type: "incoming", title: "Client Payment", description: "Design project", amount: 1500, currency: "USD", date: "Today", status: "completed" },
  { id: "2", type: "outgoing", title: "M-Pesa Transfer", description: "Withdrawal", amount: 200, currency: "USD", date: "Yesterday", status: "completed" },
  { id: "3", type: "conversion", title: "Currency Exchange", description: "USD to KES", amount: 500, currency: "USD", date: "Dec 3", status: "completed" },
];

export default function Wallet() {
  return (
    <AppLayout title="Wallet">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <Button variant="accent" className="flex-1">
            <Plus className="w-4 h-4" /> Add Money
          </Button>
          <Button variant="outline" className="flex-1">
            Request Money
          </Button>
        </div>

        {/* Currency Balances */}
        <section className="animate-slide-up">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Balances</h2>
          <div className="space-y-3">
            {currencies.map((curr) => (
              <CurrencyCard key={curr.currency} {...curr} />
            ))}
          </div>
        </section>

        {/* Fund Categories */}
        <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Fund Allocation</h2>
          <div className="space-y-3">
            {fundCategories.map((cat) => (
              <FundCategory key={cat.type} {...cat} />
            ))}
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Transaction History</h2>
          <div className="bg-card rounded-2xl border border-border/50 shadow-fintech-sm divide-y divide-border/50">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
