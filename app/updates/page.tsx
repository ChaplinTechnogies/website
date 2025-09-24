"use client";

import { useState } from "react";
import { FaCalendarAlt, FaTag } from "react-icons/fa";

export default function UpdatesPage() {
  const updates = [
    {
      title: "New AI Learning Platform Launched",
      date: "2025-09-15",
      category: "Product",
      image: "/ai-learning.jpg",
      description:
        "We launched an AI-powered learning platform that personalizes student learning paths, improving engagement and performance.",
      details:
        "The platform includes interactive dashboards, AI-driven content recommendations, and automated assessment features. It’s designed for both students and teachers to enhance learning efficiency and outcomes.",
    },
    {
      title: "Healthcare Dashboard Update",
      date: "2025-09-10",
      category: "Platform",
      image: "/healthcare-dashboard.jpg",
      description:
        "Our digital healthcare dashboard now includes predictive analytics for better patient care and inventory management.",
      details:
        "New features include AI-based patient diagnostics, automated reporting, and real-time alerts for critical events. Hospitals can now manage medical supplies efficiently and improve service delivery.",
    },
    {
      title: "Retail Automation Tools Released",
      date: "2025-09-05",
      category: "Product",
      image: "/retail-automation.jpg",
      description:
        "New smart automation tools for SMEs and enterprises are now available, enhancing sales trend prediction and operational efficiency.",
      details:
        "These tools allow businesses to forecast demand, optimize inventory, and generate performance insights, helping reduce costs and increase revenue.",
    },
    {
      title: "Transport & Logistics Optimization",
      date: "2025-08-28",
      category: "Platform",
      image: "/transport-logistics.jpg",
      description:
        "Predictive fleet maintenance and route optimization features are now live to improve efficiency and reduce costs.",
      details:
        "Fleet managers can track fuel usage, maintenance schedules, and driver performance in real-time, improving safety and logistics operations.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      {/* Page Heading */}
      <div className="max-w-7xl mx-auto text-center mb-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-700 dark:text-yellow-400">
          Website Updates
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Stay informed about our latest releases, improvements, and important
          announcements.
        </p>
      </div>

      {/* Updates Grid */}
      <div className="w-full px-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {updates.map((update, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src={update.image}
                alt={update.title}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-6 flex flex-col flex-1">
              {/* Header */}
              <h3 className="text-2xl font-semibold mb-2 text-indigo-700 dark:text-yellow-400">
                {update.title}
              </h3>

              {/* Metadata */}
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt /> <span>{update.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaTag /> <span>{update.category}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {update.description}
              </p>

              {/* Expandable Details */}
              {expandedIndex === index && (
                <p className="text-gray-600 dark:text-gray-200 mb-3 transition-all duration-300">
                  {update.details}
                </p>
              )}

              {/* Read More Button */}
              <button
                onClick={() => toggleExpand(index)}
                className="self-start mt-auto bg-indigo-600 dark:bg-yellow-400 text-white dark:text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 dark:hover:bg-yellow-500 transition-colors duration-300"
              >
                {expandedIndex === index ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
