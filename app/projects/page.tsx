"use client";

import {
  FaGraduationCap,
  FaShoppingCart,
  FaHospital,
  FaHotel,
  FaTruck,
  FaWallet,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Education",
      description:
        "AI-powered learning platforms that personalize student performance tracking, automate timetables, and provide skill-building resources to reduce school dropouts and improve employability.",
      icon: (
        <FaGraduationCap
          size={36}
          className="text-indigo-600 dark:text-yellow-400"
        />
      ),
    },
    {
      title: "Business & Retail",
      description:
        "Smart automation tools for SMEs and enterprises, including sales trend prediction, inventory management, pricing optimization, and operational efficiency dashboards.",
      icon: (
        <FaShoppingCart
          size={36}
          className="text-indigo-600 dark:text-yellow-400"
        />
      ),
    },
    {
      title: "Healthcare",
      description:
        "Digital tools for predictive diagnostics, automated patient record analysis, and inventory management for medical supplies, improving service delivery and operational efficiency.",
      icon: (
        <FaHospital
          size={36}
          className="text-indigo-600 dark:text-yellow-400"
        />
      ),
    },
    {
      title: "Hospitality & Real Estate",
      description:
        "AI-driven guest experience optimization, housekeeping automation, rental default prediction, and maintenance scoring to improve management and customer satisfaction.",
      icon: (
        <FaHotel size={36} className="text-indigo-600 dark:text-yellow-400" />
      ),
    },
    {
      title: "Transport & Logistics",
      description:
        "Predictive fleet maintenance, fuel anomaly detection, and route optimization, enabling safer, more efficient transport operations.",
      icon: (
        <FaTruck size={36} className="text-indigo-600 dark:text-yellow-400" />
      ),
    },
    {
      title: "Financial Services",
      description:
        "Secure mobile wallets, transaction management, and AI-driven financial insights to enhance inclusion and streamline payments for individuals and SMEs.",
      icon: (
        <FaWallet size={36} className="text-indigo-600 dark:text-yellow-400" />
      ),
    },
    {
      title: "HR & Workforce Management",
      description:
        "Automated compliance checks, AI-based hiring recommendations, and payroll tools to support businesses in managing talent effectively.",
      icon: (
        <FaUsers size={36} className="text-indigo-600 dark:text-yellow-400" />
      ),
    },
    {
      title: "Government & NGO Services",
      description:
        "Platforms for real-time issue mapping, donor impact reporting, and data-driven resource allocation to improve transparency and efficiency.",
      icon: (
        <FaGlobe size={36} className="text-indigo-600 dark:text-yellow-400" />
      ),
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      {/* Page Heading */}
      <div className="max-w-5xl mx-auto text-center mb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-700 dark:text-yellow-400 leading-tight">
          Our Projects
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Explore the sectors where we are driving innovation and creating
          impact across Africa.
        </p>
      </div>

      {/* Projects Grid */}
      <div className=" mx-auto px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-start gap-4 cursor-pointer"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-900 shadow-md mb-4">
              {project.icon}
            </div>
            <h3 className="text-2xl font-semibold text-indigo-700 dark:text-yellow-400 group-hover:underline decoration-2 decoration-indigo-500 dark:decoration-yellow-400">
              {project.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
