'use client'
import { useState, useEffect } from 'react'
import { logger } from '../lib/logger'

interface DemoStep {
    id: string
    title: string
    description: string
    image: string
    features: string[]
}

const OgeraDemo = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const demoSteps: DemoStep[] = [
        {
            id: '1',
            title: 'Dashboard Overview',
            description: 'Get a comprehensive view of all your business operations in one place.',
            image: '/images/ogera/dashboard.jpg',
            features: ['Real-time Analytics', 'Multi-sector Integration', 'Customizable Widgets']
        },
        {
            id: '2',
            title: 'AI-Powered Insights',
            description: 'Leverage artificial intelligence to make data-driven decisions.',
            image: '/images/ogera/ai-insights.jpg',
            features: ['Predictive Analytics', 'Smart Recommendations', 'Automated Reporting']
        },
        {
            id: '3',
            title: 'Cross-Platform Integration',
            description: 'Seamlessly connect all your business systems and processes.',
            image: '/images/ogera/integration.jpg',
            features: ['API Integration', 'Data Synchronization', 'Workflow Automation']
        },
        {
            id: '4',
            title: 'Mobile Accessibility',
            description: 'Access your business data and insights from anywhere, anytime.',
            image: '/images/ogera/mobile.jpg',
            features: ['Mobile-First Design', 'Offline Capabilities', 'Push Notifications']
        }
    ]

    useEffect(() => {
        logger.info('Ogera demo component loaded', {
            component: 'OgeraDemo',
            stepsCount: demoSteps.length
        })
    }, [])

    const handleStepClick = (stepIndex: number): void => {
        setCurrentStep(stepIndex)
        setIsPlaying(false)

        logger.userInteraction('Demo step clicked', {
            step: stepIndex,
            stepTitle: demoSteps[stepIndex].title,
            component: 'OgeraDemo'
        })
    }

    const handlePlayDemo = (): void => {
        setIsPlaying(true)
        setCurrentStep(0)

        logger.userInteraction('Demo auto-play started', {
            component: 'OgeraDemo'
        })

        // Auto-advance through steps
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev >= demoSteps.length - 1) {
                    setIsPlaying(false)
                    clearInterval(interval)
                    return 0
                }
                return prev + 1
            })
        }, 3000)

        // Cleanup interval if component unmounts or demo stops
        return () => clearInterval(interval)
    }

    const handleRequestAccess = (): void => {
        logger.userInteraction('Early access requested from demo', {
            component: 'OgeraDemo'
        })

        // In a real implementation, this would open a modal or redirect to a signup form
        alert('Thank you for your interest! We\'ll notify you when early access is available.')
    }

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-dark-blue mb-4">Experience Ogera Platform</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Take a journey through our flagship platform and discover how it can transform your business operations.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Demo Content */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-dark-blue">
                                    {demoSteps[currentStep].title}
                                </h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handlePlayDemo}
                                        disabled={isPlaying}
                                        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                                    >
                                        {isPlaying ? 'Playing...' : '▶️ Play Demo'}
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {demoSteps[currentStep].description}
                            </p>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-dark-blue">Key Features:</h4>
                                <ul className="space-y-2">
                                    {demoSteps[currentStep].features.map((feature, index) => (
                                        <li key={index} className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Step Navigation */}
                        <div className="flex justify-center space-x-2">
                            {demoSteps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleStepClick(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${index === currentStep
                                        ? 'bg-accent'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Go to step ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Demo Visual */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-dark-blue to-accent rounded-2xl p-8 text-white text-center">
                            <div className="mb-6">
                                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl">🚀</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Ogera Platform</h3>
                                <p className="opacity-90">Interactive Demo Preview</p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="text-sm opacity-80 mb-2">Current Step</div>
                                    <div className="text-lg font-semibold">
                                        {currentStep + 1} of {demoSteps.length}
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="text-sm opacity-80 mb-2">Status</div>
                                    <div className="text-lg font-semibold">
                                        {isPlaying ? 'Auto-playing' : 'Ready to explore'}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleRequestAccess}
                                className="mt-8 px-8 py-3 bg-yellow text-dark-blue font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                            >
                                Request Early Access
                            </button>
                        </div>

                        {/* Floating Elements for Visual Appeal */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow rounded-full animate-pulse"></div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full animate-bounce"></div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-16 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-dark-blue mb-4">Ready to Transform Your Business?</h3>
                        <p className="text-gray-600 mb-6">
                            Join the waitlist for early access to Ogera Platform and be among the first to experience
                            the future of African business technology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleRequestAccess}
                                className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Join Waitlist
                            </button>
                            <button className="px-8 py-3 border-2 border-dark-blue text-dark-blue font-semibold rounded-lg hover:bg-dark-blue hover:text-white transition-colors">
                                Schedule Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OgeraDemo
