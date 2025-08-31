import { useState, useEffect } from "react";

interface ImageResponse {
  city: string;
  images: string[];
  count: number;
}

// Cache global para almacenar las imágenes por ciudad
const imageCache = new Map<string, string[]>();
const loadingCache = new Set<string>();

export function useImages(cityId: string) {
  // Inicializar estados basándose en si ya está en caché
  const [images, setImages] = useState<string[]>(() =>
    cityId && imageCache.has(cityId) ? imageCache.get(cityId)! : [],
  );
  const [loading, setLoading] = useState(() =>
    cityId && imageCache.has(cityId) ? false : true,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cityId) return;

    // Si ya tenemos las imágenes en caché, usarlas inmediatamente
    if (imageCache.has(cityId)) {
      setImages(imageCache.get(cityId)!);
      setLoading(false);
      setError(null);
      return;
    }

    // Si ya se está cargando esta ciudad, esperar
    if (loadingCache.has(cityId)) {
      // Polling para verificar cuando termine de cargar
      const pollInterval = setInterval(() => {
        if (imageCache.has(cityId)) {
          setImages(imageCache.get(cityId)!);
          setLoading(false);
          setError(null);
          clearInterval(pollInterval);
        }
      }, 100);

      return () => clearInterval(pollInterval);
    }

    // Solo establecer loading si no estaba en caché inicialmente
    if (!imageCache.has(cityId)) {
      setLoading(true);
    }
    setError(null);

    const fetchImages = async () => {
      try {
        loadingCache.add(cityId);

        const response = await fetch(`/api/images/${cityId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`);
        }

        const data: ImageResponse = await response.json();

        // Guardar en caché
        imageCache.set(cityId, data.images);
        setImages(data.images);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load images";
        setError(errorMessage);
        setImages([]);
        setLoading(false);
      } finally {
        loadingCache.delete(cityId);
      }
    };

    fetchImages();
  }, [cityId]);

  return { images, loading, error };
}

// Función para precargar imágenes de todas las ciudades
export async function preloadAllImages(cityIds: string[]) {
  const promises = cityIds.map(async (cityId) => {
    if (imageCache.has(cityId)) return; // Ya está en caché

    try {
      const response = await fetch(`/api/images/${cityId}`);
      if (response.ok) {
        const data: ImageResponse = await response.json();
        imageCache.set(cityId, data.images);
      }
    } catch (error) {
      console.warn(`Failed to preload images for ${cityId}:`, error);
    }
  });

  await Promise.all(promises);
}

// Función para limpiar el caché si es necesario
export function clearImageCache() {
  imageCache.clear();
  loadingCache.clear();
}
