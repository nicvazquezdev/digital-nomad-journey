import FloatingCard from "./FloatingCard";
import { cities, type CityData } from "../data/cities";
import { useRef, useState, useEffect } from "react";

interface FloatingCardsContainerProps {
  className?: string;
  onCardClick?: (city: CityData) => void;
  onDismissCard?: (cityId: string) => void;
  dismissedCards?: Set<string>;
}

const SLOT_VW = [-85, -80, -75, -70] as const;
const H_SPACING_PX = 150;

function slotTransformByOriginalIndex(originalIndex: number) {
  const i = Math.min(Math.max(originalIndex, 0), SLOT_VW.length - 1);
  return `translateX(${SLOT_VW[i]}vw)`;
}

function targetTransform(originalIndex: number, visibleIndex: number) {
  const i = Math.min(Math.max(visibleIndex, 0), SLOT_VW.length - 1);
  const deltaPx = (originalIndex - visibleIndex) * H_SPACING_PX;
  return `translateX(calc(${SLOT_VW[i]}vw - ${deltaPx}px))`;
}

export default function FloatingCardsContainer({
  className = "",
  onCardClick,
  onDismissCard,
  dismissedCards = new Set(),
}: FloatingCardsContainerProps) {
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, [dismissedCards, animatedCards]);

  const visibleCities = cities.filter((city) => !dismissedCards.has(city.id));

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      {visibleCities.map((city, visibleIndex) => {
        const originalIndex = cities.findIndex((c) => c.id === city.id);
        const hasCompleted = animatedCards.has(city.id);

        return (
          <div
            key={city.id}
            data-city-id={city.id}
            className="absolute pointer-events-auto"
            style={{
              left: `calc(100% + ${100 + originalIndex * H_SPACING_PX}px)`,
              top: `${
                30 + (originalIndex % 2) * 10 + Math.sin(originalIndex) * 5
              }%`,
              animationDelay: hasCompleted ? "0s" : `${2 + originalIndex * 4}s`,
              animation: hasCompleted
                ? "none"
                : `card-slide-and-stop-${Math.min(
                    originalIndex + 1,
                    4,
                  )} 8s ease-out forwards`,
              transition: hasCompleted
                ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                : undefined,
              willChange: "transform",
            }}
            onAnimationEnd={(e) => {
              if (
                !hasCompleted &&
                e.animationName.includes("card-slide-and-stop")
              ) {
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
