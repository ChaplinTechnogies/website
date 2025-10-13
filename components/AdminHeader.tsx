"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTokenRefresh } from "@/lib/userToken";
import {jwtDecode} from "jwt-decode"; 

export default function AdminHeader() {
  const [adminName, setAdminName] = useState("Admin");
  const [role, setRole] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useTokenRefresh();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          router.push("/signin");
          return;
        }
        const decoded: any = jwtDecode(token);
        setRole(decoded.role);
        // redirects
        if(decoded.role == 'marketing'){
          router.push('/admin/marketing')
        } else if (decoded.role == "qa-tester") {
          router.push("/admin/qa-tester")
        }
        const res = await fetch("/api/staff/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setAdminName(data.name || data.names || "Admin");
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdmin();
  }, [router]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("user");
      router.push("/signin");
    }
  };


  const isExecutive = role === "executive";
  const isManager = role === "manager";
  const isAccountant = role === "accountant";
  const isSales = role === "sales";
  const isMarketing = role === "marketing";
  const isQaTester = role === "qa-tester";

  return (
    <header className="bg-dark-blue shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
        <Link href="/admin" className="text-white font-bold text-lg">
          Admin Dashboard
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
        { isExecutive || isMarketing && (
          <>
          <Link href="/admin/contacts" className="text-white hover:text-yellow">
            Contacts
          </Link>
          <Link href="/admin/blogs" className="text-white hover:text-yellow">
            Blogs
          </Link>
          </>
        )
      }

          {isExecutive && (
            <>
              <Link href="/admin/users" className="text-white hover:text-yellow">
                Users
              </Link>
              <Link href="/admin/staffs" className="text-white hover:text-yellow">
                Staff
              </Link>
              <Link href="/admin/sections" className="text-white hover:text-yellow">
                Sections
              </Link>
            </>
          )}

          {isManager && (
            <>
              <Link href="/admin/staffs" className="text-white hover:text-yellow">
                Staff
              </Link>
            </>
          )}

          {isAccountant && (
            <Link href="/admin/accounts" className="text-white hover:text-yellow">
              Accounts
            </Link>
          )}

          {isSales && (
            <Link href="/admin/sales" className="text-white hover:text-yellow">
              Sales
            </Link>
          )}

          <span className="text-white font-semibold">Hello, {adminName}</span>
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-500 cursor-pointer"
          >
            Logout
          </button>
        </nav>

        {/* Mobile view toggle */}
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
          <Link href="/admin/blogs" className="block text-white">
            Blogs
          </Link>
          <Link href="/admin/contacts" className="block text-white">
            Contacts
          </Link>

          {isExecutive && (
            <>
              <Link href="/admin/users" className="block text-white">
                Users
              </Link>
              <Link href="/admin/staffs" className="block text-white">
                Staff
              </Link>
              <Link href="/admin/sections" className="block text-white">
                Sections
              </Link>
            </>
          )}

          {isManager && (
            <Link href="/admin/staffs" className="block text-white">
              Staff
            </Link>
          )}
          {isAccountant && (
            <Link href="/admin/accounts" className="block text-white">
              Accounts
            </Link>
          )}
          {isSales && (
            <Link href="/admin/sales" className="block text-white">
              Sales
            </Link>
          )}

          <span className="block text-white font-semibold">
            Hello, {adminName}
          </span>
          <button
            onClick={handleLogout}
            className="block text-white hover:text-red-500 text-left w-full"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
