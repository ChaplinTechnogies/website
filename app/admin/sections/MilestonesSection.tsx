'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface Milestone {
  _id: string
  name: string
  description: string
  startYear: number
  endYear: number
}

export default function MilestonesSection() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState<{ open: boolean; milestone?: Milestone }>({ open: false })
  const [formData, setFormData] = useState({ name: '', description: '', startYear: '', endYear: '' })
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  const fetchMilestones = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/milestones', { headers: { Authorization: `Bearer ${token}` } })
      if (res.data.success) setMilestones(res.data.milestones)
    } catch (err) {
      console.error(err)
      toast.error('Failed to fetch milestones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMilestones() }, [])

  const handleCreate = async () => {
    try {
      const res = await axios.post('/api/milestones', {
        name: formData.name,
        description: formData.description,
        startYear: Number(formData.startYear),
        endYear: Number(formData.endYear),
      }, { headers: { Authorization: `Bearer ${token}` } })
      if (res.data.success) {
        toast.success('Milestone created!')
        setShowCreateModal(false)
        setFormData({ name: '', description: '', startYear: '', endYear: '' })
        fetchMilestones()
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to create milestone')
    }
  }

  const handleUpdate = async () => {
    if (!showUpdateModal.milestone) return
    try {
      const res = await axios.patch(`/api/milestones/${showUpdateModal.milestone._id}`, {
        name: formData.name,
        description: formData.description,
        startYear: Number(formData.startYear),
        endYear: Number(formData.endYear),
      }, { headers: { Authorization: `Bearer ${token}` } })
      if (res.data.success) {
        toast.success('Milestone updated!')
        setShowUpdateModal({ open: false })
        fetchMilestones()
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to update milestone')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return
    try {
      const res = await axios.delete(`/api/milestones/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.data.success) {
        toast.success('Milestone deleted!')
        fetchMilestones()
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete milestone')
    }
  }

  const openUpdateModal = (m: Milestone) => {
    setFormData({ name: m.name, description: m.description, startYear: String(m.startYear), endYear: String(m.endYear) })
    setShowUpdateModal({ open: true, milestone: m })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Milestones</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Milestone
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : milestones.length === 0 ? (
        <p>No milestones found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {milestones.map(m => (
            <div key={m._id} className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow hover:shadow-md transition">
              <h2 className="font-bold text-lg">{m.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{m.description}</p>
              <p className="mt-2 text-sm text-gray-500">Start: {m.startYear}</p>
              <p className="text-sm text-gray-500">End: {m.endYear}</p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => openUpdateModal(m)}
                >
                  Update
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(m._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Milestone</h2>
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Start Year"
              type="number"
              value={formData.startYear}
              onChange={e => setFormData(prev => ({ ...prev, startYear: e.target.value }))}
            />
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="End Year"
              type="number"
              value={formData.endYear}
              onChange={e => setFormData(prev => ({ ...prev, endYear: e.target.value }))}
            />
            <textarea
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Milestone</h2>
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Start Year"
              type="number"
              value={formData.startYear}
              onChange={e => setFormData(prev => ({ ...prev, startYear: e.target.value }))}
            />
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="End Year"
              type="number"
              value={formData.endYear}
              onChange={e => setFormData(prev => ({ ...prev, endYear: e.target.value }))}
            />
            <textarea
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowUpdateModal({ open: false })} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
