"use client";

import Image from "next/image";
import { CountryData, getDefaultImageUrl } from "../data/countries";
import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";

interface DigitalNomadModalProps {
  country: CountryData | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigatePrevious?: () => void;
  onNavigateNext?: () => void;
  canNavigatePrevious?: boolean;
  canNavigateNext?: boolean;
}

export default function DigitalNomadModal({
  country,
  isOpen,
  onClose,
  onNavigatePrevious,
  onNavigateNext,
  canNavigatePrevious = false,
  canNavigateNext = false,
}: DigitalNomadModalProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Reset description expansion when country changes
  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [country?.id]);

  // Helper function to truncate text
  const getTruncatedText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const shouldShowToggle = (text: string, maxLength: number = 200) => {
    return text.length > maxLength;
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (
        e.key === "ArrowLeft" &&
        canNavigatePrevious &&
        onNavigatePrevious
      ) {
        e.preventDefault();
        onNavigatePrevious();
      } else if (e.key === "ArrowRight" && canNavigateNext && onNavigateNext) {
        e.preventDefault();
        onNavigateNext();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [
    isOpen,
    onClose,
    onNavigatePrevious,
    onNavigateNext,
    canNavigatePrevious,
    canNavigateNext,
  ]);

  if (!isOpen || !country) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Previous Navigation Button */}
      {canNavigatePrevious && onNavigatePrevious && (
        <button
          onClick={onNavigatePrevious}
          className="absolute left-4 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 group"
          aria-label="Previous country"
        >
          <svg
            className="w-6 h-6 text-gray-700 group-hover:text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Next Navigation Button */}
      {canNavigateNext && onNavigateNext && (
        <button
          onClick={onNavigateNext}
          className="absolute right-4 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 group"
          aria-label="Next country"
        >
          <svg
            className="w-6 h-6 text-gray-700 group-hover:text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] border-4 border-white flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header - Fixed on desktop, scrollable on mobile */}
        <div className="hidden md:block relative h-64 md:h-72 overflow-hidden rounded-t-2xl flex-shrink-0">
          <Image
            src={getDefaultImageUrl(country)}
            alt={country.title}
            fill
            className="object-cover"
            sizes="800px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-transparent to-orange-200/40 mix-blend-overlay" />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="text-4xl font-bold text-white font-serif mb-2">
              {country.title}
            </h1>
            <p className="text-xl text-amber-100 font-medium">{country.date}</p>
          </div>
        </div>

        {/* Content - Scrollable section that includes header on mobile, description and gallery */}
        <div className="flex-1 overflow-y-auto">
          {/* Header for mobile - Inside scrollable area */}
          <div className="md:hidden relative h-64 overflow-hidden rounded-t-2xl flex-shrink-0">
            <Image
              src={getDefaultImageUrl(country)}
              alt={country.title}
              fill
              className="object-cover"
              sizes="800px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-transparent to-orange-200/40 mix-blend-overlay" />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-4xl font-bold text-white font-serif mb-2">
                {country.title}
              </h1>
              <p className="text-xl text-amber-100 font-medium">
                {country.date}
              </p>
            </div>
          </div>

          {/* Description and Gallery */}
          <div className="px-8 py-4 pb-8">
            {/* Description */}
            <div className="mb-6">
              <p className="md:text-lg text-gray-700 leading-relaxed">
                {isDescriptionExpanded
                  ? country.description
                  : getTruncatedText(country.description)}
              </p>
              {shouldShowToggle(country.description) && (
                <button
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  className="mt-2 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors duration-200 underline decoration-dotted underline-offset-2 cursor-pointer"
                >
                  {isDescriptionExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            {/* Image Gallery */}
            <ImageGallery countryId={country.id} countryTitle={country.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
