'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface Contact {
  _id: string
  name: string
  email: string
  message: string
  company: string
  phone: string
  createdAt: string
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get access token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  // Fetch all contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (!token) {
          setError('No access token found')
          setLoading(false)
          return
        }

        const res = await axios.get('/api/contact', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (res.data.success) {
          setContacts(res.data.contacts)
        } else {
          setError('Failed to fetch contacts')
        }
      } catch (err: any) {
        console.error(err)
        setError(err.response?.data?.message || 'Error fetching contacts')
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [token])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-6">
      <h1 className="text-2xl font-bold mb-6 text-dark-blue dark:text-white">Contact Messages</h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading contacts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No contact messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-dark-surface rounded-xl shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Name</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Email</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Company</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Phone</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Message</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Created At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors">
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{contact.name}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{contact.email}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{contact.company || '-'}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{contact.phone || '-'}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{contact.message}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{new Date(contact.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
