"use client";

import { useEffect, useState } from "react";

interface Update {
  id?: string;
  title: string;
  category: string;
  description: string;
  author?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [form, setForm] = useState<Update>({
    title: "",
    category: "news",
    description: "",
    author: "Admin",
    isActive: true,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all updates
  useEffect(() => {
    fetch("/api/updates")
      .then((res) => res.json())
      .then((data) => setUpdates(data));
  }, []);

  // Create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/updates/${editingId}` : "/api/updates";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (method === "POST") {
      setUpdates([data, ...updates]);
    } else {
      setUpdates(updates.map((u) => (u.id === data.id ? data : u)));
    }

    setForm({ title: "", category: "news", description: "", author: "Admin", isActive: true });
    setEditingId(null);
  };

  // Edit mode
  const handleEdit = (u: Update) => {
    setForm(u);
    setEditingId(u.id || null);
  };

  // Delete
  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/updates/${id}`, { method: "DELETE" });
    setUpdates(updates.filter((u) => u.id !== id));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin - Manage Updates</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <select
          className="border p-2 w-full"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="news">News</option>
          <option value="announcement">Announcement</option>
          <option value="event">Event</option>
        </select>

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"} 
        </button>
      </form>

      {/* Updates list */}
      <div>
        {updates.map((u) => (
          <div key={u.id} className="border p-3 rounded mb-4">
            <h2 className="font-bold">{u.title}</h2>
            <p className="text-sm text-gray-600">{u.category}</p>
            <p>{u.description}</p>
            <small className="text-gray-400">
              {u.createdAt && new Date(u.createdAt).toLocaleString()}
            </small>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(u)}
                className="bg-yellow-500 text-black px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
