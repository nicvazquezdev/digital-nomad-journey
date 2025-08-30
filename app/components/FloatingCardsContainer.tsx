import FloatingCard from "./FloatingCard";

export interface CardData {
  id: string;
  title: string;
  content: string;
}

interface FloatingCardsContainerProps {
  cards?: CardData[];
  className?: string;
}

export default function FloatingCardsContainer({
  cards = [
    {
      id: "1",
      title: "Nómada Digital",
      content:
        "Explorando el mundo mientras trabajo remotamente, descubriendo nuevas culturas y paisajes increíbles.",
    },
    {
      id: "2",
      title: "Aventura",
      content:
        "Cada destino es una nueva aventura llena de experiencias únicas y momentos inolvidables.",
    },
  ],
  className = "",
}: FloatingCardsContainerProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="absolute animate-float"
          style={{
            left: `${100 + Math.random() * 50}%`, // Always start off-screen right (100% to 150%)
            top: `30%`, // Center area around airplane height (35-55%)
            animationDelay: `${index * 5}s`, // Positive delays only - cards appear one after another
            animationDuration: `${16 + Math.random() * 8}s`, // Same duration as clouds
          }}
        >
          <FloatingCard
            title={card.title}
            content={card.content}
            cardIndex={index}
          />
        </div>
      ))}
    </div>
  );
}
