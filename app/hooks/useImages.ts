import { useState, useEffect } from "react";

interface ImageResponse {
  city: string;
  images: string[];
  count: number;
}

export function useImages(cityId: string) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cityId) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/images/${cityId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`);
        }

        const data: ImageResponse = await response.json();
        setImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load images");
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [cityId]);

  return { images, loading, error };
}
