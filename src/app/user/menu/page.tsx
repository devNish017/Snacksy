import React from "react"
import { prisma } from "@/lib/prisma"
import MenuCard from "@/components/MenuCard"

const page = async () => {

  const items = await prisma.menuItem.findMany()

  return (
    <div className="mx-5 my-5 min-h-screen w-full">

      <h2 className="text-2xl font-extrabold mb-5">
        Our Menu
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-auto md:grid-cols-4 gap-5 mx-5">

        {items.map((item) => (
          item.imageUrl && (
            <MenuCard
              key={item.id}
              item={item}
            />
          )
        ))}

      </div>

    </div>
  )
}

export default page