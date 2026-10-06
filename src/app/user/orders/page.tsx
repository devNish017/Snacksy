import Image from "next/image"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import paid from "../../../../public/paid.png"

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
         Order History
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-5 shadow-sm"
          >
            

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-t pt-3"
                >
                  <div>
                    <img src={item.imageUrl} alt={item.name} width={80} height={80}
                    className="object-cover rounded-md"
                    />
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
              <span>Total Amount</span>
              <span>₹{order.totalAmount}</span>
            </div>

            <br/>
            <hr/>


<div className="flex justify-between mb-4 mt-4 pb-8 relative ">
              <div>
                <h2 className="font-bold text-xl">
                  Order Details
                </h2>
                <p className="font-bold text-xl">
                  Order id:  <span className="font-normal text-sm">#{order.id}</span>
                </p>

                <p className="text-gray-500 text-sm">
                  {order.createdAt.toLocaleString()}
                </p>
              </div>

              <div className="text-right my-auto">
                <p className="font-bold text-xl  ">
                  ₹{order.totalAmount}
                </p>
                
                
                <p className="text-green-600 font-semibold">
                  {/* {order.status} */}
                  <Image src={paid} alt="Checked" height={80} width={80}
                   className="inline-block ml-2 absolute top-12 -right-3 opacity-80 " />
                </p>
                </div>
              </div>
            </div>


          
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
