import FloatingCard from "./FloatingCard";
import { cities, type CityData } from "../data/cities";

interface FloatingCardsContainerProps {
  className?: string;
}

export default function FloatingCardsContainer({
  className = "",
}: FloatingCardsContainerProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {cities.map((city, index) => (
        <div
          key={city.id}
          className="absolute"
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
          />
        </div>
      ))}
    </div>
  );
}
