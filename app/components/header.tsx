"use client";
import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    const textOverlay = document.getElementById("textOverlay");
    const hireButton = document.getElementById("hireButton");
    let lastIsLight: boolean | null = null;

    function getBrightness(rgb:string) {
      const match = rgb.match(/\d+/g)?.map(Number) || [255, 255, 255];
      const [r, g, b] = match;
      return (r + g + b) / 3;
    }

    function getSolidBgColor(el: Element | null) {
      let current = el;
      while (current) {
        const bg = window.getComputedStyle(current).backgroundColor;
        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
          return bg;
        }
        current = current.parentElement;
      }
      return "rgb(255,255,255)";
    }

    function getBgColorUnderHeader() {
      let y = 40;
      let el;
      do {
        el = document.elementFromPoint(window.innerWidth / 2, y);
        y += 10;
      } while (
        el &&
        (el.id === "textOverlay" ||
          (textOverlay && textOverlay.contains(el))) &&
        y < window.innerHeight
      );

      if (!el) return "rgb(255,255,255)";
      return getSolidBgColor(el);
    }

    function updateTextColor() {
      const bgColor = getBgColorUnderHeader();
      const brightness = getBrightness(bgColor);
      const isLight = brightness >= 127;

      if (isLight !== lastIsLight) {
        lastIsLight = isLight;

        if (isLight) {
          // Background terang → text gelap
          textOverlay?.classList.remove("text-white");
          textOverlay?.classList.add("text-black");

          hireButton?.classList.remove("bg-white", "text-black");
          hireButton?.classList.add("bg-black", "text-white");
        } else {
          // Background gelap → text terang
          textOverlay?.classList.remove("text-black");
          textOverlay?.classList.add("text-white");

          hireButton?.classList.remove("bg-black", "text-white");
          hireButton?.classList.add("bg-white", "text-black");
        }
      }
    }

    // Cek tiap frame biar smooth
    function loop() {
      updateTextColor();
      requestAnimationFrame(loop);
    }

    loop();

    return () => {
      lastIsLight = null;
    };
  }, []);

  return (
    <header
      id="textOverlay"
      className="w-full fixed top-0 z-50 p-5 transition-colors duration-300 drop-shadow-xl"
    >
      <div className="w-full px-4 py-2 flex justify-between items-center tracking-wider">
        <div className="text-5xl font-bold uppercase">Hammad.</div>
        <nav>
          <ul className="flex gap-8 py-2">
            <li className="hover:font-semibold w-20 text-center">Home</li>
            <li className="hover:font-semibold w-20 text-center">About</li>
            <li className="hover:font-semibold w-20 text-center">Projects</li>
            <li className="hover:font-semibold w-20 text-center">Skills</li>
            <li className="hover:font-semibold w-20 text-center">Contact</li>
          </ul>
        </nav>
        <button
          id="hireButton"
          className="px-4 py-2 bg-black text-white rounded hover:scale-105 duration-200 hover:shadow-lg cursor-pointer font-semibold"
        >
          Hire!
        </button>
      </div>
    </header>
  );
}
