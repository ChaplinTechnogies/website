
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Metadata } from 'next'
import Script from 'next/script'
import { I18nProvider } from '../contexts/I18nContext'
import { usePathname } from 'next/navigation';
import ClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
    title: 'Sybella Systems - Transforming Africa Through Innovation',
    description: 'Pioneering AI-driven digital solutions across education, healthcare, retail, and beyond. Building the future of African technology, one innovation at a time.',
    keywords: [
        'Sybella Systems',
        'Africa technology',
        'digital transformation',
        'AI solutions',
        'education technology',
        'healthcare technology',
        'retail technology',
        'hospitality technology',
        'real estate technology',
        'transport logistics',
        'HR management',
        'inventory billing',
        'government solutions',
        'NGO solutions',
        'Kigali Rwanda',
        'African innovation'
    ],
    authors: [{ name: 'Sybella Systems' }],
    creator: 'Sybella Systems',
    publisher: 'Sybella Systems',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sybellasystems.com',
        siteName: 'Sybella Systems',
        title: 'Sybella Systems - Transforming Africa Through Innovation',
        description: 'Pioneering AI-driven digital solutions across education, healthcare, retail, and beyond. Building the future of African technology, one innovation at a time.',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Sybella Systems - Transforming Africa Through Innovation',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sybella Systems - Transforming Africa Through Innovation',
        description: 'Pioneering AI-driven digital solutions across education, healthcare, retail, and beyond.',
        images: ['/images/twitter-image.jpg'],
        creator: '@sybellasystems',
    },
    alternates: {
        canonical: 'https://sybellasystems.com',
        languages: {
            'en-US': 'https://sybellasystems.com',
            'fr-FR': 'https://sybellasystems.com/fr',
            'sw-KE': 'https://sybellasystems.com/sw',
            'rw-RW': 'https://sybellasystems.com/rw',
        },
    },
    verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
        yahoo: 'your-yahoo-verification-code',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-300">
        <I18nProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </I18nProvider>

        {/* Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  );
}
