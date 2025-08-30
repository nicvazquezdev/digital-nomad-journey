import FloatingCard from "./FloatingCard";
import { cities, type CityData } from "../data/cities";
import { useRef, useState, useEffect, CSSProperties } from "react";

interface FloatingCardsContainerProps {
  className?: string;
  onCardClick?: (city: CityData) => void;
  onDismissCard?: (cityId: string) => void;
  dismissedCards?: Set<string>;
  baseVw?: number;
  stepVw?: number;
  hSpacingPx?: number;
}

export default function FloatingCardsContainer({
  className = "",
  onCardClick,
  onDismissCard,
  dismissedCards = new Set(),
  baseVw = -85,
  stepVw = 5,
  hSpacingPx = 150,
}: FloatingCardsContainerProps) {
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const vwFor = (index: number) => `${baseVw + index * stepVw}vw`;

  const slotTransformByOriginalIndex = (originalIndex: number) =>
    `translateX(${vwFor(originalIndex)})`;

  const targetTransform = (originalIndex: number, visibleIndex: number) => {
    const deltaPx = (originalIndex - visibleIndex) * hSpacingPx;
    return `translateX(calc(${vwFor(visibleIndex)} - ${deltaPx}px))`;
  };

  const handleAnimationEnd = (
    cityId: string,
    originalIndex: number,
    el: HTMLElement,
  ) => {
    el.style.transform = slotTransformByOriginalIndex(originalIndex);
    setAnimatedCards((prev) => new Set([...prev, cityId]));
  };

  useEffect(() => {
    if (dismissedCards.size === 0) return;
    const visible = cities.filter((c) => !dismissedCards.has(c.id));
    visible.forEach((city, visibleIndex) => {
      if (!animatedCards.has(city.id) || !containerRef.current) return;
      const el = containerRef.current.querySelector(
        `[data-city-id="${city.id}"]`,
      ) as HTMLElement | null;
      if (!el) return;
      const originalIndex = cities.findIndex((c) => c.id === city.id);
      el.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      el.style.transform = targetTransform(originalIndex, visibleIndex);
    });
  }, [dismissedCards, animatedCards, hSpacingPx, baseVw, stepVw]);

  const visibleCities = cities.filter((city) => !dismissedCards.has(city.id));

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      {visibleCities.map((city, visibleIndex) => {
        const originalIndex = cities.findIndex((c) => c.id === city.id);
        const hasCompleted = animatedCards.has(city.id);

        const style: CSSProperties = {
          left: `calc(100% + ${100 + originalIndex * hSpacingPx}px)`,
          top: `${
            30 + (originalIndex % 2) * 10 + Math.sin(originalIndex) * 5
          }%`,
          animationDelay: hasCompleted ? "0s" : `${2 + originalIndex * 4}s`,
          animation: hasCompleted
            ? "none"
            : `card-slide-and-stop 8s ease-out forwards`,
          transition: hasCompleted
            ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            : undefined,
          willChange: "transform",
          ["--target-x" as keyof CSSProperties]: slotTransformByOriginalIndex(
            originalIndex,
          )
            .replace("translateX(", "")
            .replace(")", ""),
        };

        return (
          <div
            key={city.id}
            data-city-id={city.id}
            className="absolute pointer-events-auto"
            style={style}
            onAnimationEnd={(e) => {
              if (!hasCompleted) {
                handleAnimationEnd(
                  city.id,
                  originalIndex,
                  e.currentTarget as HTMLElement,
                );
              }
            }}
          >
            <FloatingCard
              title={city.title}
              content={city.imageUrl}
              cardIndex={visibleIndex}
              onClick={() => onCardClick?.(city)}
              onDismiss={() => onDismissCard?.(city.id)}
              city={city}
            />
          </div>
        );
      })}
    </div>
  );
}
