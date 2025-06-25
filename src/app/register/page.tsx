"use client";

import React, { useState } from "react";
import Link from "next/link";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess(data.message || "Registered successfully.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        setEmail("");
        setName("");
        setPassword("");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2 text-primary">
          Register
        </h2>
        <p className="text-sm text-secondary text-center mb-6">
          And be a part of the Adira family!
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-2 text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-900 mb-1 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 text-secondary rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-900 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 text-secondary rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-900 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 text-secondary rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
