import FloatingCard from "./FloatingCard";
import {
  countries,
  type CountryData,
  getDefaultImageUrl,
} from "../data/countries";
import { useRef, useState, useEffect, useCallback, CSSProperties } from "react";

interface FloatingCardsContainerProps {
  className?: string;
  onCardClick?: (country: CountryData) => void;
  onDismissCard?: (countryId: string) => void;
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
  const [hasDragged, setHasDragged] = useState(false);
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
    countryId: string,
    originalIndex: number,
    el: HTMLElement,
  ) => {
    el.style.transform = slotTransformByOriginalIndex(originalIndex);
    setAnimatedCards((prev) => new Set([...prev, countryId]));
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only allow dragging if the touch started on a card, not on the background
    const target = e.target as HTMLElement;
    const isOnCard = target.closest("[data-country-id]") !== null;
    const isOnDismissButton =
      target.closest("button[aria-label='Skip card']") !== null;

    // Don't interfere with dismiss button interactions
    if (!isOnCard || isOnDismissButton) return;

    // Prevent default touch behaviors (like scrolling) when starting drag on a card
    e.preventDefault();

    setIsDragging(true);
    setHasDragged(false); // Reset drag flag
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setDragCurrent({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    // Prevent default scrolling behavior while dragging
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - dragStart.x);
    const deltaY = Math.abs(touch.clientY - dragStart.y);

    // If movement is significant enough, mark as dragged
    if (deltaX > 5 || deltaY > 5) {
      setHasDragged(true);
    }

    setDragCurrent({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = dragCurrent.x - dragStart.x;

    // Update the base offset with the current drag position
    setHorizontalOffset((prev) => prev + deltaX);
  };

  // Mouse event handlers (for desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging if the click started on a card, not on the background
    const target = e.target as HTMLElement;
    const isOnCard = target.closest("[data-country-id]") !== null;
    const isOnDismissButton =
      target.closest("button[aria-label='Skip card']") !== null;

    // Don't interfere with dismiss button interactions
    if (!isOnCard || isOnDismissButton) return;

    // Prevent default mouse behaviors when starting drag on a card
    e.preventDefault();

    setIsDragging(true);
    setHasDragged(false); // Reset drag flag
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragCurrent({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = Math.abs(e.clientX - dragStart.x);
    const deltaY = Math.abs(e.clientY - dragStart.y);

    // If movement is significant enough, mark as dragged
    if (deltaX > 5 || deltaY > 5) {
      setHasDragged(true);
    }

    setDragCurrent({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = dragCurrent.x - dragStart.x;

    // Update the base offset with the current drag position
    setHorizontalOffset((prev) => prev + deltaX);
  };

  // Custom click handler that prevents clicks after dragging
  const handleCardClick = (country: CountryData) => {
    // Only trigger click if there was no significant drag movement
    if (!hasDragged && onCardClick) {
      onCardClick(country);
    }
  };

  useEffect(() => {
    if (dismissedCards.size === 0) return;
    const visible = countries.filter((c) => !dismissedCards.has(c.id));
    visible.forEach((country, visibleIndex) => {
      if (!animatedCards.has(country.id) || !containerRef.current) return;
      const el = containerRef.current.querySelector(
        `[data-country-id="${country.id}"]`,
      ) as HTMLElement | null;
      if (!el) return;
      const originalIndex = countries.findIndex((c) => c.id === country.id);
      el.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      el.style.transform = targetTransform(originalIndex, visibleIndex);
    });
  }, [dismissedCards, animatedCards, targetTransform]);

  const visibleCountries = countries.filter(
    (country) => !dismissedCards.has(country.id),
  );

  // Calculate real-time offset during drag
  const currentOffset = isDragging
    ? horizontalOffset + (dragCurrent.x - dragStart.x)
    : horizontalOffset;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{
        transform: `translateX(${currentOffset}px)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
        touchAction: "none", // Prevent default touch behaviors
        userSelect: "none", // Prevent text selection during drag
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // End drag if mouse leaves container
    >
      {visibleCountries.map((country, visibleIndex) => {
        const originalIndex = countries.findIndex((c) => c.id === country.id);
        const hasCompleted = animatedCards.has(country.id);

        const style: CSSProperties = {
          left: `calc(100% + ${100 + originalIndex * hSpacingPx}px)`,
          top: `${
            30 + (originalIndex % 2) * 10 + Math.sin(originalIndex) * 5
          }%`,
          zIndex: originalIndex + 1, // Ensure later cards are above earlier ones
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
            key={country.id}
            data-country-id={country.id}
            className="absolute pointer-events-auto"
            style={style}
            onAnimationEnd={(e) => {
              if (!hasCompleted) {
                handleAnimationEnd(
                  country.id,
                  originalIndex,
                  e.currentTarget as HTMLElement,
                );
              }
            }}
          >
            <FloatingCard
              title={country.title}
              content={getDefaultImageUrl(country)}
              cardIndex={visibleIndex}
              onClick={() => handleCardClick(country)}
              onDismiss={() => onDismissCard?.(country.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
