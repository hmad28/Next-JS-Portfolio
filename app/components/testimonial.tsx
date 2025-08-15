import Image from "next/image";

const testimonials = [
  {
    name: "Rasyid Abqari Hasibuan",
    role: "Work Partner",
    image: "/images/rasyid.jpg",
    linkedin: "https://www.linkedin.com/in/rasyid-abqari-hasibuan/",
    message:
      "Bekerja sama dengan Hammad menunjukkan kualitasnya sebagai profesional. Komunikasinya baik, bersikap adil, dan selalu memberikan yang terbaik di setiap proyek. Partner kerja yang bisa diandalkan.",
  },
  {
    name: "Ziyad Hamzah",
    role: "High School Student",
    image: "/images/ziyad.jpg",
    linkedin: "https://www.linkedin.com/in/ziyad-hamzah-378145378/",
    message:
      "Mantap banget! Cara ngajarnya Hammad tuh simpel, gampang dimengerti, dan bikin konsep programming yang rumit jadi terasa ringan. Recommended banget kalau mau belajar dari nol sampai paham.",
  },
  {
    name: "Rakha Adly Irsyad Dalimunthe",
    role: "Work Partner",
    image: "/images/rakha.jpg",
    linkedin: "https://www.linkedin.com/in/rakha-irsyad-828348375/",
    message:
      "Mantap! Hammad punya jiwa kepemimpinan. Cocok banget sebagai leader yang bisa mengarahkan tim menuju hasil terbaik.",
  },
  {
    name: "Azema Syauqi Rachman",
    role: "Work Partner",
    image: "/images/azema.jpeg",
    linkedin: "https://www.linkedin.com/in/rakha-irsyad-828348375/",
    message:
      "Kerjanya sangat bagus! Tidak menunda-nunda, Pengerjaannya juga sangat rapih dan pastinya amanah Bisa bekerja secara tim dengan Kerjasama yang sangat efektif ",
  },
];

export default function Testimonials() {
  return (
    <section
      className="flex flex-col md:flex-row flex-wrap xl:flex-nowrap gap-5 md:gap-10 justify-start md:justify-center"
      aria-label="Testimonials from work partners and students"
    >
      {testimonials.map((t, idx) => (
        <article
          key={idx}
          className="chat chat-start max-w-md"
          itemScope
          itemType="https://schema.org/Review"
        >
          <figure className="chat-image avatar">
            <div className="w-10 rounded-full overflow-hidden">
              <Image
                loading="lazy"
                alt={`Avatar of ${t.name}`}
                src={t.image}
                fill
                className="rounded-full"
              />
            </div>
            <figcaption className="sr-only">
              {t.name}, {t.role}
            </figcaption>
          </figure>
          <header className="chat-header text-base flex items-center gap-2">
            <a
              href={t.linkedin}
              className="hover:underline text-xs md:text-base"
              target="_blank"
              rel="noopener noreferrer"
              itemProp="author"
            >
              {t.name}
            </a>
            |{" "}
            <time className="text-[10px] md:ext-xs opacity-50" itemProp="datePublished">
              {t.role}
            </time>
          </header>
          <p className="chat-bubble max-w-md text-sm md:text-base" itemProp="reviewBody">
            {t.message}
          </p>
          <footer className="chat-footer opacity-50">Delivered</footer>
        </article>
      ))}
    </section>
  );
}
