"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>

      <SheetContent side="left">
        <div className="flex flex-col gap-6 mt-15 ml-4 text-lg font-medium hover:bg-background hover:text-foreground">
          <Link  href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/user/menu">Menu</Link>
          <Link href="/user/orders">Orders</Link>
          <Link href="/admin/main/create">Admin</Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu