// src/pages/SignUp.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Form = { name: string; email: string; password: string };

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  console.log("▶️ Signing up with payload:", form);

  try {
    const res = await fetch("/api/signup.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // Log status and raw text if parsing fails
    let data: any;
    try {
      data = await res.json();
    } catch (parseErr) {
      const text = await res.text();
      console.error("❌ Could not parse JSON, got text:", text);
      throw parseErr;
    }

    console.log(`⬅️ Response status ${res.status}:`, data);

    if (res.ok && data.success) {
      console.log("✅ Signup succeeded, navigating to /signin");
      navigate("/signin");
    } else {
      console.warn("⚠️ Signup failed:", data);
      setError(data.message || `Sign up failed (status ${res.status})`);
    }
  } catch (err: any) {
    console.error("🔥 Fetch or parsing error:", err);
    setError("Server error—please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-stone-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-stone-800 border border-stone-700 rounded-lg p-8 w-full max-w-md shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            name="name" placeholder="Full Name" value={form.name}
            onChange={handleChange} required
            className="w-full bg-stone-700 px-4 py-2 rounded focus:ring-2 focus:ring-amber-500"
          />
          <input
            name="email" type="email" placeholder="Email" value={form.email}
            onChange={handleChange} required
            className="w-full bg-stone-700 px-4 py-2 rounded focus:ring-2 focus:ring-amber-500"
          />
          <input
            name="password" type="password" placeholder="Password" value={form.password}
            onChange={handleChange} required
            className="w-full bg-stone-700 px-4 py-2 rounded focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full mt-6 bg-amber-600 hover:bg-amber-700 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Signing Up…" : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
