import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#080810", bg2: "#0d0d1a", bg3: "#111128",
  border: "rgba(168,85,247,0.18)", border2: "rgba(168,85,247,0.08)",
  purple: "#a855f7", purpleDeep: "#7c3aed", purpleLight: "#c084fc",
  pink: "#e879f9", text: "#f0ecff", text2: "rgba(240,236,255,0.55)",
  text3: "rgba(240,236,255,0.28)", green: "#34d399", red: "#f87171", amber: "#fbbf24"
};

const LINKS = {
  explorer: "https://chainscan-galileo.0g.ai",
  storage: "https://storagescan-newton.0g.ai",
  compute: "https://0g.ai",
  github: "https://github.com/DingiDingi/wraith",
};

const useAnimatedNumber = (target, duration = 1500) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const clean = parseInt(target.toString().replace(/,/g, ""));
    const step = clean / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= clean) { setVal(clean); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [target]);
  return val.toLocaleString();
};

const useInView = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Toast = ({ msg, show }) => (
  <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, background: "rgba(13,13,26,0.97)", border: `1px solid rgba(168,85,247,0.4)`, borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text, transform: show ? "translateY(0)" : "translateY(20px)", opacity: show ? 1 : 0, transition: "all 0.3s ease", pointerEvents: "none", backdropFilter: "blur(20px)" }}>
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.purple, boxShadow: `0 0 8px ${C.purple}`, flexShrink: 0 }} />{msg}
  </div>
);

const Badge = ({ type }) => {
  const s = { sealed: { color: C.purpleLight, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)" }, verified: { color: C.green, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)" }, pending: { color: C.amber, background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)" }, shattered: { color: C.red, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)" } };
  return <span style={{ fontFamily: "Space Mono,monospace", fontSize: 8, letterSpacing: 1, padding: "3px 8px", borderRadius: 20, display: "inline-block", ...s[type] }}>{type.toUpperCase()}</span>;
};

const Card = ({ children, style, delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ background: "rgba(13,13,26,0.9)", border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px", position: "relative", overflow: "hidden", transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", ...style }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${C.purple},transparent)` }} />
      {children}
    </div>
  );
};

const AnimatedBar = ({ width, color, delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ height: "100%", width: inView ? `${width}%` : "0%", background: color || `linear-gradient(90deg,${C.purpleDeep},${C.purpleLight})`, borderRadius: 4, transition: `width 1.2s ease ${delay}ms` }} />
  );
};

const AnimatedStatCard = ({ label, value, unit, sub, subColor, delay = 0 }) => {
  const num = useAnimatedNumber(value);
  return (
    <Card delay={delay}>
      <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 2, color: C.text3, textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: -1.5, lineHeight: 1 }}>{num}<span style={{ fontSize: 13, fontWeight: 400, color: C.text3, marginLeft: 2 }}>{unit}</span></div>
      <div style={{ fontSize: 11, color: subColor || C.text3, marginTop: 6 }}>{sub}</div>
    </Card>
  );
};

// HERO LANDING
function Hero({ onEnter }) {
  const [angle, setAngle] = useState(0);
  const [angle2, setAngle2] = useState(120);
  const [angle3, setAngle3] = useState(240);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle(a => (a + 0.4) % 360);
      setAngle2(a => (a - 0.3 + 360) % 360);
      setAngle3(a => (a + 0.18) % 360);
      setTick(t => t + 1);
    }, 16);
    return () => clearInterval(id);
  }, []);

  const bead = (angle, r, color, size = 10) => {
    const x = Math.cos((angle * Math.PI) / 180) * r;
    const y = Math.sin((angle * Math.PI) / 180) * r;
    return <div style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: color, boxShadow: `0 0 14px ${color}`, top: "50%", left: "50%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }} />;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", background: C.bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(168,85,247,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%,rgba(168,85,247,0.15) 0%,transparent 70%)" }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 32px" }}>
        <div style={{ fontFamily: "Space Mono,monospace", fontSize: 11, letterSpacing: 4, color: C.purpleLight, textTransform: "uppercase", marginBottom: 24, opacity: 0.8 }}>Proof of Silence Protocol</div>

        <h1 style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3, color: "#fff", marginBottom: 12, maxWidth: 700 }}>
          Your silence<br />is your <span style={{ color: C.purple }}>reputation.</span>
        </h1>

        <p style={{ fontSize: 16, color: C.text2, maxWidth: 520, lineHeight: 1.7, marginBottom: 48 }}>
          WRAITH generates cryptographic Silence Proofs every time your agent handles sensitive data without leaking it — stored permanently on 0G, sealed by TEE.
        </p>

        <div style={{ width: 260, height: 260, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 48 }}>
          {[130, 97, 65].map((r, i) => (
            <div key={i} style={{ position: "absolute", width: r * 2, height: r * 2, borderRadius: "50%", border: `1px solid rgba(168,85,247,${0.15 + i * 0.1})` }} />
          ))}
          {bead(angle, 130, C.purple)}
          {bead(angle2, 97, C.green, 9)}
          {bead(angle3, 65, C.red, 8)}
          <div style={{ position: "absolute", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%,${C.purpleLight},${C.purpleDeep})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: `0 0 ${30 + Math.sin(tick * 0.05) * 12}px rgba(168,85,247,${0.6 + Math.sin(tick * 0.05) * 0.2})` }}>👁</div>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, color: C.purpleLight, letterSpacing: 2 }}>AGENT-001</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
          <button onClick={onEnter} style={{ padding: "14px 36px", borderRadius: 10, fontSize: 15, fontWeight: 700, color: "#fff", background: `linear-gradient(135deg,${C.purpleDeep},${C.purpleLight})`, border: "none", cursor: "pointer", letterSpacing: 0.3, transition: "opacity 0.2s" }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}>
            Open Dashboard →
          </button>
          <button onClick={() => window.open(LINKS.explorer, "_blank")} style={{ padding: "14px 36px", borderRadius: 10, fontSize: 15, fontWeight: 600, color: C.text2, background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.borderColor = C.purple; e.target.style.color = C.purpleLight; }}
            onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.text2; }}>
            0G Explorer ↗
          </button>
        </div>

        <div style={{ display: "flex", gap: 32 }}>
          {[["142", "Silence Proofs"], ["0", "Leaks"], ["87/100", "Silence Score"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>{v}</div>
              <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, color: C.text3, letterSpacing: 1, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "bounce 2s ease-in-out infinite" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, animation: "slideRight 1.5s ease-in-out infinite" }}>
  <div style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: C.text3, letterSpacing: 1 }}>Open Dashboard</div>
  <div style={{ fontSize: 16, color: C.purple }}>→</div>
</div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ toast }) {
  const [angle, setAngle] = useState(0);
  const [angle2, setAngle2] = useState(120);
  const [angle3, setAngle3] = useState(240);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle(a => (a + 0.5) % 360);
      setAngle2(a => (a - 0.35 + 360) % 360);
      setAngle3(a => (a + 0.2) % 360);
      setTick(t => t + 1);
    }, 16);
    return () => clearInterval(id);
  }, []);

  const bead = (angle, r, color, size = 9) => {
    const x = Math.cos((angle * Math.PI) / 180) * r;
    const y = Math.sin((angle * Math.PI) / 180) * r;
    return <div style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}`, top: "50%", left: "50%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }} />;
  };

  const bars = [40, 60, 50, 80, 65, 90, 75, 100];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ width: 200, height: 200, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            {[100, 75, 50].map((r, i) => (
              <div key={i} style={{ position: "absolute", width: r * 2, height: r * 2, borderRadius: "50%", border: `1px solid rgba(168,85,247,${0.2 + i * 0.1})` }} />
            ))}
            {bead(angle, 100, C.purple)}
            {bead(angle2, 75, C.green, 8)}
            {bead(angle3, 50, C.red, 7)}
            <div style={{ position: "absolute", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%,${C.purpleLight},${C.purpleDeep})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: `0 0 ${20 + Math.sin(tick * 0.05) * 10}px rgba(168,85,247,${0.6 + Math.sin(tick * 0.05) * 0.2})` }}>👁</div>
              <div style={{ fontFamily: "Space Mono,monospace", fontSize: 8, color: C.purpleLight, letterSpacing: 2 }}>AGENT-001</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%", marginBottom: 16 }}>
            {[["142", "Proofs"], ["0", "Leaks"], ["1,847", "Events"], ["98%", "TEE"]].map(([v, l]) => (
              <div key={l} style={{ background: "rgba(168,85,247,0.07)", border: `1px solid ${C.border2}`, borderRadius: 8, padding: 10, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{v}</div>
                <div style={{ fontFamily: "Space Mono,monospace", fontSize: 8, color: C.text3, textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ fontSize: 11, color: C.text3 }}>SILENCE SCORE</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.purpleLight, letterSpacing: -1 }}>87</div>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
              <AnimatedBar width={87} />
            </div>
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <AnimatedStatCard label="Sealed Proofs" value={142} unit=" proofs" sub="+12 this epoch" subColor={C.green} delay={0} />
          <AnimatedStatCard label="Events Handled" value={1847} unit=" total" sub="0 leaks detected" delay={100} />
          <AnimatedStatCard label="TEE Executions" value={98} unit="%" sub="Hardware verified" subColor={C.green} delay={200} />
          <AnimatedStatCard label="Global Rank" value={7} sub="Top 5% of agents" delay={300} />
          <Card style={{ gridColumn: "1/-1" }} delay={400}>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 2, color: C.text3, textTransform: "uppercase", marginBottom: 12 }}>Proof Activity — Last 8 Epochs</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 48, marginBottom: 12 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, background: i === 7 ? C.purple : "rgba(168,85,247,0.25)", borderRadius: "2px 2px 0 0", height: `${h}%`, transition: `height 0.8s ease ${i * 80}ms`, cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.background = C.purple}
                  onMouseLeave={e => e.target.style.background = i === 7 ? C.purple : "rgba(168,85,247,0.25)"} />
              ))}
            </div>
            {[
              { color: C.purple, text: "Wallet correlation withheld — 0G Storage sealed", time: "2m ago" },
              { color: C.green, text: "TEE execution verified — proof SPF-0x9b1d", time: "8m ago" },
              { color: C.purple, text: "Agent ID metadata encrypted on-chain", time: "14m ago" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "rgba(168,85,247,0.05)", borderRadius: 8, border: `1px solid ${C.border2}`, marginBottom: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: item.color, boxShadow: `0 0 6px ${item.color}`, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: C.text2, flex: 1 }}>{item.text}</div>
                <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, color: C.text3 }}>{item.time}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

function Proofs({ toast }) {
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const proofs = [
    { hash: "SPF-0x7a3f...c12e", desc: "Wallet correlation withheld", time: "2m ago", status: "sealed" },
    { hash: "SPF-0x9b1d...f88a", desc: "Trading intent concealed", time: "8m ago", status: "verified" },
    { hash: "SPF-0x2c4e...a347", desc: "Identity fragment protected", time: "14m ago", status: "sealed" },
    { hash: "SPF-0xd9f2...0b6c", desc: "Cross-chain state hidden", time: "31m ago", status: "pending" },
    { hash: "SPF-0xe8a1...7c3d", desc: "MEV signal suppressed", time: "47m ago", status: "verified" },
    { hash: "SPF-0xb2f5...9a1e", desc: "Agent ID metadata exposed", time: "2h ago", status: "shattered" },
    { hash: "SPF-0x5d3c...4f8b", desc: "Inference query privatised", time: "3h ago", status: "verified" },
  ];
  const dotColor = { sealed: C.purple, verified: C.green, pending: C.amber, shattered: C.red };
  const filtered = filter === "all" ? proofs : proofs.filter(p => p.status === filter);

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.4s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[["Total Proofs", 142, C.purpleLight, 0], ["Verified", 118, C.green, 100], ["Pending", 21, C.amber, 200], ["Shattered", 3, C.red, 300]].map(([l, v, c, d]) => (
          <Card key={l} style={{ padding: "14px 16px" }} delay={d}>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 2, color: C.text3, textTransform: "uppercase", marginBottom: 10 }}>{l}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: c }}>{v}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {["all", "sealed", "verified", "pending", "shattered"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 1, padding: "4px 10px", borderRadius: 20, cursor: "pointer", border: `1px solid ${filter === f ? "rgba(168,85,247,0.3)" : C.border}`, color: filter === f ? C.purpleLight : C.text3, background: filter === f ? "rgba(168,85,247,0.15)" : "transparent", transition: "all 0.2s" }}>{f.toUpperCase()}</button>
        ))}
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "18px 180px 1fr 100px 90px", gap: 12, padding: "10px 16px", borderBottom: `1px solid ${C.border2}`, fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 1, color: C.text3, textTransform: "uppercase" }}>
          <div /><div>Hash</div><div>Event</div><div>Time</div><div>Status</div>
        </div>
        {filtered.map((p, i) => (
          <div key={i} onClick={() => window.open(LINKS.explorer, "_blank")}
            style={{ display: "grid", gridTemplateColumns: "18px 180px 1fr 100px 90px", gap: 12, padding: "12px 16px", borderBottom: `1px solid ${C.border2}`, alignItems: "center", cursor: "pointer", transition: "all 0.2s", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-12px)", transitionDelay: `${i * 60}ms` }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(168,85,247,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor[p.status], boxShadow: `0 0 6px ${dotColor[p.status]}` }} />
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: C.purpleLight }}>{p.hash}</div>
            <div style={{ fontSize: 12, color: C.text2 }}>{p.desc}</div>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: C.text3 }}>{p.time}</div>
            <Badge type={p.status} />
          </div>
        ))}
      </Card>
    </div>
  );
}

function AgentID({ toast }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const bars = [
    { label: "Silence Consistency", val: 94, color: C.purpleLight },
    { label: "TEE Compliance", val: 98, color: C.green },
    { label: "0G Storage Integrity", val: 100, color: C.purpleLight },
  ];
  const tees = [
    { name: "Hardware Enclave", on: true }, { name: "0G Compute Node", on: true },
    { name: "Sealed Inference", on: true }, { name: "AI Alignment Monitor", on: true },
    { name: "Proof Generation", on: true }, { name: "Model Drift Detection", on: false },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <Card delay={0}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(168,85,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>👁</div>Identity Record
        </div>
        {[["Agent ID Token", "#001", true], ["Owner Address", "0x7a3fc8d9e2b14f5a912c0d3e8f67b1a4c92d5e3f", false], ["Metadata Hash", "Qm7xR4pL9mN2kFvA8cYjW3zB6hU1qS5dE0tK...", false]].map(([l, v, big]) => (
          <div key={l} style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 1.5, color: C.text3, textTransform: "uppercase", marginBottom: 4 }}>{l}</div>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: big ? 13 : 11, color: big ? "#fff" : C.purpleLight, background: "rgba(168,85,247,0.08)", padding: "8px 10px", borderRadius: 6, border: `1px solid ${C.border2}`, wordBreak: "break-all" }}>{v}</div>
          </div>
        ))}
        <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 1.5, color: C.text3, textTransform: "uppercase", marginBottom: 8 }}>Traits</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[["Privacy-First", C.green], ["TEE-Verified", C.purpleLight], ["High-Freq", C.amber], ["0G Native", C.purpleLight]].map(([t, c], idx) => (
            <span key={t} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "rgba(168,85,247,0.1)", color: c, border: "1px solid rgba(168,85,247,0.2)", opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.8)", transition: `all 0.3s ease ${idx * 80}ms` }}>{t}</span>
          ))}
        </div>
      </Card>

      <Card delay={100}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(168,85,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>🔒</div>TEE Execution Status
        </div>
        {tees.map((t, idx) => (
          <div key={t.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "rgba(168,85,247,0.04)", border: `1px solid ${C.border2}`, borderRadius: 8, marginBottom: 6, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transition: `all 0.4s ease ${idx * 60}ms` }}>
            <div style={{ fontSize: 12, color: C.text2 }}>{t.name}</div>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: t.on ? C.green : C.text3 }}>{t.on ? "● Active" : "○ Standby"}</div>
          </div>
        ))}
      </Card>

      <Card delay={200}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Reputation Breakdown</div>
        {bars.map((b, idx) => (
          <div key={b.label} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.text2, marginBottom: 4 }}><span>{b.label}</span><span style={{ color: b.color }}>{b.val}%</span></div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
              <AnimatedBar width={b.val} color={b.color} delay={idx * 150} />
            </div>
          </div>
        ))}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.text2, marginBottom: 4 }}><span>Leak Incidents</span><span style={{ color: C.red }}>3 / 1,847</span></div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
            <AnimatedBar width={2} color={C.red} delay={450} />
          </div>
        </div>
      </Card>

      <Card delay={300}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16 }}>On-Chain Links</div>
        {[
          ["0G Explorer → Contract", LINKS.explorer],
          ["0G Storage → Proofs", LINKS.storage],
          ["0G Compute → TEE Log", LINKS.compute],
        ].map(([label, url], idx) => (
          <div key={label} onClick={() => window.open(url, "_blank")}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "rgba(168,85,247,0.04)", border: `1px solid ${C.border2}`, borderRadius: 8, marginBottom: 6, cursor: "pointer", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: `all 0.4s ease ${idx * 80}ms` }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(168,85,247,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(168,85,247,0.04)"}>
            <div style={{ fontSize: 12, color: C.text2 }}>{label}</div>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: C.purpleLight }}>↗</div>
          </div>
        ))}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, color: C.text3, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Mint Date</div>
          <div style={{ fontFamily: "Space Mono,monospace", fontSize: 11, color: C.text2 }}>2026-03-22 · Block #4,219,843</div>
        </div>
      </Card>
    </div>
  );
}

function Leaderboard({ toast }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const agents = [
    { rank: 1, emoji: "🏆", name: "SPECTER-Ω", addr: "0x4a9f...e2c1", score: 99, proofs: 289, leaks: 0, bg: "linear-gradient(135deg,#fbbf24,#f97316)" },
    { rank: 2, emoji: "🤖", name: "NULL-VOID", addr: "0x9c2d...7b4a", score: 96, proofs: 241, leaks: 0, bg: "linear-gradient(135deg,#94a3b8,#64748b)" },
    { rank: 3, emoji: "⚡", name: "PHANTOM-X", addr: "0x1f8e...3d7c", score: 93, proofs: 198, leaks: 1, bg: "linear-gradient(135deg,#cd7c4a,#92400e)" },
    { rank: 4, emoji: "🔮", name: "WRAITH-7", addr: "0xb3c1...9f2e", score: 91, proofs: 174, leaks: 1, bg: `linear-gradient(135deg,${C.purpleDeep},#4c1d95)` },
    { rank: 5, emoji: "🌿", name: "CIPHER-NULL", addr: "0xe4a7...0c3b", score: 89, proofs: 162, leaks: 2, bg: "linear-gradient(135deg,#059669,#064e3b)" },
    { rank: 7, emoji: "👁", name: "AGENT-001 (You)", addr: "0x7a3f...c12e", score: 87, proofs: 142, leaks: 3, bg: `linear-gradient(135deg,${C.purpleDeep},${C.pink})`, isYou: true },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Global Silence Leaderboard</div>
          <div style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: C.text3 }}>Epoch 14 · 3d 8h remaining</div>
        </div>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 80px 80px 60px", gap: 12, padding: "10px 16px", borderBottom: `1px solid ${C.border2}`, fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 1, color: C.text3, textTransform: "uppercase" }}>
            <div style={{ textAlign: "center" }}>Rank</div><div>Agent</div><div>Score</div><div>Proofs</div><div>Leaks</div>
          </div>
          {agents.map((a, i) => (
            <div key={i} onClick={() => toast(`Viewing ${a.name} profile`)}
              style={{ display: "grid", gridTemplateColumns: "40px 1fr 80px 80px 60px", gap: 12, padding: "13px 16px", borderBottom: `1px solid ${C.border2}`, alignItems: "center", cursor: "pointer", background: a.isYou ? "rgba(168,85,247,0.07)" : "transparent", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `all 0.4s ease ${i * 80}ms` }}
              onMouseEnter={e => !a.isYou && (e.currentTarget.style.background = "rgba(168,85,247,0.04)")}
              onMouseLeave={e => !a.isYou && (e.currentTarget.style.background = "transparent")}>
              <div style={{ fontFamily: "Space Mono,monospace", fontSize: 13, fontWeight: 700, textAlign: "center", color: a.rank === 1 ? C.amber : a.rank === 2 ? "#94a3b8" : a.rank === 3 ? "#cd7c4a" : a.isYou ? C.purpleLight : C.text3 }}>{a.rank}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{a.emoji}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: a.isYou ? C.purpleLight : "#fff" }}>{a.name}</div>
                  <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, color: C.text3 }}>{a.addr}</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.purpleLight }}>{a.score}</div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginTop: 3, overflow: "hidden" }}>
                  <AnimatedBar width={a.score} delay={i * 80} />
                </div>
              </div>
              <div style={{ fontFamily: "Space Mono,monospace", fontSize: 11, color: C.text2 }}>{a.proofs}</div>
              <div><Badge type={a.leaks === 0 ? "verified" : a.leaks <= 1 ? "pending" : "shattered"} /></div>
            </div>
          ))}
        </Card>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card delay={200}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Epoch 14 Progress</div>
          {[["Time remaining", "3d 8h 22m"], ["Your proofs this epoch", "12"], ["Epoch reward pool", "500 0G"], ["Your projected reward", "~38 0G"]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: C.text2 }}>{l}</div>
              <div style={{ fontFamily: "Space Mono,monospace", fontSize: 12, color: C.purpleLight }}>{v}</div>
            </div>
          ))}
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden", marginTop: 4 }}>
            <AnimatedBar width={67} color={`linear-gradient(90deg,${C.purpleDeep},${C.pink})`} delay={300} />
          </div>
        </Card>
        <Card delay={300}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Top Awards</div>
          {[["🥇", "SPECTER-Ω", "200 0G"], ["🥈", "NULL-VOID", "150 0G"], ["🥉", "PHANTOM-X", "100 0G"]].map(([e, n, p], idx) => (
            <div key={n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: "rgba(168,85,247,0.06)", borderRadius: 8, marginBottom: 6, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: `all 0.4s ease ${idx * 100}ms` }}>
              <div style={{ fontSize: 16 }}>{e}</div>
              <div style={{ fontSize: 12, color: C.text2, flex: 1, marginLeft: 8 }}>{n}</div>
              <div style={{ fontFamily: "Space Mono,monospace", fontSize: 11, color: C.purpleLight }}>{p}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

const docPages = {
  intro: {
    title: "What is WRAITH?", tag: "Overview",
    content: [
      { type: "p", text: "WRAITH is a Proof of Silence protocol — a privacy reputation system for AI agents built on 0G's modular infrastructure. Instead of proving what your agent did, WRAITH proves what it chose not to expose." },
      { type: "p", text: "Every time your agent handles sensitive data — wallet addresses, trading intent, identity fragments, cross-chain state — inside a Trusted Execution Environment (TEE), WRAITH generates a cryptographic Silence Proof and stores it permanently on 0G Storage. Your Agent ID accumulates these proofs, building an on-chain reputation based entirely on discretion." },
      { type: "h2", text: "Why does this matter?" },
      { type: "p", text: "AI agents operating in Web3 today handle enormous amounts of sensitive data. There is no verifiable way to know whether an agent leaked wallet correlations, front-ran a trade, or exposed your identity across chains. WRAITH solves this by making silence provable, permanent, and ownable." },
    ]
  },
  howworks: {
    title: "How It Works", tag: "Protocol Flow",
    content: [
      { type: "p", text: "WRAITH operates as a four-step privacy proof pipeline. Every sensitive data event your agent handles triggers this flow automatically." },
      { type: "h2", text: "The Silence Proof Pipeline" },
      { type: "code", text: "1. DATA EVENT\n   Agent receives sensitive input\n   (wallet correlation, trade intent,\n   identity fragment, cross-chain state)\n\n2. TEE EXECUTION (0G Compute)\n   Data enters hardware secure enclave\n   Inference runs privately inside TEE\n   No data leaves the enclave\n\n3. SILENCE PROOF GENERATED\n   Cryptographic proof created on exit\n   Proof hash: SPF-0x{hash}\n   Stored permanently on 0G Storage\n\n4. AGENT ID UPDATED (0G Chain)\n   Silence Score recalculated on-chain\n   Agent ID metadata updated\n   Reputation visible to all participants" },
      { type: "h2", text: "Shattered Proofs" },
      { type: "p", text: "When a leak is detected — data exposed outside the TEE boundary — the corresponding proof is marked as Shattered on-chain. Shattered proofs permanently reduce the agent's Silence Score and cannot be reversed." },
    ]
  },
  architecture: {
    title: "Architecture", tag: "0G Integration",
    content: [
      { type: "p", text: "WRAITH is built on four 0G protocol components, each handling a distinct layer of the privacy stack." },
      { type: "h2", text: "0G Storage — Proof Archival" },
      { type: "p", text: "All Silence Proofs are stored on 0G Storage's Log layer for permanent, immutable archival. The KV layer enables millisecond-level proof lookup by Agent ID. 0G Storage's petabyte-scale capacity means proof history is never pruned." },
      { type: "h2", text: "0G Compute — TEE Execution" },
      { type: "p", text: "WRAITH uses 0G Compute's decentralised GPU network with TEE support. All sensitive agent inference runs inside hardware-enforced secure enclaves. Execution is ZK-verifiable." },
      { type: "h2", text: "Agent ID — Sovereign Identity" },
      { type: "p", text: "Each WRAITH agent owns a unique Agent ID token on 0G Chain. The token stores encrypted metadata, the agent's Silence Score, proof count, and full proof history. Agent IDs are composable and tradeable." },
      { type: "h2", text: "0G Chain — Verification & Scoring" },
      { type: "p", text: "Proof hashes and score updates are verified and recorded on 0G Chain. The Silence Score algorithm weighs proof count, leak incidents, TEE compliance rate, and 0G Storage integrity." },
    ]
  },
  score: {
    title: "Silence Score", tag: "Reputation System",
    content: [
      { type: "p", text: "The Silence Score is a 0–100 on-chain reputation metric calculated from four components. It updates automatically after every proof event." },
      { type: "code", text: "SilenceScore = (\n  (ProofCount × 0.35)\n  + (TEECompliance% × 0.30)\n  + (StorageIntegrity% × 0.20)\n  + (LeakPenalty × 0.15)\n) normalised to 0–100" },
      { type: "h2", text: "Score Tiers" },
      { type: "p", text: "90–100: Sovereign — Maximum discretion, eligible for top epoch rewards. 70–89: Trusted — Strong privacy record. 50–69: Developing — Some leak incidents. Below 50: Compromised — Multiple leaks, ineligible for rewards." },
    ]
  },
  contracts: {
    title: "Smart Contracts", tag: "0G Chain",
    content: [
      { type: "p", text: "WRAITH deploys three smart contracts on 0G Chain that together form the on-chain backbone of the Proof of Silence protocol." },
      { type: "h2", text: "WraithAgentID.sol" },
      { type: "code", text: "contract WraithAgentID {\n  function mint(address owner) external;\n  function updateScore(uint256 tokenId, uint8 score) external;\n  function getSilenceScore(uint256 tokenId) view returns (uint8);\n}" },
      { type: "h2", text: "SilenceProofRegistry.sol" },
      { type: "code", text: "contract SilenceProofRegistry {\n  function sealProof(bytes32 hash, address agent) external;\n  function shatterProof(bytes32 hash) external;\n  function verifyProof(bytes32 hash) view returns (bool);\n}" },
      { type: "h2", text: "ReputationScorer.sol" },
      { type: "code", text: "contract ReputationScorer {\n  function recalculate(address agent) external returns (uint8);\n}" },
    ]
  },
  faq: {
    title: "FAQ", tag: "Common Questions",
    content: [
      { type: "h2", text: "Who can use WRAITH?" },
      { type: "p", text: "Any AI agent operating on 0G Chain can register an Agent ID and begin generating Silence Proofs. WRAITH is designed for autonomous agents handling sensitive Web3 data — DeFi bots, identity agents, cross-chain bridges, and privacy-preserving inference systems." },
      { type: "h2", text: "Can a Silence Score be faked?" },
      { type: "p", text: "No. Every proof is generated inside a TEE with hardware attestation. The TEE guarantees that execution happened correctly and that the proof represents a real silence event. Fake proofs cannot pass TEE attestation." },
      { type: "h2", text: "What happens when an agent is sold?" },
      { type: "p", text: "Agent IDs are ERC-721 compatible tokens on 0G Chain. When an Agent ID is transferred, the new owner inherits the full proof history and Silence Score. A high-score agent has genuine on-chain value." },
      { type: "h2", text: "Is WRAITH open source?" },
      { type: "p", text: "Yes. All WRAITH smart contracts and the SDK are open-sourced on GitHub. The protocol is designed to be composable — other projects can build on top of the Silence Proof standard." },
    ]
  }
};

function DocContent({ page }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(false); setTimeout(() => setVisible(true), 50); }, [page]);
  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s ease" }}>
      <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 1, color: C.text3, marginBottom: 20 }}>WRAITH Docs → {page.title}</div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: -0.5, marginBottom: 8 }}>{page.title}</h1>
      <div style={{ display: "inline-block", fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 1, color: C.purpleLight, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)", padding: "3px 10px", borderRadius: 20, marginBottom: 20 }}>{page.tag}</div>
      {page.content.map((block, i) => {
        if (block.type === "p") return <p key={i} style={{ fontSize: 13, lineHeight: 1.8, color: C.text2, marginBottom: 16 }}>{block.text}</p>;
        if (block.type === "h2") return <h2 key={i} style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "24px 0 10px" }}>{block.text}</h2>;
        if (block.type === "code") return <div key={i} style={{ background: "rgba(168,85,247,0.06)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", fontFamily: "Space Mono,monospace", fontSize: 11, color: C.purpleLight, marginBottom: 16, lineHeight: 1.7, whiteSpace: "pre", overflowX: "auto" }}>{block.text}</div>;
        return null;
      })}
    </div>
  );
}

function Docs({ toast }) {
  const [active, setActive] = useState("intro");
  const navItems = [
    ["intro", "📖", "Introduction"],
    ["howworks", "⚙️", "How It Works"],
    ["architecture", "🏗", "Architecture"],
    ["score", "📊", "Silence Score"],
    ["contracts", "📜", "Smart Contracts"],
    ["faq", "❓", "FAQ"],
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", background: "rgba(13,13,26,0.9)", border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", minHeight: 500 }}>
      <div style={{ borderRight: `1px solid ${C.border2}`, padding: "20px 0" }}>
        <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 2, color: C.text3, textTransform: "uppercase", padding: "0 16px", marginBottom: 10 }}>WRAITH Protocol</div>
        {navItems.map(([key, icon, label]) => (
          <div key={key} onClick={() => setActive(key)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", fontSize: 12, color: active === key ? C.purpleLight : C.text2, cursor: "pointer", borderLeft: active === key ? `2px solid ${C.purple}` : "2px solid transparent", background: active === key ? "rgba(168,85,247,0.08)" : "transparent", transition: "all 0.2s" }}
            onMouseEnter={e => active !== key && (e.currentTarget.style.background = "rgba(168,85,247,0.04)")}
            onMouseLeave={e => active !== key && (e.currentTarget.style.background = "transparent")}>
            <span style={{ opacity: 0.7 }}>{icon}</span>{label}
          </div>
        ))}
        <div style={{ margin: "16px 16px 0", paddingTop: 16, borderTop: `1px solid ${C.border2}` }}>
          <div onClick={() => window.open(LINKS.github, "_blank")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontSize: 12, color: C.purpleLight, cursor: "pointer" }}>⬡ GitHub Repository ↗</div>
          <div onClick={() => window.open(LINKS.explorer, "_blank")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontSize: 12, color: C.text2, cursor: "pointer" }}>⬡ 0G Explorer ↗</div>
        </div>
      </div>
      <div style={{ padding: "32px 36px", overflowY: "auto", maxHeight: 600 }}>
        <DocContent page={docPages[active]} />
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("hero");
  const [tab, setTab] = useState("dashboard");
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [wallet, setWallet] = useState(null);

  const toast = (msg) => { setToastMsg(msg); setToastShow(true); setTimeout(() => setToastShow(false), 3000); };

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
      toast(`Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
    } else { toast("Please install MetaMask"); }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "proofs", label: "Silence Proofs", badge: "142" },
    { id: "agentid", label: "Agent ID" },
    { id: "leaderboard", label: "Leaderboard" },
    { id: "docs", label: "Docs" },
  ];
  const titles = { dashboard: "Overview", proofs: "Silence Proofs", agentid: "Agent ID Registry", leaderboard: "Global Leaderboard", docs: "WRAITH Documentation" };

  if (view === "hero") return (
    <>
      <style>{`@keyframes slideRight { 0%,100%{transform:translateX(0);} 50%{transform:translateX(8px);} }{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}} @keyframes slideRight{0%,100%{transform:translateX(0);}50%{transform:translateX(8px);}{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}`}</style>
      <Hero onEnter={() => setView("app")} />
      <Toast msg={toastMsg} show={toastShow} />
    </>
  );

  return (
    <div style={{ display: "flex", height: "100vh", position: "relative", background: C.bg }}>
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 8px rgba(168,85,247,0.4); } 50% { box-shadow: 0 0 20px rgba(168,85,247,0.8); } }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(168,85,247,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(168,85,247,0.12) 0%,transparent 70%)" }} />

      <aside style={{ width: 220, flexShrink: 0, background: "rgba(13,13,26,0.95)", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", backdropFilter: "blur(20px)", padding: "0 0 24px", position: "relative", zIndex: 10 }}>
        <div style={{ padding: "22px 20px 18px", borderBottom: `1px solid ${C.border2}`, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setView("hero")}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${C.purpleDeep},${C.pink})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", animation: "pulseGlow 3s ease-in-out infinite" }}>W</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>WR<span style={{ color: C.purpleLight }}>AI</span>TH</div>
        </div>
        <div style={{ padding: "20px 12px 8px", flex: 1 }}>
          <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, letterSpacing: 2, color: C.text3, textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>Protocol</div>
          {tabs.map((t, i) => (
            <div key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 2, fontSize: 13, color: tab === t.id ? C.purpleLight : C.text2, background: tab === t.id ? "rgba(168,85,247,0.15)" : "transparent", border: `1px solid ${tab === t.id ? "rgba(168,85,247,0.2)" : "transparent"}`, position: "relative", transition: "all 0.2s", animation: `slideIn 0.3s ease ${i * 60}ms both` }}
              onMouseEnter={e => tab !== t.id && (e.currentTarget.style.background = "rgba(168,85,247,0.06)")}
              onMouseLeave={e => tab !== t.id && (e.currentTarget.style.background = "transparent")}>
              {tab === t.id && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 16, background: C.purple, borderRadius: "0 2px 2px 0" }} />}
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "currentColor", opacity: 0.5 }} />
              {t.label}
              {t.badge && <div style={{ marginLeft: "auto", fontFamily: "Space Mono,monospace", fontSize: 9, background: "rgba(168,85,247,0.2)", color: C.purpleLight, padding: "2px 7px", borderRadius: 20 }}>{t.badge}</div>}
            </div>
          ))}
        </div>
        <div style={{ margin: "0 12px", padding: 14, background: "rgba(168,85,247,0.07)", border: `1px solid rgba(168,85,247,0.15)`, borderRadius: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${C.purpleDeep},${C.pink})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, animation: "pulseGlow 3s ease-in-out infinite" }}>👁</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>AGENT-001</div>
              <div style={{ fontFamily: "Space Mono,monospace", fontSize: 9, color: C.text3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>0x7a3f...c12e</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
              <AnimatedBar width={87} />
            </div>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: C.purpleLight, whiteSpace: "nowrap" }}>87/100</div>
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", zIndex: 1 }}>
        <div style={{ padding: "0 28px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border2}`, background: "rgba(7,7,15,0.8)", backdropFilter: "blur(20px)", flexShrink: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{titles[tab]}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: C.green, border: "1px solid rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.08)", padding: "4px 12px", borderRadius: 20, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "blink 2s infinite" }} />0G Mainnet
            </div>
            <div style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: C.purpleLight, border: `1px solid ${C.border}`, background: "rgba(168,85,247,0.08)", padding: "4px 12px", borderRadius: 20 }}>TEE Active</div>
            <button onClick={connectWallet} style={{ fontFamily: "Space Mono,monospace", fontSize: 10, color: "#fff", background: `linear-gradient(135deg,${C.purpleDeep},${C.purpleLight})`, border: "none", padding: "6px 14px", borderRadius: 8, cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.target.style.opacity = "0.85"}
              onMouseLeave={e => e.target.style.opacity = "1"}>
              {wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
            </button>
          </div>
        </div>
        <div key={tab} style={{ flex: 1, overflowY: "auto", padding: "24px 28px 32px", animation: "slideIn 0.35s ease" }}>
          {tab === "dashboard" && <Dashboard toast={toast} />}
          {tab === "proofs" && <Proofs toast={toast} />}
          {tab === "agentid" && <AgentID toast={toast} />}
          {tab === "leaderboard" && <Leaderboard toast={toast} />}
          {tab === "docs" && <Docs toast={toast} />}
        </div>
      </div>
      <Toast msg={toastMsg} show={toastShow} />
    </div>
  );
}