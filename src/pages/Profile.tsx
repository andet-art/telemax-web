import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://209.38.231.125:4000";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  date_of_birth: string | null;
  country: string | null;
  shipping_address: string | null;
  billing_address: string | null;
  age_verified: boolean;
  terms_accepted: boolean;
  privacy_accepted: boolean;
  marketing_consent: boolean;
  created_at: string;
  updated_at: string;
};

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
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setError("Unable to load profile. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center"><p>Loading profile…</p></main>;
  }

  if (error) {
    return <main className="min-h-screen flex items-center justify-center"><p className="text-red-400">{error}</p></main>;
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#14110f] text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-[#1e1b18] rounded-xl p-8 max-w-2xl w-full shadow-xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Your Profile</h1>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <p><span className="font-medium">Full Name:</span> {user.first_name} {user.last_name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Phone:</span> {user.phone || "Not provided"}</p>
          <p><span className="font-medium">Date of Birth:</span> {user.date_of_birth || "N/A"}</p>
          <p><span className="font-medium">Country:</span> {user.country || "N/A"}</p>
          <p><span className="font-medium">Shipping Address:</span> {user.shipping_address || "N/A"}</p>
          <p><span className="font-medium">Billing Address:</span> {user.billing_address || "N/A"}</p>
          <p><span className="font-medium">Age Verified:</span> {user.age_verified ? "✔ Yes" : "✘ No"}</p>
          <p><span className="font-medium">Terms Accepted:</span> {user.terms_accepted ? "✔" : "✘"}</p>
          <p><span className="font-medium">Privacy Accepted:</span> {user.privacy_accepted ? "✔" : "✘"}</p>
          <p><span className="font-medium">Marketing Consent:</span> {user.marketing_consent ? "✔" : "✘"}</p>
          <p><span className="font-medium">Joined:</span> {new Date(user.created_at).toLocaleString()}</p>
          <p><span className="font-medium">Last Updated:</span> {new Date(user.updated_at).toLocaleString()}</p>
        </div>

        {user.role === "admin" && (
          <div className="mt-6">
            <button
              onClick={() => navigate("/admindashboard")}
              className="w-full bg-blue-600 hover:bg-blue-500 transition py-2 rounded-md text-white font-medium"
            >
              Go to Admin Dashboard
            </button>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/signin");
            }}
            className="w-full bg-stone-700 hover:bg-stone-600 transition py-2 rounded-md text-white font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Order History Section */}
      <div className="mt-12 w-full max-w-2xl px-4">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        <div className="bg-[#1e1b18] rounded-lg p-4 shadow">
          <p className="text-sm text-gray-400">
            This section will show your recent orders once connected to the backend.
          </p>
          {/* Replace with order mapping in the future */}
          {/* orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          )) */}
        </div>
      </div>
    </main>
  );
}
