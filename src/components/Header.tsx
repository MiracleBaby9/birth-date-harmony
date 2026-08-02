import { useEffect, useState, useRef } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const scrolledRef = useRef(false);
  const disclaimerVisibleRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          const disclaimerVisible = window.scrollY > 300;
          if (scrolled !== scrolledRef.current) {
            scrolledRef.current = scrolled;
            setIsScrolled(scrolled);
          }
          if (disclaimerVisible !== disclaimerVisibleRef.current) {
            disclaimerVisibleRef.current = disclaimerVisible;
            setIsDisclaimerVisible(disclaimerVisible);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg shadow-lg py-3" : "bg-transparent py-5"
      } ${isDisclaimerVisible ? "top-8 sm:top-9" : "top-0 sm:top-5"}`}
      style={isScrolled ? { background: 'hsl(30 100% 98.5% / 0.9)', borderBottom: '1px solid hsl(22 62% 91%)' } : {}}
    >
      <div className="container flex items-center justify-between gap-3 py-2.5 sm:py-3">
        <img src={logo} alt="Ankshaastra" className="h-7 w-auto max-w-[46vw] rounded object-contain sm:h-8 sm:max-w-none" />
        <a
          href="https://miraclebaby.ankshaastra.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[46vw] rounded-full bg-gradient-warm px-4 py-2 text-center text-sm font-body font-semibold leading-snug text-white transition-transform hover:scale-105 sm:max-w-none sm:px-5"
        >
          Perfect Baby Name
        </a>
      </div>
    </header>
  );
};

export default Header;
