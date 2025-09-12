'use client'
import { Milestone } from '../types'
import { logger } from '../lib/logger'
import { useEffect } from 'react'

const Journey = (): JSX.Element => {
    const milestones: Milestone[] = [
        {
            year: '2025',
            title: 'Foundation',
            description: 'Established in Kigali, Rwanda with a vision to transform African technology landscape through innovative solutions.'
        },
        {
            year: '2025',
            title: 'Ogera MVP Launch',
            description: 'Launching our flagship platform integrating AI-driven solutions across multiple sectors.'
        },
        {
            year: '2026',
            title: 'Regional Expansion',
            description: 'Expanding operations to Kenya, Uganda, and Tanzania, bringing our solutions to East Africa.'
        },
        {
            year: '2027',
            title: 'Continental Reach',
            description: 'Scaling across Africa, establishing partnerships and local presence in key markets.'
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
        <section id="about" className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-dark-blue mb-4">Our Journey & Vision</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        From our foundation in Kigali to our vision of continental transformation,
                        discover the milestones that define our commitment to African innovation.
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
