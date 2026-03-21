import { useState, useCallback } from "react";
import { Phone, PhoneOff, ShieldX, ShieldCheck, AlertTriangle, Ban, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { spamNumbers } from "@/lib/spamData";
import { toast } from "@/components/ui/sonner";

type CallState = "idle" | "dialing" | "ringing" | "connected" | "ended";
type NumberStatus = "spam" | "suspicious" | "safe" | null;

export default function CallSimulatorPage() {
  const [number, setNumber] = useState("");
  const [callState, setCallState] = useState<CallState>("idle");
  const [numberStatus, setNumberStatus] = useState<NumberStatus>(null);
  const [blockedNumbers, setBlockedNumbers] = useState<string[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  const isBlocked = blockedNumbers.includes(number.trim());

  const handleCall = useCallback(() => {
    const trimmed = number.trim();
    if (!trimmed) return;

    if (blockedNumbers.includes(trimmed)) {
      toast("🚫 यह नंबर Block है!", { description: `${trimmed} को आपने block किया है।` });
      return;
    }

    const found = spamNumbers[trimmed];
    const status = found?.status ?? "safe";
    setNumberStatus(status);
    setCallState("dialing");
    setCallDuration(0);

    setTimeout(() => {
      if (status === "spam") {
        setCallState("ended");
        toast("⚠️ Fraud Number Detected!", {
          description: `${trimmed} एक ${found?.type || "Spam"} number है। Call auto-block हो गया।`,
        });
        setBlockedNumbers((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
      } else {
        setCallState("ringing");
        setTimeout(() => {
          setCallState("connected");
          const id = setInterval(() => setCallDuration((d) => d + 1), 1000);
          setIntervalId(id);
        }, 1500);
      }
    }, 2000);
  }, [number, blockedNumbers]);

  const handleEndCall = () => {
    setCallState("ended");
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleBlockNumber = () => {
    const trimmed = number.trim();
    if (!trimmed) return;
    if (!blockedNumbers.includes(trimmed)) {
      setBlockedNumbers((prev) => [...prev, trimmed]);
      toast("🚫 Number Blocked!", { description: `${trimmed} को block कर दिया गया है।` });
    }
  };

  const handleUnblock = (num: string) => {
    setBlockedNumbers((prev) => prev.filter((n) => n !== num));
    toast("✅ Number Unblocked", { description: `${num} को unblock कर दिया गया।` });
  };

  const resetCall = () => {
    setCallState("idle");
    setNumberStatus(null);
    setCallDuration(0);
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };

  const formatDuration = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const statusConfig = {
    spam: { icon: ShieldX, label: "❌ Fraud Number!", bg: "bg-destructive/20 border-destructive" },
    suspicious: { icon: AlertTriangle, label: "⚠️ Suspicious Number", bg: "bg-warning/20 border-warning" },
    safe: { icon: ShieldCheck, label: "✅ Safe Number", bg: "bg-cyber-green/20 border-cyber-green" },
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">📞 Call Simulator & Blocker</h1>
          <p className="text-muted-foreground mb-8">नंबर डालें, कॉल करें – Fraud नंबर auto-block होगा!</p>

          {/* Dialer */}
          <div className="rounded-lg border border-border p-6 gradient-card mb-6">
            <div className="flex gap-3 mb-4">
              <Input
                placeholder="Phone number डालें (e.g. 8888888888)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && callState === "idle" && handleCall()}
                className="bg-secondary border-border text-foreground font-mono"
                disabled={callState !== "idle" && callState !== "ended"}
              />
            </div>

            <div className="flex gap-3">
              {callState === "idle" || callState === "ended" ? (
                <>
                  <Button onClick={() => { resetCall(); handleCall(); }} className="bg-cyber-green text-background hover:bg-cyber-green/90 flex-1">
                    <PhoneCall className="h-4 w-4 mr-2" /> Call करें
                  </Button>
                  <Button onClick={handleBlockNumber} variant="destructive" disabled={!number.trim() || isBlocked}>
                    <Ban className="h-4 w-4 mr-2" /> {isBlocked ? "Blocked" : "Block"}
                  </Button>
                </>
              ) : (
                <Button onClick={handleEndCall} variant="destructive" className="flex-1">
                  <PhoneOff className="h-4 w-4 mr-2" /> Call End करें
                </Button>
              )}
            </div>

            {/* Call Status */}
            <AnimatePresence mode="wait">
              {callState === "dialing" && (
                <motion.div key="dialing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 text-center">
                  <Phone className="h-12 w-12 text-primary mx-auto animate-pulse" />
                  <p className="text-muted-foreground mt-2">Dialing {number}...</p>
                  <p className="text-xs text-muted-foreground mt-1">AI Database check हो रहा है...</p>
                </motion.div>
              )}

              {callState === "ringing" && (
                <motion.div key="ringing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 text-center">
                  <Phone className="h-12 w-12 text-cyber-green mx-auto animate-bounce" />
                  <p className="text-foreground mt-2 font-semibold">📱 Ringing...</p>
                </motion.div>
              )}

              {callState === "connected" && numberStatus && (
                <motion.div key="connected" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className={`mt-6 rounded-lg border p-6 ${statusConfig[numberStatus].bg}`}>
                  {(() => { const Icon = statusConfig[numberStatus].icon; return <Icon className="h-10 w-10 mx-auto mb-2" />; })()}
                  <h3 className="text-lg font-bold text-center">{statusConfig[numberStatus].label}</h3>
                  <p className="text-center text-2xl font-mono text-foreground mt-2">{formatDuration(callDuration)}</p>
                  <p className="text-center text-xs text-muted-foreground mt-1">Connected to {number}</p>
                </motion.div>
              )}

              {callState === "ended" && numberStatus && (
                <motion.div key="ended" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className={`mt-6 rounded-lg border p-6 ${statusConfig[numberStatus].bg}`}>
                  {(() => { const Icon = statusConfig[numberStatus].icon; return <Icon className="h-10 w-10 mx-auto mb-2" />; })()}
                  <h3 className="text-lg font-bold text-center">
                    {numberStatus === "spam" ? "🚫 Call Auto-Blocked!" : "📞 Call Ended"}
                  </h3>
                  {callDuration > 0 && <p className="text-center text-sm text-muted-foreground mt-1">Duration: {formatDuration(callDuration)}</p>}
                  {numberStatus !== "spam" && !blockedNumbers.includes(number.trim()) && (
                    <div className="text-center mt-3">
                      <Button size="sm" variant="destructive" onClick={handleBlockNumber}>
                        <Ban className="h-3 w-3 mr-1" /> इस नंबर को Block करें
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Blocked List */}
          {blockedNumbers.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-border p-6 gradient-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Ban className="h-5 w-5 text-destructive" /> Blocked Numbers ({blockedNumbers.length})
              </h3>
              <div className="space-y-2">
                {blockedNumbers.map((num) => (
                  <div key={num} className="flex items-center justify-between rounded-md border border-border p-3 bg-destructive/10">
                    <span className="font-mono text-sm text-foreground">{num}</span>
                    <Button size="sm" variant="outline" onClick={() => handleUnblock(num)} className="text-xs">
                      Unblock
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Demo spam numbers: 8888888888, 7777777777, 9876543210 | Safe: 1234567890
          </p>
        </motion.div>
      </div>
    </div>
  );
}
