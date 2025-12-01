"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // ✅ Dipercepat dari 0.1
      delayChildren: 0.1, // ✅ Dipercepat dari 0.3
    },
  },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

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

export default function SkillsSection() {
  const skillRef = useRef(null);
  const skillInView = useInView(skillRef, { once: true, margin: "-50px" });

  return (
    <section
      id="skill"
      ref={skillRef}
      className="relative py-8 md:py-20 overflow-hidden"
    >
      {/* ✅ Background Image dengan Next/Image */}
      <Image
        src="/images/city-night.jpeg"
        alt="Background"
        fill
        className="object-cover object-center"
        quality={60}
        priority={false}
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-sm" />

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
          {skills.map((skill) => (
            <motion.div
              key={skill}
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -3 }}
              className="text-sm md:text-[12px] 2xl:text-base px-4 py-2 border border-white/30 cursor-pointer rounded-lg font-mono text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-amber-400/50 transition-colors duration-200"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Side label */}
      <div className="absolute flex justify-center items-center gap-2 rotate-90 md:top-40 font-bold top-13 -left-10">
        <div className="text-lg text-white md:text-2xl drop-shadow-lg">
          Skills
        </div>
        <div className="w-[50px] h-[2px] bg-amber-500" />
      </div>
    </section>
  );
}
