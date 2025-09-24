"use client";

export default function AboutPage() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      {/* Page Heading */}
      <div className="max-w-4xl mx-auto text-center mb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-700 dark:text-yellow-400 leading-tight">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Transforming Africa’s digital future through innovation, technology,
          and community empowerment.
        </p>
      </div>

      {/* Who We Are */}
      <div className=" mx-auto px-6 mb-16">
        <h2 className="text-4xl font-bold mb-6 text-indigo-700 dark:text-yellow-400">
          Who We Are
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Chaplin Technologies is a youth-led, Africa-focused technology startup
          headquartered in Kigali, Rwanda. Founded in 2025 by Bessora Neema
          Hirwa and Kayla Elyse, we are dedicated to bridging Africa’s digital
          divide. Our AI-driven platforms span education, healthcare, retail,
          hospitality, real estate, transport, HR, billing, and government/NGO
          services.
        </p>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Our mission is to empower Africa’s rapidly growing youth population
          with tools for quality education, optimized business operations,
          employment opportunities, and financial inclusion—turning local
          challenges into opportunities for growth and innovation.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className=" mx-auto px-6 mb-16 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-3xl font-semibold mb-4 text-indigo-700 dark:text-yellow-400">
            Our Mission
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Chaplin Technologies exists to transform Africa’s digital landscape
            by empowering youth, businesses, and institutions through
            accessible, AI-driven, and scalable digital solutions. We bridge the
            digital divide, equipping young people with education and skills,
            enabling businesses to innovate and grow, and supporting
            institutions in delivering efficient, transparent services.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-4 text-indigo-700 dark:text-yellow-400">
            Our Vision
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Our vision is to position Africa at the forefront of global digital
            transformation with secure, scalable AI-driven solutions, empowering
            youth, businesses, and institutions to thrive in the digital
            economy. By leveraging technology for inclusive growth, we aim to
            foster sustainable development and make Africa a hub for innovation.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className=" mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-indigo-700 dark:text-yellow-400">
          Our Core Values
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Interactive Card */}
          {[
            {
              title: "Innovation",
              desc: "We create AI-driven solutions that address real-world challenges across Africa.",
              color: "from-indigo-50 to-blue-50",
            },
            {
              title: "Empowerment",
              desc: "We empower youth, businesses, and communities to reach their full potential through technology.",
              color: "from-purple-50 to-pink-50",
            },
            {
              title: "Sustainability",
              desc: "Our solutions are designed to have long-term impact, fostering growth and inclusion across Africa.",
              color: "from-green-50 to-teal-50",
            },
            {
              title: "Community",
              desc: "We co-create with communities to ensure our solutions respond to real needs and challenges.",
              color: "from-yellow-50 to-orange-50",
            },
            {
              title: "Integrity",
              desc: "Transparency, ethical practices, and trust are at the heart of everything we do.",
              color: "from-red-50 to-pink-100",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-r ${item.color} dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
            >
              <h3 className="text-2xl font-semibold mb-3 text-indigo-700 dark:text-yellow-400 group-hover:underline decoration-2 decoration-indigo-500 dark:decoration-yellow-400">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {item.desc}
              </p>
              {/* Decorative Circle */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-indigo-200 dark:bg-yellow-500 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
