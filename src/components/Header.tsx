import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/#pricing", label: "Packages" },
  { to: "/reviews", label: "Reviews" },
  { to: "/videos", label: "Videos" },
  { to: "/media", label: "Media" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

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
        <Link
          to="/"
          className="inline-flex items-center rounded-2xl px-3.5 py-2 shadow-soft"
          style={{ background: "hsl(340 30% 22%)" }}
        >
          <img src={logo} alt="Ankshaastra" className="h-7 w-auto max-w-[46vw] object-contain sm:h-9 sm:max-w-none" />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-sm font-body font-medium text-brand-body">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="transition-colors hover:text-brand-rose">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://miraclebaby.ankshaastra.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[46vw] rounded-full bg-gradient-warm px-4 py-2 text-center text-sm font-body font-semibold leading-snug text-white transition-transform hover:scale-105 sm:max-w-none sm:px-5"
        >
          Perfect Baby Name
        </a>
      </div>

      <nav className="lg:hidden container flex items-center gap-4 overflow-x-auto pb-1.5 text-xs font-body font-medium text-brand-body [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className="whitespace-nowrap transition-colors hover:text-brand-rose">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
