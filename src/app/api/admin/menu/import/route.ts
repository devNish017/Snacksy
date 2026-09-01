import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { items } = await req.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid menu data",
        },
        { status: 400 }
      )
    }

    const result = await prisma.menuItem.createMany({
      data: items.map((item) => ({
        name: item.name,
        description: item.description,
        price: Number(item.price),
        category: item.category,
        imageUrl: item.imageUrl,
      })),
    })

    return NextResponse.json({
      success: true,
      count: result.count,
    })
  } catch (error) {
    console.error("MENU IMPORT ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to import menu",
      },
      { status: 500 }
    )
  }
}