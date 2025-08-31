import { Metadata } from "next";
import { CountryData } from "../data/countries";

export function generateCountryMetadata(country: CountryData): Metadata {
  const title = `${country.title} Travel Guide - Nicolas Vazquez Digital Nomad`;
  const description = `${country.description.substring(0, 160)}...`;
  const url = `/?country=${country.id}`;
  const imageUrl = `/assets/${country.id}/${country.defaultImage}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${country.title} travel photography by Nicolas Vazquez`,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateJsonLd(country?: CountryData) {
  const baseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nicolas Vazquez",
    jobTitle: "Digital Nomad & Solo Traveler",
    description:
      "Digital nomad sharing authentic travel experiences from around the world",
    url:
      process.env.NEXT_PUBLIC_SITE_URL || "https://traveler-journey.vercel.app",
    image: "/assets/japan/IMG_9838 2.jpg",
    sameAs: ["https://linkedin.com/in/nicvazquez"],
    knowsAbout: [
      "Digital Nomad Lifestyle",
      "Remote Work",
      "Travel Photography",
      "Solo Travel",
      "Backpacking",
      "Southeast Asia Travel",
      "European Travel",
      "Cultural Experiences",
    ],
  };

  if (country) {
    return {
      "@context": "https://schema.org",
      "@type": "TravelAction",
      agent: {
        "@type": "Person",
        name: "Nicolas Vazquez",
      },
      location: {
        "@type": "Country",
        name: country.title,
      },
      description: country.description,
      startTime: country.date,
      result: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Nicolas Vazquez",
        },
        reviewBody: country.description,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.5",
          bestRating: "5",
        },
      },
    };
  }

  return baseJsonLd;
}
