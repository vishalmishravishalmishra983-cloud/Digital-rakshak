import { useState } from "react";
import { MessageSquare, Scan, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeMessage } from "@/lib/spamData";
import RiskMeter from "@/components/RiskMeter";

export default function SmsAnalyzerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeMessage> | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeMessage(text));
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">💬 SMS Analyzer</h1>
          <p className="text-muted-foreground mb-8">SMS paste करें – AI बताएगा fraud है या नहीं</p>

          <div className="rounded-lg border border-border p-6 gradient-card">
            <Textarea
              placeholder="यहाँ SMS text paste करें..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="bg-secondary border-border text-foreground mb-4 resize-none"
            />
            <Button onClick={handleAnalyze} disabled={analyzing} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-sm">
              <Scan className="h-4 w-4 mr-2" />
              {analyzing ? "AI Analyzing..." : "Analyze SMS"}
            </Button>

            <AnimatePresence>
              {analyzing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 text-center">
                  <Brain className="h-12 w-12 text-primary mx-auto animate-pulse" />
                  <p className="text-sm text-muted-foreground mt-2">AI keywords और patterns check कर रहा है...</p>
                </motion.div>
              )}
              {result && !analyzing && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
                  <RiskMeter level={result.level} score={result.score} />

                  {result.matches.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-primary" /> AI ने ये suspicious keywords detect किए:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matches.map((kw) => (
                          <span key={kw} className="rounded-full bg-destructive/20 text-destructive text-xs px-3 py-1 font-mono">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.matches.length === 0 && (
                    <p className="text-sm text-cyber-green">✅ कोई suspicious keyword नहीं मिला – Safe message!</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Try: "Your bank account is blocked. Click here to verify OTP urgently"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
