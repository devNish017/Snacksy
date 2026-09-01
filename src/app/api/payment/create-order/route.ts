import { NextResponse } from "next/server"

import { razorpay } from "@/lib/razorpay"

export async function POST(req: Request) {
  try {
    const { amount } = await req.json()

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })

    return NextResponse.json(order)
  } catch (error) {
    console.log("RAZORPAY ORDER ERROR:", error)

    return NextResponse.json(
      { error: "Unable to create Razorpay order" },
      { status: 500 }
    )
  }
}