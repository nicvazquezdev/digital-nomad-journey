"use client";

import { useState } from "react";
import Sky from "./components/Sky";
import CloudsContainer from "./components/CloudsContainer";
import Airplane from "./components/Airplane";
import FloatingCardsContainer from "./components/FloatingCardsContainer";
import DigitalNomadModal from "./components/DigitalNomadModal";
import { type CityData } from "./data/cities";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (city: CityData) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
  };

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
        <FloatingCardsContainer onCardClick={handleCardClick} />
      </div>

      <Airplane size="large" position={{ x: 10, y: 40 }} />

      <DigitalNomadModal
        city={selectedCity}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
