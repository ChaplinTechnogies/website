"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DivideIcon } from "lucide-react";
// import AdminLayout from "./layout";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/signup");
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Manage users, blogs, contacts, and staff from here.
      </p>
    </div>
  );
}
