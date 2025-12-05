import { ArrowDownLeft, ArrowUpRight, RefreshCw } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";

const transferOptions = [
  {
    icon: ArrowDownLeft,
    title: "Receive Money",
    description: "Get paid via link, QR, or invoice",
    color: "bg-success/10 text-success",
    path: "/receive"
  },
  {
    icon: ArrowUpRight,
    title: "Withdraw",
    description: "Send to M-Pesa, bank, or crypto",
    color: "bg-accent/10 text-accent",
    path: "/withdraw"
  },
  {
    icon: RefreshCw,
    title: "Convert Currency",
    description: "Exchange between currencies",
    color: "bg-gold/10 text-gold",
    path: "/convert"
  },
];

export default function Transfer() {
  const navigate = useNavigate();

  return (
    <AppLayout title="Transfer">
      <div className="space-y-6">
        {/* Balance Overview */}
        <div className="fintech-card animate-fade-in">
          <p className="text-sm text-muted-foreground">Available Balance</p>
          <p className="text-3xl font-bold text-foreground mt-1">$12,458.50</p>
          <div className="flex gap-4 mt-4 text-sm">
            <div>
              <p className="text-muted-foreground">USD</p>
              <p className="font-semibold text-foreground">$8,234.50</p>
            </div>
            <div>
              <p className="text-muted-foreground">KES</p>
              <p className="font-semibold text-foreground">245,000</p>
            </div>
            <div>
              <p className="text-muted-foreground">USDT</p>
              <p className="font-semibold text-foreground">3,500</p>
            </div>
          </div>
        </div>

        {/* Transfer Options */}
        <section className="space-y-3 animate-slide-up">
          {transferOptions.map((option) => (
            <button
              key={option.title}
              onClick={() => navigate(option.path)}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-fintech-sm hover:shadow-fintech-md transition-all duration-200 text-left active:scale-[0.99]"
            >
              <div className={`w-14 h-14 rounded-xl ${option.color} flex items-center justify-center`}>
                <option.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{option.title}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </button>
          ))}
        </section>
      </div>
    </AppLayout>
  );
}
