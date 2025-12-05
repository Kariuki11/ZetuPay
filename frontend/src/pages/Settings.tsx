import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Lock,
  Fingerprint
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile Settings", subtitle: "Edit your profile details", href: "#" },
      { icon: Shield, label: "KYC Status", subtitle: "Verified", status: "verified", href: "#" },
    ]
  },
  {
    title: "Security",
    items: [
      { icon: Lock, label: "Change Password", subtitle: "Last changed 30 days ago", href: "#" },
      { icon: Smartphone, label: "Two-Factor Auth", subtitle: "SMS & Authenticator", toggle: true, enabled: true },
      { icon: Fingerprint, label: "Biometric Login", subtitle: "Face ID / Fingerprint", toggle: true, enabled: false },
    ]
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", subtitle: "Push, Email, SMS", href: "#" },
      { icon: CreditCard, label: "Linked Accounts", subtitle: "3 accounts linked", href: "#" },
    ]
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", subtitle: "FAQs and guides", href: "#" },
    ]
  },
];

export default function Settings() {
  return (
    <AppLayout title="Settings">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="fintech-card flex items-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xl font-bold">JD</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">John Doe</h2>
            <p className="text-sm text-muted-foreground">john.doe@email.com</p>
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-xs text-success font-medium">Verified Account</span>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, index) => (
          <section 
            key={section.title} 
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">{section.title}</h3>
            <div className="bg-card rounded-2xl border border-border/50 shadow-fintech-sm divide-y divide-border/50">
              {section.items.map((item) => (
                <div 
                  key={item.label}
                  className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                      {item.status === "verified" && (
                        <CheckCircle className="w-3 h-3 text-success" />
                      )}
                      {item.status === "pending" && (
                        <AlertCircle className="w-3 h-3 text-warning" />
                      )}
                    </div>
                  </div>
                  {item.toggle ? (
                    <Switch defaultChecked={item.enabled} />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Logout Button */}
        <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>

        {/* Version Info */}
        <p className="text-center text-xs text-muted-foreground">
          FreelancePay v1.0.0
        </p>
      </div>
    </AppLayout>
  );
}
