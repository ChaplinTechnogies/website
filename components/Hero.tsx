'use client'
import { useI18n } from '../contexts/I18nContext'

export default function Hero() {
    const { t } = useI18n()

    return (
        <section id="home" className="pt-16 pb-12 bg-white dark:bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-dark-blue dark:text-dark-text">
                            {t('hero.title')}
                        </h1>
                        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            {t('hero.subtitle')}
                        </p>

                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="#ecosystem"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-accent text-white font-semibold hover:bg-green-600 transition-colors text-center"
                            >
                                {t('hero.exploreEcosystem')}
                            </a>
                            <a
                                href="#contact"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-dark-blue text-dark-blue dark:text-dark-text dark:border-dark-text font-semibold hover:bg-dark-blue hover:text-white dark:hover:bg-dark-text dark:hover:text-dark-bg transition-colors text-center"
                            >
                                {t('hero.startJourney')}
                            </a>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="relative order-first lg:order-last">
                        <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] bg-gradient-to-br from-yellow-200 to-green-400 dark:from-yellow-400 dark:to-green-600 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="w-full h-full bg-gradient-to-br from-green-300 to-green-600 dark:from-green-500 dark:to-green-700 flex items-center justify-center">
                                <div className="text-white text-center p-6">
                                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🌍</div>
                                    <div className="text-lg sm:text-xl font-semibold">African Innovation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
