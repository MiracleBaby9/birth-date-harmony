import { motion } from "framer-motion";
import { useState } from "react";

const videos = [
  { id: "yF9ufbKJYcs", title: "Video 1" },
  { id: "1ilCeIyAVsI", title: "Video 2" },
  { id: "WB17QfVWPlE", title: "Video 3" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const VideoCard = ({ video }: { video: { id: string; title: string } }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label={`Play ${video.title}`}
        >
          <img
            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <svg className="w-16 h-16 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

const YouTubeSection = () => (
  <section className="py-20 bg-brand-surface">
    <div className="container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        custom={0}
        viewport={{ once: true }}
        className="text-center mb-12 space-y-2"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold">
          Watch & Learn More
        </h2>
        <p className="font-accent italic text-brand-gold text-lg">
          Understand the power of choosing the right birth date
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={i + 1}
            viewport={{ once: true }}
            className="rounded-card overflow-hidden border border-brand-border shadow-sm bg-brand-card"
          >
            <VideoCard video={video} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default YouTubeSection;
