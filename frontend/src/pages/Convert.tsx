import { ArrowDownUp, Info } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", balance: 8234.50 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KES", flag: "🇰🇪", balance: 245000 },
  { code: "USDT", name: "Tether", symbol: "₮", flag: "💎", balance: 3500 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", balance: 0 },
];

export default function Convert() {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [amount, setAmount] = useState("");

  const exchangeRate = 153.50; // Mock rate USD to KES
  const convertedAmount = amount ? (parseFloat(amount) * exchangeRate).toFixed(2) : "0.00";

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <AppLayout title="Convert">
      <div className="space-y-6">
        {/* From Currency */}
        <div className="fintech-card animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-xs text-muted-foreground">
              Balance: {fromCurrency.symbol} {fromCurrency.balance.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl">
              <span className="text-xl">{fromCurrency.flag}</span>
              <span className="font-semibold text-foreground">{fromCurrency.code}</span>
            </button>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold border-0 bg-transparent text-right h-auto focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={swapCurrencies}
            className="w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-fintech-lg flex items-center justify-center hover:scale-105 transition-transform duration-200"
          >
            <ArrowDownUp className="w-5 h-5" />
          </button>
        </div>

        {/* To Currency */}
        <div className="fintech-card animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">To</span>
            <span className="text-xs text-muted-foreground">
              Balance: {toCurrency.symbol} {toCurrency.balance.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl">
              <span className="text-xl">{toCurrency.flag}</span>
              <span className="font-semibold text-foreground">{toCurrency.code}</span>
            </button>
            <div className="flex-1 text-right">
              <p className="text-2xl font-bold text-foreground">
                {toCurrency.symbol} {parseFloat(convertedAmount).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="fintech-card bg-accent/5 border-accent/20 animate-slide-up">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Exchange Rate</p>
              <p className="text-sm text-muted-foreground">
                1 {fromCurrency.code} = {exchangeRate} {toCurrency.code}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Rate valid for 30 seconds • No fees
              </p>
            </div>
          </div>
        </div>

        {/* Convert Button */}
        <Button variant="accent" size="lg" className="w-full" disabled={!amount || parseFloat(amount) <= 0}>
          Convert {fromCurrency.code} to {toCurrency.code}
        </Button>
      </div>
    </AppLayout>
  );
}
