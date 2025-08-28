import Image from 'next/image';
import React from 'react'
import { Download } from "lucide-react";

export default function page() {
    const pages = Array.from(
      { length: 13 },
      (_, i) =>
        `/images/Resume - Jurusan Umum di Arab Saudi_Hammad_page-${String(
          i + 1
        ).padStart(4, "0")}.jpg`
    );
  return (
    <main
      className="pt-25 pb-10 2xl:pt-40 2xl:pb-15"
      style={{
        backgroundImage: "url('/images/bg-resume.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full">
        <div className="px-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl 2xl:max-w-5xl mx-auto">
          <div className="w-full bg-gray-100 rounded-lg shadow-lg p-2 2xl:p-8">
            <h1 className="text-xl 2xl:text-4xl font-bold">
              Resume Seminar Saudi Expo 2025 - by{" "}
              <span className="font-medium tracking-widest uppercase">
                Hammad
              </span>
              {/* Tombol download */}
                <a
                  href="/images/Resume - Jurusan Umum di Arab Saudi_Hammad.pdf"
                  download
                  className="inline-flex items-center ml-2 gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-base px-2 py-1 2xl:px-4 2xl:py-2 rounded-lg shadow-lg transition-all"
                >
                  <Download size={20} className="size-4" />
                  Download PDF
                </a>
            </h1>

            <section id="resume-img" className="mt-4 2xl:mt-5">
              <div className="w-full">
                {pages.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`resume-img-${i + 1}`}
                    width={1200}
                    height={1600}
                    loading="lazy"
                    className="
                    w-full h-auto rounded-lg mt-2 2xl:mt-8
                    sm:max-w-[500px]
                    md:max-w-[600px]
                    lg:max-w-[800px]
                    mx-auto
                    "
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Tombol download */}
        <div className="mt-4 w-full flex justify-center">
          <a
            href="/images/Resume - Jurusan Umum di Arab Saudi_Hammad.pdf"
            download
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs 2xl:text-base px-3 py-2 2xl:px-4 2xl:py-2 rounded-lg shadow-lg transition-all"
          >
            <Download size={20} className="size-4 2xl:size-20" />
            Download PDF
          </a>
        </div>
      </div>
    </main>
  );
}
