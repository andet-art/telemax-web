import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to your API
    console.log("Sign Up Data:", form);
    navigate("/signin");
  };

  return (
    <main className="min-h-screen bg-stone-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-stone-800 border border-stone-700 rounded-lg p-8 w-full max-w-md shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-stone-700 text-white px-4 py-2 rounded outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
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
          className="w-full mt-6 bg-amber-600 hover:bg-amber-700 transition py-2 rounded text-white font-medium"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-amber-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </main>
  );
};

export default SignUp;
