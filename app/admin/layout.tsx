"use client";
import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <AdminHeader /> */}
      <main className="p-6">{children}</main>
    </div>
  );
}
