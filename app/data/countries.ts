export interface CountryData {
  id: string;
  title: string;
  defaultImage: string;
  date: string;
  description: string;
}

export const countries: CountryData[] = [
  {
    id: "mexico",
    title: "Mexico",
    defaultImage: "IMG_4191.jpg",
    date: "June 2025",
    description:
      "Colors, flavors, and a growing tech scene. Mexico offered an excellent base for both work and exploration.",
  },
  {
    id: "indonesia",
    title: "Indonesia",
    defaultImage: "IMG_3467 2.jpg",
    date: "May 2025",
    description:
      "Remote communities, lush nature, and great weather. An inspiring base to keep motivation high.",
  },
  {
    id: "malaysia",
    title: "Malaysia",
    defaultImage: "IMG_3115.jpg",
    date: "April 2025",
    description:
      "A cultural blend with strong infrastructure. Perfect for alternating between city life and nature.",
  },
  {
    id: "vietnam",
    title: "Vietnam",
    defaultImage: "IMG_2813.jpg",
    date: "March 2025",
    description:
      "Great coffee shops and dynamic cities. Ideal for deep work cycles and food-filled evenings.",
  },
  {
    id: "cambodia",
    title: "Cambodia",
    defaultImage: "IMG_2490.jpg",
    date: "February 2025",
    description:
      "A slower pace of life and unique temples. A perfect place to unwind after work and recharge inspiration.",
  },
  {
    id: "thailand",
    title: "Thailand",
    defaultImage: "IMG_1907.jpg",
    date: "January 2025",
    description:
      "Beaches, incredible food, and buzzing coworking hubs. High productivity paired with nature and culture.",
  },
  {
    id: "turkey",
    title: "Turkey",
    defaultImage: "IMG_1399.jpg",
    date: "December 2024",
    description:
      "A bridge between cultures with vibrant markets and Bosphorus views. Constant inspiration between tasks and commits.",
  },
  {
    id: "portugal",
    title: "Portugal",
    defaultImage: "IMG_0901.jpg",
    date: "November 2024",
    description:
      "Sunny weather, delicious food, and active nomad communities. Great quality of life for both work and exploration.",
  },
  {
    id: "japan",
    title: "Japan",
    defaultImage: "IMG_9838 2.jpg",
    date: "October 2024",
    description:
      "High speed, order, and fascinating culture. Perfect for intense sprints of work and endless discoveries in the city.",
  },
  {
    id: "czech-republic",
    title: "Czech Republic",
    defaultImage: "IMG_8690.jpg",
    date: "September 2024",
    description:
      "Peaceful cafés for focus and charming streets for evening walks. A great blend of tech scene and cultural richness.",
  },
  {
    id: "romania",
    title: "Romania",
    defaultImage: "IMG_8468.jpg",
    date: "August 2024",
    description:
      "Castles, mountains, and reliable connectivity. Romania was ideal for switching between remote work and medieval escapes.",
  },
  {
    id: "hungary",
    title: "Hungary",
    defaultImage: "IMG_8009.jpg",
    date: "July 2024",
    description:
      "Hungary offered the perfect mix of history and productivity. Mornings coding near the Danube and afternoons exploring impressive architecture.",
  },
  {
    id: "bulgaria",
    title: "Bulgaria",
    defaultImage: "IMG_8116.jpg",
    date: "June 2024",
    description:
      "Bulgaria surprised me with its rich history and affordable lifestyle. Working from Sofia's vibrant neighborhoods while exploring ancient architecture and mountain landscapes.",
  },
  {
    id: "spain",
    title: "Spain",
    defaultImage: "IMG_6095 2.jpg",
    date: "May 2024",
    description:
      "Spain welcomed me with its energy and nightlife. Working from creative districts like Malasaña and Chueca was vibrant and inspiring, fueling my creativity every day.",
  },
  {
    id: "france",
    title: "France",
    defaultImage: "IMG_5968.jpg",
    date: "March 2024",
    description:
      "France became my office for a month. Between video calls in Montmartre and coding sessions in the Marais, I learned how to balance productivity with the art of living.",
  },
  {
    id: "italy",
    title: "Italy",
    defaultImage: "16.jpg",
    date: "January 2024",
    description:
      "My first stop as a digital nomad. I worked from cozy cafés and spent afternoons exploring historic landmarks. A unique experience mixing remote work with Italy's rich history and cuisine.",
  },
];

// Helper function to get the default image URL for a country
export function getDefaultImageUrl(country: CountryData): string {
  return `/assets/${country.id}/${country.defaultImage}`;
}
