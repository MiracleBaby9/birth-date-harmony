import { useEffect, useState } from "react";

const BASE = 14048;

const LiveTicker = () => {
  const [count, setCount] = useState(BASE);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    const id = setInterval(() => setCount((c) => c + 1), 45000);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-24 left-3 z-40 md:bottom-6 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div className="glass-card flex items-center gap-2 rounded-full px-3.5 py-2 shadow-soft">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-rose opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-rose" />
        </span>
        <span className="font-body text-[0.65rem] font-bold uppercase tracking-[0.16em] text-brand-rose">
          Live
        </span>
        <span className="h-3 w-px bg-brand-border" />
        <span className="font-body text-xs font-semibold text-brand-heading">
          {count.toLocaleString("en-IN")}
        </span>
        <span className="font-body text-xs text-brand-muted">reports delivered</span>
      </div>
    </div>
  );
};

export default LiveTicker;
