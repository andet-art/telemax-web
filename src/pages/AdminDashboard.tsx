import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PanelLeft,
  Users,
  Package,
  ShoppingCart,
  LayoutDashboard,
  UserCheck,
  Pencil,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const API = import.meta.env.VITE_API_BASE_URL;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [activeUserCount, setActiveUserCount] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const preloadOverviewData = async () => {
    try {
      const [usersRes, productsRes, ordersRes, activeRes] = await Promise.all([
        axios.get(`${API}/api/all-users`, { headers }),
        axios.get(`${API}/api/products`),
        axios.get(`${API}/api/orders/admin`, { headers }),
        axios.get(`${API}/api/active-count`, { headers }),
      ]);

      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
      setActiveUserCount(activeRes.data.activeUsers || 0);
    } catch (err) {
      console.error("❌ Overview preload error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        switch (activeTab) {
          case "overview":
            await preloadOverviewData();
            break;
          case "users": {
            const res = await axios.get(`${API}/api/all-users`, { headers });
            setUsers(Array.isArray(res.data) ? res.data : []);
            break;
          }
          case "products": {
            const res = await axios.get(`${API}/api/products`);
            setProducts(Array.isArray(res.data) ? res.data : []);
            break;
          }
          case "orders": {
            const res = await axios.get(`${API}/api/orders/admin`, { headers });
            setOrders(Array.isArray(res.data) ? res.data : []);
            break;
          }
          case "activeUsers": {
            const res = await axios.get(`${API}/api/active-users`);
            setActiveUsers(Array.isArray(res.data) ? res.data : []);
            break;
          }
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

  useEffect(() => {
    preloadOverviewData();
  }, []);

  const navItems = [
    { label: "Overview", key: "overview", icon: LayoutDashboard },
    { label: "Users", key: "users", icon: Users },
    { label: "Products", key: "products", icon: Package },
    { label: "Orders", key: "orders", icon: ShoppingCart },
    { label: "Active Users", key: "activeUsers", icon: UserCheck },
  ];

  const StatCard = ({ label, value }) => (
    <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-5 rounded-xl shadow">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
    </motion.div>
  );

  const Overview = () => {
    const statsData = [
      { name: "Users", value: users.length },
      { name: "Products", value: products.length },
      { name: "Orders", value: orders.length },
      { name: "Active Users", value: activeUserCount },
    ];

    const categoryCounts = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Users" value={users.length} />
          <StatCard label="Products" value={products.length} />
          <StatCard label="Orders" value={orders.length} />
          <StatCard label="Active Users" value={activeUserCount} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-700 mb-4 font-semibold">Overview Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-gray-700 mb-4 font-semibold">Product Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

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
                <button className="text-blue-600"><Pencil size={16} /></button>
                <button className="text-red-600"><Trash size={16} /></button>
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
              <div className="text-sm text-gray-500">{order.created_at?.slice(0, 19).replace("T", " ")}</div>
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
                <li key={item.id}>{item.product_name} × {item.quantity} – ${item.price}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  const ActiveUsersTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Last Active</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {activeUsers.map((user, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{new Date(user.loginTime).toLocaleString()}</td>
              <td className="px-4 py-2">{user.isActive ? <span className="text-green-600 font-medium">Active</span> : <span className="text-gray-500">Inactive</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex h-screen">
      <aside className="bg-zinc-900 text-white w-64 p-4 space-y-4">
        <div className="text-2xl font-bold mb-6 flex items-center gap-2">
          <PanelLeft /> Admin Panel
        </div>
        {navItems.map(({ label, key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex gap-2 items-center w-full p-2 rounded-md ${activeTab === key ? "bg-teal-700" : "hover:bg-zinc-800"}`}>
            <Icon size={18} /> {label}
          </button>
        ))}
      </aside>
      <main className="flex-1 p-6 overflow-y-auto bg-zinc-50">
        <h1 className="text-3xl font-semibold mb-4 capitalize">{activeTab}</h1>
        {activeTab === "overview" && <Overview />}
        {activeTab === "users" && <UsersTable />}
        {activeTab === "products" && <ProductsTable />}
        {activeTab === "orders" && <OrdersTable />}
        {activeTab === "activeUsers" && <ActiveUsersTable />}
      </main>
    </div>
  );
}
