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
          className="absolute animate-card-slide"
          style={{
            left: `100%`, // Start exactly at screen edge
            top: `${25 + index * 15}%`, // Stagger vertical positions to avoid overlap (25%, 40%, 55%, etc.)
            animationDelay: `${index === 0 ? 0 : index * 3}s`, // First card immediate, others staggered
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
