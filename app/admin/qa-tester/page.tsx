"use client";

import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";


interface QATestReport {
  _id: string;
  uploadBy: string;
  fileName: string;
  testPhase: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  bugCount: number;
  remarks?: string;
  rawData: any[];
}

interface Feedback {
  _id: string;
  userId?: string;
  feedbackText: string;
  sentiment?: string;
  source?: string;
  createdAt: string;
}


export default function QADashboard() {
  const [activeTab, setActiveTab] = useState<"upload" | "reports" | "feedback" | "metrics">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [uploadBy, setUploadBy] = useState("");
  const [testPhase, setTestPhase] = useState("");
  const [reports, setReports] = useState<QATestReport[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);


  const fetchReports = async () => {
    const res = await axios.get("/api/qa-tester/reports");
    setReports(res.data);
  };

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    const res = await axios.get("/api/qa-tester/feedback");
    setFeedbacks(res.data);
  };

  useEffect(() => {
    if (activeTab === "reports") fetchReports();
    if (activeTab === "feedback") fetchFeedbacks();
  }, [activeTab]);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };


  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadBy", uploadBy);
    formData.append("testPhase", testPhase);

    try {
      const res = await axios.post("/api/qa-tester/upload", formData);
      alert("Upload successful! Report ID: " + res.data.id);
      setFile(null);
      setUploadBy("");
      setTestPhase("");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">QA Dashboard</h1>
        <ul className="space-y-3">
          <li
            className={`cursor-pointer ${activeTab === "upload" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Report
          </li>
          <li
            className={`cursor-pointer ${activeTab === "reports" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            View Reports
          </li>
          <li
            className={`cursor-pointer ${activeTab === "feedback" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            User Feedback
          </li>
          <li
            className={`cursor-pointer ${activeTab === "metrics" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("metrics")}
          >
            Metrics
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === "upload" && (
          <div>
            <h2 className="text-2xl mb-4">Upload QA Report</h2>
            <input
              type="text"
              placeholder="Uploaded by"
              value={uploadBy}
              onChange={(e) => setUploadBy(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Test Phase"
              value={testPhase}
              onChange={(e) => setTestPhase(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input type="file" accept=".xlsx" onChange={handleFileChange} className="mb-4" />
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        )}

        {activeTab === "reports" && (
          <div>
            <h2 className="text-2xl mb-4">QA Reports</h2>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">ID</th>
                  <th className="border px-2 py-1">Uploaded By</th>
                  <th className="border px-2 py-1">File Name</th>
                  <th className="border px-2 py-1">Phase</th>
                  <th className="border px-2 py-1">Total</th>
                  <th className="border px-2 py-1">Passed</th>
                  <th className="border px-2 py-1">Failed</th>
                  <th className="border px-2 py-1">Bugs</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r._id}>
                    <td className="border px-2 py-1">{r._id}</td>
                    <td className="border px-2 py-1">{r.uploadBy}</td>
                    <td className="border px-2 py-1">{r.fileName}</td>
                    <td className="border px-2 py-1">{r.testPhase}</td>
                    <td className="border px-2 py-1">{r.totalTests}</td>
                    <td className="border px-2 py-1">{r.passedTests}</td>
                    <td className="border px-2 py-1">{r.failedTests}</td>
                    <td className="border px-2 py-1">{r.bugCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "feedback" && (
          <div>
            <h2 className="text-2xl mb-4">User Feedback</h2>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">ID</th>
                  <th className="border px-2 py-1">User</th>
                  <th className="border px-2 py-1">Feedback</th>
                  <th className="border px-2 py-1">Sentiment</th>
                  <th className="border px-2 py-1">Source</th>
                  <th className="border px-2 py-1">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((f) => (
                  <tr key={f._id}>
                    <td className="border px-2 py-1">{f._id}</td>
                    <td className="border px-2 py-1">{f.userId || "Anonymous"}</td>
                    <td className="border px-2 py-1">{f.feedbackText}</td>
                    <td className="border px-2 py-1">{f.sentiment || "N/A"}</td>
                    <td className="border px-2 py-1">{f.source}</td>
                    <td className="border px-2 py-1">{new Date(f.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "metrics" && (
          <div>
            <h2 className="text-2xl mb-4">Metrics (Coming Soon)</h2>
          </div>
        )}
      </main>
    </div>
  );
}
