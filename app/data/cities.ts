export interface CityData {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  description: string;
  images: string[];
}

export const cities: CityData[] = [
  {
    id: "roma",
    title: "Roma",
    imageUrl:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop&q=80",
    date: "Enero 2024",
    description:
      "Mi primera parada como nómada digital en la ciudad eterna. Trabajé desde cafeterías cerca del Coliseo y pasé las tardes explorando los increíbles sitios históricos. Una experiencia única mezclar trabajo remoto con la rica historia romana.",
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548986673-6792a14af2d0?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "paris",
    title: "París",
    imageUrl:
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=250&fit=crop&q=80",
    date: "Marzo 2024",
    description:
      "La ciudad de la luz se convirtió en mi oficina durante un mes. Entre meetings en video desde Montmartre y sesiones de código en el Marais, París me enseñó el equilibrio perfecto entre trabajo y arte de vivir.",
    images: [
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1471623320832-752e8bbf8413?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508654041163-4615619b5c41?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "madrid",
    title: "Madrid",
    imageUrl:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=250&fit=crop&q=80",
    date: "Mayo 2024",
    description:
      "Madrid me recibió con sus brazos abiertos y su increíble vida nocturna. Trabajar desde Malasaña y Chueca fue una experiencia vibrante. La energía de la ciudad alimentaba mi creatividad cada día.",
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "barcelona",
    title: "Barcelona",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "Julio 2024",
    description:
      "Barcelona combinó perfectamente playa y trabajo. Mis mañanas empezaban con código frente al mar Mediterráneo y las tardes explorando la arquitectura de Gaudí. Una ciudad que respira creatividad e innovación.",
    images: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517780280-96f0efd14480?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548986673-6792a14af2d0?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516449206424-9a4fd9a82e6e?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520814572694-2749e3f453b3?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546819462-7b8f1c83b7c8?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543258935-abc0e9e89b03?w=600&h=400&fit=crop&q=80",
    ],
  },
];
