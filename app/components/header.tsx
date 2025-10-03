"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // untuk ikon hamburger & close

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect(() => {
  //   const textOverlay = document.getElementById("textOverlay");
  //   const hireButton = document.getElementById("hireButton");
  //   let lastIsLight: boolean | null = null;

  //   function getBrightness(rgb: string) {
  //     const match = rgb.match(/\d+/g)?.map(Number) || [255, 255, 255];
  //     const [r, g, b] = match;
  //     return (r + g + b) / 3;
  //   }

  //   function getSolidBgColor(el: Element | null) {
  //     let current = el;
  //     while (current) {
  //       const bg = window.getComputedStyle(current).backgroundColor;
  //       if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
  //         return bg;
  //       }
  //       current = current.parentElement;
  //     }
  //     return "rgb(255,255,255)";
  //   }

  //   function getBgColorUnderHeader() {
  //     let y = 40;
  //     let el;
  //     do {
  //       el = document.elementFromPoint(window.innerWidth / 2, y);
  //       y += 10;
  //     } while (
  //       el &&
  //       (el.id === "textOverlay" ||
  //         (textOverlay && textOverlay.contains(el))) &&
  //       y < window.innerHeight
  //     );

  //     if (!el) return "rgb(255,255,255)";
  //     return getSolidBgColor(el);
  //   }

  //   function updateTextColor() {
  //     const bgColor = getBgColorUnderHeader();
  //     const brightness = getBrightness(bgColor);
  //     const isLight = brightness >= 127;

  //     if (isLight !== lastIsLight) {
  //       lastIsLight = isLight;

  //       if (isLight) {
  //         textOverlay?.classList.remove("text-white");
  //         textOverlay?.classList.add("text-black");

  //         hireButton?.classList.remove("bg-white", "text-black");
  //         hireButton?.classList.add("bg-black", "text-white");
  //       } else {
  //         textOverlay?.classList.remove("text-black");
  //         textOverlay?.classList.add("text-white");

  //         hireButton?.classList.remove("bg-black", "text-white");
  //         hireButton?.classList.add("bg-white", "text-black");
  //       }
  //     }
  //   }

  //   function loop() {
  //     updateTextColor();
  //     requestAnimationFrame(loop);
  //   }

  //   loop();

  //   return () => {
  //     lastIsLight = null;
  //   };
  // }, []);

  return (
    <header
      id="textOverlay"
      className="w-full fixed top-0 z-50 px-5 py-2 transition-colors duration-300 drop-shadow-xl bg-white/80 border-b backdrop-blur-2xl"
    >
      <div className="w-full px-3 py-1 flex justify-between items-center tracking-wider">
        <div className="text-3xl lg:text-4xl 2xl:text-6xl font-bold uppercase">
          <Link href="/">Hammad.</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 py-2 text-sm 2xl:text-base">
            <li className="hover:font-semibold w-20 text-center">
              <a href="#hero">Home</a>
            </li>
            <li className="hover:font-semibold w-20 text-center">
              <a href="#portfolio">Projects</a>
            </li>
            <li className="hover:font-semibold w-20 text-center">
              <a href="#skill">Skills</a>
            </li>
            <li className="hover:font-semibold w-20 text-center">
              <a href="#about">About</a>
            </li>
            <li className="hover:font-semibold w-20 text-center">
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Desktop Hire Button */}
        <button
          id="hireButton"
          className="hidden md:block px-4 py-2 text-sm 2xl:text-base bg-black text-white rounded hover:scale-105 duration-200 hover:shadow-lg cursor-pointer font-semibold"
        >
          Hire!
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/70 text-white absolute top-full left-0 w-full flex flex-col items-center gap-6 py-6 text-lg font-medium">
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            Projects
          </a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>
            Skills
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
          <button
            id="hireButton"
            className="px-6 py-2 bg-white text-black rounded hover:scale-105 duration-200"
          >
            Hire!
          </button>
        </div>
      )}
    </header>
  );
}
