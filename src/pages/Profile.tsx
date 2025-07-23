import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Match your backend base URL or set via VITE_API_URL
const API_BASE = import.meta.env.VITE_API_URL || "http://209.38.231.125:4000";

type User = { id: number; name: string; email: string };

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    fetch(`${API_BASE}/api/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || `Status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setError("Unable to load profile. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading profile…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#14110f] text-white flex flex-col items-center justify-center px-4">
      <div className="bg-[#1e1b18] rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>
        <p className="mb-2">
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p className="mb-6">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signin");
          }}
          className="w-full bg-stone-700 hover:bg-stone-600 transition py-2 rounded-md text-white font-medium shadow-sm"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}
