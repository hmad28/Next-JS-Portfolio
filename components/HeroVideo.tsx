"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");

  useEffect(() => {
    // Detect device dan set video source
    const isMobile = window.innerWidth < 768;
    setVideoSrc(
      isMobile
        ? "/images/logo-hammad-final-mobile.mp4"
        : "/images/logo-hammad-final.mp4"
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 3) {
        video.pause();
      }
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [videoSrc]);

  if (!videoSrc) {
    return <div className="absolute inset-0 bg-black" />;
  }

  return (
    <>
      {/* Placeholder/Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="metadata" // ✅ Ganti dari "auto" ke "metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
