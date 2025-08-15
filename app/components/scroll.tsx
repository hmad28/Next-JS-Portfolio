"use client";
import { useEffect, useState } from "react";

export default function CardScrollAnimation() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[200vh] bg-gray-100 flex items-center justify-center flex-col gap-20">
      {/* Card */}
      <div
        className="w-80 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl font-bold"
        style={{
          transform: `translateY(${offsetY * -0.2}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        Card 1
      </div>

      <div
        className="w-80 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl font-bold"
        style={{
          transform: `translateY(${offsetY * -0.15}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        Card 2
      </div>
    </div>
  );
}
