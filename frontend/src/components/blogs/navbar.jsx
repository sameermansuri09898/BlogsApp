import { useState, useEffect } from "react";

const navLinks = [
  { label: "Articles", href: "#" },
  { label: "Topics", href: "#" },
  { label: "Authors", href: "#" },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .nav-font { font-family: 'DM Sans', sans-serif; }
        .brand-font { font-family: 'Playfair Display', serif; }
        .nav-link-hover {
          position: relative;
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #c9a96e;
          transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after,
        .nav-link-hover.active::after {
          width: 100%;
        }
        .mobile-menu-enter {
          animation: slideDown 0.3s ease forwards;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hamburger-line {
          transition: all 0.3s ease;
          transform-origin: center;
        }
      `}</style>

      <nav
        className={`nav-font fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#faf8f3]/95 backdrop-blur-md shadow-[0_1px_30px_rgba(0,0,0,0.08)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">

            {/* Brand */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-[#c9a96e] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="brand-font text-white text-sm font-bold italic">P</span>
              </div>
              <span className="brand-font text-[#1a1208] text-xl font-bold tracking-tight">
                Prose<span className="text-[#c9a96e] italic">&</span>Page
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`nav-link-hover text-sm font-medium tracking-wide transition-colors duration-200 pb-0.5 ${
                    activeLink === link.label
                      ? "text-[#c9a96e] active"
                      : "text-[#3d3020] hover:text-[#c9a96e]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search */}
              <button className="w-9 h-9 flex items-center justify-center rounded-full text-[#3d3020] hover:text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all duration-200">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {/* Subscribe CTA */}
              <a
                href="#"
                className="flex items-center gap-2 bg-[#1a1208] text-[#f5edd8] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#c9a96e] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Subscribe
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-[#c9a96e]/10 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`hamburger-line block h-px w-5 bg-[#1a1208] ${menuOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
              <span className={`hamburger-line block h-px w-5 bg-[#1a1208] ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`hamburger-line block h-px w-5 bg-[#1a1208] ${menuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu-enter md:hidden mt-3 mx-4 rounded-2xl bg-[#faf8f3] border border-[#e8dfc9] shadow-xl overflow-hidden">
            <div className="py-4 px-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { setActiveLink(link.label); setMenuOpen(false); }}
                  className={`py-3 px-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 flex items-center justify-between ${
                    activeLink === link.label
                      ? "text-[#c9a96e] bg-[#c9a96e]/10"
                      : "text-[#3d3020] hover:text-[#c9a96e] hover:bg-[#c9a96e]/5"
                  }`}
                >
                  {link.label}
                  {activeLink === link.label && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                  )}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-[#e8dfc9]">
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 w-full bg-[#1a1208] text-[#f5edd8] text-sm font-medium py-3 rounded-xl hover:bg-[#c9a96e] transition-all duration-300"
                >
                  Subscribe to Newsletter
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}