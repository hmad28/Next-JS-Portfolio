import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports - TANPA ssr: false
const HeroVideo = dynamic(() => import("@/components/HeroVideo"), {
  loading: () => <div className="w-full h-screen bg-black animate-pulse" />,
});

const SkillsSection = dynamic(() => import("@/components/SkillsSection"), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />,
});

const Portfolio = dynamic(() => import("@/components/portfolio"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const Testimonial = dynamic(() => import("./components/testimonial"), {
  loading: () => <div className="h-64 bg-white animate-pulse" />,
});

const ContactSection = dynamic(() => import("./components/contact"), {
  loading: () => <div className="h-64 animate-pulse" />,
});

// Static imports
import Client from "./components/client";
import TextNeon from "./components/textNeon";
import { Check } from "./icon/check";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center bg-black"
      >
        <div className="relative w-full h-screen overflow-hidden flex flex-col">
          <Suspense fallback={<div className="w-full h-full bg-black" />}>
            <HeroVideo />
          </Suspense>

          <h1 className="text-xs absolute hidden md:block bottom-20 md:bottom-1 md:left-2 font-semibold font-mono bg-gradient-to-r from-amber-500 via-red-600 to-yellow-300 bg-clip-text text-transparent">
            Hammad | Junior FullStack Developer
          </h1>

          <ProfileCard />

          <div className="absolute flex justify-center items-center gap-2 rotate-90 top-30 md:top-40 font-bold -left-11">
            <div className="text-lg md:text-2xl text-white">Home</div>
            <div className="w-[50px] h-[2px] bg-amber-500"></div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-white py-8 md:py-20 relative">
        <div className="px-4 md:px-10 mx-auto">
          <div className="w-full mb-8 md:mb-15 md:px-15 drop-shadow-lg">
            <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-gray-600 uppercase">
              My Works
            </h3>
            <h2 className="text-5xl md:text-8xl font-extrabold">Projects</h2>
          </div>
          <div className="w-full flex flex-col gap-8">
            <Portfolio />
          </div>
        </div>
        <div className="absolute flex justify-center items-center gap-2 rotate-90 md:top-40 font-bold top-15 -left-14">
          <div className="text-lg md:text-2xl">Portfolio</div>
          <div className="w-[50px] h-[2px] bg-amber-500"></div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Client Section */}
      <section id="client" className="bg-white py-8 md:py-20 relative">
        <div className="w-full mb-8 md:mb-15 px-4 md:px-15">
          <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-gray-600 uppercase">
            Companies I Have Worked With
          </h3>
          <h2 className="text-5xl md:text-8xl font-extrabold text-black">
            Clients
          </h2>
        </div>
        <Client />
      </section>

      {/* About Section */}
      <section id="about" className="bg-black relative">
        <div className="w-full flex flex-col md:flex-row relative">
          <div className="w-full md:w-1/2 relative h-[700px] md:h-[900px]">
            <Image
              src="/images/about1.jpg"
              alt="About Image"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bg-black/40 py-10 backdrop-blur-[3px] px-4 md:px-15 w-full h-full">
              <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-gray-300 uppercase">
                Introduction
              </h3>
              <h2 className="text-5xl md:text-8xl font-extrabold text-white drop-shadow-lg">
                About Me
              </h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 md:px-15 py-5">
            <TextNeon />
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
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonial" className="bg-white py-8 md:py-20 relative">
        <div className="w-full mb-8 md:mb-15 px-4 md:px-15">
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

      {/* Contact Section */}
      <section id="contact" className="py-8 md:py-20 relative overflow-hidden">
        <div className="w-full mb-8 md:mb-15 px-4 md:px-15">
          <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-gray-600 uppercase">
            Hit Me Up
          </h3>
          <h2 className="text-5xl md:text-8xl font-extrabold text-black">
            My Contact
          </h2>
        </div>
        <div className="w-full px-4 md:px-15">
          <ContactSection />
        </div>
      </section>
    </main>
  );
}
