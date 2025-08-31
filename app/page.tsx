"use client";

import { useState } from "react";
import Sky from "./components/Sky";
import CloudsContainer from "./components/CloudsContainer";
import Airplane from "./components/Airplane";
import FloatingCardsContainer from "./components/FloatingCardsContainer";
import DigitalNomadModal from "./components/DigitalNomadModal";
import DragHint from "./components/DragHint";
import MainTitle from "./components/MainTitle";
import { type CountryData, countries } from "./data/countries";

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

  // Navigation functions for modal (circular navigation)
  const handleNavigatePrevious = () => {
    if (!selectedCountry) return;

    const visibleCountries = countries.filter(
      (country) => !dismissedCards.has(country.id),
    );
    const currentIndex = visibleCountries.findIndex(
      (country) => country.id === selectedCountry.id,
    );

    // Circular navigation: if at first, go to last
    if (currentIndex === 0) {
      setSelectedCountry(visibleCountries[visibleCountries.length - 1]);
    } else {
      setSelectedCountry(visibleCountries[currentIndex - 1]);
    }
  };

  const handleNavigateNext = () => {
    if (!selectedCountry) return;

    const visibleCountries = countries.filter(
      (country) => !dismissedCards.has(country.id),
    );
    const currentIndex = visibleCountries.findIndex(
      (country) => country.id === selectedCountry.id,
    );

    // Circular navigation: if at last, go to first
    if (currentIndex === visibleCountries.length - 1) {
      setSelectedCountry(visibleCountries[0]);
    } else {
      setSelectedCountry(visibleCountries[currentIndex + 1]);
    }
  };

  // Check if navigation is possible (always true for circular navigation)
  const getNavigationState = () => {
    if (!selectedCountry)
      return { canNavigatePrevious: false, canNavigateNext: false };

    const visibleCountries = countries.filter(
      (country) => !dismissedCards.has(country.id),
    );

    // Navigation is always possible if there's more than one country
    const hasMultipleCountries = visibleCountries.length > 1;

    return {
      canNavigatePrevious: hasMultipleCountries,
      canNavigateNext: hasMultipleCountries,
    };
  };

  const { canNavigatePrevious, canNavigateNext } = getNavigationState();

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <Sky className="z-0" />

      <div className="fixed inset-0 z-10">
        <CloudsContainer cloudCount={25} />
      </div>

      <MainTitle />

      <div className="fixed inset-0 z-20">
        <FloatingCardsContainer
          onCardClick={handleCardClick}
          onDismissCard={handleDismissCard}
          dismissedCards={dismissedCards}
        />

        <DragHint />
      </div>

      <Airplane size="large" position={{ x: 10, y: 40 }} />

      <DigitalNomadModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigatePrevious={handleNavigatePrevious}
        onNavigateNext={handleNavigateNext}
        canNavigatePrevious={canNavigatePrevious}
        canNavigateNext={canNavigateNext}
      />
    </div>
  );
}
