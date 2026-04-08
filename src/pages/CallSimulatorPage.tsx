import { useState, useCallback, useRef, useEffect } from "react";
import { Phone, PhoneOff, ShieldX, ShieldCheck, AlertTriangle, Ban, PhoneCall, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { spamNumbers, detectNumberThreat } from "@/lib/spamData";
import { toast } from "@/components/ui/sonner";

const fraudAnnouncements = [
  { lang: "hi-IN", label: "हिंदी", text: "चेतावनी! यह एक फ्रॉड नंबर है। कॉल ऑटो ब्लॉक कर दिया गया है।" },
  { lang: "en-US", label: "English", text: "Warning! This is a fraud number. The call has been auto-blocked." },
  { lang: "bn-IN", label: "বাংলা", text: "সতর্কতা! এটি একটি প্রতারণামূলক নম্বর। কলটি স্বয়ংক্রিয়ভাবে ব্লক করা হয়েছে।" },
  { lang: "ta-IN", label: "தமிழ்", text: "எச்சரிக்கை! இது ஒரு மோசடி எண். அழைப்பு தானாக தடுக்கப்பட்டது." },
  { lang: "te-IN", label: "తెలుగు", text: "హెచ్చరిక! ఇది ఒక మోసపూరిత నంబర్. కాల్ ఆటో బ్లాక్ చేయబడింది." },
  { lang: "mr-IN", label: "मराठी", text: "सावधान! हा एक फसवणूक नंबर आहे. कॉल ऑटो ब्लॉक झाला आहे." },
  { lang: "gu-IN", label: "ગુજરાતી", text: "ચેતવણી! આ એક છેતરપિંડી નંબર છે. કૉલ ઑટો બ્લૉક થઈ ગયો છે." },
  { lang: "kn-IN", label: "ಕನ್ನಡ", text: "ಎಚ್ಚರಿಕೆ! ಇದು ವಂಚನೆ ಸಂಖ್ಯೆ. ಕರೆ ಸ್ವಯಂ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ." },
];

function detectUserLanguage(): number {
  const savedLang = localStorage.getItem("ss_language");
  if (savedLang) {
    const idx = fraudAnnouncements.findIndex((a) => a.lang === savedLang);
    if (idx >= 0) return idx;
  }
  const browserLang = navigator.language || (navigator as any).userLanguage || "en-US";
  const langPrefix = browserLang.toLowerCase().split("-")[0];
  const idx = fraudAnnouncements.findIndex((a) => a.lang.toLowerCase().startsWith(langPrefix));
  return idx >= 0 ? idx : 1;
}

function speakFraudWarning(onSpeaking?: (index: number) => void) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const idx = detectUserLanguage();
  onSpeaking?.(idx);
  const { lang, text } = fraudAnnouncements[idx];
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  utterance.pitch = 1.1;
  utterance.onend = () => onSpeaking?.(-1);
  utterance.onerror = () => onSpeaking?.(-1);
  window.speechSynthesis.speak(utterance);
}

type CallState = "idle" | "dialing" | "ringing" | "connected" | "ended" | "blocked";
type NumberStatus = "spam" | "suspicious" | "safe" | null;

export default function CallSimulatorPage() {
  const [number, setNumber] = useState("");
  const [callState, setCallState] = useState<CallState>("idle");
  const [numberStatus, setNumberStatus] = useState<NumberStatus>(null);
  const [blockedNumbers, setBlockedNumbers] = useState<string[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [speakingIndex, setSpeakingIndex] = useState(-1);

  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    timersRef.current = [];
  }, []);

  const addTimer = (id: number) => {
    timersRef.current.push(id);
  };

  useEffect(() => {
    return () => {
      clearTimers();
      window.speechSynthesis?.cancel();
    };
  }, [clearTimers]);

  const isBlocked = blockedNumbers.includes(number.trim());

  const handleCall = useCallback(() => {
    const trimmed = number.trim();
    if (!trimmed) {
      toast("❌ Enter a number!", { description: "Please enter a phone number to call." });
      return;
    }

    clearTimers();
    window.speechSynthesis?.cancel();
    setSpeakingIndex(-1);

    if (blockedNumbers.includes(trimmed)) {
      setCallState("blocked");
      setNumberStatus(null);
      toast("🚫 Number is Blocked!", { description: `${trimmed} has been blocked by you.` });
      return;
    }

    // Check spam database first
    const found = spamNumbers[trimmed];
    // Then check for company/prefix threats
    const threat = detectNumberThreat(trimmed);
    
    const status: NumberStatus = found?.status ?? (threat?.isSpam ? "spam" : "safe");
    const threatType = found?.type || threat?.type || "Unknown";
    setNumberStatus(status);
    setCallState("dialing");
    setCallDuration(0);

    addTimer(window.setTimeout(() => {
      if (status === "spam") {
        setCallState("ended");
        setBlockedNumbers((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
        const reason = threat?.reason ? `\n${threat.reason}` : "";
        toast("⚠️ Fraud Number Detected!", {
          description: `${trimmed} is a ${threatType} number. Call auto-blocked!${reason}`,
        });
        speakFraudWarning((idx) => setSpeakingIndex(idx));
      } else if (status === "suspicious") {
        setCallState("ringing");
        toast("⚠️ Suspicious Number!", {
          description: `${trimmed} has been reported as suspicious. Be careful!`,
        });
        addTimer(window.setTimeout(() => {
          setCallState("connected");
          addTimer(window.setInterval(() => setCallDuration((d) => d + 1), 1000));
        }, 1500));
      } else {
        setCallState("ringing");
        addTimer(window.setTimeout(() => {
          setCallState("connected");
          addTimer(window.setInterval(() => setCallDuration((d) => d + 1), 1000));
        }, 1500));
      }
    }, 2000));
  }, [number, blockedNumbers, clearTimers]);

  const handleEndCall = useCallback(() => {
    clearTimers();
    setCallState("ended");
  }, [clearTimers]);

  const handleBlockNumber = useCallback(() => {
    const trimmed = number.trim();
    if (!trimmed) return;
    if (!blockedNumbers.includes(trimmed)) {
      setBlockedNumbers((prev) => [...prev, trimmed]);
      toast("🚫 Number Blocked!", { description: `${trimmed} has been blocked successfully.` });
    }
  }, [number, blockedNumbers]);

  const handleUnblock = useCallback((num: string) => {
    setBlockedNumbers((prev) => prev.filter((n) => n !== num));
    toast("✅ Number Unblocked", { description: `${num} has been unblocked.` });
  }, []);

  const handleNewCall = useCallback(() => {
    clearTimers();
    window.speechSynthesis?.cancel();
    setSpeakingIndex(-1);
    setCallState("idle");
    setNumberStatus(null);
    setCallDuration(0);
  }, [clearTimers]);

  const formatDuration = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const statusConfig = {
    spam: { icon: ShieldX, label: "❌ Fraud Number!", bg: "bg-destructive/20 border-destructive" },
    suspicious: { icon: AlertTriangle, label: "⚠️ Suspicious Number", bg: "bg-warning/20 border-warning" },
    safe: { icon: ShieldCheck, label: "✅ Safe Number", bg: "bg-cyber-green/20 border-cyber-green" },
  };

  const canInteract = callState === "idle" || callState === "ended" || callState === "blocked";

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">📞 Call Simulator & Blocker</h1>
          <p className="text-muted-foreground mb-8">Enter a number, make a call – Fraud numbers get auto-blocked!</p>

          <div className="rounded-lg border border-border p-6 gradient-card mb-6">
            <div className="flex gap-3 mb-4">
              <Input
                placeholder="Enter phone number (e.g. +9111xxxx, 011xxxx, 140xxx)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canInteract) handleCall();
                }}
                className="bg-secondary border-border text-foreground font-mono"
                disabled={!canInteract}
              />
            </div>

            <div className="flex gap-3">
              {canInteract ? (
                <>
                  <Button onClick={handleCall} className="bg-cyber-green text-background hover:bg-cyber-green/90 flex-1">
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

              {callState === "blocked" && (
                <motion.div key="blocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-6 rounded-lg border p-6 bg-destructive/20 border-destructive text-center">
                  <Ban className="h-10 w-10 mx-auto mb-2 text-destructive" />
                  <h3 className="text-lg font-bold">🚫 Number Blocked!</h3>
                  <p className="text-sm text-muted-foreground mt-1">{number.trim()} पहले से block है।</p>
                  <Button size="sm" variant="outline" className="mt-3" onClick={handleNewCall}>
                    नया नंबर डालें
                  </Button>
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

                  {numberStatus === "spam" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Volume2 className="h-4 w-4 text-destructive animate-pulse" />
                        <span className="text-sm font-semibold text-destructive">🔊 AI Voice Alert</span>
                      </div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto">
                        {fraudAnnouncements.map((a, i) => (
                          <motion.div
                            key={a.lang}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex items-start gap-2 rounded-md border p-2 text-xs transition-colors ${
                              speakingIndex === i
                                ? "border-destructive bg-destructive/20 ring-1 ring-destructive"
                                : "border-border bg-secondary/50"
                            }`}
                          >
                            <span className="font-bold text-muted-foreground shrink-0 w-16">{a.label}</span>
                            <span className="text-foreground">{a.text}</span>
                            {speakingIndex === i && <Volume2 className="h-3 w-3 text-destructive animate-pulse shrink-0 mt-0.5" />}
                          </motion.div>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 w-full text-xs"
                        onClick={() => speakFraudWarning((idx) => setSpeakingIndex(idx))}
                      >
                        <Volume2 className="h-3 w-3 mr-1" /> फिर से सुनें / Replay Alert
                      </Button>
                    </motion.div>
                  )}

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
