
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from 'react'
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import edit from "../../../../public/edit-48.png";
import deleteGif from "../../../../public/delete-100.png";

import Image from 'next/image';
import { deleteMenuAction, } from '../../../../action/create-menu';


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


type Props = {}


const main =async (props: Props) => {

  const items= await prisma.menuItem.findMany()

  return (
    <>
    <div className='flex flex-col mt-5 h-screen w-full'>
      <h2 className='mx-auto font-bold text-3xl'> Our Menu</h2>

      <Card className='w-[90%] h-fit container mx-auto mt-3 '>
        <CardHeader > 
          <CardTitle className='text-center font-semibold text-md'> Current Menu Items</CardTitle>  
        </CardHeader>
        <CardContent>
          <Table >

            <TableHeader className='bg-gray-200 ' >
    <TableRow>
      <TableHead className="w-25">Items</TableHead>
      <TableHead>Description</TableHead>
      <TableHead >Price</TableHead>
      <TableHead className="text-right ">Action</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {
      items.map((item)=>(
        <TableRow key={item.id}>
          
          <TableCell className="font-medium">{item.name}</TableCell>
    
      <TableCell className="font-medium">{item.description}</TableCell>
      
      
      <TableCell className="font-medium">${item.price}</TableCell>
      <TableCell className="text-right flex justify-end ">
        

        <Link href={`/admin/main/create/${item.id}`}>
        <Button variant='outline' className='cursor-pointer'>
          <Image src={edit} height={25} width={25} alt="edit"/>
        </Button>
        </Link>
        

        <form action={deleteMenuAction}>
          <input type="hidden" value={item.id} name='id' />
        <Button type='submit' variant="destructive" className='mx-2 cursor-pointer'>
          <Image src={deleteGif} height={25} width={25} alt="edit"/>
        </Button>
        </form>
        
      </TableCell>
    </TableRow>
      ))
}
  </TableBody>

          </Table>
        </CardContent>

      </Card>

    </div>
    </>
  )
}

export default main