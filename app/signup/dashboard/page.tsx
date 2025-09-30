import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/admins");
  }, []);

  return <h1>Welcome to Admin Dashboard</h1>;
}
