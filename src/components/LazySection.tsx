import { Suspense, lazy, useEffect, useRef, useState, type ComponentType } from "react";

/**
 * Renders a section only once it approaches the viewport.
 * Keeps the initial JS/render work on the home page minimal.
 */
const LazySection = ({
  loader,
  minHeight = 320,
}: {
  loader: () => Promise<{ default: ComponentType }>;
  minHeight?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [Comp, setComp] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (visible && !Comp) setComp(lazy(loader) as unknown as ComponentType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div ref={ref} style={!Comp ? { minHeight } : undefined}>
      {Comp ? (
        <Suspense fallback={<div style={{ minHeight }} />}>
          <Comp />
        </Suspense>
      ) : null}
    </div>
  );
};

export default LazySection;
