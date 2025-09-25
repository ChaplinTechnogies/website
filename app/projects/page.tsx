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
import { useI18n } from '../../contexts/I18nContext';

export default function ProjectsPage() {
  const { t } = useI18n();
  const projects = [
    {
      title: t("projects.education.title"),
      description: t("projects.education.desc"),
      icon: (
        <FaGraduationCap
          size={36}
          className="text-indigo-600 dark:text-yellow-400"
        />
      ),
    },
    {
      title: t("projects.business.title"),
      description: t("projects.business.desc"),
      icon: (
        <FaShoppingCart
          size={36}
          className="text-indigo-600 dark:text-yellow-400"
        />
      ),
    },
    {
      title: t("projects.healthcare.title"),
      description: t("projects.healthcare.desc"),
      icon: (
        <FaHospital
          size={36}
          className="text-indigo-600 dark:text-yellow-400"
        />
      ),
    },
    {
      title: t("projects.hospitality.title"),
      description: t("projects.hospitality.desc"),
      icon: (
        <FaHotel size={36} className="text-indigo-600 dark:text-yellow-400" />
      ),
    },
    {
      title: t("projects.transport.title"),
      description: t("projects.transport.desc"),
      icon: (
        <FaTruck size={36} className="text-indigo-600 dark:text-yellow-400" />
      ),
    },
    {
      title: t("projects.financial.title"),
      description: t("projects.financial.desc"),
      icon: (
        <FaWallet size={36} className="text-indigo-600 dark:text-yellow-400" />
      ),
    },
    {
      title: t("projects.hr.title"),
      description: t("projects.hr.desc"),
      icon: (
        <FaUsers size={36} className="text-indigo-600 dark:text-yellow-400" />
      ),
    },
    {
      title: t("projects.government.title"),
      description: t("projects.government.desc"),
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
          {t('projects.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          {t('projects.subtitle')}
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
