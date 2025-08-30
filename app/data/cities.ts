export interface CityData {
  id: string;
  title: string;
  imageUrl: string;
}

export const cities: CityData[] = [
  {
    id: "roma",
    title: "Roma",
    imageUrl:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop&q=80",
  },
  {
    id: "paris",
    title: "París",
    imageUrl:
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=250&fit=crop&q=80",
  },
  {
    id: "madrid",
    title: "Madrid",
    imageUrl:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=250&fit=crop&q=80",
  },
  {
    id: "barcelona",
    title: "Barcelona",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
  },
];
