import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PanelLeft,
  Users,
  Package,
  ShoppingCart,
  LayoutDashboard,
  Pencil,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_BASE_URL;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        if (activeTab === "users") {
          const res = await axios.get(`${API}/api/all-users`, { headers });
          setUsers(Array.isArray(res.data) ? res.data : []);
        } else if (activeTab === "products") {
          const res = await axios.get(`${API}/api/products`);
          setProducts(Array.isArray(res.data) ? res.data : []);
        } else if (activeTab === "orders") {
          const res = await axios.get(`${API}/api/orders/admin`, { headers });
          setOrders(Array.isArray(res.data) ? res.data : []);
        }

        if (activeTab === "overview") {
          const res = await axios.get(`${API}/api/active-users`);
          setActiveUsers(res.data.count || 0);
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      }
    };

    fetchData();
  }, [activeTab]);

  const navItems = [
    { label: "Overview", key: "overview", icon: LayoutDashboard },
    { label: "Users", key: "users", icon: Users },
    { label: "Products", key: "products", icon: Package },
    { label: "Orders", key: "orders", icon: ShoppingCart },
  ];

  const StatCard = ({ label, value }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white p-5 rounded-xl shadow"
    >
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
    </motion.div>
  );

  const Overview = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Users" value={users.length} />
      <StatCard label="Products" value={products.length} />
      <StatCard label="Orders" value={orders.length} />
      <StatCard label="Active Users" value={activeUsers} />
    </div>
  );

  const UsersTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Country</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.first_name} {user.last_name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2 capitalize">{user.role}</td>
              <td className="px-4 py-2">{user.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ProductsTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Version</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.id}</td>
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.version}</td>
              <td className="px-4 py-2">${p.price}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-600">
                  <Pencil size={16} />
                </button>
                <button className="text-red-600">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const OrdersTable = () => (
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
              <div className="text-sm font-medium">Customer: {order.full_name}</div>
              <div className="text-sm text-gray-600">Email: {order.user_email}</div>
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
  );

  return (
    <div className="flex h-screen">
      <div className="bg-zinc-900 text-white w-64 p-4 space-y-4">
        <div className="text-2xl font-bold mb-6 flex items-center gap-2">
          <PanelLeft /> Admin Panel
        </div>
        {navItems.map(({ label, key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex gap-2 items-center w-full p-2 rounded-md ${
              activeTab === key ? "bg-teal-700" : "hover:bg-zinc-800"
            }`}
          >
            <Icon size={18} /> {label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-zinc-50">
        <h1 className="text-3xl font-semibold mb-4 capitalize">{activeTab}</h1>
        {activeTab === "overview" && <Overview />}
        {activeTab === "users" && <UsersTable />}
        {activeTab === "products" && <ProductsTable />}
        {activeTab === "orders" && <OrdersTable />}
      </div>
    </div>
  );
}