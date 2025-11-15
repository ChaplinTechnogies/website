"use client";

import { useEffect, useState } from "react";
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
import type { IconType } from "react-icons";


interface Project {
  id: string;
  title: string;
  overview: string;
  category?: string;
  isActive: boolean;
  [key: string]: any;
}


const iconMap: Record<string, IconType> = {
  education: FaGraduationCap,
  business: FaShoppingCart,
  healthcare: FaHospital,
  hospitality: FaHotel,
  transport: FaTruck,
  financial: FaWallet,
  hr: FaUsers,
  government: FaGlobe,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data: Project[] = await res.json();

        // Filter only active projects
        const activeProjects = data.filter(project => project.isActive);
        setProjects(activeProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <p>Loading projects...</p>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      <div className="max-w-5xl mx-auto text-center mb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-700 dark:text-yellow-400 leading-tight">
          Projects
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Explore our latest projects and innovations.
        </p>
      </div>

      <div className="mx-auto px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          // Safely get category and match icon
          const category = typeof project.category === "string" ? project.category.toLowerCase() : "";
          const IconComponent: IconType = iconMap[category] || FaGlobe;

          return (
            <div
              key={project.id}
              className="group relative bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-start gap-4 cursor-pointer"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-900 shadow-md mb-4">
                <IconComponent size={36} className="text-indigo-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-2xl font-semibold text-indigo-700 dark:text-yellow-400 group-hover:underline decoration-2 decoration-indigo-500 dark:decoration-yellow-400">
                {project.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {project.overview}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
