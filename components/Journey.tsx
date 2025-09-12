'use client'
import { Milestone } from '../types'
import { logger } from '../lib/logger'
import { useEffect } from 'react'
import { useI18n } from '../contexts/I18nContext'

const Journey = () => {
    const { t } = useI18n()

    const milestones: Milestone[] = [
        {
            year: '2025',
            title: t('journey.2025.foundation.title'),
            description: t('journey.2025.foundation.desc')
        },
        {
            year: '2025',
            title: t('journey.2025.ogera.title'),
            description: t('journey.2025.ogera.desc')
        },
        {
            year: '2026',
            title: t('journey.2026.expansion.title'),
            description: t('journey.2026.expansion.desc')
        },
        {
            year: '2027',
            title: t('journey.2027.continental.title'),
            description: t('journey.2027.continental.desc')
        }
    ];

    useEffect(() => {
        logger.info('Journey component loaded', {
            component: 'Journey',
            milestonesCount: milestones.length
        });
    }, []);

    const handleMilestoneClick = (milestone: Milestone): void => {
        logger.userInteraction('Milestone clicked', {
            milestone: milestone.title,
            year: milestone.year,
            section: 'journey'
        });
    };

    return (
        <section id="about" className="py-12 sm:py-16 bg-white dark:bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-blue dark:text-dark-text mb-4">
                        {t('journey.title')}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto">
                        {t('journey.subtitle')}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent"></div>

                        {milestones.map((milestone, index) => (
                            <div
                                key={`milestone-${index}`}
                                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-lg z-10"></div>

                                {/* Content card */}
                                <div
                                    className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                                        }`}
                                >
                                    <div
                                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                        onClick={() => handleMilestoneClick(milestone)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                handleMilestoneClick(milestone);
                                            }
                                        }}
                                        aria-label={`Learn more about ${milestone.title}`}
                                    >
                                        <div className="text-accent font-bold text-lg mb-2">
                                            {milestone.year} - {milestone.title}
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;
