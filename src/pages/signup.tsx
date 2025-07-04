import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Form = { name: string; email: string; password: string };

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data: any;
      try {
        data = await res.json();
      } catch (parseErr) {
        const text = await res.text();
        console.error("❌ Could not parse JSON, got text:", text);
        throw parseErr;
      }

      if (res.ok && data.success) {
        navigate("/signin");
      } else {
        setError(data.message || `Sign up failed (status ${res.status})`);
      }
    } catch (err: any) {
      console.error("🔥 Error during signup:", err);
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
          Sign Up
        </h1>

        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-[#13100d] text-white placeholder:text-stone-400 px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
          />
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
          {loading ? "Signing Up…" : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4 text-stone-400">
          Already have an account?{" "}
          <span
            className="text-[#c9a36a] cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </main>
  );
}
