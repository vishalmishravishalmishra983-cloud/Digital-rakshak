import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: "cyan" | "green" | "red" | "yellow";
}

const colorMap = {
  cyan: "text-primary border-primary/30 bg-primary/5",
  green: "text-cyber-green border-cyber-green/30 bg-cyber-green/5",
  red: "text-cyber-red border-cyber-red/30 bg-cyber-red/5",
  yellow: "text-cyber-yellow border-cyber-yellow/30 bg-cyber-yellow/5",
};

export default function StatCard({ icon: Icon, label, value, color = "cyan" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border p-5 gradient-card ${colorMap[color]}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-5 w-5" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-3xl font-bold animate-count-up">{value}</p>
    </motion.div>
  );
}
