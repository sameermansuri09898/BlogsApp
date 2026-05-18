export default function About() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-20">
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <div>
          <p className="text-blue-600 font-semibold uppercase tracking-widest mb-3">
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            We Create Meaningful Content For Modern Readers
          </h2>

          <p className="mt-6 text-gray-600 leading-8 text-lg">
            Our blog platform delivers high-quality articles, tutorials,
            insights, and industry trends for developers, designers,
            entrepreneurs, and creators around the world.
          </p>

          <p className="mt-4 text-gray-600 leading-8">
            We focus on sharing practical knowledge, real-world experiences,
            and valuable resources that help people grow their careers,
            businesses, and skills in the digital world.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-10">

            <div className="bg-gray-100 rounded-2xl p-5 text-center">
              <h3 className="text-3xl font-bold text-gray-900">10K+</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Monthly Readers
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-5 text-center">
              <h3 className="text-3xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Published Articles
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-5 text-center">
              <h3 className="text-3xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Expert Writers
              </p>
            </div>

          </div>

          {/* Button */}
          <button className="mt-10 bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition duration-300">
            Explore Articles
          </button>
        </div>

        {/* Right Image */}
        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1400&auto=format&fit=crop"
            alt="blog workspace"
            className="rounded-3xl shadow-2xl h-[600px] w-full object-cover"
          />

          {/* Floating Card */}
          <div className="absolute bottom-8 left-8 bg-white shadow-xl rounded-2xl p-6 w-72">
            <p className="text-gray-500 text-sm">
              Trusted by creators and professionals worldwide.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="author"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold text-gray-900">
                  Sarah Johnson
                </h4>

                <p className="text-sm text-gray-500">
                  Senior Content Strategist
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}