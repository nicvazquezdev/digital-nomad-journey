interface FloatingCardProps {
  title: string;
  content: string;
  cardIndex?: number;
  className?: string;
}

export default function FloatingCard({
  title,
  content,
  cardIndex = 0,
  className = "",
}: FloatingCardProps) {
  return (
    <div
      className={`
        absolute
        bg-white/90
        backdrop-blur-sm
        rounded-xl
        shadow-lg
        p-6
        max-w-sm
        ${
          cardIndex === 0
            ? "animate-card-slide-first"
            : "animate-card-slide-second"
        }
        ${className}
      `}
      style={{
        top: cardIndex === 0 ? "25%" : "45%",
        transform: "translateX(calc(100vw + 100px))",
      }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  );
}
