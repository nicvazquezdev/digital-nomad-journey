"use client";

import Image from "next/image";
import { useState } from "react";
import { useImages } from "../hooks/useImages";

interface ImageGalleryProps {
  cityId: string;
  cityTitle: string;
}

export default function ImageGallery({ cityId, cityTitle }: ImageGalleryProps) {
  const { images, loading, error } = useImages(cityId);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  };

  const getGridLayoutClass = (imageCount: number) => {
    if (imageCount === 1) return "grid-cols-1 max-w-2xl mx-auto";
    if (imageCount === 2) return "grid-cols-1 md:grid-cols-2";
    if (imageCount <= 4) return "grid-cols-1 md:grid-cols-2";
    if (imageCount <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (imageCount <= 9) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  const getImageAspectRatio = (imageCount: number) => {
    if (imageCount === 1) return "aspect-[16/10]";
    if (imageCount === 2) return "aspect-[4/3]";
    return "aspect-[4/3]";
  };

  const getSizes = (imageCount: number) => {
    if (imageCount === 1) return "800px";
    if (imageCount === 2) return "(max-width: 768px) 100vw, 50vw";
    if (imageCount <= 4)
      return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw";
    if (imageCount <= 6)
      return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
    return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw";
  };

  if (loading) {
    return (
      <div className="mb-6 flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        <span className="ml-2 text-gray-600">Loading images...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading images: {error}</p>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-600">No images found for {cityTitle}</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className={`grid gap-4 ${getGridLayoutClass(images.length)}`}>
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer ${getImageAspectRatio(
              images.length,
            )}`}
            onClick={() => setSelectedImage(index)}
          >
            {/* Loading skeleton */}
            {!loadedImages.has(index) && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            )}

            <Image
              src={imageUrl}
              alt={`${cityTitle} - Imagen ${index + 1}`}
              fill
              className={`object-cover transition-all duration-300 ${
                loadedImages.has(index)
                  ? "opacity-100 group-hover:scale-105"
                  : "opacity-0"
              }`}
              sizes={getSizes(images.length)}
              loading={index < 3 ? "eager" : "lazy"}
              priority={index < 3}
              onLoad={() => handleImageLoad(index)}
            />

            {/* Vintage photo effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-orange-200/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Image number indicator for many images */}
            {images.length > 6 && (
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {index + 1}
              </div>
            )}

            {/* Click indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <div className="bg-white/90 rounded-full p-2">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery summary for many images */}
      {images.length > 8 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 italic">
            Una colección de {images.length} momentos especiales de {cityTitle}
          </p>
        </div>
      )}

      {/* Load progress indicator for many images */}
      {images.length > 6 && (
        <div className="mt-3 text-center">
          <div className="text-xs text-gray-500">
            Cargadas: {loadedImages.size} de {images.length} imágenes
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div
              className="bg-amber-400 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(loadedImages.size / images.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Image lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={images[selectedImage]}
              alt={`${cityTitle} - Imagen ${selectedImage + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6 text-white"
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

            {/* Navigation arrows for multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(
                      selectedImage > 0 ? selectedImage - 1 : images.length - 1,
                    );
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6 text-white"
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

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(
                      selectedImage < images.length - 1 ? selectedImage + 1 : 0,
                    );
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6 text-white"
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
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} de {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
