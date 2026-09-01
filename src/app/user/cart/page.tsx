"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import useCartStore from "@/store/cartStore"
import Link from "next/link"

const CartPage = () => {
  const cart = useCartStore((state) => state.cart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-2xl font-extrabold mb-6">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-4">

          {cart.map((item) => (

            <Card key={item.id}>
              <CardContent className="flex items-center gap-5 p-5">

                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-md"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500">
                    ₹{item.price}
                  </p>
                  <p className="text-gray-500">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 mt-3">

                    <Button
                      variant="outline"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>

                    <span className="font-bold">
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>

                  </div>

                </div>

                <div className="text-right">

                  <p className="font-bold text-lg">
                    ₹{item.price * item.quantity}
                  </p>

                  <Button
                    variant="destructive"
                    className="mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>

                </div>

              </CardContent>
            </Card>

          ))}

        </div>

        <Card className="h-fit">

          <CardHeader>
            <CardTitle>
              Order Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
           
           <Link href="/user/payment">
            <Button className="w-full cursor-pointer">
              Proceed to Payment
            </Button>
            </Link>

          </CardContent>

        </Card>

      </div>
    </div>
  )
}

export default CartPage