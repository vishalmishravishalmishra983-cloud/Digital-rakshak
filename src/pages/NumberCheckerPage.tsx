import { useState } from "react";
import { Search, Shield, ShieldCheck, ShieldX, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { spamNumbers } from "@/lib/spamData";

type Result = { status: "spam" | "suspicious" | "safe"; reports: number; type: string } | null;

export default function NumberCheckerPage() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [checking, setChecking] = useState(false);

  const handleCheck = () => {
    if (!number.trim()) return;
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      const found = spamNumbers[number.trim()];
      setResult(found ?? { status: "safe", reports: 0, type: "Not in database" });
      setChecking(false);
    }, 1200);
  };

  const statusConfig = {
    spam: { icon: ShieldX, label: "❌ Spam Number Detected!", color: "border-destructive text-destructive bg-destructive/10" },
    suspicious: { icon: AlertTriangle, label: "⚠️ Suspicious Number", color: "border-warning text-warning bg-warning/10" },
    safe: { icon: ShieldCheck, label: "✅ Safe Number", color: "border-cyber-green text-cyber-green bg-cyber-green/10" },
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">📞 Phone Number Checker</h1>
          <p className="text-muted-foreground mb-8">नंबर डालें और जानें – Spam है या Safe?</p>

          <div className="rounded-lg border border-border p-6 gradient-card">
            <div className="flex gap-3">
              <Input
                placeholder="Phone number enter करें (e.g. 9876543210)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                className="bg-secondary border-border text-foreground font-mono"
              />
              <Button onClick={handleCheck} disabled={checking} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-sm">
                <Search className="h-4 w-4 mr-2" />
                {checking ? "Checking..." : "Check"}
              </Button>
            </div>

            <AnimatePresence>
              {checking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto animate-pulse" />
                  <p className="text-muted-foreground mt-2 text-sm">AI Database में search हो रहा है...</p>
                </motion.div>
              )}
              {result && !checking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-6 rounded-lg border p-6 ${statusConfig[result.status].color}`}
                >
                  {(() => {
                    const Icon = statusConfig[result.status].icon;
                    return <Icon className="h-10 w-10 mx-auto mb-3" />;
                  })()}
                  <h3 className="text-xl font-bold text-center mb-2">{statusConfig[result.status].label}</h3>
                  <div className="text-center text-sm space-y-1">
                    <p>Type: <span className="font-semibold">{result.type}</span></p>
                    <p>Reports: <span className="font-mono font-semibold">{result.reports}</span></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Demo numbers: 9876543210, 8888888888, 1234567890
          </p>
        </motion.div>
      </div>
    </div>
  );
}
