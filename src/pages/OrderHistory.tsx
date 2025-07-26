// src/pages/OrderHistory.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    fetch(`${API}/api/orders/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Failed to load orders", err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center border-b pb-2 mb-3">
                <div>
                  <div className="font-semibold text-lg">Order #{order.id}</div>
                  <div className="text-sm text-gray-500">
                    {order.created_at?.slice(0, 19).replace("T", " ")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total: ${order.total_price}</div>
                  <div className="text-sm text-teal-600 font-semibold">{order.status}</div>
                </div>
              </div>

              <div className="text-sm">
                <div className="font-semibold mb-2">Items:</div>
                <ul className="list-disc list-inside space-y-1">
                  {order.items?.map((item) => (
                    <li key={item.id}>
                      {item.product_name} × {item.quantity} – ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
