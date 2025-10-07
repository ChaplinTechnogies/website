'use client'
import Link from 'next/link'
import { logger } from '../../lib/logger'
import { useI18n } from '../../contexts/I18nContext'

// Mock blog posts - in a real implementation, these would come from a CMS or database
const getBlogPosts = (t: (key: string) => string) => [
    {
        id: '1',
        title: t('blog.post1.title'),
        excerpt: t('blog.post1.excerpt'),
        content: 'Full article content would go here...',
        publishedAt: '2025-01-15',
        author: 'Kayla Elyse',
        tags: ['Digital Transformation', 'Africa', 'Innovation'],
        slug: 'future-digital-transformation-africa',
        readTime: '5 min read',
        image: '/images/blog/digital-transformation.jpg'
    },
    {
        id: '2',
        title: t('blog.post2.title'),
        excerpt: t('blog.post2.excerpt'),
        content: 'Full article content would go here...',
        publishedAt: '2025-01-10',
        author: 'Bessora M.',
        tags: ['Healthcare', 'Rural Development', 'Technology'],
        slug: 'scalable-healthcare-solutions-rural-africa',
        readTime: '7 min read',
        image: '/images/blog/healthcare-solutions.jpg'
    },
    {
        id: '3',
        title: t('blog.post3.title'),
        excerpt: t('blog.post3.excerpt'),
        content: 'Full article content would go here...',
        publishedAt: '2025-01-05',
        author: 'Tech Team',
        tags: ['AI', 'Education', 'Technology'],
        slug: 'rise-ai-african-education',
        readTime: '6 min read',
        image: '/images/blog/ai-education.jpg'
    },
    {
        id: '4',
        title: t('blog.post4.title'),
        excerpt: t('blog.post4.excerpt'),
        content: 'Full article content would go here...',
        publishedAt: '2024-12-28',
        author: 'Market Research Team',
        tags: ['E-commerce', 'East Africa', 'Business Growth'],
        slug: 'ecommerce-growth-east-africa-trends-opportunities',
        readTime: '8 min read',
        image: '/images/blog/ecommerce-growth.jpg'
    }
]

const getCategories = (t: (key: string) => string) => [
    t('blog.categories.all'),
    t('blog.categories.digital'),
    t('blog.categories.healthcare'),
    t('blog.categories.education'),
    t('blog.categories.ecommerce'),
    t('blog.categories.ai'),
    t('blog.categories.caseStudies')
]

export default function BlogPage() {
    const { t } = useI18n();
    const blogPosts = getBlogPosts(t);
    const categories = getCategories(t);
    
    // Log page view
    logger.info('Blog page loaded', {
        page: 'blog',
        postsCount: blogPosts.length
    })

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
            {/* Header */}
            <div className="bg-white dark:bg-dark-surface shadow-sm">
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-dark-blue dark:text-white mb-4">{t('blog.title')}</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('blog.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Category Filter */}
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:bg-dark-surface text-sm hover:bg-accent hover:text-white hover:border-accent transition-colors"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Blog Posts */}
                        <div className="space-y-8">
                            {blogPosts.map((post) => (
                                <article key={post.id} className="bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="md:flex">
                                        <div className="md:w-1/3">
                                            <div className="h-48 md:h-full bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center">
                                                <span className="text-white text-4xl">📝</span>
                                            </div>
                                        </div>
                                        <div className="md:w-2/3 p-6">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                <span>{post.publishedAt}</span>
                                                <span>•</span>
                                                <span>{post.readTime}</span>
                                                <span>•</span>
                                                <span>By {post.author}</span>
                                            </div>

                                            <h2 className="text-2xl font-bold text-dark-blue dark:text-white mb-3 hover:text-accent transition-colors">
                                                <Link href={`/blog/${post.slug}`}>
                                                    {post.title}
                                                </Link>
                                            </h2>

                                            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-wrap gap-2">
                                                    {post.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="text-accent font-semibold hover:text-green-600 transition-colors"
                                                >
                                                    {t('blog.readMore')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center">
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-accent text-white rounded-lg">1</button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next →</button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="space-y-8">
                            {/* Newsletter Signup */}
                            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-dark-blue dark:text-white mb-4">{t('blog.stayUpdated.title')}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {t('blog.stayUpdated.desc')}
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder={t('blog.stayUpdated.placeholder')}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-dark-bg dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                    />
                                    <button className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-green-600 transition-colors">
                                        {t('blog.stayUpdated.button')}
                                    </button>
                                </div>
                            </div>

                            {/* Popular Posts */}
                            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-dark-blue dark:text-white mb-4">{t('blog.popularPosts.title')}</h3>
                                <div className="space-y-4">
                                    {blogPosts.slice(0, 3).map((post) => (
                                        <div key={post.id} className="flex space-x-3">
                                            <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-lg">📝</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm text-dark-blue dark:text-white hover:text-accent transition-colors">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        {post.title}
                                                    </Link>
                                                </h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{post.publishedAt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-dark-blue dark:text-white mb-4">{t('blog.tags.title')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Digital Transformation', 'AI', 'Healthcare', 'Education', 'E-commerce', 'Africa', 'Innovation', 'Technology'].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-accent hover:text-white transition-colors cursor-pointer"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
