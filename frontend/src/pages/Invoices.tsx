import { Plus, Filter } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { InvoiceItem } from "@/components/invoices/InvoiceItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const invoices = [
  { id: "INV-2024-001", client: "Acme Corporation", amount: 2500, currency: "USD", dueDate: "Dec 15, 2024", status: "pending" as const },
  { id: "INV-2024-002", client: "Tech Startup Ltd", amount: 1800, currency: "USD", dueDate: "Dec 10, 2024", status: "paid" as const },
  { id: "INV-2024-003", client: "Global Media Inc", amount: 3200, currency: "USD", dueDate: "Nov 30, 2024", status: "overdue" as const },
  { id: "INV-2024-004", client: "Design Agency", amount: 950, currency: "USD", dueDate: "Dec 20, 2024", status: "pending" as const },
  { id: "INV-2024-005", client: "E-commerce Store", amount: 4500, currency: "USD", dueDate: "Dec 5, 2024", status: "paid" as const },
];

export default function Invoices() {
  const [filter, setFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");

  const filteredInvoices = filter === "all" 
    ? invoices 
    : invoices.filter(inv => inv.status === filter);

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0),
    pending: invoices.filter(inv => inv.status === "pending").reduce((sum, inv) => sum + inv.amount, 0),
    overdue: invoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0),
  };

  return (
    <AppLayout title="Invoices">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in">
          <div className="fintech-card">
            <p className="text-sm text-muted-foreground">Total Invoiced</p>
            <p className="text-xl font-bold text-foreground">${stats.total.toLocaleString()}</p>
          </div>
          <div className="fintech-card">
            <p className="text-sm text-muted-foreground">Collected</p>
            <p className="text-xl font-bold text-success">${stats.paid.toLocaleString()}</p>
          </div>
        </div>

        {/* Create Invoice Button */}
        <Button variant="accent" className="w-full gap-2 animate-slide-up">
          <Plus className="w-4 h-4" />
          Create New Invoice
        </Button>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {(["all", "pending", "paid", "overdue"] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? "accent" : "secondary"}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize whitespace-nowrap"
            >
              {status}
              {status !== "all" && (
                <span className="ml-1 text-xs opacity-70">
                  ({invoices.filter(inv => inv.status === status).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Invoice List */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-card rounded-2xl border border-border/50 shadow-fintech-sm divide-y divide-border/50">
            {filteredInvoices.map((invoice) => (
              <InvoiceItem key={invoice.id} {...invoice} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
