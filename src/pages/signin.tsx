import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Optionally use an environment variable for flexibility
const API_BASE = import.meta.env.VITE_API_URL || "http://209.38.231.125:4000";

type SignInForm = {
  email: string;
  password: string;
};

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || `Sign in failed (${res.status}: ${res.statusText})`);
      } else {
        // Store JWT and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Role-based redirect
        if (data.user.role === 'admin') {
          navigate("/admin-profile");
        } else {
          navigate("/profile");
        }
      }
    } catch (err: any) {
      console.error("🔥 Error during signin:", err);
      setError("Server error — please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#14110f] text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1b18] border border-stone-800 rounded-xl p-8 w-full max-w-md shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-white tracking-wide">
          Sign In
        </h1>

        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-[#13100d] text-white placeholder:text-stone-400 px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-[#13100d] text-white placeholder:text-stone-400 px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-stone-700 hover:bg-stone-600 transition py-2 rounded-md text-white font-medium shadow-sm disabled:opacity-50"
        >
          {loading ? "Signing In…" : "Sign In"}
        </button>

        <p className="text-center text-sm mt-4 text-stone-400">
          Don't have an account?{' '}
          <span
            className="text-[#c9a36a] cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </main>
  );
}