"use server"
import {success, z} from "zod"
import {prisma} from "@/lib/prisma"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



type CreatemenuFormState={
    errors:{
        name?:string[],
        description?:string[],
        price?:string[],
        category?:string[],
        image?:string[], 
        formError?:string[]
    }
}

const formSchema= z.object({
    name:z.string().min(1,{message:"Name is required"}),
    description:z.string().min(1,{message:"Description is required"}),
    price:z.coerce.number().min(1,{message:"Price is required"}),
    category:z.string().min(1,{message:"Category is required"}),
    image:z.string().url({message:"Image must be a valid url"})
})

export const createMenuAction = async (initialState: CreatemenuFormState, formData: FormData) => {
  console.log("🔥 ACTION CALLED");

  console.log({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    image: formData.get("image"),
  });

  const id = formData.get("id") as string;

  const result = formSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    category: formData.get("category") as string,
    image: formData.get("image") as string,
  });

  console.log("ZOD RESULT:", result);

  if (!result.success) {
    console.log("❌ VALIDATION ERROR:", result.error.flatten().fieldErrors);

    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  console.log("✅ VALIDATION SUCCESS");

  try {

    
    
    const menu = await prisma.menuItem.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        price: result.data.price,
        category: result.data.category,
        imageUrl: result.data.image ,
      },
    });

    console.log("✅ DATABASE SAVED:", menu);
  
} catch (error) {
    console.log("❌ PRISMA ERROR:", error);

    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    }

    return {
      errors: {
        formError: ["An unknown error occurred"],
      },
    };
  }

  revalidatePath("/admin/main");
  redirect("/admin/main");
};


// Delete ke liye 

export const deleteMenuAction =async(formData :FormData)=>{
   console.log("🔥 DELETE ACTION CALLED")
   try{
  const id = formData.get("id") as string;
  
    console.log("🆔 ID:", id)

 const deletedItem= await prisma.menuItem.delete({
    where:{
      id
    }
  })
  console.log("✅ DELETED:", deletedItem)
}
  catch (error) {
    console.log("❌ DELETE ERROR:", error)
  }

 revalidatePath("/admin/main");
 redirect("/admin/main")
}


// edit page 

 export const editMenuAction = async (formData: FormData) => {

  const id = formData.get("id") as string;

  console.log("🔥 EDIT ACTION CALLED");
  console.log("ID:", id);

  const result = formSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    category: formData.get("category") as string,
    image: formData.get("image") as string,
  });

  if (!result.success) {
    console.log("❌ VALIDATION ERROR:", result.error.flatten().fieldErrors);
    return;
  }

  try {

    const updatedItem = await prisma.menuItem.update({
      where: {
        id: id
      },
      data: {
        name: result.data.name,
        description: result.data.description,
        price: result.data.price,
        category: result.data.category,
        imageUrl: result.data.image || "",
      }
    });

    console.log("✅ UPDATED:", updatedItem);

  } catch (error) {
    console.log("❌ UPDATE ERROR:", error);
    return;
  }

  revalidatePath("/admin/main");
  redirect("/admin/main");
};
