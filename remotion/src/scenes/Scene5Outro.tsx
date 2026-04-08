import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldScale = spring({ frame: frame - 5, fps, config: { damping: 8, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(spring({ frame: frame - 15, fps, config: { damping: 15 } }), [0, 1], [50, 0]);

  const tagOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });

  const pulse = Math.sin(frame * 0.08) * 0.05 + 1;
  const bgGlow = interpolate(frame, [0, 90], [0, 30]);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${150 + bgGlow}deg, #0f172a 0%, #312e81 50%, #1e293b 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 60,
    }}>
      <div style={{
        fontSize: 140, transform: `scale(${shieldScale * pulse})`,
        filter: `drop-shadow(0 0 40px rgba(129,140,248,0.6))`,
        marginBottom: 40,
      }}>
        🛡️
      </div>

      <div style={{
        fontSize: 52, fontWeight: 900, color: "#e2e8f0", textAlign: "center",
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        lineHeight: 1.3,
      }}>
        Stay Alert,{"\n"}Stay <span style={{ color: "#818cf8" }}>Protected</span>
      </div>

      <div style={{
        fontSize: 28, color: "#94a3b8", textAlign: "center", marginTop: 30,
        opacity: tagOpacity, maxWidth: 700,
      }}>
        Practice scam detection in the Training Mode
      </div>

      <div style={{
        position: "absolute", bottom: 100,
        opacity: interpolate(frame, [60, 80], [0, 0.6], { extrapolateRight: "clamp" }),
        fontSize: 20, color: "#475569", letterSpacing: 3,
      }}>
        DIGITAL RAKSHAK
      </div>
    </AbsoluteFill>
  );
};
