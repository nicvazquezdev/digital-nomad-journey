interface AirplaneProps {
  size?: "small" | "medium" | "large";
  position?: { x: number; y: number };
  className?: string;
}

export default function Airplane({
  size = "large",
  position = { x: 50, y: 30 },
  className = "",
}: AirplaneProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-16 h-12 sm:w-20 sm:h-16";
      case "medium":
        return "w-20 h-16 sm:w-28 sm:h-20";
      default:
        return "w-28 h-20 sm:w-36 sm:h-28";
    }
  };

  return (
    <div
      className={`
        absolute 
        ${getSizeClasses()}
        animate-airplane-hover
        ${className}
      `}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      {/* Friendly airplane design */}
      <div className="relative w-full h-full">
        {/* Main body (fuselage) - rounded and friendly */}
        <div className="absolute top-1/2 left-1/4 w-3/5 h-1/3 bg-blue-400 rounded-full transform -translate-y-1/2 shadow-lg"></div>

        {/* Wings - larger and more curved */}
        <div className="absolute top-1/2 left-1/6 w-4/5 h-1/6 bg-blue-300 rounded-full transform -translate-y-1/2"></div>

        {/* Nose - rounded and friendly */}
        <div className="absolute top-1/2 right-1/12 w-1/4 h-1/5 bg-yellow-400 rounded-full transform -translate-y-1/2"></div>

        {/* Tail - vertical */}
        <div className="absolute top-1/4 left-1/4 w-1/8 h-1/2 bg-red-400 rounded-t-full"></div>

        {/* Cockpit window */}
        <div className="absolute top-1/2 left-2/5 w-1/6 h-1/8 bg-sky-200 rounded-full transform -translate-y-1/2 border-2 border-blue-600"></div>

        {/* Wing stripes for decoration */}
        <div className="absolute top-1/2 left-1/5 w-3/5 h-0.5 bg-white rounded-full transform -translate-y-1/2 opacity-80"></div>

        {/* Propeller with spinning animation */}
        <div className="absolute top-1/2 right-0 w-1/12 h-1/12 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-1/16 h-1/3 bg-gray-400 rounded-full transform -translate-y-1/2 translate-x-1/2 animate-propeller"></div>

        {/* Landing gear (small circles) */}
        <div className="absolute bottom-1/6 left-2/5 w-1/12 h-1/12 bg-gray-500 rounded-full"></div>
        <div className="absolute bottom-1/6 left-1/2 w-1/12 h-1/12 bg-gray-500 rounded-full"></div>

        {/* Fun details - small dots on the side */}
        <div className="absolute top-1/2 left-1/3 w-1/20 h-1/20 bg-white rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-1/20 h-1/20 bg-white rounded-full transform -translate-y-1/2"></div>
      </div>
    </div>
  );
}
