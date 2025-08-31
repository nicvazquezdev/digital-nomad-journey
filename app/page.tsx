"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sky from "./components/Sky";
import CloudsContainer from "./components/CloudsContainer";
import Airplane from "./components/Airplane";
import FloatingCardsContainer from "./components/FloatingCardsContainer";
import DigitalNomadModal from "./components/DigitalNomadModal";
import DragHint from "./components/DragHint";
import GitHubLink from "./components/GitHubLink";
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
    <main className="w-screen h-screen relative overflow-hidden">
      <Sky className="z-0" />

      <div
        className="fixed inset-0 z-10"
        role="presentation"
        aria-hidden="true"
      >
        <CloudsContainer cloudCount={25} />
      </div>

      <MainTitle />

      <section
        className="fixed inset-0 z-20"
        aria-label="Interactive travel destinations"
      >
        <FloatingCardsContainer
          onCardClick={handleCardClick}
          onDismissCard={handleDismissCard}
          dismissedCards={dismissedCards}
        />

        {/* Bottom UI elements */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <GitHubLink />
          <DragHint />
        </div>
      </section>

      <div
        className="fixed"
        style={{ left: "10%", top: "40%" }}
        role="presentation"
        aria-hidden="true"
      >
        <Airplane size="large" position={{ x: 10, y: 40 }} />
      </div>

      <DigitalNomadModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigatePrevious={handleNavigatePrevious}
        onNavigateNext={handleNavigateNext}
        canNavigatePrevious={canNavigatePrevious}
        canNavigateNext={canNavigateNext}
      />

      {/* Hidden content for SEO */}
      <div className="sr-only">
        <h1>Nicolas Vazquez - Digital Nomad Journey</h1>
        <p>
          Welcome to my digital nomad journey! I&apos;m Nicolas Vazquez, and
          I&apos;ve traveled to over 16 countries as a remote worker and digital
          nomad. Explore my authentic travel experiences, photography, and
          honest destination reviews from Japan, Thailand, Portugal, Hungary,
          and many more incredible places.
        </p>
        <h2>Countries I&apos;ve Visited as a Digital Nomad</h2>
        <ul>
          {countries.map((country) => (
            <li key={country.id}>
              <strong>{country.title}</strong> - {country.date}:{" "}
              {country.description.substring(0, 100)}...
            </li>
          ))}
        </ul>
        <h2>Digital Nomad Travel Topics</h2>
        <p>
          Remote work, solo travel, backpacking, cultural experiences, travel
          photography, destination guides, nomad lifestyle, Southeast Asia
          travel, European adventures, travel tips, and authentic travel
          stories.
        </p>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
