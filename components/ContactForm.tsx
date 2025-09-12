'use client'
import { useState, useCallback } from 'react'
import { ContactFormData } from '../types'
import { logger } from '../lib/logger'
import { SecurityValidator } from '../lib/security'
import { useI18n } from '../contexts/I18nContext'

interface ContactFormProps {
    onSubmit?: (data: ContactFormData) => Promise<void>
}

const ContactForm = ({ onSubmit }: ContactFormProps): JSX.Element => {
    const { t } = useI18n()
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
        company: '',
        phone: ''
    })

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [errors, setErrors] = useState<Partial<ContactFormData>>({})
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const validateForm = useCallback((): boolean => {
        const newErrors: Partial<ContactFormData> = {}

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!SecurityValidator.validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Validate message
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        // Validate phone if provided
        if (formData.phone && !SecurityValidator.validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData])

    const handleInputChange = (field: keyof ContactFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            // Log form submission
            logger.info('Contact form submitted', {
                formData: {
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    hasMessage: !!formData.message,
                    messageLength: formData.message.length
                }
            })

            if (onSubmit) {
                await onSubmit(formData)
            } else {
                // Default form submission logic
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })

                if (!response.ok) {
                    throw new Error('Failed to submit form')
                }
            }

            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                message: '',
                company: '',
                phone: ''
            })

            logger.info('Contact form submitted successfully')
        } catch (error) {
            logger.error('Contact form submission failed', { error: error instanceof Error ? error.message : 'Unknown error' })
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }, [formData, validateForm, onSubmit])

    return (
        <section id="contact" className="py-12 sm:py-16 bg-white dark:bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-blue dark:text-dark-text mb-4 text-center">
                        {t('contact.title')}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary mb-6 sm:mb-8 text-center">
                        {t('contact.subtitle')}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                                    {t('contact.name')} *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-dark-surface dark:text-dark-text ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600" role="alert">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                                    {t('contact.email')} *
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-dark-surface dark:text-dark-text ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600" role="alert">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                                    {t('contact.company')}
                                </label>
                                <input
                                    id="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => handleInputChange('company', e.target.value)}
                                    className="w-full p-4 border border-gray-300 dark:border-gray-600 dark:bg-dark-surface dark:text-dark-text rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                    placeholder="Enter your company name"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                                    {t('contact.phone')}
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-dark-surface dark:text-dark-text ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600" role="alert">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                                {t('contact.message')} *
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={6}
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-dark-surface dark:text-dark-text ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="Tell us about your project or how we can help you"
                            />
                            {errors.message && (
                                <p className="mt-1 text-sm text-red-600" role="alert">
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white font-semibold rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? 'Sending...' : t('contact.sendMessage')}
                            </button>

                            <button
                                type="button"
                                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-dark-blue text-dark-blue dark:text-dark-text dark:border-dark-text font-semibold rounded-lg hover:bg-dark-blue hover:text-white dark:hover:bg-dark-text dark:hover:text-dark-bg transition-colors"
                            >
                                {t('contact.subscribe')}
                            </button>
                        </div>

                        {submitStatus === 'success' && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg" role="alert">
                                <p className="text-green-800 dark:text-green-200">
                                    Thank you for your message! We'll get back to you within 24 hours.
                                </p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg" role="alert">
                                <p className="text-red-800 dark:text-red-200">
                                    Sorry, there was an error sending your message. Please try again or contact us directly.
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactForm