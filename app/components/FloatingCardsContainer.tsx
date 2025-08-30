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

function slotTransformByVisibleIndex(visibleIndex: number) {
  const i = Math.min(Math.max(visibleIndex, 0), SLOT_VW.length - 1);
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

  // Track which cards have completed their initial animation
  const handleAnimationEnd = (cityId: string) => {
    setAnimatedCards((prev) => new Set([...prev, cityId]));
  };

  // Dynamically reposition cards when one is dismissed
  useEffect(() => {
    if (dismissedCards.size === 0) return;
    const visibleCities = cities.filter((city) => !dismissedCards.has(city.id));
    visibleCities.forEach((city, newVisibleIndex) => {
      if (!animatedCards.has(city.id) || !containerRef.current) return;
      const el = containerRef.current.querySelector(
        `[data-city-id="${city.id}"]`,
      ) as HTMLElement | null;
      if (!el) return;
      const originalIndex = cities.findIndex((c) => c.id === city.id);
      el.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      el.style.transform = targetTransform(originalIndex, newVisibleIndex);
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
              left: `calc(100% + ${100 + originalIndex * 150}px)`,
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
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "transform",
            }}
            onAnimationEnd={(e) => {
              // Only handle the slide animation, not floating or other animations
              if (
                !hasCompleted &&
                e.animationName.includes("card-slide-and-stop")
              ) {
                handleAnimationEnd(city.id);
                const el = e.currentTarget as HTMLElement;
                el.style.transform = slotTransformByVisibleIndex(originalIndex);
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
