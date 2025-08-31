"use client";

import { useState } from "react";
import Sky from "./components/Sky";
import CloudsContainer from "./components/CloudsContainer";
import Airplane from "./components/Airplane";
import FloatingCardsContainer from "./components/FloatingCardsContainer";
import DigitalNomadModal from "./components/DigitalNomadModal";
import { type CountryData } from "./data/countries";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dismissedCards, setDismissedCards] = useState<Set<string>>(new Set());

  const handleCardClick = (country: CountryData) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  const handleDismissCard = (countryId: string) => {
    setDismissedCards((prev) => new Set([...prev, countryId]));
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
        <FloatingCardsContainer
          onCardClick={handleCardClick}
          onDismissCard={handleDismissCard}
          dismissedCards={dismissedCards}
        />
      </div>

      <Airplane size="large" position={{ x: 10, y: 40 }} />

      <DigitalNomadModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
