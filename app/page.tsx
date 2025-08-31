"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sky from "./components/Sky";
import CloudsContainer from "./components/CloudsContainer";
import Airplane from "./components/Airplane";
import FloatingCardsContainer from "./components/FloatingCardsContainer";
import DigitalNomadModal from "./components/DigitalNomadModal";
import DragHint from "./components/DragHint";
import MainTitle from "./components/MainTitle";
import { type CountryData, countries } from "./data/countries";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dismissedCards, setDismissedCards] = useState<Set<string>>(new Set());

  // Effect to handle URL query params on initial load and changes
  useEffect(() => {
    const countryParam = searchParams.get("country");
    if (countryParam) {
      const country = countries.find((c) => c.id === countryParam);
      if (country) {
        setSelectedCountry(country);
        setIsModalOpen(true);
      } else {
        // Invalid country param, remove it
        router.replace("/");
      }
    }
  }, [searchParams, router]);

  // Function to update URL with country param
  const updateUrlWithCountry = (countryId: string | null) => {
    const url = new URL(window.location.href);
    if (countryId) {
      url.searchParams.set("country", countryId);
    } else {
      url.searchParams.delete("country");
    }
    router.replace(url.pathname + url.search);
  };

  const handleCardClick = (country: CountryData) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
    updateUrlWithCountry(country.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
    updateUrlWithCountry(null);
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

    let newCountry;
    // Circular navigation: if at first, go to last
    if (currentIndex === 0) {
      newCountry = visibleCountries[visibleCountries.length - 1];
    } else {
      newCountry = visibleCountries[currentIndex - 1];
    }

    setSelectedCountry(newCountry);
    updateUrlWithCountry(newCountry.id);
  };

  const handleNavigateNext = () => {
    if (!selectedCountry) return;

    const visibleCountries = countries.filter(
      (country) => !dismissedCards.has(country.id),
    );
    const currentIndex = visibleCountries.findIndex(
      (country) => country.id === selectedCountry.id,
    );

    let newCountry;
    // Circular navigation: if at last, go to first
    if (currentIndex === visibleCountries.length - 1) {
      newCountry = visibleCountries[0];
    } else {
      newCountry = visibleCountries[currentIndex + 1];
    }

    setSelectedCountry(newCountry);
    updateUrlWithCountry(newCountry.id);
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
