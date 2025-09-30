"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react"; 
import { div } from "framer-motion/client";


export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Server did not return a valid JSON response.", err);
        alert("Login failed: Unexpected server response format.");
        return; 
      }

      console.log(data)

      if (res.ok) {
        if (data.accessToken) {
          localStorage.setItem("adminToken", data.token);
          console.log("Login successful. Redirecting...");
          router.push("/admins/dashboard");
        } else {
          alert("Login successful, but no token received.");
        }
      } else {
        console.log("Login failed with status:", res.status, data.message);
        alert(data.message || `Login failed with status: ${res.status}`);
      }
    } catch (error) {
      console.error("Network error during login:", error);
      alert("A network error occurred. Please check your connection.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-96 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Login
        </button>
      </form>

    </div>
  );
}

export default AdminLogin;