"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Edit, Trash2 } from "lucide-react";

interface Blog {
  _id?: string;
  title: string;
  excerpt: string;
  author: string;
  slug: string;
  thumbnailUrl: string;
}

export default function ViewBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const adminToken =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogposts/", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/api/blogposts/${slug}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      toast.success("Blog deleted!");
      fetchBlogs();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">📖 View Blogs</h1>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="bg-white shadow rounded-lg overflow-hidden border hover:shadow-lg transition"
            >
              <img
                src={blog.thumbnailUrl || "/images/blog/default.jpg"}
                alt={blog.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-lg text-indigo-700 mb-1">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {blog.excerpt}
                  </p>
                  <p className="text-xs text-gray-400">By {blog.author}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded text-yellow-700 hover:bg-yellow-200 text-sm"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    className="flex items-center gap-1 bg-red-100 px-3 py-1 rounded text-red-600 hover:bg-red-200 text-sm"
                    onClick={() => handleDeleteBlog(blog.slug)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
