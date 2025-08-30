import Cloud from "./Cloud";

interface CloudsContainerProps {
  cloudCount?: number;
  className?: string;
}

export default function CloudsContainer({
  cloudCount = 6,
  className = "",
}: CloudsContainerProps) {
  // Generate cloud configurations
  const generateClouds = () => {
    const clouds = [];

    for (let i = 0; i < cloudCount; i++) {
      const cloudConfig = {
        id: i,
        size: ["small", "medium", "large"][Math.floor(Math.random() * 3)] as
          | "small"
          | "medium"
          | "large",
        animationDuration: 15 + Math.random() * 20, // 15-35 seconds
        initialPosition: 100 + Math.random() * 100, // Start off-screen right
        opacity: 0.6 + Math.random() * 0.4, // 0.6-1.0 opacity
        top: Math.random() * 70, // Position clouds in top 70% of screen
        delay: Math.random() * 10, // Random delay for staggered animation
      };

      clouds.push(cloudConfig);
    }

    return clouds;
  };

  const clouds = generateClouds();

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute"
          style={{
            top: `${cloud.top}%`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <Cloud
            size={cloud.size}
            animationDuration={cloud.animationDuration}
            initialPosition={cloud.initialPosition}
            opacity={cloud.opacity}
          />
        </div>
      ))}
    </div>
  );
}
