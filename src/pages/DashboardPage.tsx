import { ShieldCheck, ShieldX, AlertTriangle, Phone, MessageSquare, Activity } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";
import { recentAlerts } from "@/lib/spamData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const weeklyData = [
  { day: "Mon", blocked: 12, safe: 45 },
  { day: "Tue", blocked: 19, safe: 38 },
  { day: "Wed", blocked: 8, safe: 52 },
  { day: "Thu", blocked: 25, safe: 41 },
  { day: "Fri", blocked: 15, safe: 47 },
  { day: "Sat", blocked: 31, safe: 33 },
  { day: "Sun", blocked: 22, safe: 40 },
];

const pieData = [
  { name: "Spam Calls", value: 42 },
  { name: "Fraud SMS", value: 28 },
  { name: "Phishing", value: 18 },
  { name: "Others", value: 12 },
];
const COLORS = ["hsl(0,85%,55%)", "hsl(38,92%,55%)", "hsl(270,80%,60%)", "hsl(185,100%,50%)"];

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-8"
        >
          📊 Dashboard – Real-Time Overview
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={ShieldX} label="Blocked Spam Calls" value="1,247" color="red" />
          <StatCard icon={MessageSquare} label="Fraud SMS Detected" value="856" color="yellow" />
          <StatCard icon={ShieldCheck} label="Safe Communications" value="12,493" color="green" />
          <StatCard icon={AlertTriangle} label="Active Alerts" value="3" color="cyan" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-lg border border-border p-6 gradient-card">
            <h3 className="font-semibold text-foreground mb-4">Weekly Spam Activity</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,18%)" />
                <XAxis dataKey="day" stroke="hsl(215,20%,55%)" fontSize={12} />
                <YAxis stroke="hsl(215,20%,55%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(222,44%,9%)", border: "1px solid hsl(222,30%,18%)", borderRadius: 8, color: "hsl(210,40%,94%)" }} />
                <Bar dataKey="blocked" fill="hsl(0,85%,55%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="safe" fill="hsl(145,80%,42%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-border p-6 gradient-card">
            <h3 className="font-semibold text-foreground mb-4">Threat Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke="none">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(222,44%,9%)", border: "1px solid hsl(222,30%,18%)", borderRadius: 8, color: "hsl(210,40%,94%)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {pieData.map((d, i) => (
                <span key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  {d.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="rounded-lg border border-border p-6 gradient-card">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" /> Recent Alerts
          </h3>
          <div className="space-y-3">
            {recentAlerts.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-md border border-border p-3 bg-secondary/30">
                <div className="flex items-center gap-3">
                  {a.type === "call" ? <Phone className="h-4 w-4 text-muted-foreground" /> : <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                  <span className="font-mono text-sm text-foreground">{a.number}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      a.status === "blocked"
                        ? "bg-destructive/20 text-destructive"
                        : a.status === "safe"
                        ? "bg-cyber-green/20 text-cyber-green"
                        : "bg-warning/20 text-warning"
                    }`}
                  >
                    {a.status === "blocked" ? "❌ Blocked" : a.status === "safe" ? "✅ Safe" : "⚠️ Suspicious"}
                  </span>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
