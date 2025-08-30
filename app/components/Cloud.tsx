interface CloudProps {
  size?: "small" | "medium" | "large";
  animationDuration?: number;
  initialPosition?: number;
  opacity?: number;
  className?: string;
}

export default function Cloud({
  size = "medium",
  animationDuration = 20,
  initialPosition = 0,
  opacity = 0.8,
  className = "",
}: CloudProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-16 h-8 sm:w-20 sm:h-10";
      case "large":
        return "w-32 h-16 sm:w-40 sm:h-20";
      default:
        return "w-24 h-12 sm:w-28 sm:h-14";
    }
  };

  return (
    <div
      className={`
        absolute 
        ${getSizeClasses()}
        animate-float
        ${className}
      `}
      style={{
        left: `${initialPosition}%`,
        animationDuration: `${animationDuration}s`,
        opacity: opacity,
      }}
    >
      {/* Cloud shape using CSS */}
      <div className="relative w-full h-full">
        {/* Main cloud body */}
        <div className="absolute top-2 left-2 w-3/4 h-3/4 bg-white rounded-full opacity-90"></div>

        {/* Cloud bumps for realistic shape */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-1 right-1 w-1/3 h-2/3 bg-white rounded-full opacity-85"></div>
        <div className="absolute bottom-1 left-1/3 w-2/5 h-1/2 bg-white rounded-full opacity-75"></div>
      </div>
    </div>
  );
}
