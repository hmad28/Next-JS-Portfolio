"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Check } from "./icon/check";
import Client from "./components/client";
import TextNeon from "./components/textNeon";
import { useState } from "react";
import Testimonial from "./components/testimonial";
import Portfolio from "./components/portfolio";

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


  return (
    <main>
      <section
        id="home"
        className="flex flex-col items-center justify-center pt-18 lg:pt-0 bg-black"
      >
        <div className="relative w-full h-screen overflow-hidden flex flex-col">
          <video
            id="bgVideo"
            src="/images/logo hammad final.mp4"
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="text-xs absolute hidden md:block bottom-1 left-2 font-semibold font-mono bg-gradient-to-r from-amber-500 via-red-600 to-yellow-300 bg-clip-text text-transparent">
            Hammad | Junior FullStack Developer
          </div>

          <div
            className="absolute p-1.5 md:p-3 w-[160px] md:w-[350px] rounded-3xl md:rounded-4xl bg-white left-7 shadow-lg -bottom-9 md:left-15 md:bottom-10 transition-transform duration-300 hover:-translate-y-2"
            data-aos="fade-in"
            data-aos-duration="3000"
            data-aos-anchor-placement="center-center"
          >
            <Image
              loading="lazy"
              src="/images/hammad-class-halfpotrait.png"
              alt="Hammad"
              width={350}
              height={400}
              className="relative rounded-2xl md:rounded-3xl w-full h-auto"
            />
            <div
              className="absolute bottom-0 right-0 rounded-b-4xl p-4 md:px-8 md:py-6"
              style={{
                width: "100%",
                background:
                  "linear-gradient(to top, rgb(255, 255, 255), rgba(255, 255, 255, 0.885), rgba(255, 255, 255, 0.745), rgba(255, 255, 255, 0))",
              }}
            >
              <div className="text-lg md:text-3xl font-bold flex items-center gap-2">
                Hammad
                <Check style={{ color: "#3897F0" }} />
              </div>
              <div className="text-xs mb-2 md:mb-5 text-zinc-700">
                Junior Full Stack Developer | Rumah IT Al-Imam Nafi&apos;
              </div>
              <div className="flex justify-between items-center font-semibold text-zinc-700">
                <div className="text-[10px] md:text-sm">
                  <i className="fa-regular fa-user text-zinc-400"></i> 100
                </div>
                <div className="text-[10px] md:text-sm">
                  <i className="fa-regular fa-square-check text-zinc-400"></i>{" "}
                  20
                </div>
                <div className="py-1 px-2 md:py-3 md:px-5 rounded-4xl text-[10px] md:text-sm bg-white shadow-lg">
                  Follow <i className="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute flex justify-center items-center gap-2 rotate-90 md:top-40 font-bold top-13 -left-11">
            <div className="text-lg md:text-2xl" style={{ color: "white" }}>
              Home
            </div>
            <div className="w-[50px] h-[2px] bg-amber-500"></div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-white py-20 relative">
        <div className="px-10 mx-auto">
          <div className="w-full mb-15 px-15 drop-shadow-lg drop-shadow-zinc-400">
            <h3 className="text-xs font-bold tracking-wider text-gray-600 uppercase">
              My Works
            </h3>
            <h1 className="text-8xl font-extrabold">Projects</h1>
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
        <div className="absolute flex justify-center items-center gap-2 rotate-90 md:top-40 font-bold top-13 -left-15">
          <div className="text-lg md:text-2xl">Portfolio</div>
          <div className="w-[50px] h-[2px] bg-amber-500"></div>
        </div>
      </section>

      <section
        id="skill"
        className="relative py-20 bg-[url('/images/city-night.jpeg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <div className="w-full mb-15 px-15 drop-shadow-lg drop-shadow-zinc-800">
            <h3 className="text-xs font-bold tracking-wider text-gray-300 uppercase">
              list of my skills
            </h3>
            <h1 className="text-8xl font-extrabold text-white">
              Programming Skills
            </h1>
          </div>
          <div className="w-full flex flex-col gap-3 text-white">
            <div className="w-full flex gap-2 justify-center">
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                HTML
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                CSS
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Bootstrap
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Tailwind
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Javascript
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                PHP
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Laravel
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Next JS
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Node JS
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                MySQL
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Alpine JS
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Python
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                TypeScript
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                React JS
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Github
              </div>
              <div className="px-2 py-1 border cursor-pointer rounded-lg font-mono transition-transform duration-300 hover:-translate-y-2">
                Figma
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-center items-center gap-2 rotate-90 md:top-40 font-bold top-13 -left-10">
          <div className="text-lg text-white md:text-2xl">Skills</div>
          <div className="w-[50px] h-[2px] bg-amber-500"></div>
        </div>
      </section>

      <section id="client" className="bg-white py-20 relative">
        <div className="w-full mb-15 px-15 drop-shadow-lg drop-shadow-zinc-400">
          <h3 className="text-xs font-bold tracking-wider text-gray-600 uppercase">
            Companies I Have Worked With
          </h3>
          <h1 className="text-8xl font-extrabold text-black">Clients</h1>
        </div>
        <Client />
      </section>

      <section id="about" className="bg-black relative">
        <div className="w-full flex relative">
          <div className="w-1/2 relative h-[900px]">
            <Image
              loading="lazy"
              src="/images/about1.jpg"
              alt="About Image"
              fill
              className="object-cover object-top"
            />
            <div className="absolute bg-black/40 py-10 px-15 w-full h-full">
              <h3 className="text-xs font-bold tracking-wider text-gray-300 uppercase drop-shadow-lg drop-shadow-zinc-600">
                Introduction
              </h3>
              <h1 className="text-8xl font-extrabold text-white drop-shadow-lg drop-shadow-zinc-600">
                About Me
              </h1>
            </div>
          </div>
          <div className="w-1/2 px-15 py-5">
            <div className="w-full">
              <TextNeon />
            </div>
            <div className="w-full mt-5 font-mono">
              <p className="text-white">
                Assalamu&apos;alaikum warahmatullahi wabarakatuh 👋
              </p>
              <h1 className="text-3xl text-white">
                My name is{" "}
                <span className="text-6xl uppercase font-extrabold tracking-tight">
                  Hammad.
                </span>
              </h1>
              <p className="text-xl text-white mt-3 max-w-2xl">
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
          <div
            className="absolute z-1 top-6/6 left-1/2 drop-shadow-xl drop-shadow-zinc-800"
            style={{
              transform: `translate(-50%, -50%) translateY(${
                offsetY * -0.08
              }px)`,
              transition: "transform 1s linear",
              willChange: "transform",
            }}
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
            className="absolute z-1 top-10/7 left-2/3 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl drop-shadow-zinc-800"
            style={{
              transform: `translate(-0%, 80%) translateY(${offsetY * -0.2}px)`,
              transition: "transform 1.2s linear",
              willChange: "transform",
            }}
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
            className="absolute z-1 top-10/8 left-3/5 drop-shadow-xl drop-shadow-zinc-800"
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
            className="absolute z-1 top-11/8 left-3/4 drop-shadow-xl drop-shadow-zinc-800"
            style={{
              transform: `translate(-50%, -110%) translateY(${
                offsetY * -0.1
              }px)`,
              transition: "transform 1.8s linear",
              willChange: "transform",
            }}
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
            className="absolute z-1 top-[125%] left-[85%] -translate-x-1/2 -translate-y-1/2 drop-shadow-xl drop-shadow-zinc-800"
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
          </div>
        </div>
      </section>

      <section id="testimonial" className="bg-white py-20 relative">
        <div className="w-full mb-15 px-15 drop-shadow-lg drop-shadow-zinc-400">
          <h3 className="text-xs font-bold tracking-wider text-gray-600 uppercase">
            What people say about me
          </h3>
          <h1 className="text-8xl font-extrabold text-black">Testimonials</h1>
        </div>
        <div className="w-full px-15">
          <Testimonial />
        </div>
      </section>
    </main>
  );
}
