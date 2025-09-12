'use client'
import { useState, useRef, useEffect } from 'react'
import { logger } from '../lib/logger'

interface Message {
    id: string
    text: string
    isUser: boolean
    timestamp: Date
}

const Chatbot = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I\'m here to help you learn more about Sybella Systems. How can I assist you today?',
            isUser: false,
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState<string>('')
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen) {
            logger.userInteraction('Chatbot opened', {
                component: 'Chatbot'
            })
        }
    }, [isOpen])

    const predefinedResponses: Record<string, string> = {
        'services': 'We offer comprehensive digital solutions including Education Platform, Healthcare Solutions, Retail & Commerce, Hospitality Tech, Real Estate, and Transport & Logistics. We also provide HR Management, Inventory & Billing, and Government & NGO solutions.',
        'pricing': 'Our pricing varies based on the specific solutions and scale of your project. I\'d recommend scheduling a consultation with our team to discuss your specific needs and get a customized quote.',
        'contact': 'You can reach us at info@sybellasystems.com or call +250 789 123 456. We\'re based in Kigali, Rwanda, and serve clients across Africa.',
        'ogera': 'Ogera is our flagship platform that integrates AI-driven solutions across multiple sectors. It\'s currently in development with early access available. Would you like to request early access?',
        'about': 'Sybella Systems is a youth-led, Africa-focused technology startup headquartered in Kigali, Rwanda. We\'re transforming multiple sectors through innovative software and AI-driven digital solutions.',
        'default': 'I understand you\'re interested in learning more. Let me connect you with our team for a more detailed discussion. Would you like to schedule a consultation or have specific questions about our services?'
    }

    const getBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase()

        if (lowerMessage.includes('service') || lowerMessage.includes('solution')) {
            return predefinedResponses.services
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return predefinedResponses.pricing
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
            return predefinedResponses.contact
        } else if (lowerMessage.includes('ogera')) {
            return predefinedResponses.ogera
        } else if (lowerMessage.includes('about') || lowerMessage.includes('company')) {
            return predefinedResponses.about
        } else {
            return predefinedResponses.default
        }
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            isUser: true,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsTyping(true)

        logger.userInteraction('Chatbot message sent', {
            message: inputValue,
            component: 'Chatbot'
        })

        // Simulate bot typing delay
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getBotResponse(inputValue),
                isUser: false,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, botResponse])
            setIsTyping(false)
        }, 1000)
    }

    const toggleChatbot = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {/* Chatbot Toggle Button */}
            <button
                onClick={toggleChatbot}
                className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center"
                aria-label="Open chatbot"
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {/* Chatbot Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
                    {/* Header */}
                    <div className="bg-dark-blue text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">Sybella Assistant</h3>
                            <p className="text-xs opacity-80">Online now</p>
                        </div>
                        <button
                            onClick={toggleChatbot}
                            className="text-white hover:text-gray-300"
                            aria-label="Close chatbot"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs p-3 rounded-lg ${message.isUser
                                        ? 'bg-accent text-white'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    <p className="text-xs opacity-70 mt-1">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                                disabled={isTyping}
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default Chatbot
