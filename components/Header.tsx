'use client'
import Link from 'next/link'
import { useState } from 'react'
import useI18n from '../app/i18n'
import ThemeToggle from './ThemeToggle'

export default function Header() {
    const { locale, setLocale, t } = useI18n()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navigationItems = [
        { key: 'home', href: '#home' },
        { key: 'about', href: '#about' },
        { key: 'ecosystem', href: '#ecosystem' },
        { key: 'ogera', href: '#ogera' },
        { key: 'blog', href: '/blog' },
        { key: 'contact', href: '#contact' }
    ]

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <header className="py-4 bg-dark-blue shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <span className="font-bold text-white text-lg sm:text-xl">Sybella Systems</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className="text-white hover:text-yellow transition-colors text-sm xl:text-base"
                            >
                                {t(`nav.${item.key}`)}
                            </Link>
                        ))}
                        <select
                            value={locale}
                            onChange={(e) => setLocale(e.target.value as any)}
                            className="bg-transparent text-white border border-white/30 rounded px-2 py-1 text-sm"
                        >
                            <option value="en">EN</option>
                            <option value="fr">FR</option>
                            <option value="sw">SW</option>
                            <option value="rw">RW</option>
                        </select>
                        <ThemeToggle />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden text-white p-2"
                        aria-label="Toggle mobile menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
                        <nav className="flex flex-col space-y-4 pt-4">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className="text-white hover:text-yellow transition-colors text-base py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t(`nav.${item.key}`)}
                                </Link>
                            ))}
                            <div className="pt-2 flex gap-3">
                                <select
                                    value={locale}
                                    onChange={(e) => setLocale(e.target.value as any)}
                                    className="flex-1 bg-transparent text-white border border-white/30 rounded px-3 py-2 text-sm"
                                >
                                    <option value="en">English</option>
                                    <option value="fr">Français</option>
                                    <option value="sw">Kiswahili</option>
                                    <option value="rw">Kinyarwanda</option>
                                </select>
                                <ThemeToggle />
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
