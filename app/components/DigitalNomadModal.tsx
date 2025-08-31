"use client";

import Image from "next/image";
import { CountryData, getDefaultImageUrl } from "../data/countries";
import { useEffect } from "react";
import ImageGallery from "./ImageGallery";

interface DigitalNomadModalProps {
  country: CountryData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DigitalNomadModal({
  country,
  isOpen,
  onClose,
}: DigitalNomadModalProps) {
  // Close modal with Escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !country) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

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

        {/* Header */}
        <div className="relative h-64 md:h-72 overflow-hidden rounded-t-2xl flex-shrink-0">
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

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Description - Fixed section */}
          <p className="px-8 py-4 md:text-lg text-gray-700 leading-relaxed flex-shrink-0">
            {country.description}
          </p>

          {/* Image Gallery - Scrollable section */}
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            <ImageGallery countryId={country.id} countryTitle={country.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
