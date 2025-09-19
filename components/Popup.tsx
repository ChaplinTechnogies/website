"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubscriptionPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShow(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            // ✅ Make container relative so the button is anchored
            className="relative bg-white rounded-2xl shadow-2xl p-6 w-80 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            {/* ✅ Close button now correctly positioned and visible */}
            <button
              onClick={handleClose}
              className="absolute -top-3 -right-3 bg-gray-200 hover:bg-gray-300 text-gray-700 
                         rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              aria-label="Close"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h2>
            <p className="text-gray-600 mb-4">
              Get updates delivered directly to your inbox.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="Your email"
                className="border rounded-lg px-3 py-2 w-full mb-3"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
