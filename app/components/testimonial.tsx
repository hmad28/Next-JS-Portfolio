import { motion } from "framer-motion";
import { Quote, Linkedin, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rasyid Abqari Hasibuan",
    role: "Work Partner",
    image: "/images/rasyid.jpg",
    linkedin: "https://www.linkedin.com/in/rasyid-abqari-hasibuan/",
    rating: 5,
    message:
      "Bekerja sama dengan Hammad menunjukkan kualitasnya sebagai profesional. Komunikasinya baik, bersikap adil, dan selalu memberikan yang terbaik di setiap proyek. Partner kerja yang bisa diandalkan.",
  },
  {
    name: "Ziyad Hamzah",
    role: "High School Student",
    image: "/images/ziyad.jpg",
    linkedin: "https://www.linkedin.com/in/ziyad-hamzah-378145378/",
    rating: 5,
    message:
      "Mantap banget! Cara ngajarnya Hammad tuh simpel, gampang dimengerti, dan bikin konsep programming yang rumit jadi terasa ringan. Recommended banget kalau mau belajar dari nol sampai paham.",
  },
  {
    name: "Rakha Adly Irsyad Dalimunthe",
    role: "Work Partner",
    image: "/images/rakha.jpg",
    linkedin: "https://www.linkedin.com/in/rakha-irsyad-828348375/",
    rating: 5,
    message:
      "Mantap! Hammad punya jiwa kepemimpinan. Cocok banget sebagai leader yang bisa mengarahkan tim menuju hasil terbaik.",
  },
  {
    name: "Azema Syauqi Rachman",
    role: "Work Partner",
    image: "/images/azema.jpeg",
    linkedin: "https://www.linkedin.com/in/rakha-irsyad-828348375/",
    rating: 5,
    message:
      "Kerjanya sangat bagus! Tidak menunda-nunda, Pengerjaannya juga sangat rapih dan pastinya amanah Bisa bekerja secara tim dengan Kerjasama yang sangat efektif ",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

export default function Testimonials() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8"
      aria-label="Testimonials from work partners and students"
    >
      {testimonials.map((t, idx) => (
        <motion.article
          key={idx}
          variants={cardVariants}
          whileHover={{
            y: -10,
            transition: { duration: 0.3 },
          }}
          className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
          itemScope
          itemType="https://schema.org/Review"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

          {/* Quote icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
            className="absolute top-4 right-4 text-amber-400/20 group-hover:text-amber-400/40 transition-colors duration-300"
          >
            <Quote className="w-12 h-12" fill="currentColor" />
          </motion.div>

          {/* Avatar and Info */}
          <div className="relative flex items-start gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-amber-400/20 group-hover:ring-amber-400/40 transition-all duration-300"
            >
              <img
                src={t.image}
                alt={`Avatar of ${t.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3
                  className="font-bold text-gray-900 text-base leading-tight"
                  itemProp="author"
                >
                  {t.name}
                </h3>
                <motion.a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label={`Visit ${t.name}'s LinkedIn profile`}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>

              <p
                className="text-sm text-gray-500 mt-1"
                itemProp="datePublished"
              >
                {t.role}
              </p>

              {/* Star Rating */}
              <div
                className="flex gap-1 mt-2"
                itemProp="reviewRating"
                itemScope
                itemType="https://schema.org/Rating"
              >
                <meta itemProp="ratingValue" content={t.rating.toString()} />
                <meta itemProp="bestRating" content="5" />
                {[...Array(t.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

          {/* Message */}
          <blockquote className="relative">
            <p
              className="text-gray-700 text-sm leading-relaxed italic"
              itemProp="reviewBody"
            >
              "{t.message}"
            </p>
          </blockquote>

          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.article>
      ))}
    </motion.section>
  );
}
