"use client"
import Link from 'next/link'
import React from 'react'
import { ShoppingCart } from 'lucide-react';
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import useCartStore from '@/store/cartStore';

const Navbar = () => {
    // const cart=[1,2,3];
    const totalItems = useCartStore((state) =>
  state.cart.reduce((total, item) => total + item.quantity, 0)
)
  return (
    <>
    <header className='flex h-12 w-full  sticky justify-between top-0 py-1.5 z-50 bg-white shadow-md px-4 items-center'>
        <h2 className='font-bold text-xl ml-2.5 not-md:text-[18px] mt-1 '>Snacksy</h2>
        <nav className='mx-auto flex gap-4  font-medium not-md:hidden mt-1'>
            <Link href="/">Home</Link>
            <Link href="">About</Link>
            <Link href="/user/menu">Menu</Link>
            <Link href="">Dineout</Link>
            <Link href="/admin/main/create">Admin</Link>
            
        </nav>

        <input className='mt-1.5 w-2/3 mr-2 md:w-64 h-6 border rounded-sm px-3  outline not-md:hidden border-black '
         type="search" name="" id=""  placeholder='search items'/>
  

  <div className='flex '>
       <div className='relative'>
        <Link href="/user/cart">
        <ShoppingCart  className="text-gray-700 mr-6 mt-1.5  " />
        {
        totalItems>0
        &&    
        <span className=' bg-red-500 text-white rounded-full px-1 py-.5 absolute right-2 top-1 text-[10px] '>{totalItems}</span>

        }
        </Link>
        </div>
        
        {/* {Auth user} */}
        
       <Show when="signed-in">
  <UserButton />
</Show>

<Show when="signed-out">
  <div className="flex gap-2">
    <SignInButton mode="modal">
      <button className="px-3 py-1 border rounded-md">
        Sign In
      </button>
    </SignInButton>

    <SignUpButton mode="modal">
      <button className="px-3 py-1 bg-black text-white rounded-md">
        Sign Up
      </button>
    </SignUpButton>
  </div>
</Show>
</div>


    </header>
    </>
  )
}

export default Navbar