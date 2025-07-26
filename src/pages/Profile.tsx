import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://209.38.231.125:4000";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [editable, setEditable] = useState({
    phone: "",
    shipping_address: "",
    billing_address: "",
    marketing_consent: false,
    first_name: "",
    last_name: "",
    date_of_birth: "",
    country: "",
    password: "",
  });

  const toggleSection = (key) => {
    setExpanded(expanded === key ? null : key);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signin");

    fetch(`${API_BASE}/api/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setEditable({
          phone: data.phone || "",
          shipping_address: data.shipping_address || "",
          billing_address: data.billing_address || "",
          marketing_consent: data.marketing_consent,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          date_of_birth: data.date_of_birth || "",
          country: data.country || "",
          password: "",
        });
      })
      .catch((err) => console.error("Profile load error", err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editable),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <main className="min-h-screen flex items-center justify-center">Loading...</main>;

  return (
    <main className="min-h-screen bg-[#14110f] text-white px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Your Profile</h1>

        {/* PERSONAL INFO */}
        <section className="bg-[#1e1b18] rounded-lg shadow p-4">
          <button onClick={() => toggleSection("personal")} className="w-full text-left text-xl font-semibold">
            👤 Personal Info
          </button>
          {expanded === "personal" && (
            <div className="mt-4 grid gap-3 text-sm">
              <label>
                <span className="font-medium">First Name:</span>
                <input
                  className="mt-1 w-full px-3 py-1 rounded bg-zinc-800 text-white"
                  value={editable.first_name}
                  onChange={(e) => setEditable({ ...editable, first_name: e.target.value })}
                />
              </label>

              <label>
                <span className="font-medium">Last Name:</span>
                <input
                  className="mt-1 w-full px-3 py-1 rounded bg-zinc-800 text-white"
                  value={editable.last_name}
                  onChange={(e) => setEditable({ ...editable, last_name: e.target.value })}
                />
              </label>

              <label>
                <span className="font-medium">Date of Birth:</span>
                <input
                  type="date"
                  className="mt-1 w-full px-3 py-1 rounded bg-zinc-800 text-white"
                  value={editable.date_of_birth || ""}
                  onChange={(e) => setEditable({ ...editable, date_of_birth: e.target.value })}
                />
              </label>

              <label>
                <span className="font-medium">Country:</span>
                <input
                  className="mt-1 w-full px-3 py-1 rounded bg-zinc-800 text-white"
                  value={editable.country || ""}
                  onChange={(e) => setEditable({ ...editable, country: e.target.value })}
                />
              </label>

              <label>
                <span className="font-medium">Change Password:</span>
                <input
                  type="password"
                  className="mt-1 w-full px-3 py-1 rounded bg-zinc-800 text-white"
                  value={editable.password || ""}
                  onChange={(e) => setEditable({ ...editable, password: e.target.value })}
                  placeholder="Leave empty to keep current"
                />
              </label>
            </div>
          )}
        </section>

        {/* CONTACT INFO */}
        <section className="bg-[#1e1b18] rounded-lg shadow p-4">
          <button onClick={() => toggleSection("contact")} className="w-full text-left text-xl font-semibold">
            📱 Contact & Preferences
          </button>
          {expanded === "contact" && (
            <div className="mt-4 grid gap-3 text-sm">
              <label>
                <span className="font-medium">Phone:</span>
                <input
                  className="mt-1 w-full px-3 py-1 rounded bg-zinc-800 text-white"
                  value={editable.phone}
                  onChange={(e) => setEditable({ ...editable, phone: e.target.value })}
                />
              </label>
              <label>
                <span className="font-medium">Shipping Address:</span>
                <input
                  className="mt-1 w-full px-3 py-1 rounded bg-zinc-800 text-white"
                  value={editable.shipping_address}
                  onChange={(e) => setEditable({ ...editable, shipping_address: e.target.value })}
                />
              </label>
              <label>
                <span className="font-medium">Billing Address:</span>
                <input
                  className="mt-1 w-full px-3 py-1 rounded bg-zinc-800 text-white"
                  value={editable.billing_address}
                  onChange={(e) => setEditable({ ...editable, billing_address: e.target.value })}
                />
              </label>
              <label className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  checked={editable.marketing_consent}
                  onChange={(e) => setEditable({ ...editable, marketing_consent: e.target.checked })}
                />
                <span>Marketing Consent</span>
              </label>
            </div>
          )}
        </section>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-500 transition py-2 rounded-md text-white font-medium mt-4"
        >
          Save Changes
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signin");
          }}
          className="w-full bg-stone-700 hover:bg-stone-600 transition py-2 rounded-md text-white font-medium mt-2"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}