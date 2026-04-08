import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";

const smsTips = [
  { icon: "🔗", text: "Shortened links = Danger sign" },
  { icon: "⏰", text: "'Urgent' + 'Account frozen' = Scam" },
  { icon: "🎁", text: "Free prizes asking for money = Fraud" },
  { icon: "✅", text: "Check official domains only" },
];

export const Scene3SmsScam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgShift = interpolate(frame, [0, 150], [0, 10]);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${155 + bgShift}deg, #0f172a 0%, #1e293b 40%, #713f12 100%)`,
      padding: 60, display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <div style={{
        fontSize: 42, fontWeight: 800, color: "#fbbf24",
        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateX(${interpolate(spring({ frame, fps, config: { damping: 20 } }), [0, 1], [-50, 0])}px)`,
        marginBottom: 16, letterSpacing: 2, textTransform: "uppercase",
      }}>
        💬 SMS Phishing
      </div>
      <div style={{
        width: 80, height: 4, background: "#f59e0b", borderRadius: 2,
        opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" }),
        marginBottom: 50,
      }} />

      {smsTips.map((tip, i) => {
        const delay = 20 + i * 22;
        const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });
        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 24,
            marginBottom: 28, opacity,
            transform: `translateX(${interpolate(s, [0, 1], [60, 0])}px)`,
          }}>
            <div style={{
              fontSize: 48, width: 80, height: 80,
              background: "rgba(245,158,11,0.15)", borderRadius: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(245,158,11,0.3)",
            }}>
              {tip.icon}
            </div>
            <div style={{ fontSize: 30, color: "#e2e8f0", fontWeight: 600, flex: 1 }}>
              {tip.text}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
