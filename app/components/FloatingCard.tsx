import Image from "next/image";
import { useState } from "react";
import { type CountryData } from "../data/countries";

interface FloatingCardProps {
  title: string;
  content: string; // Image URL
  cardIndex?: number;
  className?: string;
  onClick?: () => void;
  onDismiss?: () => void;
  country?: CountryData;
}

export default function FloatingCard({
  title,
  content,
  cardIndex = 0,
  className = "",
  onClick,
  onDismiss,
}: FloatingCardProps) {
  const [isDisappearing, setIsDisappearing] = useState(false);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDisappearing(true);
    setTimeout(() => {
      onDismiss?.();
    }, 1000);
  };

  return (
    <div
      className={`
        relative
        bg-gradient-to-br from-amber-50 to-orange-100
        rounded-lg
        w-80
        h-56
        transform
        transition-all
        duration-300
        hover:scale-105
        border-8
        border-white
        cursor-pointer
        animate-float-gentle
        ${isDisappearing ? "animate-disappear-funny" : ""}
        ${className}
      `}
      style={{
        animationDelay: `${cardIndex * 0.2}s`,
      }}
      onClick={onClick}
    >
      {/* Postcard vintage texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/20 to-orange-200/30 rounded-lg"></div>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={handleDismiss}
          className="absolute top-0 left-0 z-10 bg-red-700 hover:bg-red-600 cursor-pointer text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg group hover:animate-wobble"
          aria-label="Skip card"
          onMouseEnter={(e) => {
            const card = e.currentTarget.closest(".relative");
            card?.classList.add("animate-wobble");
            setTimeout(() => {
              card?.classList.remove("animate-wobble");
            }, 500);
          }}
        >
          <svg
            className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Country Image */}
      <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
        <Image
          src={content}
          alt={title}
          fill
          className="object-cover"
          sizes="320px"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-orange-200/30 mix-blend-overlay"></div>
      </div>

      {/* Postcard bottom section */}
      <div className="relative h-16 bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-b-lg">
        <div className="absolute top-2 right-3 w-10 h-10 border-2 border-red-400/60 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 border border-red-400/40 rounded-full"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 tracking-wide font-serif">
          {title}
        </h3>
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
