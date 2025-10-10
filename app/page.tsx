"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Check } from "./icon/check";
import Client from "./components/client";
import TextNeon from "./components/textNeon";
import Testimonial from "./components/testimonial";
import Portfolio from "@/components/portfolio";
import { motion, useInView } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  useEffect(() => {
    const video = document.getElementById("bgVideo") as HTMLVideoElement | null;

    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 3) {
        video.pause();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        setOffsetY(window.scrollY);
      };
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [videoSrc, setVideoSrc] = useState("/images/logo-hammad-final.mp4");

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setVideoSrc("/images/logo-hammad-final-mobile.mp4"); // versi mobile
        } else {
          setVideoSrc("/images/logo-hammad-final.mp4"); // versi desktop
        }
      };

      handleResize(); // cek pas awal load
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const skillRef = useRef(null);
    const skillInView = useInView(skillRef, { once: true, margin: "-100px" });
    const skills = [
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind",
      "Javascript",
      "PHP",
      "Laravel",
      "Next JS",
      "Node JS",
      "MySQL",
      "Alpine JS",
      "Python",
      "TypeScript",
      "React JS",
      "Github",
      "Figma",
    ];

  return (
    <main>
      <section
        id="home"
        className="flex flex-col items-center justify-center lg:pt-0 bg-black"
      >
        <div className="relative w-full h-screen overflow-hidden flex flex-col">
          <video
            id="bgVideo"
            src={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onLoadStart={(e) => {
              e.currentTarget.play();
            }}
            {...({ fetchpriority: "high" } as any)}
          />

          <h1 className="text-xs absolute hidden md:block bottom-20 md:bottom-1 md:left-2 font-semibold font-mono bg-gradient-to-r from-amber-500 via-red-600 to-yellow-300 bg-clip-text text-transparent">
            Hammad | Junior FullStack Developer
          </h1>

          <div
            className="absolute p-1.5 md:p-2 2xl:p-3 w-[160px] lg:w-[260px] 2xl:w-[350px] rounded-3xl md:rounded-4xl bg-white bottom-5 left-7 shadow-lg  md:left-15 md:bottom-10 transition-transform duration-300 hover:-translate-y-2"
            // data-aos="fade-down"
            // data-aos-duration="1000"
          >
            <Image
              loading="lazy"
              src="/images/hammad2-blur2.png"
              alt="Hammad"
              width={350}
              height={400}
              className="relative rounded-2xl md:rounded-3xl w-full h-auto"
            />
            <div className="absolute bottom-0 right-0 rounded-b-4xl p-4 md:p-5 2xl:px-8 2xl:py-6 color-transition">
              <h1 className="text-lg md:text-xl 2xl:text-2xl font-bold flex items-center gap-2">
                Hammad
                <Check className="check-color" />
              </h1>
              <div className="text-[8px] md:text-xs mb-2 2xl:mb-5 text-zinc-700">
                Junior Full Stack Developer | Freelancer
              </div>

              <ul className="flex justify-center gap-1 md:gap-3 2xl:gap-5 items-center font-semibold text-zinc-700">
                <li>
                  <a
                    href="https://web.facebook.com/profile.php?id=61560555868956"
                    rel="noreferrer"
                    target="_blank"
                    className=" transition hover:opacity-75 "
                  >
                    <span className="sr-only">Facebook</span>

                    <svg
                      className="size-4 md:size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.instagram.com/matt.hmd28/"
                    rel="noreferrer"
                    target="_blank"
                    className=" transition hover:opacity-75 "
                  >
                    <span className="sr-only">Instagram</span>

                    <svg
                      className="size-4 md:size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.youtube.com/@hammad_matt"
                    rel="noreferrer"
                    target="_blank"
                    className=" transition hover:opacity-75 "
                  >
                    <span className="sr-only">YouTube</span>

                    <svg
                      className="size-4 md:size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/hmad28"
                    rel="noreferrer"
                    target="_blank"
                    className=" transition hover:opacity-75 "
                  >
                    <span className="sr-only">GitHub</span>

                    <svg
                      className="size-4 md:size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/hmatt28/"
                    rel="noreferrer"
                    target="_blank"
                    className=" transition hover:opacity-75 "
                  >
                    <span className="sr-only">LinkedIn</span>

                    <svg
                      className="size-4 md:size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531c-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54c3.001 0 3.556 1.974 3.556 4.545zM4.447 6.194c-.954 0-1.72-.771-1.72-1.72s.767-1.72 1.72-1.72a1.72 1.72 0 0 1 0 3.44m1.484 10.85h-2.97V7.5h2.97zM18.522 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042c.815 0 1.482-.644 1.482-1.44V1.44C20 .646 19.333 0 18.518 0z"
                      ></path>
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:email1.hammad@gmail.com"
                    rel="noreferrer"
                    target="_blank"
                    className=" transition hover:opacity-75 "
                  >
                    <span className="sr-only">Gmail</span>

                    <svg
                      className="size-4 md:size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="absolute flex justify-center items-center gap-2 rotate-90 top-30 md:top-40 font-bold -left-11">
            <div className="text-lg md:text-2xl text-white">Home</div>
            <div className="w-[50px] h-[2px] bg-amber-500"></div>
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="bg-white py-8 md:py-20 relative"
        // data-aos="fade-up"
        // data-aos-duration="1000"
      >
        <div className="px-4 md:px-10 mx-auto">
          <div className="w-full mb-8 md:mb-15 md:px-15 drop-shadow-lg drop-shadow-zinc-400">
            <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-gray-600 uppercase">
              My Works
            </h3>
            <h2 className="text-5xl md:text-8xl font-extrabold">Projects</h2>
          </div>
          <div className="w-full flex flex-col gap-8">
            {/* <div className="w-full flex gap-5">
              <div className="w-1/4">
                <div className="group relative block bg-black h-[700px]">
                  <Image
                    loading="lazy"
                    alt="projek sq"
                    fill
                    src="/images/port-jersey.jpg"
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  />

                  <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium tracking-widest text-orange-500 uppercase">
                      Design
                    </p>

                    <p className="text-xl font-bold text-white sm:text-2xl">
                      Custom Football Jersey Design for School Team
                    </p>

                    <div className="mt-32 sm:mt-48">
                      <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-start gap-3">
                        <div className="w-full flex gap-2">
                          <div className="px-2 bg-cyan-500/90 text-cyan-200 font-mono text-sm rounded">
                            Canva
                          </div>
                          <div className="px-2 bg-black text-green-400 font-mono text-sm rounded">
                            Fifa Kit Creator
                          </div>
                        </div>
                        <h1 className="text-3xl text-white font-bold">
                          Rumah IT Al Imam Nafi&apos;
                        </h1>
                        <p className="text-sm text-white">
                          Mendesain jersey sepak bola untuk tim sekolah, dengan
                          fokus pada kombinasi warna, identitas tim, dan
                          kenyamanan pemakaian. Desain dibuat untuk mencerminkan
                          semangat sportivitas dan kekompakan pemain di
                          lapangan.
                        </p>
                        <div className="w-full flex gap-2">
                          <a
                            href="#"
                            className="py-1 px-4 text-sm font-semibold bg-blue-500 hover:bg-blue-500/80 duration-200 rounded-lg text-white flex items-center"
                          >
                            See More
                          </a>
                          <a
                            href="#"
                            className="py-1 pl-4 pr-2 text-sm font-semibold hover:bg-gray-50/20 duration-200 border rounded-lg text-white flex items-center gap-1"
                          >
                            Preview <Arrow />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4">
                <div className="group relative block bg-black h-[700px]">
                  <Image
                    loading="lazy"
                    alt="projek cima"
                    fill
                    src="/images/port-3.jpeg"
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  />

                  <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium tracking-widest text-teal-500 uppercase">
                      Teach
                    </p>

                    <p className="text-xl font-bold text-white sm:text-2xl">
                      Teaching HTML & CSS Fundamentals for High School Students
                    </p>

                    <div className="mt-32 sm:mt-48">
                      <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-start gap-3">
                        <div className="w-full flex gap-2">
                          <div className="px-2 bg-orange-500 text-orange-300 font-mono text-sm rounded">
                            HTML
                          </div>
                          <div className="px-2 bg-blue-600/90 text-blue-300 font-mono text-sm rounded">
                            CSS
                          </div>
                        </div>
                        <h1 className="text-3xl text-white font-bold">
                          Rumah IT Al Imam Nafi&apos;
                        </h1>
                        <p className="text-sm text-white">
                          Diminta untuk mengajar siswa SMA mengenai HTML & CSS,
                          mulai dari konsep dasar hingga tingkat menengah.
                          Mengajarkan teori dan praktik pembuatan website
                          sederhana yang responsif, sekaligus memotivasi mereka
                          untuk terus belajar web development.
                        </p>
                        <div className="w-full flex gap-2">
                          <a
                            href="#"
                            className="py-1 px-4 text-sm font-semibold bg-blue-500 hover:bg-blue-500/80 duration-200 rounded-lg text-white flex items-center"
                          >
                            See More
                          </a>
                          <a
                            href="#"
                            className="py-1 pl-4 pr-2 text-sm font-semibold hover:bg-gray-50/20 duration-200 border rounded-lg text-white flex items-center gap-1"
                          >
                            Preview <Arrow />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4">
                <div className="group relative block bg-black h-[700px]">
                  <Image
                    loading="lazy"
                    alt="projek cima"
                    fill
                    src="/images/port-2.jpeg"
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  />

                  <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium tracking-widest text-blue-500 uppercase">
                      Frontend Development
                    </p>

                    <p className="text-xl font-bold text-white sm:text-2xl">
                      Website Maintenance & UI Enhancement for Umroh Murah
                      Mabrur
                    </p>

                    <div className="mt-32 sm:mt-48">
                      <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-start gap-3">
                        <div className="w-full flex gap-2">
                          <div className="px-2 bg-violet-400/90 text-violet-200 font-mono text-sm rounded">
                            PHP
                          </div>
                          <div className="px-2 bg-yellow-300 text-black font-mono text-sm rounded">
                            Javascript
                          </div>
                          <div className="px-2 bg-sky-500/90 text-sky-200 font-mono text-sm rounded">
                            Tailwind CSS
                          </div>
                        </div>
                        <h1 className="text-3xl text-white font-bold">
                          Umroh Murah Mabrur
                        </h1>
                        <p className="text-sm text-white">
                          Berperan dalam maintenance dan pengembangan antarmuka
                          website perusahaan menggunakan PHP dan Tailwind CSS.
                          Mendukung tim frontend untuk memastikan tampilan dan
                          fungsionalitas web tetap optimal, responsif, dan
                          user-friendly. Proyek ini menjadi pengalaman
                          profesional pertama saya di dunia pemrograman,
                          sekaligus kesempatan untuk menerapkan skill coding
                          pada lingkungan kerja nyata.
                        </p>
                        <div className="w-full flex gap-2">
                          <a
                            href="#"
                            className="py-1 px-4 text-sm font-semibold bg-blue-500 hover:bg-blue-500/80 duration-200 rounded-lg text-white flex items-center"
                          >
                            See More
                          </a>
                          <a
                            href="#"
                            className="py-1 pl-4 pr-2 text-sm font-semibold hover:bg-gray-50/20 duration-200 border rounded-lg text-white flex items-center gap-1"
                          >
                            Preview <Arrow />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4">
                <div className="group relative block bg-black h-[700px]">
                  <Image
                    loading="lazy"
                    alt="projek cima"
                    fill
                    src="/images/port-sf.jpg"
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  />

                  <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium tracking-widest text-blue-500 uppercase">
                      Frontend Development
                    </p>

                    <p className="text-xl font-bold text-white sm:text-2xl">
                      Landing Page Design for Shofi Frozen
                    </p>

                    <div className="mt-32 sm:mt-48">
                      <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-start gap-3">
                        <div className="w-full flex gap-2">
                          <div className="px-2 bg-orange-500 text-orange-300 font-mono text-sm rounded">
                            HTML
                          </div>
                          <div className="px-2 bg-yellow-300 text-black font-mono text-sm rounded">
                            Javascript
                          </div>
                          <div className="px-2 bg-sky-500/90 text-sky-200 font-mono text-sm rounded">
                            Tailwind CSS
                          </div>
                        </div>
                        <h1 className="text-3xl text-white font-bold">
                          Shofi Frozen
                        </h1>
                        <p className="text-sm text-white">
                          Diminta untuk merancang landing page toko frozen food
                          Shofi Frozen. Menggunakan Tailwind CSS untuk
                          menciptakan desain yang modern, responsif, dan
                          user-friendly, sehingga membantu memperkuat citra
                          brand di dunia digital.
                        </p>
                        <div className="w-full flex gap-2">
                          <a
                            href="#"
                            className="py-1 px-4 text-sm font-semibold bg-blue-500 hover:bg-blue-500/80 duration-200 rounded-lg text-white flex items-center"
                          >
                            See More
                          </a>
                          <a
                            href="#"
                            className="py-1 pl-4 pr-2 text-sm font-semibold hover:bg-gray-50/20 duration-200 border rounded-lg text-white flex items-center gap-1"
                          >
                            Preview <Arrow />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <Portfolio />
          </div>
        </div>
        <div className="absolute flex justify-center items-center gap-2 rotate-90 md:top-40 font-bold top-15 -left-14">
          <div className="text-lg md:text-2xl">Portfolio</div>
          <div className="w-[50px] h-[2px] bg-amber-500"></div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skill"
        ref={skillRef}
        className="relative py-8 md:py-20 bg-[url('/images/city-night.jpeg')] bg-cover bg-center bg-fixed overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-sm"></div>

        <div className="container mx-auto relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={skillInView ? "visible" : "hidden"}
            className="w-full mb-8 md:mb-15 px-4 md:px-15"
          >
            <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
              list of my skills
            </h3>
            <h2 className="text-5xl md:text-8xl font-extrabold text-white drop-shadow-lg">
              Technical Skills
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={skillInView ? "visible" : "hidden"}
            className="w-full flex gap-2 justify-center flex-wrap px-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                variants={scaleIn}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(251, 191, 36, 0.3)",
                  borderColor: "rgba(251, 191, 36, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                className="text-sm md:text-[12px] 2xl:text-base px-4 py-2 border border-white/30 cursor-pointer rounded-lg font-mono text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute flex justify-center items-center gap-2 rotate-90 md:top-40 font-bold top-13 -left-10"
        >
          <div className="text-lg text-white md:text-2xl drop-shadow-lg">
            Skills
          </div>
          <div className="w-[50px] h-[2px] bg-amber-500"></div>
        </motion.div>
      </section>

      <section id="client" className="bg-white py-8 md:py-20 relative">
        <div className="w-full mb-8 md:mb-15 px-4 md:px-15 drop-shadow-lg drop-shadow-zinc-400">
          <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-gray-600 uppercase">
            Companies I Have Worked With
          </h3>
          <h2 className="text-5xl md:text-8xl font-extrabold text-black">
            Clients
          </h2>
        </div>
        <Client />
      </section>

      <section id="about" className="bg-black relative">
        <div className="w-full flex flex-col md:flex-row relative">
          <div className="w-full md:w-1/2 relative h-[700px] md:h-[900px]">
            <Image
              loading="lazy"
              src="/images/about1.jpg"
              alt="About Image"
              fill
              className="object-cover object-top"
            />
            <div className="absolute bg-black/40 py-10 backdrop-blur-[3px] px-4 md:px-15 w-full h-full">
              <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-gray-300 uppercase drop-shadow-lg drop-shadow-zinc-600">
                Introduction
              </h3>
              <h2 className="text-5xl md:text-8xl font-extrabold text-white drop-shadow-lg drop-shadow-zinc-600">
                About Me
              </h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 md:px-15 py-5">
            <div className="w-full">
              <TextNeon />
            </div>
            <div className="w-full mt-5 font-mono">
              <p className="text-white">
                Assalamu&apos;alaikum warahmatullahi wabarakatuh 👋
              </p>
              <h1 className="text-3xl text-white">
                My name is{" "}
                <span className="text-3xl md:text-6xl uppercase font-extrabold tracking-tight">
                  Hammad.
                </span>
              </h1>
              <p className="text-md md:text-xl text-white mt-3 max-w-2xl">
                I&apos;m a passionate student in{" "}
                <span className="font-extrabold text-red-500">learning IT</span>
                . In the future, I wanna become a{" "}
                <span className="font-extrabold text-yellow-300">
                  Fullstack Developer
                </span>{" "}
                in web and mobile app,{" "}
                <span className="font-extrabold text-blue-400">
                  Software Developer
                </span>{" "}
                and{" "}
                <span className="font-extrabold text-green-400">
                  Cyber Security expert
                </span>
                .
              </p>
            </div>
          </div>
          {/* <div
            className="absolute z-1 top-5/6 md:top-6/6 left-1/2 drop-shadow-xl drop-shadow-zinc-800 parallax-box"
            style={
              { "--offsetY": `${offsetY * -0.08}px` } as React.CSSProperties
            }
          >
            <Image
              loading="lazy"
              src="/images/hammad-bridge.jpg"
              alt="About Image"
              width={250}
              height={50}
              className="rounded-lg"
            />
          </div>
          <div
            className="absolute z-1 top-9/7 md:top-10/7 left-3/4 md:left-5/7 2xl:left-2/3 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl drop-shadow-zinc-800 card-two"
            style={
              { "--offsetY2": `${offsetY * -0.2}px` } as React.CSSProperties
            }
          >
            <Image
              loading="lazy"
              src="/images/about5.png"
              alt="About Image"
              width={150}
              height={50}
              className="rounded-lg"
            />
          </div>
          <div
            className="absolute z-1 top-11/8 md:top-10/8 left-3/5 drop-shadow-xl drop-shadow-zinc-800"
            style={{
              transform: `translate(-50%, 30%) translateY(${offsetY * -0.2}px)`,
              transition: "transform 1.5s linear",
              willChange: "transform",
            }}
          >
            <Image
              loading="lazy"
              src="/images/about3.jpg"
              alt="About Image"
              width={200}
              height={50}
              className="rounded-lg"
            />
          </div>
          <div
            className="absolute z-1 top-7/8 md:top-11/8 left-4/5 md:left-5/6 2xl:left-3/4 drop-shadow-xl drop-shadow-zinc-800 card-three"
            style={
              { "--offsetY3": `${offsetY * -0.1}px` } as React.CSSProperties
            }
          >
            <Image
              loading="lazy"
              src="/images/about6.jpg"
              alt="About Image"
              width={230}
              height={50}
              className="rounded-lg"
            />
          </div>
          <div
            className="absolute z-1 top-[120%] md:top-[125%] left-[90%] md:left-[85%] -translate-x-1/2 -translate-y-1/2 drop-shadow-xl drop-shadow-zinc-800"
            style={{
              transform: `translate(-50%, -50%) translateY(${
                offsetY * -0.15
              }px)`,
              transition: "transform 2s linear",
              willChange: "transform",
            }}
          >
            <Image
              loading="lazy"
              src="/images/about7.jpeg"
              alt="About Image"
              width={230}
              height={50}
              className="rounded-lg"
            />
          </div> */}
        </div>
      </section>

      <section id="testimonial" className="bg-white py-8 md:py-20 relative">
        <div className="w-full mb-8 md:mb-15 px-4 md:px-15 drop-shadow-lg drop-shadow-zinc-400">
          <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-gray-600 uppercase">
            What people say about me
          </h3>
          <h2 className="text-5xl md:text-8xl font-extrabold text-black">
            Testimonials
          </h2>
        </div>
        <div className="w-full px-4 md:px-15">
          <Testimonial />
        </div>
      </section>
    </main>
  );
}
