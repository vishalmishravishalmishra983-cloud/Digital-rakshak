import { useState, useCallback } from "react";
import { GraduationCap, Phone, MessageSquare, Link2, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── Training Data ───────────────────────────────────────────────

const callScenarios = [
  {
    caller: "SBI Bank Manager",
    message: "Your account will be blocked in 2 hours. Share your OTP to verify your identity immediately.",
    isScam: true,
    explanation: "Banks never ask for OTP over phone. This is a classic impersonation scam.",
  },
  {
    caller: "Amazon Delivery",
    message: "Your order #4821 is out for delivery. It will arrive by 5 PM today.",
    isScam: false,
    explanation: "This is a normal delivery notification with no suspicious requests.",
  },
  {
    caller: "RBI Officer",
    message: "Your PAN is linked to money laundering. Transfer ₹50,000 to avoid arrest. Case number: RBI/2024/8832.",
    isScam: true,
    explanation: "RBI never calls individuals. No government body demands money over phone.",
  },
  {
    caller: "Insurance Agent",
    message: "Congratulations! You won a free insurance policy worth ₹10 Lakhs. Share your Aadhaar to claim.",
    isScam: true,
    explanation: "Unsolicited prize offers asking for Aadhaar are always scams.",
  },
  {
    caller: "Mom",
    message: "Beta, aaj dinner pe aa jaana. 8 baje tak aa jana.",
    isScam: false,
    explanation: "A normal personal call from family. No suspicious elements.",
  },
  {
    caller: "Customs Department",
    message: "A parcel in your name contains illegal items. Pay ₹25,000 fine or face arrest. Press 1 to connect.",
    isScam: true,
    explanation: "Customs never demands payment over phone. Press-1 prompts are a red flag.",
  },
];

const smsQuizzes = [
  {
    text: "Dear customer, your KYC is expired. Update now: http://bit.ly/3xKYC-update or your account will be frozen in 24hrs.",
    isScam: true,
    explanation: "Shortened links + urgency + KYC update request = classic phishing SMS.",
  },
  {
    text: "Your Flipkart order #FK-9821 has been shipped. Track: https://www.flipkart.com/track/FK9821",
    isScam: false,
    explanation: "Official domain (flipkart.com) and standard order notification.",
  },
  {
    text: "You won ₹50,00,000 in Jio Lucky Draw! Claim now by sending ₹500 registration fee to UPI: lucky@ybl",
    isScam: true,
    explanation: "No legitimate lottery asks for money to claim prizes.",
  },
  {
    text: "HDFC Bank: ₹15,000 debited from A/c XX4521. Not you? Call 1800-XXX-XXXX immediately.",
    isScam: false,
    explanation: "Standard bank debit alert with official helpline number.",
  },
  {
    text: "URGENT: Your WhatsApp will expire today! Verify now: http://whatsapp-verify.xyz/renew",
    isScam: true,
    explanation: "WhatsApp never expires. Suspicious domain (.xyz) is a phishing site.",
  },
  {
    text: "Your electricity bill of ₹3,240 is due. Pay before 15th to avoid disconnection. Visit: https://uppcl.org",
    isScam: false,
    explanation: "Official government domain and standard bill reminder.",
  },
];

const linkQuizzes = [
  { url: "https://www.sbi.co.in/personal-banking", isScam: false, explanation: "Official SBI domain." },
  { url: "http://sbi-secure-login.xyz/verify", isScam: true, explanation: "Fake domain (.xyz) mimicking SBI." },
  { url: "https://pay.google.com/send", isScam: false, explanation: "Official Google Pay domain." },
  { url: "http://googl-pay.in/claim-reward", isScam: true, explanation: "Misspelled domain (googl-pay) is phishing." },
  { url: "https://www.amazon.in/orders", isScam: false, explanation: "Official Amazon India domain." },
  { url: "http://amazon-prize-winner.com/claim", isScam: true, explanation: "Fake domain, Amazon doesn't run prize claims on external sites." },
  { url: "https://incometax.gov.in/refund", isScam: false, explanation: "Official government domain (.gov.in)." },
  { url: "http://income-tax-refund.online/apply", isScam: true, explanation: "Fake domain (.online), government sites use .gov.in." },
];

// ─── Types ───────────────────────────────────────────────────────

type Mode = "video" | "calls" | "sms" | "links";

interface QuizState {
  current: number;
  score: number;
  answered: boolean;
  userAnswer: boolean | null;
  finished: boolean;
}

const initialQuiz: QuizState = { current: 0, score: 0, answered: false, userAnswer: null, finished: false };

// ─── Component ───────────────────────────────────────────────────

export default function ScamTrainingPage() {
  const [mode, setMode] = useState<Mode>("video");
  const [quiz, setQuiz] = useState<Record<"calls" | "sms" | "links", QuizState>>({
    calls: { ...initialQuiz },
    sms: { ...initialQuiz },
    links: { ...initialQuiz },
  });

  const data = { calls: callScenarios, sms: smsQuizzes, links: linkQuizzes };
  
  // For video mode, skip quiz logic
  const quizMode = mode === "video" ? "calls" : mode;
  const q = quiz[quizMode];
  const items = data[quizMode];
  const item = items[q.current];

  const handleAnswer = useCallback((answer: boolean) => {
    const isCorrect = answer === (item as any).isScam;
    setQuiz((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        answered: true,
        userAnswer: answer,
        score: isCorrect ? prev[mode].score + 1 : prev[mode].score,
      },
    }));
  }, [mode, item]);

  const handleNext = useCallback(() => {
    setQuiz((prev) => {
      const next = prev[mode].current + 1;
      if (next >= items.length) {
        return { ...prev, [mode]: { ...prev[mode], finished: true } };
      }
      return { ...prev, [mode]: { ...prev[mode], current: next, answered: false, userAnswer: null } };
    });
  }, [mode, items.length]);

  const handleRestart = useCallback(() => {
    setQuiz((prev) => ({ ...prev, [mode]: { ...initialQuiz } }));
  }, [mode]);

  const isCorrect = q.answered && q.userAnswer === (item as any).isScam;
  const progress = ((q.current + (q.answered ? 1 : 0)) / items.length) * 100;

  const getGrade = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 90) return { label: "Expert", color: "bg-cyber-green text-background", emoji: "🏆" };
    if (pct >= 70) return { label: "Good", color: "bg-primary text-primary-foreground", emoji: "⭐" };
    if (pct >= 50) return { label: "Average", color: "bg-warning text-background", emoji: "📚" };
    return { label: "Needs Practice", color: "bg-destructive text-destructive-foreground", emoji: "⚠️" };
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Scam Training Mode</h1>
          </div>
          <p className="text-muted-foreground mb-6">Learn to identify scams through interactive quizzes. Test your skills!</p>

          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="calls" className="gap-1.5">
                <Phone className="h-4 w-4" /> Calls
              </TabsTrigger>
              <TabsTrigger value="sms" className="gap-1.5">
                <MessageSquare className="h-4 w-4" /> SMS
              </TabsTrigger>
              <TabsTrigger value="links" className="gap-1.5">
                <Link2 className="h-4 w-4" /> Links
              </TabsTrigger>
            </TabsList>

            {["calls", "sms", "links"].map((m) => (
              <TabsContent key={m} value={m}>
                <AnimatePresence mode="wait">
                  {quiz[m as Mode].finished ? (
                    <ResultCard
                      key="result"
                      score={quiz[m as Mode].score}
                      total={data[m as Mode].length}
                      grade={getGrade(quiz[m as Mode].score, data[m as Mode].length)}
                      onRestart={handleRestart}
                    />
                  ) : (
                    <QuizCard
                      key={`q-${quiz[m as Mode].current}`}
                      mode={m as Mode}
                      item={data[m as Mode][quiz[m as Mode].current]}
                      qState={quiz[m as Mode]}
                      total={data[m as Mode].length}
                      progress={m === mode ? progress : 0}
                      isCorrect={m === mode ? isCorrect : false}
                      onAnswer={handleAnswer}
                      onNext={handleNext}
                    />
                  )}
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function QuizCard({ mode, item, qState, total, progress, isCorrect, onAnswer, onNext }: {
  mode: Mode;
  item: any;
  qState: QuizState;
  total: number;
  progress: number;
  isCorrect: boolean;
  onAnswer: (v: boolean) => void;
  onNext: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="text-xs">
          Question {qState.current + 1} / {total}
        </Badge>
        <span className="text-sm font-semibold text-primary">Score: {qState.score}</span>
      </div>
      <Progress value={progress} className="mb-5 h-2" />

      <Card className="p-5 border-border gradient-card">
        {mode === "calls" && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Incoming call from: {item.caller}</span>
            </div>
            <div className="rounded-md bg-secondary/70 border border-border p-4 text-sm text-foreground italic">
              "{item.message}"
            </div>
          </>
        )}

        {mode === "sms" && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">SMS Received</span>
            </div>
            <div className="rounded-md bg-secondary/70 border border-border p-4 text-sm text-foreground">
              {item.text}
            </div>
          </>
        )}

        {mode === "links" && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Is this link safe?</span>
            </div>
            <div className="rounded-md bg-secondary/70 border border-border p-4 text-sm font-mono text-foreground break-all">
              {item.url}
            </div>
          </>
        )}

        {!qState.answered ? (
          <div className="flex gap-3 mt-5">
            <Button onClick={() => onAnswer(true)} variant="destructive" className="flex-1">
              🚨 Scam
            </Button>
            <Button onClick={() => onAnswer(false)} className="flex-1 bg-cyber-green text-background hover:bg-cyber-green/90">
              ✅ Safe
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
            <div className={`flex items-center gap-2 mb-2 ${isCorrect ? "text-cyber-green" : "text-destructive"}`}>
              {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              <span className="font-bold">{isCorrect ? "Correct! 🎉" : "Wrong! ❌"}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{item.explanation}</p>
            <Button onClick={onNext} className="w-full">
              {qState.current + 1 >= (mode === "calls" ? callScenarios.length : mode === "sms" ? smsQuizzes.length : linkQuizzes.length)
                ? "See Results"
                : "Next Question"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

function ResultCard({ score, total, grade, onRestart }: {
  score: number;
  total: number;
  grade: { label: string; color: string; emoji: string };
  onRestart: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <Card className="p-8 border-border gradient-card text-center">
        <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Training Complete!</h2>
        <div className="text-5xl font-bold text-primary my-4">{pct}%</div>
        <p className="text-muted-foreground mb-2">
          You got <span className="font-bold text-foreground">{score}</span> out of{" "}
          <span className="font-bold text-foreground">{total}</span> correct
        </p>
        <Badge className={`${grade.color} text-sm px-4 py-1 mb-6`}>
          {grade.emoji} {grade.label}
        </Badge>
        <div className="space-y-2">
          <Button onClick={onRestart} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" /> Try Again
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
