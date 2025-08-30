import FloatingCard from "./FloatingCard";
import { cities, type CityData } from "../data/cities";

interface FloatingCardsContainerProps {
  className?: string;
  onCardClick?: (city: CityData) => void;
}

export default function FloatingCardsContainer({
  className = "",
  onCardClick,
}: FloatingCardsContainerProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {cities.map((city, index) => (
        <div
          key={city.id}
          className="absolute pointer-events-auto"
          style={{
            left: `calc(100% + ${100 + index * 150}px)`,
            top: `${30 + (index % 2) * 10 + Math.sin(index) * 5}%`, // Side by side with slight height variation
            animationDelay: `${2 + index * 4}s`, // Start after 2s, then every 4s
            animation: `card-slide-and-stop-${index + 1} 8s ease-out forwards`,
          }}
        >
          <FloatingCard
            title={city.title}
            content={city.imageUrl}
            cardIndex={index}
            onClick={() => onCardClick?.(city)}
          />
        </div>
      ))}
    </div>
  );
}
