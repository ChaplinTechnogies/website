"use client";
import { useI18n } from '../../contexts/I18nContext';

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      {/* Page Heading */}
      <div className="max-w-4xl mx-auto text-center mb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-700 dark:text-yellow-400 leading-tight">
          {t('about.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Who We Are */}
      <div className=" mx-auto px-6 mb-16">
        <h2 className="text-4xl font-bold mb-6 text-indigo-700 dark:text-yellow-400">
          {t('about.whoWeAre.title')}
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t('about.whoWeAre.desc1')}
        </p>
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t('about.whoWeAre.desc2')}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className=" mx-auto px-6 mb-16 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-3xl font-semibold mb-4 text-indigo-700 dark:text-yellow-400">
            {t('about.mission.title')}
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {t('about.mission.desc')}
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-4 text-indigo-700 dark:text-yellow-400">
            {t('about.vision.title')}
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {t('about.vision.desc')}
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className=" mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-indigo-700 dark:text-yellow-400">
          {t('about.values.title')}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Interactive Card */}
          {[
            {
              title: t("about.values.innovation.title"),
              desc: t("about.values.innovation.desc"),
              color: "from-indigo-50 to-blue-50",
            },
            {
              title: t("about.values.empowerment.title"),
              desc: t("about.values.empowerment.desc"),
              color: "from-purple-50 to-pink-50",
            },
            {
              title: t("about.values.sustainability.title"),
              desc: t("about.values.sustainability.desc"),
              color: "from-green-50 to-teal-50",
            },
            {
              title: t("about.values.community.title"),
              desc: t("about.values.community.desc"),
              color: "from-yellow-50 to-orange-50",
            },
            {
              title: t("about.values.integrity.title"),
              desc: t("about.values.integrity.desc"),
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
