"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (username.length < 3 || password.length < 3) {
      setError("Invalid credentials");
      return;
    }

    // Simulate login by setting a cookie
    document.cookie = `token=valid-user; path=/;`; // simple mock auth

    window.location.href = "/admin";
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-black text-white py-2 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
