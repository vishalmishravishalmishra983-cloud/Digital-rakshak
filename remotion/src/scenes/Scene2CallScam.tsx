import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";

const tips = [
  { icon: "📞", text: "Banks NEVER ask for OTP on calls" },
  { icon: "🚫", text: "No govt body demands money on phone" },
  { icon: "⚠️", text: "'Press 1' prompts are RED FLAGS" },
  { icon: "🔒", text: "Never share PIN, CVV, or Aadhaar" },
];

export const Scene2CallScam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgShift = interpolate(frame, [0, 150], [0, 15]);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${170 + bgShift}deg, #1e293b 0%, #0f172a 50%, #450a0a 100%)`,
      padding: 60, display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <Sequence from={0}>
        <div style={{
          fontSize: 42, fontWeight: 800, color: "#fca5a5",
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateX(${interpolate(spring({ frame, fps, config: { damping: 20 } }), [0, 1], [-50, 0])}px)`,
          marginBottom: 16, letterSpacing: 2, textTransform: "uppercase",
        }}>
          ⚠️ Call Scams
        </div>
        <div style={{
          width: 80, height: 4, background: "#ef4444", borderRadius: 2,
          opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" }),
          marginBottom: 50,
        }} />
      </Sequence>

      {tips.map((tip, i) => {
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
              background: "rgba(239,68,68,0.15)", borderRadius: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(239,68,68,0.3)",
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
