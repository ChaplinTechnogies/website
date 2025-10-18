"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Project {
  id: string;
  title: string;
  overview: string;
  image?: string;
  problemSolved?: string;
  techStack: string[];
  partners?: string[];
  callToAction?: string;
  isActive?: boolean;
  demoLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(
    null
  );
  const [techStackInput, setTechStackInput] = useState(
    editingProject?.techStack?.join(",") || ""
  );

  const [partnersInput, setPartnersInput] = useState(
    editingProject?.partners?.join(",") || ""
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleSave = async () => {
    if (!editingProject) return;

    const projectToSave = {
      ...editingProject,
      techStack: editingProject.techStack?.map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingProject.id) {
        const res = await axios.patch(
          `/api/projects/${editingProject.id}`,
          projectToSave,
          { headers: { "Content-Type": "application/json" } }
        );
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? res.data : p))
        );
      } else {
        const res = await axios.post("/api/projects", projectToSave);
        setProjects((prev) => [res.data, ...prev]);
      }

      setShowForm(false);
      setEditingProject(null);
    } catch (err: any) {
      alert("Error saving project: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Projects Management</h2>

      <button
        className="border px-3 py-1 rounded mb-4"
        onClick={() => {
          setEditingProject({
            title: "",
            overview: "",
            image: "",
            problemSolved: "",
            techStack: [],
            partners: [],
            callToAction: "",
            isActive: true,
            demoLink: "",
          });
          setShowForm(true);
        }}
      >
        + New Project
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Overview</th>
            <th className="p-2">Active</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.title}</td>
              <td className="p-2">{p.overview}</td>
              <td className="p-2">{p.isActive ? "✅" : "❌"}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => {
                    setEditingProject(p);
                    setShowForm(true);
                  }}
                  className="border px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="border px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit/Create Modal */}
      {showForm && editingProject && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-[600px] max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-semibold mb-3">
              {editingProject.id ? "Edit Project" : "New Project"}
            </h3>

            <div className="flex flex-col gap-2">
              <input
                className="border p-2 rounded"
                placeholder="Title"
                value={editingProject.title || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    title: e.target.value,
                  })
                }
              />
              <textarea
                className="border p-2 rounded"
                placeholder="Overview"
                value={editingProject.overview || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    overview: e.target.value,
                  })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="Image URL"
                value={editingProject.image || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    image: e.target.value,
                  })
                }
              />
              <textarea
                className="border p-2 rounded"
                placeholder="Problem Solved"
                value={editingProject.problemSolved || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    problemSolved: e.target.value,
                  })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="Tech Stack (comma separated)"
                value={editingProject.techStack?.join(", ") || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    techStack: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="Partners (comma separated)"
                value={editingProject.partners?.join(", ") || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    partners: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />

              <input
                className="border p-2 rounded"
                placeholder="Call to Action"
                value={editingProject.callToAction || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    callToAction: e.target.value,
                  })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="Demo Link"
                value={editingProject.demoLink || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    demoLink: e.target.value,
                  })
                }
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={editingProject.isActive || false}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      isActive: e.target.checked,
                    })
                  }
                />
                Active
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="border px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="border px-3 py-1 rounded bg-gray-100"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
