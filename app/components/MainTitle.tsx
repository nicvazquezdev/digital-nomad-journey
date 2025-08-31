"use client";

import { useState, useEffect } from "react";

export default function MainTitle() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after a short delay to ensure the page has loaded
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500 ease-out w-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
      }`}
    >
      <h1
        className={`text-4xl md:text-6xl font-bold text-white font-serif text-center drop-shadow-2xl transition-all duration-1200 ease-out delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        Digital Nomad Journey
      </h1>
      <p
        className={`text-lg md:text-xl text-white/90 text-center mt-2 drop-shadow-lg font-medium transition-all duration-500 ease-out delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Exploring the world, one country at a time
      </p>
    </div>
  );
}
