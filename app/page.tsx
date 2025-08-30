import Sky from "./components/Sky";
import CloudsContainer from "./components/CloudsContainer";
import Airplane from "./components/Airplane";
import FloatingCardsContainer from "./components/FloatingCardsContainer";

export default function Home() {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Full page sky background */}
      <Sky className="z-0" />

      {/* Full page clouds */}
      <div className="fixed inset-0 z-10">
        <CloudsContainer cloudCount={25} />
      </div>

      {/* Floating cards */}
      <div className="fixed inset-0 z-20">
        <FloatingCardsContainer />
      </div>

      <Airplane size="large" position={{ x: 10, y: 40 }} />
    </div>
  );
}
