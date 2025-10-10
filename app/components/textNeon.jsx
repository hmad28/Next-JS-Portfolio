import { motion } from "framer-motion";

export default function TextNeon() {
  const neonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const letters = ["H", "e", "l", "l", "o", "!"];

  return (
    <motion.div
      className="flex text-[6rem] md:text-[7rem] gap-5 tracking-[-0.25em] font-[100] font-[Liberty]"
      variants={neonVariants}
      initial="initial"
      animate="animate"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={`text-[#d9fdff] drop-shadow-[0_0_2rem_#00f0ff] ${
            index === 1 ? "animate-flicker" : ""
          }`}
          variants={letterVariants}
          whileHover={{
            scale: 1.2,
            textShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff",
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
