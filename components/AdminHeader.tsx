"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminHeader() {
  const [adminName, setAdminName] = useState("Admin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/staff/me");
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setAdminName(data.name);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <header className="bg-dark-blue shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
        <Link href="/admin" className="text-white font-bold text-lg">
          Admin Dashboard
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/admin/users" className="text-white hover:text-yellow">
            Users
          </Link>
          <Link href="/admin/blogs" className="text-white hover:text-yellow">
            Blogs
          </Link>
          <Link href="/admin/contacts" className="text-white hover:text-yellow">
            Contacts
          </Link>
          <Link href="/admin/staffs" className="text-white hover:text-yellow">
            Staffs
          </Link>
          <span className="text-white font-semibold">Hello, {adminName}</span>
          <Link
            href="/api/auth/logout"
            className="text-white hover:text-red-500"
          >
            Logout
          </Link>
        </nav>

        {/* Mobi view */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white"
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-dark-blue px-4 py-2 space-y-2 border-t border-gray-700">
          <Link href="/admin/users" className="block text-white">
            Users
          </Link>
          <Link href="/admin/blogs" className="block text-white">
            Blogs
          </Link>
          <Link href="/admin/contacts" className="block text-white">
            Contacts
          </Link>
          <Link href="/admin/staffs" className="block text-white">
            Staffs
          </Link>
          <span className="block text-white font-semibold">
            Hello, {adminName}
          </span>
          <Link
            href="/api/auth/logout"
            className="block text-white hover:text-red-500"
          >
            Logout
          </Link>
        </div>
      )}
    </header>
  );
}
