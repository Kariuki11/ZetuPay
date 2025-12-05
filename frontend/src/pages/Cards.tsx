import { Plus, Snowflake, CreditCard } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { VirtualCard } from "@/components/cards/VirtualCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const cards = [
  {
    id: "1",
    cardNumber: "4532123456789012",
    expiryDate: "12/27",
    cardHolder: "John Doe",
    balance: 2450.0,
    currency: "USD",
    type: "visa" as const,
    frozen: false,
  },
  {
    id: "2",
    cardNumber: "5412345678901234",
    expiryDate: "08/26",
    cardHolder: "John Doe",
    balance: 890.5,
    currency: "EUR",
    type: "mastercard" as const,
    frozen: false,
  },
];

export default function Cards() {
  const [activeCard, setActiveCard] = useState(0);
  const [cardStates, setCardStates] = useState(cards.map((c) => ({ ...c })));

  const toggleFreeze = () => {
    setCardStates((prev) =>
      prev.map((card, i) =>
        i === activeCard ? { ...card, frozen: !card.frozen } : card
      )
    );
  };

  return (
    <AppLayout title="Virtual Cards">
      <div className="space-y-6">
        {/* Card Carousel */}
        <div className="animate-fade-in">
          <VirtualCard {...cardStates[activeCard]} />

          {/* Card Selector Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {cardStates.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  activeCard === index
                    ? "bg-accent w-6"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex gap-3 animate-slide-up">
          <Button variant="accent" className="flex-1">
            <Plus className="w-4 h-4" /> Top Up
          </Button>
          <Button
            variant={cardStates[activeCard].frozen ? "destructive" : "outline"}
            className="flex-1"
            onClick={toggleFreeze}
          >
            <Snowflake className="w-4 h-4" />
            {cardStates[activeCard].frozen ? "Unfreeze" : "Freeze"}
          </Button>
        </div>

        {/* Card Details */}
        <section
          className="animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            Card Details
          </h2>
          <div className="fintech-card space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Card Number</span>
              <span className="font-mono text-foreground">
                •••• •••• •••• {cardStates[activeCard].cardNumber.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CVV</span>
              <span className="font-mono text-foreground">•••</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expiry</span>
              <span className="text-foreground">
                {cardStates[activeCard].expiryDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Billing Address</span>
              <span className="text-foreground text-right">
                123 Main St, NY
              </span>
            </div>
            <Button variant="ghost" className="w-full text-accent">
              Show Full Details
            </Button>
          </div>
        </section>

        {/* Add New Card */}
        <Button variant="outline" className="w-full gap-2">
          <CreditCard className="w-4 h-4" />
          Create New Virtual Card
        </Button>
      </div>
    </AppLayout>
  );
}
