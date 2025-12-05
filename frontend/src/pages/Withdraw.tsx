import { Smartphone, Building2, Bitcoin } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const withdrawMethods = [
  { 
    id: "mpesa",
    icon: Smartphone, 
    title: "Mobile Money", 
    subtitle: "M-Pesa, Airtel Money",
    fee: "1.5%",
    time: "Instant"
  },
  { 
    id: "bank",
    icon: Building2, 
    title: "Bank Transfer", 
    subtitle: "Direct to bank account",
    fee: "0.5%",
    time: "1-2 days"
  },
  { 
    id: "crypto",
    icon: Bitcoin, 
    title: "Crypto", 
    subtitle: "USDT, BTC, ETH",
    fee: "Network fee",
    time: "10-30 min"
  },
];

export default function Withdraw() {
  const [selectedMethod, setSelectedMethod] = useState("mpesa");
  const [amount, setAmount] = useState("");

  return (
    <AppLayout title="Withdraw">
      <div className="space-y-6">
        {/* Available Balance */}
        <div className="fintech-card animate-fade-in">
          <p className="text-sm text-muted-foreground">Available Balance</p>
          <p className="text-3xl font-bold text-foreground mt-1">$12,458.50</p>
        </div>

        {/* Amount Input */}
        <div className="fintech-card animate-slide-up">
          <Label htmlFor="withdraw-amount" className="text-sm text-muted-foreground">
            Amount to withdraw
          </Label>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-foreground">$</span>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
            />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-accent"
            onClick={() => setAmount("12458.50")}
          >
            Withdraw All
          </Button>
        </div>

        {/* Withdrawal Methods */}
        <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Withdrawal Method</h2>
          <div className="space-y-3">
            {withdrawMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                  selectedMethod === method.id
                    ? "bg-accent/5 border-accent shadow-fintech-md"
                    : "bg-card border-border/50 hover:border-border"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedMethod === method.id ? "bg-accent/20" : "bg-secondary"
                }`}>
                  <method.icon className={`w-6 h-6 ${
                    selectedMethod === method.id ? "text-accent" : "text-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{method.title}</p>
                  <p className="text-sm text-muted-foreground">{method.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{method.fee}</p>
                  <p className="text-xs text-muted-foreground">{method.time}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Continue Button */}
        <Button variant="accent" size="lg" className="w-full" disabled={!amount}>
          Continue to Withdraw
        </Button>
      </div>
    </AppLayout>
  );
}
