'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface Staff {
  id: string
  names: string
  email: string
  role: string
  phone?: string
  isActive?: boolean
}

export default function AdminStaffPage() {
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [newStaff, setNewStaff] = useState({
    names: '',
    email: '',
    password: '',
    role: 'marketing',
    phone: ''
  })
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null


  const fetchStaffs = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/staff', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStaffs(res.data)
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to fetch staff members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchStaffs()
  }, [token])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (editingStaff) {
      setEditingStaff({ ...editingStaff, [name]: value })
    } else {
      setNewStaff({ ...newStaff, [name]: value })
    }
  }

  // Create new staff
  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/staff/create', newStaff, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success(res.data.message)
      setNewStaff({ names: '', email: '', password: '', role: '', phone: '' })
      fetchStaffs()
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to create staff')
    }
  }

  const handleUpdateStaff = async () => {
    if (!editingStaff) return
    try {
      const { id, email, ...updateData } = editingStaff
      
      const res = await axios.patch(
        `/api/staff?id=${id}`, 
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      toast.success('Staff updated successfully!')
      setEditingStaff(null)
      fetchStaffs()
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to update staff')
    }
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <h1 className="text-2xl font-bold mb-6 text-dark-blue dark:text-white">Staff Management</h1>

      <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingStaff ? 'Edit Staff' : 'Create New Staff'}</h2>
        <form
          onSubmit={editingStaff ? (e) => { e.preventDefault(); handleUpdateStaff() } : handleCreateStaff}
          className="space-y-4"
        >
          <input
            type="text"
            name="names"
            placeholder="Full Name"
            value={editingStaff ? editingStaff.names : newStaff.names}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editingStaff ? editingStaff.email : newStaff.email}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
            disabled={!!editingStaff}
          />
          {!editingStaff && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newStaff.password}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded"
            />
          )}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={editingStaff ? editingStaff.phone || '' : newStaff.phone}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="role"
            value={editingStaff ? editingStaff.role : newStaff.role}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          >
            <option value="executive">Executive</option>
            <option value="superadmin">Super Admin</option>
            <option value="manager">Manager</option>
            <option value="sales">Sales</option>
            <option value="accountant">Accountant</option>
            <option value="marketing">Marketing</option>
          </select>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              {editingStaff ? 'Update Staff' : 'Create Staff'}
            </button>
            {editingStaff && (
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setEditingStaff(null)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading staff members...</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-dark-surface rounded-lg shadow-md">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Name</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Email</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Role</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Phone</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff) => (
                <tr key={staff.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors">
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{staff.names}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{staff.email}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{staff.role}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{staff.phone || '-'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="bg-yellow-500 px-3 py-1 rounded text-black hover:bg-yellow-600 text-sm"
                      onClick={() => setEditingStaff(staff)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}