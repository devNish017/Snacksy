"use client"

import React, { useState } from "react"
import Script from "next/script"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import useCartStore from "@/store/cartStore"
import { ShieldCheck, ShoppingBag, Loader2, Lock } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

const Page = () => {
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const [loading, setLoading] = useState(false)

  const itemTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const totalAmount = itemTotal
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handlePayment = async () => {
    try {
      setLoading(true)

      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      })

      const order = await response.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Food Application",
        description: "Food Order",
        order_id: order.id,

        handler: async function (response: any) {
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              cart,
              totalAmount,
            }),
          })

          const result = await verifyResponse.json()

          if (result.success) {
            clearCart()
            alert("Payment successful")
            window.location.href = "/user/orders"
          } else {
            alert(result.message)
          }
        },

        modal: {
          ondismiss: () => setLoading(false),
        },

        theme: { color: "#f97316" },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("PAYMENT ERROR:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground px-4 text-center">
        <div className="rounded-full bg-orange-100 p-5">
          <ShoppingBag className="h-10 w-10 text-orange-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
        <p className="max-w-sm text-gray-500">
          Add some items to the cart before making the payment.
        </p>
        <Button  className="mt-2 bg-orange-500 hover:bg-orange-600">
          <Link href="/user/menu">Browse Food</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-background text-foreground px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold bg-background text-foreground sm:text-3xl">
              Checkout
            </h1>
            <p className="mt-1 text-sm  text-foreground sm:text-base">
              Review your order and complete the payment.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border bg-background  shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold  text-foreground">
                    Order Summary
                  </h2>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
                    {totalItems} {totalItems > 1 ? "items" : "item"}
                  </span>
                </div>

                <ul className="divide-y">
                  {cart.map((item: any) => (
                    <li
                      key={item.id ?? item._id ?? item.name}
                      className="flex items-center justify-between gap-3 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium  text-foreground">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-sm text-foreground">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="shrink-0 font-semibold text-foreground">
                        ₹{item.price * item.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border bg-background text-foreground p-4 shadow-sm sm:p-6 lg:sticky lg:top-6">
                <h2 className="mb-4 text-lg font-semibold ">
                  Payment Details
                </h2>

                <div className="space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between ">
                    <span>Item Total</span>
                    <span>₹{itemTotal}</span>
                  </div>
                  <div className="flex justify-between ">
                    <span>Delivery</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>

                <div className="my-4 border-t border-dashed" />

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold ">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold">
                    ₹{totalAmount}
                  </span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="mt-6 h-12 w-full bg-orange-500 text-base font-semibold hover:bg-orange-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Pay ₹{totalAmount}
                    </>
                  )}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>100% secure payment via Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page