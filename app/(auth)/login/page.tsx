"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/chat",
    });
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="glass-card w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <input
          className="p-3 w-full rounded-xl border mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="p-3 w-full rounded-xl border mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 bg-primary-500 text-white rounded-xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}
