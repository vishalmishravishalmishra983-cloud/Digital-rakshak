import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(spring({ frame, fps, config: { damping: 15 } }), [0, 1], [80, 0]);
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(spring({ frame: frame - 25, fps, config: { damping: 20 } }), [0, 1], [40, 0]);

  const shieldScale = spring({ frame: frame - 10, fps, config: { damping: 8, stiffness: 150 } });
  const shieldRotate = interpolate(frame, [10, 50], [-15, 0], { extrapolateRight: "clamp" });

  const bgGradient = interpolate(frame, [0, 120], [0, 20], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${160 + bgGradient}deg, #0f172a 0%, #1e293b 40%, #312e81 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 60,
    }}>
      <div style={{
        fontSize: 120, transform: `scale(${shieldScale}) rotate(${shieldRotate}deg)`,
        marginBottom: 40, filter: `drop-shadow(0 0 30px rgba(99,102,241,0.5))`,
      }}>
        🛡️
      </div>
      <div style={{
        fontSize: 64, fontWeight: 900, color: "#e2e8f0", textAlign: "center",
        transform: `translateY(${titleY}px)`, opacity: titleOpacity,
        lineHeight: 1.2, letterSpacing: -1,
      }}>
        <span style={{ color: "#818cf8" }}>Digital</span> Rakshak
      </div>
      <div style={{
        fontSize: 32, color: "#94a3b8", textAlign: "center", marginTop: 24,
        transform: `translateY(${subtitleY}px)`, opacity: subtitleOpacity,
        maxWidth: 800,
      }}>
        Scam Training Guide
      </div>

      <div style={{
        position: "absolute", bottom: 80,
        opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
        fontSize: 22, color: "#64748b", letterSpacing: 4, textTransform: "uppercase",
      }}>
        Learn • Identify • Protect
      </div>
    </AbsoluteFill>
  );
};
