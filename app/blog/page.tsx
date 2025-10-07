
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useI18n } from '../../contexts/I18nContext'
import { logger } from '../../lib/logger'

interface BlogPost {
  title: string
  excerpt: string
  content: string
  author: string
  tags: string[]
  slug: string
  readTime: number
  thumbnailUrl: string
  publishedAt: string
}

export default function BlogPage() {
  const { t } = useI18n()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [activePost, setActivePost] = useState<BlogPost | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blogposts/')
        setBlogPosts(res.data)
        logger.info('Blog page loaded', { page: 'blog', postsCount: res.data.length })
      } catch (err: any) {
        console.error(err)
        setError('Failed to fetch blogs')
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  // Fetch single blog for modal
  const openModal = async (slug: string) => {
    try {
      const res = await axios.get(`/api/blogposts/${slug}/`)
      setActivePost(res.data)
      setModalOpen(true)
    } catch (err: any) {
      console.error(err)
      alert('Failed to load blog details')
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setActivePost(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface shadow-sm">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-dark-blue dark:text-white mb-4">{t('blog.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-2/3 space-y-8">
          {loading ? (
            <p>Loading blogs...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : blogPosts.length === 0 ? (
            <p>No blogs found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white dark:bg-dark-surface rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="h-48 w-full overflow-hidden rounded-t-xl">
                    <img
                      src={post.thumbnailUrl || '/images/blog/default.jpg'}
                      alt={post.title}
                      className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center space-x-3 text-xs text-gray-400 dark:text-gray-400 mb-2">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                        <span>•</span>
                        <span>By {post.author}</span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-semibold text-dark-blue dark:text-white mb-2 hover:text-accent transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between flex-wrap mt-2">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-accent hover:text-white cursor-pointer transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => openModal(post.slug)}
                        className="text-accent text-sm font-semibold hover:text-green-600 transition-colors"
                      >
                        {t('blog.readMore')}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-8">
          {/* Popular Posts */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-dark-blue dark:text-white mb-4">{t('blog.popularPosts.title')}</h3>
            <div className="space-y-4">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.slug} className="flex space-x-3 items-center hover:bg-gray-50 dark:hover:bg-dark-surface p-2 rounded-lg cursor-pointer transition-colors"
                     onClick={() => openModal(post.slug)}>
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">📝</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-dark-blue dark:text-white hover:text-accent transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{post.publishedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-dark-blue dark:text-white mb-4">{t('blog.tags.title')}</h3>
            <div className="flex flex-wrap gap-2">
              {['Digital Transformation', 'AI', 'Healthcare', 'Education', 'E-commerce', 'Africa', 'Innovation', 'Technology'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-accent hover:text-white cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && activePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-surface rounded-xl w-11/12 max-w-3xl p-6 relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 text-lg font-bold hover:text-red-500"
            >
              &times;
            </button>
            <img
              src={activePost.thumbnailUrl || '/images/blog/default.jpg'}
              alt={activePost.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-dark-blue dark:text-white mb-2">{activePost.title}</h2>
            <div className="flex items-center space-x-3 text-sm text-gray-400 dark:text-gray-400 mb-4">
              <span>{activePost.publishedAt}</span>
              <span>•</span>
              <span>{activePost.readTime} min read</span>
              <span>•</span>
              <span>By {activePost.author}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {activePost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{activePost.content}</p>
          </div>
        </div>
      )}
    </div>
  )
}
