import { useState } from "react";
import { Flag, TrendingUp, MapPin, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trendingSpam } from "@/lib/spamData";
import { toast } from "sonner";

export default function ReportsPage() {
  const [reportNumber, setReportNumber] = useState("");
  const [reports, setReports] = useState(trendingSpam);

  const handleReport = () => {
    if (!reportNumber.trim() || reportNumber.trim().length < 10) {
      toast.error("कृपया valid phone number enter करें");
      return;
    }
    const existing = reports.find((r) => r.number === reportNumber.trim());
    if (existing) {
      setReports(reports.map((r) => (r.number === reportNumber.trim() ? { ...r, reports: r.reports + 1 } : r)));
      toast.success("Report count बढ़ा दिया गया!");
    } else {
      setReports([{ number: reportNumber.trim(), reports: 1, type: "User Reported", city: "Unknown" }, ...reports]);
      toast.success("Number report कर दिया गया! 🛡️");
    }
    setReportNumber("");
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">🚩 Community Reports</h1>
          <p className="text-muted-foreground mb-8">Spam number report करें और trending spam numbers देखें</p>

          {/* Report form */}
          <div className="rounded-lg border border-border p-6 gradient-card mb-8">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" /> Spam Number Report करें
            </h3>
            <div className="flex gap-3">
              <Input
                placeholder="Spam number enter करें"
                value={reportNumber}
                onChange={(e) => setReportNumber(e.target.value)}
                className="bg-secondary border-border text-foreground font-mono"
              />
              <Button onClick={handleReport} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                <Plus className="h-4 w-4 mr-2" /> Report
              </Button>
            </div>
          </div>

          {/* Trending */}
          <div className="rounded-lg border border-border p-6 gradient-card">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Trending Spam Numbers
            </h3>
            <div className="space-y-3">
              {reports.map((r, i) => (
                <motion.div
                  key={r.number}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-md border border-border p-3 bg-secondary/30"
                >
                  <div>
                    <span className="font-mono text-sm text-foreground">{r.number}</span>
                    <span className="ml-3 text-xs text-muted-foreground">{r.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {r.city}
                    </span>
                    <span className="text-xs font-mono font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                      {r.reports} reports
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
