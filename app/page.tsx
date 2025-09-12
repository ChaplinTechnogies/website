'use client'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Journey from '../components/Journey'
import ContactForm from '../components/ContactForm'
import CountdownTimer from '../components/CountdownTimer'
import OgeraDemo from '../components/OgeraDemo'
import Chatbot from '../components/Chatbot'
import { logger } from '../lib/logger'
import { useEffect } from 'react'

export default function Page() {
    useEffect(() => {
        logger.info('Home page loaded', {
            page: 'home',
            timestamp: new Date().toISOString()
        });
    }, []);

    return (
        <div>
            <Hero />
            <Services />
            <Projects />
            <OgeraDemo />
            <Journey />
            <ContactForm />
            <Chatbot />
        </div>
    )
}
