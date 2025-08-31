import { useState, useEffect } from "react";

interface ImageResponse {
  country: string;
  images: string[];
  count: number;
}

// Global cache to store images by country
const imageCache = new Map<string, string[]>();
const loadingCache = new Set<string>();

export function useImages(countryId: string) {
  // Initialize states based on whether it's already cached
  const [images, setImages] = useState<string[]>(() =>
    countryId && imageCache.has(countryId) ? imageCache.get(countryId)! : [],
  );
  const [loading, setLoading] = useState(() =>
    countryId && imageCache.has(countryId) ? false : true,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryId) return;

    // If we already have the images in cache, use them immediately
    if (imageCache.has(countryId)) {
      setImages(imageCache.get(countryId)!);
      setLoading(false);
      setError(null);
      return;
    }

    // If this country is already being loaded, wait
    if (loadingCache.has(countryId)) {
      // Polling to check when it finishes loading
      const pollInterval = setInterval(() => {
        if (imageCache.has(countryId)) {
          setImages(imageCache.get(countryId)!);
          setLoading(false);
          setError(null);
          clearInterval(pollInterval);
        }
      }, 100);

      return () => clearInterval(pollInterval);
    }

    // Only set loading if it wasn't initially cached
    if (!imageCache.has(countryId)) {
      setLoading(true);
    }
    setError(null);

    const fetchImages = async () => {
      try {
        loadingCache.add(countryId);

        const response = await fetch(`/api/images/${countryId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`);
        }

        const data: ImageResponse = await response.json();

        // Save to cache
        imageCache.set(countryId, data.images);
        setImages(data.images);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load images";
        setError(errorMessage);
        setImages([]);
        setLoading(false);
      } finally {
        loadingCache.delete(countryId);
      }
    };

    fetchImages();
  }, [countryId]);

  return { images, loading, error };
}

// Function to preload images from all countries
export async function preloadAllImages(countryIds: string[]) {
  const promises = countryIds.map(async (countryId) => {
    if (imageCache.has(countryId)) return; // Already cached

    try {
      const response = await fetch(`/api/images/${countryId}`);
      if (response.ok) {
        const data: ImageResponse = await response.json();
        imageCache.set(countryId, data.images);
      }
    } catch (error) {
      console.warn(`Failed to preload images for ${countryId}:`, error);
    }
  });

  await Promise.all(promises);
}

// Function to clear cache if necessary
export function clearImageCache() {
  imageCache.clear();
  loadingCache.clear();
}
