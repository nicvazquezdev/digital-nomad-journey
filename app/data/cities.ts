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
    id: "italy",
    title: "Italy",
    imageUrl: "/assets/italy/16.jpg",
    date: "January 2024",
    description:
      "My first stop as a digital nomad. I worked from cozy cafés and spent afternoons exploring historic landmarks. A unique experience mixing remote work with Italy's rich history and cuisine.",
    images: [
      "/assets/italy/1.jpg",
      "/assets/italy/2.jpg",
      "/assets/italy/3.jpg",
      "/assets/italy/4.jpg",
      "/assets/italy/5.jpg",
      "/assets/italy/6.jpg",
      "/assets/italy/7.jpg",
      "/assets/italy/8.jpg",
      "/assets/italy/9.jpg",
      "/assets/italy/10.jpg",
      "/assets/italy/11.jpg",
      "/assets/italy/12.jpg",
      "/assets/italy/13.jpg",
      "/assets/italy/14.jpg",
      "/assets/italy/15.jpg",
      "/assets/italy/16.jpg",
      "/assets/italy/17.jpg",
      "/assets/italy/18.jpg",
      "/assets/italy/19.jpg",
    ],
  },
  {
    id: "france",
    title: "France",
    imageUrl: "/assets/france/IMG_5968.jpg",
    date: "March 2024",
    description:
      "France became my office for a month. Between video calls in Montmartre and coding sessions in the Marais, I learned how to balance productivity with the art of living.",
    images: [
      "/assets/france/4D7F9EEE-4042-473D-8DFB-D01251591C88.JPG",
      "/assets/france/81db7d57-d5db-4dee-ade1-101e5ae629f7.JPG",
      "/assets/france/bc283056-8a22-432c-8e2e-e907593a5759.JPG",
      "/assets/france/D1301DEC-68EE-4D2D-B6DE-D0DC277884C7.JPG",
      "/assets/france/IMG_5757.jpg",
      "/assets/france/IMG_5760 2.JPG",
      "/assets/france/IMG_5780 (1).JPG",
      "/assets/france/IMG_5787.jpg",
      "/assets/france/IMG_5791.jpg",
      "/assets/france/IMG_5798.jpg",
      "/assets/france/IMG_5818.jpg",
      "/assets/france/IMG_5820.jpg",
      "/assets/france/IMG_5823.jpg",
      "/assets/france/IMG_5824.jpg",
      "/assets/france/IMG_5828.jpg",
      "/assets/france/IMG_5831.jpg",
      "/assets/france/IMG_5832.jpg",
      "/assets/france/IMG_5836.jpg",
      "/assets/france/IMG_5898.jpg",
      "/assets/france/IMG_5908.jpg",
      "/assets/france/IMG_5926.jpg",
      "/assets/france/IMG_5933.jpg",
      "/assets/france/IMG_5947.jpg",
      "/assets/france/IMG_5950.jpg",
      "/assets/france/IMG_5961.jpg",
      "/assets/france/IMG_5968.jpg",
    ],
  },
  {
    id: "spain",
    title: "Spain",
    imageUrl:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=250&fit=crop&q=80",
    date: "May 2024",
    description:
      "Spain welcomed me with its energy and nightlife. Working from creative districts like Malasaña and Chueca was vibrant and inspiring, fueling my creativity every day.",
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "hungary",
    title: "Hungary",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "July 2024",
    description:
      "Hungary offered the perfect mix of history and productivity. Mornings coding near the Danube and afternoons exploring impressive architecture.",
    images: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "romania",
    title: "Romania",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "August 2024",
    description:
      "Castles, mountains, and reliable connectivity. Romania was ideal for switching between remote work and medieval escapes.",
    images: [
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "czech-republic",
    title: "Czech Republic",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "September 2024",
    description:
      "Peaceful cafés for focus and charming streets for evening walks. A great blend of tech scene and cultural richness.",
    images: [
      "https://images.unsplash.com/photo-1548986673-6792a14af2d0?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517780280-96f0efd14480?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "japan",
    title: "Japan",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "October 2024",
    description:
      "High speed, order, and fascinating culture. Perfect for intense sprints of work and endless discoveries in the city.",
    images: [
      "https://images.unsplash.com/photo-1516449206424-9a4fd9a82e6e?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520814572694-2749e3f453b3?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "portugal",
    title: "Portugal",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "November 2024",
    description:
      "Sunny weather, delicious food, and active nomad communities. Great quality of life for both work and exploration.",
    images: [
      "https://images.unsplash.com/photo-1546819462-7b8f1c83b7c8?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543258935-abc0e9e89b03?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "turkey",
    title: "Turkey",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "December 2024",
    description:
      "A bridge between cultures with vibrant markets and Bosphorus views. Constant inspiration between tasks and commits.",
    images: [
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "thailand",
    title: "Thailand",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "January 2025",
    description:
      "Beaches, incredible food, and buzzing coworking hubs. High productivity paired with nature and culture.",
    images: [
      "https://images.unsplash.com/photo-1517780280-96f0efd14480?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "cambodia",
    title: "Cambodia",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "February 2025",
    description:
      "A slower pace of life and unique temples. A perfect place to unwind after work and recharge inspiration.",
    images: [
      "https://images.unsplash.com/photo-1548986673-6792a14af2d0?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516449206424-9a4fd9a82e6e?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "vietnam",
    title: "Vietnam",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "March 2025",
    description:
      "Great coffee shops and dynamic cities. Ideal for deep work cycles and food-filled evenings.",
    images: [
      "https://images.unsplash.com/photo-1520814572694-2749e3f453b3?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517780280-96f0efd14480?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "malaysia",
    title: "Malaysia",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "April 2025",
    description:
      "A cultural blend with strong infrastructure. Perfect for alternating between city life and nature.",
    images: [
      "https://images.unsplash.com/photo-1546819462-7b8f1c83b7c8?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543258935-abc0e9e89b03?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "indonesia",
    title: "Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "May 2025",
    description:
      "Remote communities, lush nature, and great weather. An inspiring base to keep motivation high.",
    images: [
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&h=400&fit=crop&q=80",
    ],
  },
  {
    id: "mexico",
    title: "Mexico",
    imageUrl:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop&q=80",
    date: "June 2025",
    description:
      "Colors, flavors, and a growing tech scene. Mexico offered an excellent base for both work and exploration.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=400&fit=crop&q=80",
    ],
  },
];
