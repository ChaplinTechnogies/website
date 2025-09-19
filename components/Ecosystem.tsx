"use client";
import { FaCloud, FaChartLine, FaUsers, FaLock } from "react-icons/fa";

const solutions = [
  {
    title: "Cloud SaaS",
    description:
      "Scalable and reliable cloud-based software to simplify operations and boost productivity.",
    icon: <FaCloud size={30} />,
  },
  {
    title: "Analytics & Insights",
    description:
      "Turn your business data into meaningful insights with powerful dashboards and reports.",
    icon: <FaChartLine size={30} />,
  },
  {
    title: "Collaboration Tools",
    description:
      "Seamlessly connect your teams and improve communication with modern digital solutions.",
    icon: <FaUsers size={30} />,
  },
  {
    title: "Secure Systems",
    description:
      "Enterprise-grade security and compliance for all your business-critical applications.",
    icon: <FaLock size={30} />,
  },
];

export default function EcosystemSolutions() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-dark-surface dark:via-dark-card dark:to-dark-surface">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Our <span className="text-blue-600">Ecosystem Solutions</span>
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, i) => (
            <div
              key={i}
              className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-blue-600 bg-blue-100 rounded-full">
                {solution.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {solution.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
