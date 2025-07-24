import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Optionally, use an environment variable for flexibility
const API_BASE = import.meta.env.VITE_API_URL || "http://209.38.231.125:4000";

type Form = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  date_of_birth: string;
  country: string;
  shipping_address: string;
  billing_address: string;
  same_billing_address: boolean;
  age_verified: boolean;
  terms_accepted: boolean;
  privacy_accepted: boolean;
  marketing_consent: boolean;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    date_of_birth: "",
    country: "",
    shipping_address: "",
    billing_address: "",
    same_billing_address: true,
    age_verified: false,
    terms_accepted: false,
    privacy_accepted: false,
    marketing_consent: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
      
      // If "same billing address" is checked, copy shipping to billing
      if (name === "same_billing_address" && checked) {
        setForm(prev => ({ ...prev, billing_address: prev.shipping_address }));
      }
    } else {
      setForm({ ...form, [name]: value });
      
      // If shipping address changes and same_billing_address is true, update billing too
      if (name === "shipping_address" && form.same_billing_address) {
        setForm(prev => ({ ...prev, billing_address: value }));
      }
    }
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Age verification
    if (form.date_of_birth && calculateAge(form.date_of_birth) < 18) {
      setError("You must be at least 18 years old to purchase tobacco products.");
      setLoading(false);
      return;
    }

    // Required checkboxes validation
    if (!form.age_verified) {
      setError("You must verify that you are of legal age.");
      setLoading(false);
      return;
    }

    if (!form.terms_accepted) {
      setError("You must accept the Terms of Service.");
      setLoading(false);
      return;
    }

    if (!form.privacy_accepted) {
      setError("You must accept the Privacy Policy.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        const msg = data.message || `${res.status}: ${res.statusText}`;
        setError(`Sign up failed (${msg})`);
      } else {
        navigate("/signin");
      }
    } catch (err: any) {
      console.error("🔥 Error during signup:", err);
      setError("Server error — please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#14110f] text-white flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1b18] border border-stone-800 rounded-xl p-8 w-full max-w-2xl shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-white tracking-wide">
          Create Account
        </h1>

        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        <div className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full bg-[#13100d] text-white placeholder:text-stone-400 px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full bg-[#13100d] text-white placeholder:text-stone-400 px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full bg-[#13100d] text-white placeholder:text-stone-400 px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            />
            <input
              name="date_of_birth"
              type="date"
              placeholder="Date of Birth"
              value={form.date_of_birth}
              onChange={handleChange}
              required
              className="w-full bg-[#13100d] text-white placeholder:text-stone-400 px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            />
          </div>

          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full bg-[#13100d] text-white px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="AU">Australia</option>
            {/* Add more countries as needed */}
          </select>

          {/* Addresses */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Shipping Address</h3>
            <textarea
              name="shipping_address"
              placeholder="Enter your complete shipping address"
              value={form.shipping_address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-[#13100d] text-white placeholder:text-stone-400 px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a] resize-none"
            />

            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                name="same_billing_address"
                checked={form.same_billing_address}
                onChange={handleChange}
                className="w-4 h-4 text-[#c9a36a] bg-[#13100d] border-stone-700 rounded focus:ring-[#c9a36a]"
              />
              <span>Billing address same as shipping</span>
            </label>

            {!form.same_billing_address && (
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Billing Address</h3>
                <textarea
                  name="billing_address"
                  placeholder="Enter your billing address"
                  value={form.billing_address}
                  onChange={handleChange}
                  required={!form.same_billing_address}
                  rows={3}
                  className="w-full bg-[#13100d] text-white placeholder:text-stone-400 px-4 py-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a] resize-none"
                />
              </div>
            )}
          </div>

          {/* Legal Checkboxes */}
          <div className="space-y-3 pt-4 border-t border-stone-700">
            <label className="flex items-start space-x-2 text-white">
              <input
                type="checkbox"
                name="age_verified"
                checked={form.age_verified}
                onChange={handleChange}
                required
                className="w-4 h-4 mt-1 text-[#c9a36a] bg-[#13100d] border-stone-700 rounded focus:ring-[#c9a36a]"
              />
              <span className="text-sm">
                I verify that I am of legal age (18+) to purchase tobacco products in my jurisdiction
              </span>
            </label>

            <label className="flex items-start space-x-2 text-white">
              <input
                type="checkbox"
                name="terms_accepted"
                checked={form.terms_accepted}
                onChange={handleChange}
                required
                className="w-4 h-4 mt-1 text-[#c9a36a] bg-[#13100d] border-stone-700 rounded focus:ring-[#c9a36a]"
              />
              <span className="text-sm">
                I accept the <span className="text-[#c9a36a] underline cursor-pointer">Terms of Service</span>
              </span>
            </label>

            <label className="flex items-start space-x-2 text-white">
              <input
                type="checkbox"
                name="privacy_accepted"
                checked={form.privacy_accepted}
                onChange={handleChange}
                required
                className="w-4 h-4 mt-1 text-[#c9a36a] bg-[#13100d] border-stone-700 rounded focus:ring-[#c9a36a]"
              />
              <span className="text-sm">
                I accept the <span className="text-[#c9a36a] underline cursor-pointer">Privacy Policy</span>
              </span>
            </label>

            <label className="flex items-start space-x-2 text-white">
              <input
                type="checkbox"
                name="marketing_consent"
                checked={form.marketing_consent}
                onChange={handleChange}
                className="w-4 h-4 mt-1 text-[#c9a36a] bg-[#13100d] border-stone-700 rounded focus:ring-[#c9a36a]"
              />
              <span className="text-sm">
                I would like to receive marketing emails about new products and offers (optional)
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-stone-700 hover:bg-stone-600 transition py-3 rounded-md text-white font-medium shadow-sm disabled:opacity-50"
        >
          {loading ? "Creating Account…" : "Create Account"}
        </button>

        <p className="text-center text-sm mt-4 text-stone-400">
          Already have an account?{' '}
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