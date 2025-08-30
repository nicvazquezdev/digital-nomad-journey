"use client";

import Image from "next/image";
import { CityData } from "../data/cities";
import { useEffect } from "react";

interface DigitalNomadModalProps {
  city: CityData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DigitalNomadModal({
  city,
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

  if (!isOpen || !city) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border-4 border-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Cerrar modal"
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
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <Image
            src={city.imageUrl}
            alt={city.title}
            fill
            className="object-cover"
            sizes="800px"
            priority
          />
          {/* Vintage overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-transparent to-orange-200/40 mix-blend-overlay" />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="text-4xl font-bold text-white font-serif mb-2">
              {city.title}
            </h1>
            <p className="text-xl text-amber-100 font-medium">{city.date}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">
              Mi Experiencia
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {city.description}
            </p>
          </div>

          {/* Image Gallery */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-serif">
              Galería de Recuerdos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <Image
                    src={imageUrl}
                    alt={`${city.title} - Imagen ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Vintage photo effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-orange-200/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Decorative postcard elements */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4 text-gray-500">
              {/* Postmark decoration */}
              <div className="w-16 h-16 border-2 border-red-400/60 rounded-full flex items-center justify-center">
                <div className="w-10 h-10 border border-red-400/40 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-red-400">
                    {city.date.split(" ")[1]}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  Nómada Digital Journey
                </p>
                <div className="flex space-x-1 mt-1">
                  <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
