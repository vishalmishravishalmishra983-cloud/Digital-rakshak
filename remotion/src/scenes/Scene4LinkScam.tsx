import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const examples = [
  { url: "sbi-secure-login.xyz", fake: true },
  { url: "www.sbi.co.in", fake: false },
  { url: "googl-pay.in/claim", fake: true },
  { url: "pay.google.com", fake: false },
];

export const Scene4LinkScam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgShift = interpolate(frame, [0, 150], [0, 12]);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${165 + bgShift}deg, #0f172a 0%, #1e293b 40%, #14532d 100%)`,
      padding: 60, display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <div style={{
        fontSize: 42, fontWeight: 800, color: "#4ade80",
        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateX(${interpolate(spring({ frame, fps, config: { damping: 20 } }), [0, 1], [-50, 0])}px)`,
        marginBottom: 16, letterSpacing: 2, textTransform: "uppercase",
      }}>
        🔗 Fake Links
      </div>
      <div style={{
        width: 80, height: 4, background: "#22c55e", borderRadius: 2,
        opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" }),
        marginBottom: 50,
      }} />

      {examples.map((ex, i) => {
        const delay = 20 + i * 25;
        const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 20,
            marginBottom: 24, opacity,
            transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
            background: ex.fake ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
            border: `1px solid ${ex.fake ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`,
            borderRadius: 16, padding: "20px 28px",
          }}>
            <div style={{ fontSize: 36 }}>{ex.fake ? "❌" : "✅"}</div>
            <div style={{
              fontSize: 26, fontFamily: "monospace", color: "#e2e8f0", fontWeight: 500,
            }}>
              {ex.url}
            </div>
            <div style={{
              fontSize: 18, color: ex.fake ? "#fca5a5" : "#86efac",
              marginLeft: "auto", fontWeight: 700,
            }}>
              {ex.fake ? "FAKE" : "REAL"}
            </div>
          </div>
        );
      })}

      <div style={{
        fontSize: 24, color: "#94a3b8", marginTop: 30, textAlign: "center",
        opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        Always check: .gov.in, .co.in, official domains only
      </div>
    </AbsoluteFill>
  );
};
