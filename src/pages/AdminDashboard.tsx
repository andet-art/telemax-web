import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PanelLeft,
  Users,
  Package,
  ShoppingCart,
  LayoutDashboard,
  Plus,
  Trash,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_BASE_URL;

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/signin");

    const headers = { Authorization: `Bearer ${token}` };

    if (activeTab === "users") {
      axios.get(`${API}/all-users`, { headers }).then((res) => setUsers(res.data));
    } else if (activeTab === "products") {
      axios.get(`${API}/products`, { headers }).then((res) => setProducts(res.data));
    } else if (activeTab === "orders") {
      axios.get(`${API}/orders`, { headers }).then((res) => setOrders(res.data));
    }
  }, [activeTab, token, navigate]);

  const Sidebar = () => (
    <div className="bg-zinc-900 text-white h-full w-64 p-4 space-y-4">
      <div className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PanelLeft /> Admin Panel
      </div>
      {[
        ["overview", LayoutDashboard],
        ["users", Users],
        ["products", Package],
        ["orders", ShoppingCart],
      ].map(([tab, Icon]) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex gap-2 items-center w-full p-2 rounded-md ${
            activeTab === tab ? "bg-teal-700" : "hover:bg-zinc-800"
          }`}
        >
          <Icon size={18} /> {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );

  const Overview = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[{
        label: "Users",
        value: users.length,
      }, {
        label: "Products",
        value: products.length,
      }, {
        label: "Orders",
        value: orders.length,
      }, {
        label: "Revenue",
        value: "$1,430",
      }].map((stat) => (
        <motion.div key={stat.label} whileHover={{ scale: 1.03 }} className="bg-white p-5 rounded-xl shadow">
          <div className="text-gray-500 text-sm">{stat.label}</div>
          <div className="text-xl font-bold mt-2">{stat.value}</div>
        </motion.div>
      ))}
    </div>
  );

  const UsersTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="px-4 py-2">{u.first_name} {u.last_name}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2 capitalize">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ProductsTable = () => (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded">
          <Plus size={18} /> Add Product
        </button>
      </div>
      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.name}</td>
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
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-3 text-left">Order ID</th>
            <th className="px-4 py-3 text-left">User</th>
            <th className="px-4 py-3 text-left">Total</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="px-4 py-2">#{o.id}</td>
              <td className="px-4 py-2">{o.user_id}</td>
              <td className="px-4 py-2">${o.total_price}</td>
              <td className="px-4 py-2">{o.status ?? "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
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
