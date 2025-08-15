"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Client() {
  const [logos] = useState([
    { src: "/images/clients-dkm.png", h: 30, w: 40 },
    { src: "/images/clients-umm.png", h: 25, w: 44 },
    { src: "/images/clients-nts.png", h: 35, w: 45 },
    { src: "/images/clients-dhimas.png", h: 35, w: 50 },
    { src: "/images/clients-sq.png", h: 25, w: 40 },
    { src: "/images/clients-shaza.png", h: 25, w: 40 },
    { src: "/images/clients-cima.png", h: 16, w: 40 },
    { src: "/images/clients-cpx.png", h: 20, w: 40 },
    { src: "/images/clients-rit.png", h: 20, w: 40 },
    { src: "/images/clients-fn.png", h: 40, w: 40 },
    { src: "/images/clients-sf.png", h: 40, w: 40 },
  ]);

  const desktopRef = useRef<HTMLUListElement>(null!);
  const mobileRef = useRef<HTMLUListElement>(null!);

  useEffect(() => {
    const cloneList = (ref: React.RefObject<HTMLUListElement>) => {
      if (ref.current) {
        const clone = ref.current.cloneNode(true) as HTMLUListElement;
        clone.setAttribute("aria-hidden", "true");
        ref.current.after(clone);
      }
    };
    
    cloneList(desktopRef);
    cloneList(mobileRef);
  }, []);

  return (
    <div className="w-full overflow-hidden inline-flex [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      {/* Desktop */}
      <ul
        ref={desktopRef}
        className="hidden md:flex items-center [&_li]:mx-8"
        style={{ animation: "scrollDesktop 20s linear infinite" }}
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

      {/* Mobile */}
      <ul
        ref={mobileRef}
        className="flex md:hidden items-center [&_li]:mx-4"
        style={{ animation: "scrollMobile 25s linear infinite" }}
      >
        {logos.map((logo, i) => (
          <li
            key={i}
            className="relative flex items-center justify-center"
            style={{ height: `${logo.h * 2.5}px`, width: `${logo.w * 2.5}px` }}
          >
            <Image
              loading="lazy"
              src={logo.src}
              alt={`Logo ${i}`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 60px, 120px"
            />
          </li>
        ))}
      </ul>

      <style jsx>{`
        @keyframes scrollDesktop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes scrollMobile {
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
