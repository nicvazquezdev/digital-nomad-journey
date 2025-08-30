import Cloud from "./Cloud";
import { useMemo, memo } from "react";

interface CloudsContainerProps {
  cloudCount?: number;
  className?: string;
  seed?: number;
}

function CloudsContainer({
  cloudCount = 25,
  className = "",
  seed = 12345,
}: CloudsContainerProps) {
  const prng = (initialSeed: number) => {
    let s = initialSeed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  };

  const clouds = useMemo(() => {
    const rnd = prng(seed + cloudCount);
    const list: Array<{
      id: number;
      size: "small" | "medium" | "large";
      animationDuration: number;
      left: number;
      opacity: number;
      top: number;
      delay: number;
    }> = [];

    for (let i = 0; i < cloudCount; i++) {
      const sizeIndex = Math.floor(rnd() * 3); // 0..2
      const size = (["small", "medium", "large"] as const)[sizeIndex];
      const animationDuration = 16 + rnd() * 8; // 16-24s
      const left = 80 + rnd() * 70; // 80%-150%
      const opacity = 0.6 + rnd() * 0.4; // 0.6-1.0
      const top = rnd() * 70; // 0-70%
      const delay = (i / cloudCount) * 20 - 10; // -10..+10 aprox

      list.push({
        id: i,
        size,
        animationDuration,
        left,
        opacity,
        top,
        delay,
      });
    }

    return list;
  }, [cloudCount, seed]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute animate-float"
          style={{
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            animationDelay: `${cloud.delay}s`,
            animationDuration: `${cloud.animationDuration}s`,
          }}
        >
          <Cloud size={cloud.size} opacity={cloud.opacity} />
        </div>
      ))}
    </div>
  );
}

export default memo(CloudsContainer);
