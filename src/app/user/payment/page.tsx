"use client"

import React from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import useCartStore from "@/store/cartStore"

const Page = () => {
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handlePayment = async () => {
    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmount,
      }),
    })

    const order = await response.json()

    console.log("RAZORPAY ORDER:", order)

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Food Application",
      description: "Food Order",
      order_id: order.id,

      handler: async function (response: any) {
  console.log("PAYMENT SUCCESS:", response)

  const verifyResponse = await fetch("/api/payment/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...response,
      cart,
      totalAmount,
    }),
  })

  const result = await verifyResponse.json()

console.log("VERIFY STATUS:", verifyResponse.status)
console.log("VERIFY RESULT:", result)

if (result.success) {
  clearCart()
  alert("Payment successful")
  window.location.href = "/user/orders"
} else {
  alert(result.message)
}
},
    }

    const razorpay = new window.Razorpay(options)

    razorpay.open()
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen p-5">
        <h1 className="text-2xl font-bold">
          Payment
        </h1>

        <p className="mt-5 text-xl font-semibold">
          Total: ₹{totalAmount}
        </p>

        <Button
          className="mt-5"
          onClick={handlePayment}
        >
          Pay ₹{totalAmount}
        </Button>
      </div>
    </>
  )
}

export default Page