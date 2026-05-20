import { useState } from "react";

const categories = ["All", "Technology", "Education", "Design", "Travel", "Culture"];

const blogs = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    category: "Technology",
    desc: "How AI is changing the modern digital world.",
  },
  {
    id: 2,
    title: "Why Deep Work Matters",
    category: "Education",
    desc: "Focus and learning in a distracted generation.",
  },
  {
    id: 3,
    title: "Minimalism in Modern Design",
    category: "Design",
    desc: "Creating clean and timeless user experiences.",
  },
  {
    id: 4,
    title: "Backpacking Through Europe",
    category: "Travel",
    desc: "A guide to slow and meaningful travel.",
  },
  {
    id: 5,
    title: "Internet Culture & Society",
    category: "Culture",
    desc: "Understanding online communities and trends.",
  },
  {
    id: 6,
    title: "React vs Next.js in 2026",
    category: "Technology",
    desc: "Which frontend framework should you choose?",
  },
];

export default function FeaturedCategories() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .blog-font {
          font-family: 'Inter', sans-serif;
        }

        .category-btn {
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          transform: translateY(-2px);
        }

        .blog-card {
          transition: all 0.35s ease;
        }

        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
      `}</style>

      <section className="blog-font bg-[#faf8f3] py-24 px-6">

        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="mb-12 text-center">
            <p className="uppercase tracking-[0.25em] text-xs text-[#b08a52] font-medium mb-4">
              Featured Topics
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold text-[#1c160f] tracking-tight">
              Explore by category
            </h2>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-btn px-6 py-3 rounded-full text-sm font-medium border ${
                  activeCategory === category
                    ? "bg-[#1c160f] text-white border-[#1c160f]"
                    : "bg-white text-[#4a4033] border-[#ddd2bf] hover:border-[#b08a52]"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="blog-card bg-white border border-[#ece3d3] rounded-[24px] p-7"
              >

                <span className="inline-block text-xs uppercase tracking-[0.2em] text-[#b08a52] font-medium mb-5">
                  {blog.category}
                </span>

                <h3 className="text-2xl font-semibold text-[#1c160f] leading-snug mb-4">
                  {blog.title}
                </h3>

                <p className="text-[#6d6255] leading-relaxed text-sm mb-8">
                  {blog.desc}
                </p>

                <button className="flex items-center gap-2 text-sm font-medium text-[#1c160f] hover:text-[#b08a52] transition-colors">
                  Read Article
                  <span>→</span>
                </button>

              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}