import { useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export default function useActivityPing() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !API) return;

    const ping = () => {
      axios
        .post(`${API}/api/ping`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((err) => console.error("Ping failed:", err));
    };

    ping(); // immediate ping
    const interval = setInterval(ping, 2 * 60 * 1000); // every 2 minutes

    return () => clearInterval(interval);
  }, []);
}
