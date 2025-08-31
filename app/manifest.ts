import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nicolas Vazquez - Digital Nomad Journey",
    short_name: "Nicolas Digital Nomad",
    description:
      "Join Nicolas Vazquez on his digital nomad journey across 16+ countries. Explore authentic travel experiences, stunning photography, and honest destination reviews.",
    start_url: "/",
    display: "standalone",
    background_color: "#fef3c7",
    theme_color: "#d97706",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/assets/japan/IMG_9838 2.jpg",
        sizes: "192x192",
        type: "image/jpeg",
        purpose: "maskable",
      },
      {
        src: "/assets/japan/IMG_9838 2.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
    categories: ["travel", "lifestyle", "photography"],
    lang: "en",
  };
}
