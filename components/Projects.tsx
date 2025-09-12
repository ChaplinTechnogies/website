'use client'
import { logger } from '../lib/logger'
import { useEffect } from 'react'
import { useI18n } from '../contexts/I18nContext'

const Projects = (): JSX.Element => {
    const { t } = useI18n()
    
    useEffect(() => {
        logger.info('Projects component loaded', {
            component: 'Projects'
        });
    }, []);

    const handleEarlyAccessClick = (): void => {
        logger.userInteraction('Early access button clicked', {
            action: 'request_early_access',
            section: 'projects'
        });

        // In a real implementation, this would open a modal or redirect to a signup form
        alert('Thank you for your interest! We\'ll notify you when early access is available.');
    };

    return (
        <section id="ogera" className="py-12 sm:py-16 bg-dark-blue dark:bg-dark-surface">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white dark:text-dark-text mb-6 sm:mb-8">
                    {t('projects.title')}
                </h2>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-green-400 to-yellow-400 dark:from-green-500 dark:to-yellow-500 rounded-2xl p-8 sm:p-12 mb-6 sm:mb-8 shadow-2xl">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            {t('projects.ogera.title')}
                        </h3>
                        <p className="text-lg sm:text-xl text-white opacity-90">
                            {t('projects.ogera.subtitle')}
                        </p>
                    </div>

                    <button
                        onClick={handleEarlyAccessClick}
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg"
                        aria-label="Request early access to Ogera Platform"
                    >
                        {t('projects.requestAccess')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
