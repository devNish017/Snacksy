"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddTocart from "@/components/addToCart"
import useCartStore from "@/store/cartStore"

type Props = {
  item: {
    id: string
    name: string
    description: string
    price: number
    category: string
    imageUrl: string
  }
}

const MenuCard = ({ item }: Props) => {
  const cartItem = useCartStore((state) =>
    state.cart.find((cartItem) => cartItem.id === item.id)
  )

  const quantity = cartItem?.quantity || 1

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">

      <div className="absolute inset-0 z-30 aspect-video bg-black/10" />

      <img
        src={item.imageUrl}
        alt={item.name}
        className="relative z-20 aspect-video w-full object-cover"
      />

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">
            {item.category}
          </Badge>
        </CardAction>

        <CardTitle>{item.name}</CardTitle>

        <CardDescription>
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex justify-between w-full items-center">

          <p className="font-bold text-lg">
            ₹{item.price * quantity}
          </p>

          <AddTocart
            id={item.id}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            description={item.description}
            category={item.category}
          />

        </div>

        
      </CardFooter>

    </Card>
  )
}

export default MenuCard