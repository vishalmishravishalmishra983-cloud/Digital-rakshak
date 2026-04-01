import { Shield, ArrowRight, Lock, Cpu, Database, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";

const flowSteps = [
  { icon: "📱", label: "Incoming Call/SMS" },
  { icon: "🗄️", label: "Database Check" },
  { icon: "🤖", label: "AI Analysis" },
  { icon: "✅❌", label: "Allow / Block" },
];

const archLayers = [
  { icon: Users, label: "User", desc: "Web interface" },
  { icon: Globe, label: "Web App", desc: "React frontend" },
  { icon: Cpu, label: "Detection Engine", desc: "AI + keyword analysis" },
  { icon: Database, label: "Database", desc: "Spam number records" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">🔍 How It Works</h1>
          <p className="text-muted-foreground mb-12">Digital Rakshak कैसे काम करता है – पूरा flow समझें</p>

          {/* Working Flow */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">Working Flow Diagram</h2>
            <div className="rounded-lg border border-border p-8 gradient-card">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {flowSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex flex-col items-center"
                    >
                      <div className="h-16 w-16 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center text-2xl mb-2">
                        {step.icon}
                      </div>
                      <span className="text-xs text-muted-foreground text-center max-w-[90px]">{step.label}</span>
                    </motion.div>
                    {i < flowSteps.length - 1 && (
                      <ArrowRight className="h-5 w-5 text-primary hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="rounded-lg border border-cyber-green/30 bg-cyber-green/10 p-4">
                  <p className="text-cyber-green font-semibold">✅ Safe → Allow</p>
                  <p className="text-xs text-muted-foreground mt-1">No threat detected, communication allowed</p>
                </div>
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                  <p className="text-destructive font-semibold">❌ Spam → Block</p>
                  <p className="text-xs text-muted-foreground mt-1">Threat detected, user alerted & blocked</p>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">System Architecture</h2>
            <div className="rounded-lg border border-border p-8 gradient-card">
              <div className="flex flex-col items-center gap-3">
                {archLayers.map((layer, i) => (
                  <motion.div
                    key={layer.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full max-w-md"
                  >
                    <div className="flex items-center gap-4 rounded-lg border border-border p-4 bg-secondary/30">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <layer.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{layer.label}</p>
                        <p className="text-xs text-muted-foreground">{layer.desc}</p>
                      </div>
                    </div>
                    {i < archLayers.length - 1 && (
                      <div className="flex justify-center py-1">
                        <div className="w-px h-4 bg-primary/40" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Explainability */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">🤖 AI Detection कैसे काम करता है?</h2>
            <div className="rounded-lg border border-border p-6 gradient-card space-y-4">
              <div className="rounded-md bg-secondary/50 p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Step 1: Keyword Detection</h4>
                <p className="text-xs text-muted-foreground">Messages में OTP, bank, lottery, prize जैसे fraud keywords खोजे जाते हैं</p>
              </div>
              <div className="rounded-md bg-secondary/50 p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Step 2: Pattern Analysis</h4>
                <p className="text-xs text-muted-foreground">URL patterns, urgency phrases, और suspicious formatting check होती है</p>
              </div>
              <div className="rounded-md bg-secondary/50 p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Step 3: Risk Score Calculation</h4>
                <p className="text-xs text-muted-foreground">हर keyword match से score बढ़ता है → Low / Medium / High risk assign होता है</p>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <div className="rounded-lg border border-primary/30 p-6 bg-primary/5 text-center">
              <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">Privacy Protection</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                आपका data सुरक्षित है। सभी analysis local browser में होता है।
                कोई personal information server पर store नहीं होती।
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
