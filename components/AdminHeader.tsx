"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { LogOut, Settings } from "lucide-react";

export default function AdminHeader() {
  const [adminName, setAdminName] = useState("Admin");
  const [role, setRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/signin");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      setRole(decoded.role);

      fetch("/api/staff/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setAdminName(data.name || data.names || "Admin"))
        .catch(() => {});
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("user");
      router.push("/signin");
    }
  };

  return (
    <header className="bg-indigo-600 shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left - Logo & System Name */}
      <div className="flex items-center gap-3">
        {/* Replace `/logo.png` with your actual logo path inside public/ */}
        <img
          src="/logo.png"
          alt="Sybella Logo"
          className="h-8 w-8 rounded-full bg-white p-1"
        />
        <h1 className="text-white font-bold text-lg">Sybella System</h1>
      </div>

      {/* Right - Profile */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-semibold">
            {adminName.charAt(0).toUpperCase()}
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border p-4 z-50">
            <div className="mb-3">
              <p className="font-semibold text-gray-800">{adminName}</p>
              <p className="text-sm text-gray-500 capitalize">{role}</p>
            </div>
            <hr className="my-2" />
            <button
              onClick={() => router.push("/admin/settings")}
              className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-md hover:bg-gray-100 text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
