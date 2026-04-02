import { Link } from "react-router-dom";
import { Shield, Phone, MessageSquare, BarChart3, ArrowRight, Zap, Lock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Phone, title: "Number Checker", desc: "Check any number instantly – Spam or Safe", link: "/number-checker" },
  { icon: MessageSquare, title: "SMS Analyzer", desc: "Analyze SMS with AI and detect fraud messages", link: "/sms-analyzer" },
  { icon: BarChart3, title: "Dashboard", desc: "View real-time stats and threat analytics", link: "/dashboard" },
  { icon: Users, title: "Community Reports", desc: "Spam numbers reported by the community", link: "/reports" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 scan-line pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
              <Zap className="h-4 w-4" /> AI-Powered Cyber Security
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Digital </span>
              <span className="text-primary glow-text">Rakshak</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Smart Cyber Security System
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Protection from spam calls, fraud SMS & cyber threats – powered by AI & real-time analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-sm font-semibold">
                <Link to="/dashboard">
                  Dashboard देखें <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary">
                <Link to="/about">कैसे काम करता है?</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            मुख्य Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={f.link}
                  className="block rounded-lg border border-border p-6 gradient-card hover:border-primary/50 transition-all group"
                >
                  <f.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <Lock className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">आपका Data सुरक्षित है</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            सभी analysis local device पर होता है। कोई personal data cloud पर नहीं जाता।
          </p>
        </div>
      </section>
    </div>
  );
}
