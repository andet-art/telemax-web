import { motion } from "framer-motion"

const dummyOrders = [
  { id: 1, product: "Classic Oak Pipe", date: "2025-06-30", status: "Shipped" },
  { id: 2, product: "Modern Walnut Pipe", date: "2025-06-28", status: "Processing" },
  { id: 3, product: "Vintage Briar Pipe", date: "2025-06-26", status: "Delivered" },
]

const Orders = () => {
  return (
    <main className="pt-32 min-h-screen bg-stone-950 text-white px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">Your Orders</h1>

        <div className="grid gap-6">
          {dummyOrders.map((order, index) => (
            <motion.div
              key={order.id}
              className="bg-stone-800 border border-stone-700 rounded-lg p-5 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <h2 className="text-xl font-medium mb-1">{order.product}</h2>
              <p className="text-sm text-stone-400">Ordered on: {order.date}</p>
              <p className="text-sm text-stone-400">Status: <span className="font-semibold text-white">{order.status}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Orders
