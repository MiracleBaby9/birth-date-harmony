import { motion } from "framer-motion";
import geita from "@/assets/celeb-geita-tyagi.jpg";
import darshan from "@/assets/celeb-darshan-patil.jpg";
import prashant from "@/assets/celeb-prashant-sambaragi.jpg";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const celebrities = [
  {
    name: "Geita Tyagi",
    role: "Indian Television & Film Actress",
    image: geita,
    bio: "Geita Tyagi is an acclaimed Indian television and film actress, celebrated for bringing memorable characters to life on India's most-loved shows.",
    works: [
      { title: "Jagaddhatri (Zee TV)", role: "Jagaddhatri" },
      { title: "Doli Armaano Ki", role: "Shashikala Singh Rathore" },
      { title: "Aap Ke Aa Jane Se", role: "Bimla Agarwal" },
    ],
    note: "Took personal consultation from Ankshaastra for herself.",
  },
  {
    name: "Prashant S Sambaragi",
    role: "South Actor & Entrepreneur",
    image: prashantAsset.url,
    bio: "Prashant S Sambaragi is a popular South Indian actor and entrepreneur, widely recognised as a contestant on Bigg Boss Kannada Season 8.",
    works: [
      { title: "Bigg Boss Kannada S8", role: "Contestant" },
      { title: "South Indian Cinema", role: "Actor" },
      { title: "Entrepreneurship", role: "Founder" },
    ],
    note: "Chose Ankshaastra for personal numerology guidance.",
  },
  {

    name: "Darshan Patil",
    role: "Film Actor & Body Double",
    image: darshan,
    bio: "Darshan Patil is a versatile Indian film actor known for his work as a body double for leading stars, with appearances in numerous Hindi films.",
    works: [
      { title: "Dhurandhar", role: "Featured Role" },
      { title: "Thumbs Up", role: "Featured Role" },
      { title: "And many more", role: "Body Double / Actor" },
    ],
    note: "Trusted Ankshaastra's guidance for personal consultation.",
  },
];

const Celebrities = () => (
  <section className="py-20 bg-brand-bg">
    <div className="container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        custom={0}
        viewport={{ once: true }}
        className="text-center mb-12 space-y-2"
      >
        <span className="inline-block rounded-full border border-brand-gold/40 bg-brand-card px-4 py-1 text-xs font-body font-medium text-brand-gold uppercase tracking-wider">
          Trusted by Celebrities
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold pt-2">
          Consulted by Leading Names
        </h2>
        <p className="font-accent italic text-brand-gold text-lg">
          Television & film personalities who placed their trust in Ankshaastra
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {celebrities.map((c, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={i}
            viewport={{ once: true }}
            className="rounded-card bg-brand-card border border-brand-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-surface">
              <img
                src={c.image}
                alt={`${c.name} - ${c.role}`}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute top-4 left-4 rounded-full bg-brand-gold/90 backdrop-blur-sm px-3 py-1 text-[10px] font-body font-semibold text-white uppercase tracking-wider">
                Celebrity Client
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-display text-xl font-bold text-brand-heading">
                  {c.name}
                </h3>
                <p className="font-accent italic text-brand-rose text-sm">
                  {c.role}
                </p>
              </div>

              <p className="text-brand-body text-sm leading-relaxed">{c.bio}</p>

              <ul className="space-y-1.5 border-t border-brand-border pt-3">
                {c.works.map((w, j) => (
                  <li
                    key={j}
                    className="flex items-start justify-between gap-3 text-xs"
                  >
                    <span className="font-body font-semibold text-brand-heading">
                      {w.title}
                    </span>
                    <span className="text-brand-muted text-right">{w.role}</span>
                  </li>
                ))}
              </ul>

              <p className="text-brand-rose text-xs font-body italic border-t border-brand-border pt-3">
                ✦ {c.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Celebrities;
