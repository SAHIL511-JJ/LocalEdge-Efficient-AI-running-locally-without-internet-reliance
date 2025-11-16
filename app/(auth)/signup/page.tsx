"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    window.location.href = "/login";
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="glass-card w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

        <input
          className="p-3 w-full rounded-xl border mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="p-3 w-full rounded-xl border mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full p-3 bg-primary-500 text-white rounded-xl"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
