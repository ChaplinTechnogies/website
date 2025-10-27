"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Staff {
  id: string;
  names: string;
  email: string;
  role: string;
  phone?: string;
}

export default function ViewStaffPage() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const fetchStaffs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/staff", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaffs(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch staff members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchStaffs();
  }, [token]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">👥 View Staff</h1>

      {loading ? (
        <p>Loading staff members...</p>
      ) : staffs.length === 0 ? (
        <p>No staff found</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff) => (
                <tr
                  key={staff.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{staff.names}</td>
                  <td className="px-4 py-2">{staff.email}</td>
                  <td className="px-4 py-2">{staff.role}</td>
                  <td className="px-4 py-2">{staff.phone || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
