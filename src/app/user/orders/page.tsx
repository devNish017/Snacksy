
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

const OrdersPage = async () => {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          No orders found
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="font-bold">
                  Order #{order.id}
                </h2>

                <p className="text-gray-500 text-sm">
                  {order.createdAt.toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{order.totalAmount}
                </p>

                <p className="text-green-600 font-semibold">
                  {order.status}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-t pt-3"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-gray-500">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
