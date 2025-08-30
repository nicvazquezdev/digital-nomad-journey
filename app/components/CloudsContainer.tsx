import Cloud from "./Cloud";

interface CloudsContainerProps {
  cloudCount?: number;
  className?: string;
}

export default function CloudsContainer({
  cloudCount = 25,
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
        animationDuration: 16 + Math.random() * 8, // 16-24 seconds (adjusted for longer distance)
        left: 80 + Math.random() * 70, // Mix of on-screen and off-screen positions (80% to 150%)
        opacity: 0.6 + Math.random() * 0.4, // 0.6-1.0 opacity
        top: Math.random() * 70, // Position clouds in top 70% of screen
        delay: (i / cloudCount) * 20 - 10, // Negative delays ensure clouds are visible immediately at page load
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
          className="absolute animate-float"
          style={{
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            animationDelay: `${cloud.delay}s`,
            animationDuration: `${cloud.animationDuration}s`,
          }}
        >
          <Cloud size={cloud.size} opacity={cloud.opacity} />
        </div>
      ))}
    </div>
  );
}
