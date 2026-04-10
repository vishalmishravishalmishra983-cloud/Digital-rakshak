import { useState, useCallback, useEffect, useRef } from "react";
import { GraduationCap, Phone, MessageSquare, Link2, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, PlayCircle, Volume2, VolumeX, Globe, Upload, X, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTrainingData, supportedLanguages, type LangCode } from "@/lib/trainingData";
import { speakText, stopSpeaking, createUtteranceInGesture } from "@/lib/voiceHelper";

type Mode = "video" | "calls" | "sms" | "links";

interface QuizState {
  current: number;
  score: number;
  answered: boolean;
  userAnswer: boolean | null;
  finished: boolean;
}

const initialQuiz: QuizState = { current: 0, score: 0, answered: false, userAnswer: null, finished: false };

// Detect browser language
function detectLang(): LangCode {
  const browserLang = navigator.language?.split("-")[0] || "en";
  const match = supportedLanguages.find((l) => l.code === browserLang);
  return match ? match.code : "en";
}

export default function ScamTrainingPage() {
  const [lang, setLang] = useState<LangCode>(detectLang);
  const [mode, setMode] = useState<Mode>("video");
  const [quiz, setQuiz] = useState<Record<"calls" | "sms" | "links", QuizState>>({
    calls: { ...initialQuiz },
    sms: { ...initialQuiz },
    links: { ...initialQuiz },
  });
  const [isSpeakingNow, setIsSpeakingNow] = useState(false);

  const { calls, sms, links, labels } = getTrainingData(lang);
  const data = { calls, sms, links };

  const quizMode = mode === "video" ? "calls" : mode;
  const q = quiz[quizMode];
  const items = data[quizMode];
  const item = items[q.current];

  // Reset quizzes when language changes
  useEffect(() => {
    setQuiz({ calls: { ...initialQuiz }, sms: { ...initialQuiz }, links: { ...initialQuiz } });
    stopSpeaking();
    setIsSpeakingNow(false);
  }, [lang]);

  // Stop speech on unmount
  useEffect(() => () => stopSpeaking(), []);

  const handleSpeak = useCallback((text: string) => {
    if (isSpeakingNow) {
      stopSpeaking();
      setIsSpeakingNow(false);
    } else {
      speakText(text, lang);
      setIsSpeakingNow(true);
      // Reset after speech ends
      const check = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsSpeakingNow(false);
          clearInterval(check);
        }
      }, 300);
    }
  }, [lang, isSpeakingNow]);

  const handleAnswer = useCallback((answer: boolean) => {
    if (mode === "video") return;
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
    // Voice feedback
    const feedbackText = isCorrect ? labels.correct : labels.wrong;
    speakText(feedbackText + " " + (item as any).explanation, lang);
    setIsSpeakingNow(true);
    const check = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        setIsSpeakingNow(false);
        clearInterval(check);
      }
    }, 300);
  }, [mode, item, lang, labels]);

  const handleNext = useCallback(() => {
    if (mode === "video") return;
    stopSpeaking();
    setIsSpeakingNow(false);
    setQuiz((prev) => {
      const next = prev[mode].current + 1;
      if (next >= items.length) {
        return { ...prev, [mode]: { ...prev[mode], finished: true } };
      }
      return { ...prev, [mode]: { ...prev[mode], current: next, answered: false, userAnswer: null } };
    });
  }, [mode, items.length]);

  const handleRestart = useCallback(() => {
    if (mode === "video") return;
    setQuiz((prev) => ({ ...prev, [mode]: { ...initialQuiz } }));
  }, [mode]);

  const isCorrect = q.answered && q.userAnswer === (item as any).isScam;
  const progress = ((q.current + (q.answered ? 1 : 0)) / items.length) * 100;

  const getGrade = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 90) return { label: labels.expert, color: "bg-cyber-green text-background", emoji: "🏆" };
    if (pct >= 70) return { label: labels.good, color: "bg-primary text-primary-foreground", emoji: "⭐" };
    if (pct >= 50) return { label: labels.average, color: "bg-warning text-background", emoji: "📚" };
    return { label: labels.needsPractice, color: "bg-destructive text-destructive-foreground", emoji: "⚠️" };
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header with Language Selector */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{labels.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Select value={lang} onValueChange={(v) => setLang(v as LangCode)}>
                <SelectTrigger className="w-[130px] h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {supportedLanguages.map((l) => (
                    <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">{labels.subtitle}</p>

          <Tabs value={mode} onValueChange={(v) => { setMode(v as Mode); stopSpeaking(); setIsSpeakingNow(false); }}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="video" className="gap-1.5">
                <PlayCircle className="h-4 w-4" /> Video
              </TabsTrigger>
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

            <TabsContent value="video">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <VideoTrainingSection labels={labels} />
              </motion.div>
            </TabsContent>

            {(["calls", "sms", "links"] as const).map((m) => (
              <TabsContent key={m} value={m}>
                <AnimatePresence mode="wait">
                  {quiz[m].finished ? (
                    <ResultCard
                      key="result"
                      score={quiz[m].score}
                      total={data[m].length}
                      grade={getGrade(quiz[m].score, data[m].length)}
                      onRestart={handleRestart}
                      labels={labels}
                    />
                  ) : (
                    <QuizCard
                      key={`q-${quiz[m].current}`}
                      mode={m}
                      item={data[m][quiz[m].current]}
                      qState={quiz[m]}
                      total={data[m].length}
                      progress={m === mode ? progress : 0}
                      isCorrect={m === mode ? isCorrect : false}
                      onAnswer={handleAnswer}
                      onNext={handleNext}
                      onSpeak={handleSpeak}
                      isSpeaking={isSpeakingNow}
                      labels={labels}
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

function QuizCard({ mode, item, qState, total, progress, isCorrect, onAnswer, onNext, onSpeak, isSpeaking, labels }: {
  mode: "calls" | "sms" | "links";
  item: any;
  qState: QuizState;
  total: number;
  progress: number;
  isCorrect: boolean;
  onAnswer: (v: boolean) => void;
  onNext: () => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
  labels: ReturnType<typeof getTrainingData>["labels"];
}) {
  const getQuizText = () => {
    if (mode === "calls") return `${item.caller}: ${item.message}`;
    if (mode === "sms") return item.text;
    return item.url;
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="text-xs">
          {labels.question} {qState.current + 1} / {total}
        </Badge>
        <span className="text-sm font-semibold text-primary">{labels.score}: {qState.score}</span>
      </div>
      <Progress value={progress} className="mb-5 h-2" />

      <Card className="p-5 border-border gradient-card">
        {mode === "calls" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{labels.incomingCall}: {item.caller}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onSpeak(getQuizText())} className="h-8 w-8">
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            <div className="rounded-md bg-secondary/70 border border-border p-4 text-sm text-foreground italic">
              "{item.message}"
            </div>
          </>
        )}

        {mode === "sms" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{labels.smsReceived}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onSpeak(getQuizText())} className="h-8 w-8">
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            <div className="rounded-md bg-secondary/70 border border-border p-4 text-sm text-foreground">
              {item.text}
            </div>
          </>
        )}

        {mode === "links" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{labels.isLinkSafe}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onSpeak(getQuizText())} className="h-8 w-8">
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            <div className="rounded-md bg-secondary/70 border border-border p-4 text-sm font-mono text-foreground break-all">
              {item.url}
            </div>
          </>
        )}

        {!qState.answered ? (
          <div className="flex gap-3 mt-5">
            <Button onClick={() => onAnswer(true)} variant="destructive" className="flex-1">
              {labels.scamBtn}
            </Button>
            <Button onClick={() => onAnswer(false)} className="flex-1 bg-cyber-green text-background hover:bg-cyber-green/90">
              {labels.safeBtn}
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
            <div className={`flex items-center gap-2 mb-2 ${isCorrect ? "text-cyber-green" : "text-destructive"}`}>
              {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              <span className="font-bold">{isCorrect ? labels.correct : labels.wrong}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{item.explanation}</p>
            <Button onClick={onNext} className="w-full">
              {qState.current + 1 >= total ? labels.seeResults : labels.nextQuestion}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

function ResultCard({ score, total, grade, onRestart, labels }: {
  score: number;
  total: number;
  grade: { label: string; color: string; emoji: string };
  onRestart: () => void;
  labels: ReturnType<typeof getTrainingData>["labels"];
}) {
  const pct = Math.round((score / total) * 100);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <Card className="p-8 border-border gradient-card text-center">
        <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">{labels.trainingComplete}</h2>
        <div className="text-5xl font-bold text-primary my-4">{pct}%</div>
        <p className="text-muted-foreground mb-2">
          {labels.youGot} <span className="font-bold text-foreground">{score}</span> {labels.outOf}{" "}
          <span className="font-bold text-foreground">{total}</span>
        </p>
        <Badge className={`${grade.color} text-sm px-4 py-1 mb-6`}>
          {grade.emoji} {grade.label}
        </Badge>
        <div className="space-y-2">
          <Button onClick={onRestart} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" /> {labels.tryAgain}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Video Training with Upload ──────────────────────────────────

interface UploadedVideo {
  name: string;
  url: string;
}

function VideoTrainingSection({ labels }: { labels: ReturnType<typeof getTrainingData>["labels"] }) {
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>(() => {
    try {
      const saved = localStorage.getItem("training-videos");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [activeVideo, setActiveVideo] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("training-videos", JSON.stringify(uploadedVideos));
  }, [uploadedVideos]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("video/")) return;
      const url = URL.createObjectURL(file);
      setUploadedVideos((prev) => [...prev, { name: file.name, url }]);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (idx: number) => {
    setUploadedVideos((prev) => {
      const removed = prev[idx];
      if (activeVideo === removed.url) setActiveVideo("");
      URL.revokeObjectURL(removed.url);
      return prev.filter((_, i) => i !== idx);
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Video Player */}
      <Card className="p-5 border-border gradient-card">
        <div className="flex items-center gap-2 mb-4">
          <PlayCircle className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">{labels.videoTitle}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{labels.videoSubtitle}</p>
        {activeVideo ? (
          <div className="rounded-lg overflow-hidden border border-border bg-secondary">
            <video key={activeVideo} src={activeVideo} controls className="w-full" style={{ maxHeight: 500 }}>
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-secondary/50 flex flex-col items-center justify-center py-16 gap-3">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Upload a video to start training</p>
            <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-1" /> Choose File
            </Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-3 text-center">{labels.videoAfter}</p>
      </Card>

      {/* Upload Section */}
      <Card className="p-5 border-border gradient-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Upload Training Video</h3>
          </div>
          <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4 mr-1" /> Choose File
          </Button>
          <input ref={fileInputRef} type="file" accept="video/*" multiple className="hidden" onChange={handleUpload} />
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Upload your own scam awareness videos (MP4, WebM, etc.) to train yourself or your family.
        </p>

        {/* Video List */}
        <div className="space-y-2">

          {/* Uploaded videos */}
          {uploadedVideos.map((v, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-md border transition-colors ${
                activeVideo === v.url
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-secondary/50"
              }`}
            >
              <button onClick={() => setActiveVideo(v.url)} className="flex items-center gap-3 flex-1 text-left min-w-0">
                <Film className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-foreground truncate">{v.name}</span>
              </button>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => handleRemove(i)}>
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
