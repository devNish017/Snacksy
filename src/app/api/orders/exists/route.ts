
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({
        hasOrders: false,
      })
    }

    const order = await prisma.order.findFirst({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    })

    return NextResponse.json({
      hasOrders: !!order,
    })
  } catch (error) {
    console.error("ORDER CHECK ERROR:", error)

    return NextResponse.json(
      {
        hasOrders: false,
      },
      { status: 500 }
    )
  }
}

