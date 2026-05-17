import { useState, useEffect } from "react";

const featuredTags = ["Culture", "Technology", "Design", "Philosophy", "Travel"];

const stats = [
  { value: "12K+", label: "Readers" },
  { value: "340+", label: "Articles" },
  { value: "48", label: "Authors" },
];

const featuredPosts = [
  {
    id: 1,
    tag: "Design",
    title: "The Quiet Revolution of Slow Design",
    excerpt: "How restraint and intentionality are reshaping the way we think about creative work.",
    author: "Mira Okafor",
    readTime: "6 min read",
    date: "May 14, 2026",
    avatar: "M",
    avatarColor: "#8b6e4e",
  },
  {
    id: 2,
    tag: "Technology",
    title: "Writing in the Age of Artificial Minds",
    excerpt: "What it means to have a voice when machines can now speak in any tongue.",
    author: "James Ellery",
    readTime: "9 min read",
    date: "May 10, 2026",
    avatar: "J",
    avatarColor: "#5a7a6e",
  },
];

export default function HeroSection() {
  const [activeTag, setActiveTag] = useState("Culture");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .hero-font { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }

        .hero-bg {
          background-color: #faf8f3;
          background-image:
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(201, 169, 110, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(139, 110, 78, 0.08) 0%, transparent 50%);
        }

        .grain-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.25s; }
        .delay-3 { transition-delay: 0.4s; }
        .delay-4 { transition-delay: 0.55s; }
        .delay-5 { transition-delay: 0.7s; }

        .tag-pill {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .tag-pill:hover {
          transform: translateY(-1px);
        }

        .post-card {
          transition: all 0.3s ease;
        }
        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(26,18,8,0.1);
        }

        .divider-ornament {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #c9a96e;
        }
        .divider-ornament::before,
        .divider-ornament::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a96e55, transparent);
        }

        .stat-item {
          position: relative;
        }
        .stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: #e8dfc9;
        }

        .scroll-hint {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        .headline-accent {
          position: relative;
          display: inline-block;
        }
        .headline-accent::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c9a96e, #e8c87d);
          border-radius: 2px;
          opacity: 0.6;
        }
      `}</style>

      <section className="hero-font relative min-h-screen hero-bg overflow-hidden flex flex-col pt-24">
        <div className="grain-overlay" />

        {/* Decorative Elements */}
        <div className="absolute top-32 right-8 lg:right-16 w-72 h-72 rounded-full border border-[#c9a96e]/15 pointer-events-none" />
        <div className="absolute top-48 right-16 lg:right-24 w-48 h-48 rounded-full border border-[#c9a96e]/10 pointer-events-none" />
        <div className="absolute bottom-32 left-0 w-40 h-40 rounded-full bg-[#c9a96e]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center py-16">

          {/* Top Label */}
          <div className={`fade-up ${visible ? "visible" : ""} flex items-center gap-3 mb-8`}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#8b6e4e] tracking-[0.15em] uppercase">
              <span className="w-6 h-px bg-[#c9a96e]" />
              Est. 2024 · Independent Publishing
            </span>
          </div>

          {/* Main Headline */}
          <div className={`fade-up delay-1 ${visible ? "visible" : ""} max-w-3xl mb-6`}>
            <h1 className="display-font text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1208] leading-[1.08] tracking-tight">
              Words that{" "}
              <span className="italic text-[#c9a96e]">move</span>{" "}
              the mind,
              <br />
              ideas that{" "}
              <span className="headline-accent">last</span>.
            </h1>
          </div>

          {/* Subtitle */}
          <p className={`fade-up delay-2 ${visible ? "visible" : ""} text-[#6b5740] text-lg font-light max-w-xl leading-relaxed mb-10`}>
            Curated essays, long-form stories, and sharp commentary from independent
            voices around the world — for the genuinely curious.
          </p>

          {/* CTA Row */}
          <div className={`fade-up delay-3 ${visible ? "visible" : ""} flex flex-wrap items-center gap-4 mb-14`}>
            <a
              href="#"
              className="flex items-center gap-2.5 bg-[#1a1208] text-[#f5edd8] font-medium px-7 py-3.5 rounded-full hover:bg-[#c9a96e] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
            >
              Start Reading
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 border border-[#c9a96e]/50 text-[#3d3020] font-medium px-7 py-3.5 rounded-full hover:border-[#c9a96e] hover:bg-[#c9a96e]/8 transition-all duration-300 text-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Subscribe Free
            </a>
          </div>

          {/* Topic Tags */}
          <div className={`fade-up delay-3 ${visible ? "visible" : ""} mb-16`}>
            <p className="text-xs text-[#8b6e4e] tracking-widest uppercase mb-3 font-medium">Browse Topics</p>
            <div className="flex flex-wrap gap-2">
              {featuredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`tag-pill text-xs font-medium px-4 py-2 rounded-full border ${
                    activeTag === tag
                      ? "bg-[#c9a96e] border-[#c9a96e] text-white shadow-md"
                      : "border-[#d4c4a8] text-[#5a4530] hover:border-[#c9a96e] hover:text-[#c9a96e] bg-white/60"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Ornament Divider */}
          <div className={`fade-up delay-4 ${visible ? "visible" : ""} divider-ornament mb-10`}>
            <span className="text-xs tracking-widest uppercase font-medium text-[#c9a96e]/70">Featured This Week</span>
          </div>

          {/* Featured Post Cards */}
          <div className={`fade-up delay-4 ${visible ? "visible" : ""} grid grid-cols-1 md:grid-cols-2 gap-5 mb-14`}>
            {featuredPosts.map((post) => (
              <a
                key={post.id}
                href="#"
                className="post-card group bg-white/70 backdrop-blur-sm border border-[#e8dfc9] rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-medium text-[#c9a96e] tracking-wide uppercase bg-[#c9a96e]/10 px-3 py-1 rounded-full">
                    {post.tag}
                  </span>
                  <span className="text-xs text-[#9b8770]">{post.readTime}</span>
                </div>

                <h3 className="display-font text-xl font-bold text-[#1a1208] leading-snug mb-2 group-hover:text-[#c9a96e] transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6b5740] leading-relaxed mb-5 font-light">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: post.avatarColor }}
                    >
                      {post.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#3d3020]">{post.author}</p>
                      <p className="text-xs text-[#9b8770]">{post.date}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1a1208]/5 flex items-center justify-center group-hover:bg-[#c9a96e]/15 transition-colors duration-200">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Stats Row */}
          <div className={`fade-up delay-5 ${visible ? "visible" : ""} grid grid-cols-3 gap-0 max-w-sm`}>
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item text-center px-4">
                <p className="display-font text-2xl font-bold text-[#1a1208]">{stat.value}</p>
                <p className="text-xs text-[#8b6e4e] tracking-wide mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center pb-8 gap-2">
          <span className="text-xs text-[#9b8770] tracking-widest uppercase">Scroll</span>
          <div className="scroll-hint w-5 h-8 border border-[#c9a96e]/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#c9a96e] rounded-full" />
          </div>
        </div>
      </section>
    </>
  );
}