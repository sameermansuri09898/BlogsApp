import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap');

        .hero-font {
          font-family: 'Inter', sans-serif;
        }

        .heading-font {
          font-family: 'Cormorant Garamond', serif;
        }

        .hero-bg {
          background: #f8f6f2;
          position: relative;
          overflow: hidden;
        }

        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top right, rgba(201,169,110,0.08), transparent 28%),
            radial-gradient(circle at bottom left, rgba(120,90,60,0.05), transparent 25%);
          pointer-events: none;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(35px);
          transition: all 0.9s ease;
        }

        .fade-up.show {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-1 { transition-delay: 0.15s; }
        .delay-2 { transition-delay: 0.3s; }
        .delay-3 { transition-delay: 0.45s; }

        .hero-button {
          transition: all 0.3s ease;
        }

        .hero-button:hover {
          transform: translateY(-2px);
        }

        .line {
          width: 70px;
          height: 1px;
          background: #c9a96e;
        }

        .floating-circle {
          position: absolute;
          border-radius: 9999px;
          background: rgba(201,169,110,0.08);
          filter: blur(10px);
        }
      `}</style>

      <section className="hero-font hero-bg min-h-screen flex items-center">

        {/* Decorative Blur Shapes */}
        <div className="floating-circle w-72 h-72 top-[-100px] right-[-80px]" />
        <div className="floating-circle w-60 h-60 bottom-[-80px] left-[-60px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full py-32">

          <div className="max-w-4xl">

            {/* Top Label */}
            <div className={`fade-up ${visible ? "show" : ""}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="line" />
                <span className="uppercase tracking-[0.28em] text-xs text-[#8b6e4e] font-medium">
                  Modern Independent Journal
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className={`fade-up delay-1 ${visible ? "show" : ""}`}>
              <h1 className="heading-font text-6xl md:text-7xl lg:text-[96px] leading-[0.92] font-semibold tracking-tight text-[#1c160f]">
                Timeless writing
                <br />
                for thoughtful
                <br />
                minds.
              </h1>
            </div>

            {/* Subtitle */}
            <div className={`fade-up delay-2 ${visible ? "show" : ""}`}>
              <p className="mt-8 text-lg md:text-xl text-[#5f5548] leading-relaxed max-w-2xl font-light">
                Essays, stories, and perspectives exploring culture,
                technology, creativity, and the ideas shaping the modern world.
              </p>
            </div>

            {/* Buttons */}
            <div className={`fade-up delay-3 ${visible ? "show" : ""}`}>
              <div className="flex flex-wrap gap-4 mt-12">

                <button className="hero-button bg-[#1c160f] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#c9a96e]">
                  Explore Articles
                </button>

                <button className="hero-button border border-[#d7ccb9] text-[#3f3528] px-8 py-4 rounded-full text-sm font-medium hover:border-[#c9a96e] hover:bg-white">
                  View Collections
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}