// src/pages/SignIn.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SignInForm = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/signin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include', // to send cookies for session
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        setError(data.message || 'Sign in failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
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
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign In</h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-stone-700 text-white px-4 py-2 rounded outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-stone-700 text-white px-4 py-2 rounded outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-amber-600 hover:bg-amber-700 transition py-2 rounded text-white font-medium disabled:opacity-50"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <span
            className="text-amber-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </main>
  );
};

export default SignIn;