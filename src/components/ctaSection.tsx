import { Button } from "@/components/ui/button";
import Link from 'next/link'
import React from 'react'

type Props = {}

const CtaSection = (props: Props) => {
  return (
    <>
    <section className='bg-black w-full h-70 flex flex-col justify-center items-center gap-4'>
     <div className='flex flex-col justify-center items-center gap-4'>
      <h2 className='text-white text-2xl md:text-4xl text-center  font-bold'>Ready to Experience Our Cuisine</h2>
      <p className='text-white md:text-xl font-medium'>Book your table now or order online</p>
      
      <div className='flex gap-4'>
      <Link href="/reservation">
       <Button variant="outline">Reserve a Table</Button>
       </Link>
      <Link href="/online">
       <Button  variant="outline">Order Online</Button>
       </Link>
       </div>
     </div>
     

    </section>
    
    </>
  )
}

export default CtaSection