import { motion } from "framer-motion";

interface RiskMeterProps {
  level: "low" | "medium" | "high";
  score: number; // 0-100
}

export default function RiskMeter({ level, score }: RiskMeterProps) {
  const colorClass = level === "low" ? "bg-cyber-green" : level === "medium" ? "bg-cyber-yellow" : "bg-cyber-red";
  const label = level === "low" ? "Low Risk ✅" : level === "medium" ? "Medium Risk ⚠️" : "High Risk ❌";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Risk Score</span>
        <span className="font-mono font-semibold text-foreground">{score}%</span>
      </div>
      <div className="h-3 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${colorClass}`}
        />
      </div>
      <p className="text-sm font-medium text-foreground">{label}</p>
    </div>
  );
}
