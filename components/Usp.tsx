"use client";
import { Lightbulb, Target, Users, TrendingUp } from "lucide-react";

export default function USPSection() {
  const usps = [
    {
      icon: <Lightbulb className="w-10 h-10 text-yellow-500" />,
      title: "Smart Technology",
      desc: "We craft SaaS solutions powered by modern tech that simplify operations and empower businesses.",
    },
    {
      icon: <Target className="w-10 h-10 text-blue-500" />,
      title: "Thoughtful Strategy",
      desc: "Our solutions are designed with business goals in mind, ensuring practical, scalable impact.",
    },
    {
      icon: <Users className="w-10 h-10 text-green-500" />,
      title: "User-Centered Design",
      desc: "Beautifully crafted, intuitive interfaces built for real users in real contexts.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-purple-500" />,
      title: "Measurable Results",
      desc: "Helping businesses make data-driven decisions and achieve sustainable growth.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Unique Selling Proposition (USP)
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          At <span className="font-semibold text-blue-600">Sybella Systems</span>, 
          we don’t just build software. We craft practical, user-friendly SaaS 
          solutions that combine smart technology, thoughtful strategy and 
          beautifully crafted designs. With accessibility, scalability and impact 
          at the core, we aim to become Africa’s most trusted partner for modern, 
          efficient digital tools.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4">{usp.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{usp.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{usp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
