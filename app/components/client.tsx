"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Client() {
  const [logos] = useState([
    { src: "/images/clients-dkm.png", h: 30, w: 40 },
    { src: "/images/clients-umm.png", h: 25, w: 44 },
    { src: "/images/clients-nts.png", h: 35, w: 45 },
    { src: "/images/clients-dhimas.png", h: 35, w: 50 },
    { src: "/images/clients-sq.png", h: 20, w: 40 },
    { src: "/images/clients-shaza.png", h: 25, w: 40 },
    { src: "/images/clients-cima.png", h: 16, w: 40 },
    { src: "/images/clients-cpx.png", h: 20, w: 40 },
  ]);

  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (ulRef.current) {
      const clone = ulRef.current.cloneNode(true) as HTMLUListElement;
      clone.setAttribute("aria-hidden", "true");
      ulRef.current.after(clone);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden inline-flex [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul
        ref={ulRef}
        className="flex items-center [&_li]:mx-8"
        style={{ animation: "infiniteScroll 20s linear infinite" }}
      >
        {logos.map((logo, i) => (
          <li
            key={i}
            className="relative flex items-center justify-center"
            style={{ height: `${logo.h * 4}px`, width: `${logo.w * 4}px` }}
          >
            <Image
              loading="lazy"
              src={logo.src}
              alt={`Logo ${i}`}
              fill
              className="object-contain"
            />
          </li>
        ))}
      </ul>

      <style jsx>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
