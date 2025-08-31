"use client";

import { useState, useEffect } from "react";
import Sky from "./components/Sky";
import CloudsContainer from "./components/CloudsContainer";
import Airplane from "./components/Airplane";
import FloatingCardsContainer from "./components/FloatingCardsContainer";
import DigitalNomadModal from "./components/DigitalNomadModal";
import { type CityData, cities } from "./data/cities";
import { preloadAllImages } from "./hooks/useImages";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dismissedCards, setDismissedCards] = useState<Set<string>>(new Set());

  // Precargar todas las imágenes al inicio
  useEffect(() => {
    const cityIds = cities.map((city) => city.id);
    preloadAllImages(cityIds).catch((error) => {
      console.warn("Failed to preload some images:", error);
    });
  }, []);

  const handleCardClick = (city: CityData) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
  };

  const handleDismissCard = (cityId: string) => {
    setDismissedCards((prev) => new Set([...prev, cityId]));
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
        city={selectedCity}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
