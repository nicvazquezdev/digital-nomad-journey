import Sky from "./components/Sky";
import CloudsContainer from "./components/CloudsContainer";

export default function Home() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Sky background */}
      <Sky className="absolute inset-0" />

      {/* Animated clouds */}
      <CloudsContainer cloudCount={8} />
    </div>
  );
}
