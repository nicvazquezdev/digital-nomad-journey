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
      id: "roma",
      title: "Roma",
      content:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop&q=80",
    },
    {
      id: "paris",
      title: "París",
      content:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=250&fit=crop&q=80",
    },
    {
      id: "madrid",
      title: "Madrid",
      content:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=250&fit=crop&q=80",
    },
    {
      id: "barcelona",
      title: "Barcelona",
      content:
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    },
  ],
  className = "",
}: FloatingCardsContainerProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="absolute"
          style={{
            left: `100%`, // Start exactly at screen edge
            top: `${30 + (index % 2) * 10 + Math.sin(index) * 5}%`, // Side by side with slight height variation
            animationDelay: `${index === 0 ? 0 : index * 3}s`, // First card immediate, others staggered
            animation: `card-slide-and-stop-${index + 1} 8s ease-out forwards`,
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
