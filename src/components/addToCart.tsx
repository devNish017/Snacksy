"use client"
import React from 'react'
import { GiShoppingCart } from "react-icons/gi";
import useCartStore from '@/store/cartStore';

type Props = {
    id:string,
    name:string,
    price:number,
    imageUrl:string,
    description:string,
    category:string
}

const AddToCart = ({id,name,price,imageUrl,description, category}: Props) => {

    const cart =useCartStore((state)=>state.cart)
    const addToCart =useCartStore((state)=>state.addToCart)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const [value,setValue]=React.useState(0);

    const item = cart.find((item) => item.id === id)

    if (!item ) {
    return (
      <button
        className="bg-black cursor-pointer hover:bg-gray-800 text-white  rounded-md w-10  "
         onClick={() =>
          addToCart({
            id,
            name,
            price,
            imageUrl,
            description
          })
        }
      >
       <GiShoppingCart className='h-7 w-7 mx-auto'/>
      </button>
    )
  }
   
  return (
   <>
   <div className=" flex">
     <button  className='bg-white text-black outline px-2 py-1.5 rounded-md' 
     onClick={()=>decreaseQuantity(id)}>-</button>
     <p className='mx-3 mt-1'>{item.quantity}</p>
     <button className='bg-white text-black px-2 py-1.5 outline rounded-md' 
     onClick={()=>increaseQuantity(id)}>+</button>
  
 

   </div>
   </>
  )
}

export default AddToCart