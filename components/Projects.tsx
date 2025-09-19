"use client";
import { logger } from "../lib/logger";
import { useEffect } from "react";
import { useI18n } from "../contexts/I18nContext";
import { Rocket, ExternalLink } from "lucide-react"; // make sure `npm install lucide-react`

const Projects = () => {
  const { t } = useI18n();

  useEffect(() => {
    logger.info("Projects component loaded", {
      component: "Projects",
    });
  }, []);

  const handleEarlyAccessClick = (): void => {
    logger.userInteraction("Early access button clicked", {
      action: "request_early_access",
      section: "projects",
    });

    alert(
      "Thank you for your interest! We'll notify you when early access is available."
    );
  };

  return (
    <section
      id="ogera"
      className="py-16 bg-dark-blue dark:bg-dark-surface relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/40 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-12">
          {t("projects.title")}
        </h2>

        {/* Ogera Project Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl shadow-xl p-10 text-center bg-gradient-to-r from-green-400 to-yellow-400 transform hover:-translate-y-2 hover:shadow-2xl transition duration-300">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <Rocket className="w-14 h-14 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t("projects.ogera.title")}
            </h3>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/90 mb-6">
              {t("projects.ogera.subtitle")}
            </p>

            {/* Link */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-white hover:underline mb-6"
            >
              Learn More
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>

            {/* Early Access Button */}
            <div>
              <button
                onClick={handleEarlyAccessClick}
                className="px-8 py-4 bg-dark-blue text-white font-semibold rounded-xl shadow-lg hover:bg-dark-blue/90 transition relative"
                aria-label="Request early access to Ogera Platform"
              >
                {t("projects.requestAccess")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
