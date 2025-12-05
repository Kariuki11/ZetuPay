import { Link2, QrCode, FileText, Shield } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PaymentMethodCard } from "@/components/receive/PaymentMethodCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const paymentMethods = [
  { icon: Link2, title: "Payment Link", description: "Share a link to receive payment" },
  { icon: QrCode, title: "QR Code", description: "Scan to pay instantly" },
  { icon: FileText, title: "Create Invoice", description: "Professional invoice with details" },
  { icon: Shield, title: "Escrow Payment", description: "Secure milestone-based payment" },
];

export default function Receive() {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <AppLayout title="Receive Payment">
      <div className="space-y-6">
        {/* Amount Input */}
        <div className="fintech-card animate-fade-in">
          <Label htmlFor="amount" className="text-sm text-muted-foreground">Amount to receive</Label>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-foreground">$</span>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold border-0 bg-transparent p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {[50, 100, 500, 1000].map((val) => (
              <Button
                key={val}
                variant="secondary"
                size="sm"
                onClick={() => setAmount(val.toString())}
                className="flex-1"
              >
                ${val}
              </Button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.title}
                {...method}
                onClick={() => setSelectedMethod(method.title)}
              />
            ))}
          </div>
        </section>

        {/* Generate Link Preview */}
        {amount && (
          <div className="fintech-card animate-scale-in bg-accent/5 border-accent/20">
            <p className="text-sm text-muted-foreground mb-2">Your payment link will be:</p>
            <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
              <Link2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-sm text-foreground truncate">
                pay.freelancepay.com/u/johndoe/{amount}
              </span>
            </div>
            <Button variant="accent" className="w-full mt-4">
              Generate Payment Link
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
