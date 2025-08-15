import Image from "next/image";
import { Arrow } from "../icon/arrow";

export default function Portfolio() {
    const portfolioItems = [
      {
        image: "port-jersey.jpg",
        alt: "Custom Football Jersey Design",
        category: "Design",
        categoryColor: "text-orange-500",
        title: "Custom Football Jersey Design for School Team",
        tools: [
          { name: "Canva", bg: "bg-cyan-500/90", text: "text-cyan-200" },
          { name: "Fifa Kit Creator", bg: "bg-black", text: "text-green-400" },
        ],
        client: "Rumah IT Al Imam Nafi'",
        description:
          "Mendesain jersey sepak bola untuk tim sekolah, dengan fokus pada kombinasi warna, identitas tim, dan kenyamanan pemakaian. Desain mencerminkan semangat sportivitas dan kekompakan pemain di lapangan.",
      },
      {
        image: "port-3.jpeg",
        alt: "Teaching HTML & CSS",
        category: "Teach",
        categoryColor: "text-teal-500",
        title: "Teaching HTML & CSS Fundamentals for High School Students",
        tools: [
          { name: "HTML", bg: "bg-orange-500", text: "text-orange-300" },
          { name: "CSS", bg: "bg-blue-600/90", text: "text-blue-300" },
        ],
        client: "Rumah IT Al Imam Nafi'",
        description:
          "Mengajar siswa SMA mengenai HTML & CSS, mulai dari konsep dasar hingga tingkat menengah, termasuk pembuatan website sederhana yang responsif.",
      },
      {
        image: "port-2.jpeg",
        alt: "Website Maintenance Umroh Murah Mabrur",
        category: "Frontend Development",
        categoryColor: "text-blue-500",
        title: "Website Maintenance & UI Enhancement for Umroh Murah Mabrur",
        tools: [
          { name: "PHP", bg: "bg-violet-400/90", text: "text-violet-200" },
          { name: "Javascript", bg: "bg-yellow-300", text: "text-black" },
          { name: "Tailwind CSS", bg: "bg-sky-500/90", text: "text-sky-200" },
        ],
        client: "Umroh Murah Mabrur",
        description:
          "Maintenance dan pengembangan antarmuka website perusahaan menggunakan PHP dan Tailwind CSS, memastikan tampilan responsif dan user-friendly.",
      },
      {
        image: "port-sf.jpg",
        alt: "Landing Page Shofi Frozen",
        category: "Frontend Development",
        categoryColor: "text-blue-500",
        title: "Landing Page Design for Shofi Frozen",
        tools: [
          { name: "HTML", bg: "bg-orange-500", text: "text-orange-300" },
          { name: "Javascript", bg: "bg-yellow-300", text: "text-black" },
          { name: "Tailwind CSS", bg: "bg-sky-500/90", text: "text-sky-200" },
        ],
        client: "Shofi Frozen",
        description:
          "Diminta untuk merancang landing page toko frozen food Shofi Frozen. Menggunakan Tailwind CSS untuk menciptakan desain yang modern, responsif, dan user-friendly, sehingga membantu memperkuat citra brand di dunia digital.",
      },
      {
        image: "port-editing2.jpg",
        alt: "Video Editing for School Activities and Events",
        category: "Video Editing",
        categoryColor: "text-purple-500",
        title: "Video Editing for School Activities and Events",
        tools: [
          { name: "Capcut", bg: "bg-black/90", text: "text-white" },
          { name: "Canva", bg: "bg-cyan-500/90", text: "text-cyan-200" },
        ],
        client: "Rumah IT Al Imam Nafi'",
        description:
          "Ditunjuk sebagai video editor untuk Rumah IT Al Imam Nafi’, menggarap video kegiatan seperti rihlah, class meeting, dan event sekolah lainnya. Menggabungkan momen-momen terbaik menjadi karya video yang menarik, informatif, dan merepresentasikan semangat sekolah.",
      },
      {
        image: "port-sq.jpg",
        alt: "12.12 Umrah Bazaar Documentation",
        category: "Multimedia",
        categoryColor: "text-yellow-500",
        title:
          "Capturing Moments: 12.12 Umrah Bazaar with Sahabat Qolbu & SHAZA",
        tools: [
          {
            name: "Photography",
            bg: "bg-slate-600/90",
            text: "text-slate-300",
          },
          { name: "Videography", bg: "bg-gray-400/90", text: "text-gray-200" },
        ],
        client: "Sahabat Qolbu & Shaza",
        description:
          "Berperan sebagai asisten fotografer dan videografer dalam dokumentasi BAZAR Umroh 12.12. Bertanggung jawab membantu pengambilan gambar dan video, memastikan setiap momen terekam dengan rapi dan berkualitas.",
      },
      {
        image: "port-1.jpeg",
        alt: "Maritime Moments Documentation for CIMA",
        category: "Multimedia",
        categoryColor: "text-yellow-500",
        title: "Maritime Moments: Visual Documentation for CIMA",
        tools: [
          {
            name: "Photography",
            bg: "bg-slate-600/90",
            text: "text-slate-300",
          },
          { name: "Videography", bg: "bg-gray-400/90", text: "text-gray-200" },
        ],
        client: "CIMA – Consortium of Indonesian Manning Agencies",
        description:
          "Magang pertama saya sebagai asisten fotografer dan videografer untuk CIMA pada Rapat Kerja Tahunan 2024. Bertanggung jawab membantu dokumentasi acara, memastikan hasil rapi dan berkualitas.",
      },
      {
        image: "ladzeedzah-brosur2.png",
        alt: "Visual Design for Ladzeedzah Bazaar Stand",
        category: "Design",
        categoryColor: "text-orange-500",
        title: "Visual Design for Ladzeedzah Bazaar Stand",
        tools: [{ name: "Canva", bg: "bg-cyan-500/90", text: "text-cyan-200" }],
        client: "Ladzeedzah Food & Drink",
        description:
          "Ditunjuk sebagai desainer untuk stand Ladzeedzah di acara Bazaar, mengerjakan berbagai materi promosi seperti poster, banner, brosur, dan menu. Hasil desain mendapat apresiasi sebagai desain terbaik di event.",
      },
    ];
  return (
    <div>
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {portfolioItems.map((item) => (
          <div
            key={item.image}
            className="group relative block bg-black md:h-[650px] overflow-hidden"
          >
            <Image
              src={`/images/${item.image}`}
              alt={item.alt}
              fill
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <p
                className={`text-sm font-medium tracking-widest uppercase ${item.categoryColor}`}
              >
                {item.category}
              </p>

              <p className="text-xl font-bold text-white sm:text-2xl">
                {item.title}
              </p>

              <div className="mt-32 sm:mt-48">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-start gap-3">
                  <div className="w-full flex gap-2 flex-wrap">
                    {item.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className={`px-2 font-mono text-sm rounded ${tool.bg} ${tool.text}`}
                      >
                        {tool.name}
                      </div>
                    ))}
                  </div>

                  <h1 className="text-3xl text-white font-bold">
                    {item.client}
                  </h1>
                  <p className="text-sm text-white">{item.description}</p>

                  <div className="w-full flex gap-2 flex-wrap">
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
                      Preview <Arrow/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
