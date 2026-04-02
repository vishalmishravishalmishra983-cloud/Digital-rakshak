import { useState } from "react";
import { Link2, ShieldX, ShieldCheck, AlertTriangle, Ban, Scan, Brain, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const spamDomains = [
  "bit.ly", "tinyurl.com", "shorturl.at", "goo.gl", "t.co",
  "free-prize.xyz", "win-now.top", "lottery-claim.in", "kyc-update.info",
  "bank-verify.co", "upi-reward.in", "otp-verify.net", "account-alert.xyz",
  "secure-login.click", "paytm-offer.in", "sbi-kyc.co", "hdfc-alert.info",
];

const spamPatterns = [
  /free[-_]?prize/i, /lottery/i, /claim[-_]?reward/i, /kyc[-_]?update/i,
  /bank[-_]?verify/i, /otp[-_]?verify/i, /account[-_]?block/i,
  /upi[-_]?reward/i, /login[-_]?secure/i, /paytm[-_]?offer/i,
  /winner[-_]?congratulation/i, /click[-_]?here[-_]?now/i,
  /suspend/i, /urgent[-_]?action/i, /verify[-_]?account/i,
];

const suspiciousIndicators = [
  { pattern: /https?:\/\//i, label: "Contains URL", weight: 5 },
  { pattern: /bit\.ly|tinyurl|shorturl|goo\.gl|t\.co/i, label: "Shortened URL", weight: 25 },
  { pattern: /\.xyz|\.top|\.click|\.info|\.co(?!m)/i, label: "Suspicious TLD", weight: 20 },
  { pattern: /free|prize|winner|lottery|reward/i, label: "Reward keywords", weight: 15 },
  { pattern: /kyc|otp|bank|upi|account|verify|password|pin/i, label: "Financial keywords", weight: 20 },
  { pattern: /urgent|immediately|expire|block|suspend/i, label: "Urgency words", weight: 15 },
  { pattern: /click\s*here|tap\s*here|open\s*now/i, label: "Click bait", weight: 10 },
  { pattern: /@.*\d{5,}/i, label: "Suspicious format", weight: 10 },
];

function extractUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
  const matches = text.match(urlRegex) || [];
  return [...new Set(matches)];
}

function analyzeLink(input: string): {
  score: number;
  level: "low" | "medium" | "high";
  threats: string[];
  urls: string[];
  isSpamDomain: boolean;
} {
  const lower = input.toLowerCase();
  const urls = extractUrls(input);
  const threats: string[] = [];
  let score = 0;
  let isSpamDomain = false;

  // Check against known spam domains
  for (const domain of spamDomains) {
    if (lower.includes(domain)) {
      threats.push(`Known spam domain: ${domain}`);
      score += 30;
      isSpamDomain = true;
    }
  }

  // Check spam URL patterns
  for (const pattern of spamPatterns) {
    if (pattern.test(lower)) {
      threats.push(`Spam pattern: ${pattern.source.replace(/[-_]?\??/g, " ").replace(/\\i$/, "")}`);
      score += 15;
    }
  }

  // Check suspicious indicators
  for (const indicator of suspiciousIndicators) {
    if (indicator.pattern.test(input)) {
      threats.push(indicator.label);
      score += indicator.weight;
    }
  }

  // Multiple URLs = more suspicious
  if (urls.length > 1) {
    threats.push(`Multiple URLs detected (${urls.length})`);
    score += 10;
  }

  score = Math.min(100, score);
  const uniqueThreats = [...new Set(threats)];
  const level = score < 30 ? "low" : score < 60 ? "medium" : "high";

  return { score, level, threats: uniqueThreats, urls, isSpamDomain };
}

export default function LinkCheckerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeLink> | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [blockedLinks, setBlockedLinks] = useState<string[]>([]);

  const handleAnalyze = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      toast("❌ Link या text डालें!", { description: "कृपया कोई link या message paste करें।" });
      return;
    }
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const res = analyzeLink(trimmed);
      setResult(res);
      setAnalyzing(false);

      // Auto-block spam links
      if (res.isSpamDomain || res.score >= 60) {
        const newBlocked = res.urls.filter((u) => !blockedLinks.includes(u));
        if (newBlocked.length > 0) {
          setBlockedLinks((prev) => [...prev, ...newBlocked]);
          toast("🚫 Spam Link Auto-Blocked!", {
            description: `${newBlocked.length} link(s) block कर दिए गए हैं।`,
          });
        }
      }
    }, 1500);
  };

  const handleUnblock = (link: string) => {
    setBlockedLinks((prev) => prev.filter((l) => l !== link));
    toast("✅ Link Unblocked", { description: "Link unblock कर दिया गया।" });
  };

  const levelConfig = {
    low: { icon: ShieldCheck, label: "✅ Safe – कोई खतरा नहीं!", color: "text-cyber-green", bg: "bg-cyber-green/20 border-cyber-green" },
    medium: { icon: AlertTriangle, label: "⚠️ Suspicious – सावधान रहें!", color: "text-warning", bg: "bg-warning/20 border-warning" },
    high: { icon: ShieldX, label: "❌ Spam/Fraud Link Detected!", color: "text-destructive", bg: "bg-destructive/20 border-destructive" },
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">🔗 Spam Link Checker</h1>
          <p className="text-muted-foreground mb-8">Link या message paste करें – AI बताएगा spam है या safe!</p>

          <div className="rounded-lg border border-border p-6 gradient-card mb-6">
            <Textarea
              placeholder="Link या पूरा message यहाँ paste करें...&#10;Example: http://free-prize.xyz/claim-now"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              className="bg-secondary border-border text-foreground mb-4 resize-none font-mono text-sm"
            />
            <Button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-sm"
            >
              <Scan className="h-4 w-4 mr-2" />
              {analyzing ? "AI Checking..." : "Check Link / Message"}
            </Button>

            <AnimatePresence>
              {analyzing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 text-center">
                  <Brain className="h-12 w-12 text-primary mx-auto animate-pulse" />
                  <p className="text-sm text-muted-foreground mt-2">AI link patterns और domains check कर रहा है...</p>
                </motion.div>
              )}

              {result && !analyzing && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
                  {/* Risk Score Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Spam Score</span>
                      <span className="font-mono font-semibold text-foreground">{result.score}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          result.level === "low" ? "bg-cyber-green" : result.level === "medium" ? "bg-warning" : "bg-destructive"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className={`rounded-lg border p-4 ${levelConfig[result.level].bg}`}>
                    {(() => {
                      const Icon = levelConfig[result.level].icon;
                      return <Icon className={`h-8 w-8 mx-auto mb-2 ${levelConfig[result.level].color}`} />;
                    })()}
                    <h3 className={`text-lg font-bold text-center ${levelConfig[result.level].color}`}>
                      {levelConfig[result.level].label}
                    </h3>
                  </div>

                  {/* Detected URLs */}
                  {result.urls.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-primary" /> Detected Links:
                      </h4>
                      <div className="space-y-2">
                        {result.urls.map((url) => {
                          const isBlocked = blockedLinks.includes(url);
                          return (
                            <div
                              key={url}
                              className={`flex items-center justify-between rounded-md border p-2 text-xs ${
                                isBlocked ? "border-destructive bg-destructive/10" : "border-border bg-secondary/50"
                              }`}
                            >
                              <span className="font-mono truncate flex-1 mr-2 text-foreground">{url}</span>
                              {isBlocked ? (
                                <span className="text-destructive font-semibold shrink-0 flex items-center gap-1">
                                  <Ban className="h-3 w-3" /> Blocked
                                </span>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="text-xs h-6 px-2 shrink-0"
                                  onClick={() => {
                                    setBlockedLinks((prev) => [...prev, url]);
                                    toast("🚫 Link Blocked!", { description: "Link block कर दिया गया।" });
                                  }}
                                >
                                  <Ban className="h-3 w-3 mr-1" /> Block
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Threats */}
                  {result.threats.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-primary" /> AI ने ये threats detect किए:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.threats.map((t) => (
                          <span key={t} className="rounded-full bg-destructive/20 text-destructive text-xs px-3 py-1 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.threats.length === 0 && (
                    <p className="text-sm text-cyber-green">✅ कोई threat नहीं मिला – Safe link!</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Blocked Links List */}
          {blockedLinks.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-border p-6 gradient-card mb-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Ban className="h-5 w-5 text-destructive" /> Blocked Links ({blockedLinks.length})
              </h3>
              <div className="space-y-2">
                {blockedLinks.map((link) => (
                  <div key={link} className="flex items-center justify-between rounded-md border border-border p-3 bg-destructive/10">
                    <span className="font-mono text-xs text-foreground truncate flex-1 mr-2">{link}</span>
                    <Button size="sm" variant="outline" onClick={() => handleUnblock(link)} className="text-xs shrink-0">
                      Unblock
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Try: "http://free-prize.xyz/claim-now" या "Your bank KYC expired. Click http://bank-verify.co/update"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
