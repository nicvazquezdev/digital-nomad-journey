import Sky from "./components/Sky";
import CloudsContainer from "./components/CloudsContainer";
import Airplane from "./components/Airplane";

export default function Home() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Sky className="absolute inset-0" />

      <CloudsContainer cloudCount={8} />

      <Airplane size="large" position={{ x: 10, y: 40 }} />
    </div>
  );
}
