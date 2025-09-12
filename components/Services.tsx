'use client'
import { ServiceItem } from '../types';
import { logger } from '../lib/logger';
import { useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';

const Services = (): JSX.Element => {
    const { t } = useI18n()

    const ecosystemItems: ServiceItem[] = [
        {
            icon: '🎓',
            title: 'Education Platform',
            description: 'Revolutionizing learning with AI-powered educational tools and personalized learning experiences.'
        },
        {
            icon: '🏥',
            title: 'Healthcare Solutions',
            description: 'Digital health platforms connecting patients, providers, and systems for better healthcare outcomes.'
        },
        {
            icon: '🛒',
            title: 'Retail & Commerce',
            description: 'Next-generation e-commerce and retail management solutions for African businesses.'
        },
        {
            icon: '🏨',
            title: 'Hospitality Tech',
            description: 'Comprehensive hospitality management systems designed for Africa\'s growing tourism industry.'
        },
        {
            icon: '🏢',
            title: 'Real Estate',
            description: 'Smart property management and real estate solutions for Africa\'s urban development.'
        },
        {
            icon: '🚗',
            title: 'Transport & Logistics',
            description: 'Intelligent transportation and logistics platforms optimizing movement across the continent.'
        }
    ];

    const additionalServices: ServiceItem[] = [
        {
            icon: '👥',
            title: 'HR Management',
            description: 'Human resource solutions tailored for Africa\'s diverse and dynamic workforce.'
        },
        {
            icon: '📊',
            title: 'Inventory & Billing',
            description: 'Streamlined inventory management and billing systems for businesses of all sizes.'
        },
        {
            icon: '🏛️',
            title: 'Government & NGO',
            description: 'Digital governance solutions empowering public sector efficiency and transparency.'
        }
    ];

    useEffect(() => {
        logger.info('Services component loaded', {
            component: 'Services',
            ecosystemItemsCount: ecosystemItems.length,
            additionalServicesCount: additionalServices.length
        });
    }, []);

    const handleServiceClick = (serviceTitle: string): void => {
        logger.userInteraction('Service card clicked', {
            service: serviceTitle,
            section: 'ecosystem'
        });
    };

    return (
        <div>
            <section id="ecosystem" className="py-12 sm:py-16 bg-white dark:bg-dark-bg">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-blue dark:text-dark-text mb-4">
                            {t('services.title')}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto">
                            {t('services.subtitle')}
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {ecosystemItems.map((item, index) => (
                            <div
                                key={`ecosystem-${index}`}
                                className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => handleServiceClick(item.title)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleServiceClick(item.title);
                                    }
                                }}
                                aria-label={`Learn more about ${item.title}`}
                            >
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow rounded-full flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-dark-blue dark:text-dark-text mb-3 sm:mb-4">{item.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-gray-50 dark:bg-dark-surface">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {additionalServices.map((item, index) => (
                            <div
                                key={`additional-${index}`}
                                className="bg-white dark:bg-dark-bg p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => handleServiceClick(item.title)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleServiceClick(item.title);
                                    }
                                }}
                                aria-label={`Learn more about ${item.title}`}
                            >
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow rounded-full flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-dark-blue dark:text-dark-text mb-3 sm:mb-4">{item.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
