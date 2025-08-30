import Image from "next/image";

interface FloatingCardProps {
  title: string;
  content: string; // Now contains image URL
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
        bg-gradient-to-br from-amber-50 to-orange-100
        rounded-lg
        shadow-lg
        w-80
        h-56
        transform
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-2xl
        border-8
        border-white
        ${className}
      `}
      style={{
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      {/* Postcard vintage texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/20 to-orange-200/30 rounded-lg"></div>

      {/* City Image */}
      <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
        <Image
          src={content}
          alt={title}
          fill
          className="object-cover"
          sizes="320px"
        />
        {/* Vintage photo effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-orange-200/30 mix-blend-overlay"></div>
      </div>

      {/* Postcard bottom section */}
      <div className="relative h-16 bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-b-lg">
        {/* Decorative postmark circle */}
        <div className="absolute top-2 right-3 w-10 h-10 border-2 border-red-400/60 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 border border-red-400/40 rounded-full"></div>
        </div>

        {/* City Name in postcard style */}
        <h3 className="text-xl font-bold text-gray-800 tracking-wide font-serif">
          {title}
        </h3>

        {/* Decorative postcard lines */}
        <div className="absolute bottom-2 left-3 right-16 space-y-1">
          <div className="h-px bg-gray-300/50"></div>
        </div>
      </div>

      {/* Corner aging effect */}
      <div className="absolute top-1 left-1 w-3 h-3 bg-amber-200/40 rounded-full"></div>
      <div className="absolute top-1 right-1 w-2 h-2 bg-orange-200/40 rounded-full"></div>
      <div className="absolute bottom-1 left-1 w-2 h-2 bg-amber-300/40 rounded-full"></div>
    </div>
  );
}
