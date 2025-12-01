"use client";

import dynamic from "next/dynamic";

const HeroVideo = dynamic(() => import("./HeroVideo"), {
  ssr: false, // ✅ Ini boleh di Client Component
  loading: () => <div className="w-full h-screen bg-black animate-pulse" />,
});

export default function HeroVideoWrapper() {
  return <HeroVideo />;
}
