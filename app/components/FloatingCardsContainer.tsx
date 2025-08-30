import FloatingCard from "./FloatingCard";
import { cities, type CityData } from "../data/cities";
import { useRef, useState, useEffect, useCallback, CSSProperties } from "react";

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
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const vwFor = useCallback(
    (index: number) => `${baseVw + index * stepVw}vw`,
    [baseVw, stepVw],
  );

  const slotTransformByOriginalIndex = useCallback(
    (originalIndex: number) => `translateX(${vwFor(originalIndex)})`,
    [vwFor],
  );

  const targetTransform = useCallback(
    (originalIndex: number, visibleIndex: number) => {
      const deltaPx = (originalIndex - visibleIndex) * hSpacingPx;
      return `translateX(calc(${vwFor(visibleIndex)} - ${deltaPx}px))`;
    },
    [hSpacingPx, vwFor],
  );

  const handleAnimationEnd = (
    cityId: string,
    originalIndex: number,
    el: HTMLElement,
  ) => {
    el.style.transform = slotTransformByOriginalIndex(originalIndex);
    setAnimatedCards((prev) => new Set([...prev, cityId]));
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setDragCurrent({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setDragCurrent({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = dragCurrent.x - dragStart.x;
    const threshold = 50; // minimum distance for a swipe

    if (Math.abs(deltaX) > threshold) {
      const swipeDistance = 200; // distance to move cards
      if (deltaX > 0) {
        // Swipe right - move cards right
        setHorizontalOffset((prev) => prev + swipeDistance);
      } else {
        // Swipe left - move cards left
        setHorizontalOffset((prev) => prev - swipeDistance);
      }
    }
  };

  // Mouse event handlers (for desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragCurrent({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragCurrent({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = dragCurrent.x - dragStart.x;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      const swipeDistance = 200;
      if (deltaX > 0) {
        // Drag right - move cards right
        setHorizontalOffset((prev) => prev + swipeDistance);
      } else {
        // Drag left - move cards left
        setHorizontalOffset((prev) => prev - swipeDistance);
      }
    }
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
  }, [dismissedCards, animatedCards, targetTransform]);

  const visibleCities = cities.filter((city) => !dismissedCards.has(city.id));

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{
        transform: `translateX(${horizontalOffset}px)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // End drag if mouse leaves container
    >
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
