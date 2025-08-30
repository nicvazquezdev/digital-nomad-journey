import FloatingCard from "./FloatingCard";
import { cities, type CityData } from "../data/cities";
import { useRef, useState, useEffect } from "react";

interface FloatingCardsContainerProps {
  className?: string;
  onCardClick?: (city: CityData) => void;
  onDismissCard?: (cityId: string) => void;
  dismissedCards?: Set<string>;
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

  // Get the final transform position for completed cards
  const getCardFinalTransform = (cardIndex: number) => {
    // These match the end positions defined in the CSS animations
    const transformMap = {
      0: "translateX(-85vw)", // card-slide-and-stop-1
      1: "translateX(-80vw)", // card-slide-and-stop-2
      2: "translateX(-75vw)", // card-slide-and-stop-3
      3: "translateX(-70vw)", // card-slide-and-stop-4
    };
    return (
      transformMap[Math.min(cardIndex, 3) as keyof typeof transformMap] ||
      "translateX(-70vw)"
    );
  };

  // Dynamically reposition cards when one is dismissed
  useEffect(() => {
    if (dismissedCards.size === 0) return;

    const visibleCities = cities.filter((city) => !dismissedCards.has(city.id));

    // Only reposition cards that have completed their initial animation
    visibleCities.forEach((city, newVisibleIndex) => {
      if (animatedCards.has(city.id) && containerRef.current) {
        const cardElement = containerRef.current.querySelector(
          `[data-city-id="${city.id}"]`,
        ) as HTMLElement;

        if (cardElement) {
          const newTransform = getCardFinalTransform(newVisibleIndex);

          // Apply smooth transition to new position
          cardElement.style.transition =
            "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
          cardElement.style.transform = newTransform;
        }
      }
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
              transform: hasCompleted
                ? getCardFinalTransform(originalIndex)
                : "none",
              animationDelay: hasCompleted
                ? "none"
                : `${2 + originalIndex * 4}s`,
              animation: hasCompleted
                ? "none"
                : `card-slide-and-stop-${Math.min(
                    originalIndex + 1,
                    4,
                  )} 8s ease-out forwards`,
            }}
            onAnimationEnd={(e) => {
              // Only handle the slide animation, not floating or other animations
              if (
                !hasCompleted &&
                e.animationName.includes("card-slide-and-stop")
              ) {
                handleAnimationEnd(city.id);
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
