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
        relative
        bg-white/90
        backdrop-blur-sm
        rounded-xl
        shadow-lg
        p-6
        max-w-sm
        ${className}
      `}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  );
}
