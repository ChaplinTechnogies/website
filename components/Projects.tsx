'use client'
import { logger } from '../lib/logger'
import { useEffect } from 'react'

const Projects = (): JSX.Element => {
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
        <section id="ogera" className="py-16 bg-dark-blue">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-white mb-8">Introducing Our Projects</h2>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-green-400 to-yellow-400 rounded-2xl p-12 mb-8 shadow-2xl">
                        <h3 className="text-3xl font-bold text-white mb-4">Ogera Platform Preview</h3>
                        <p className="text-xl text-white opacity-90">Coming Soon</p>
                    </div>

                    <button
                        onClick={handleEarlyAccessClick}
                        className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg"
                        aria-label="Request early access to Ogera Platform"
                    >
                        Request Early Access
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
