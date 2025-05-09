import { prisma } from "@/lib/prisma";

export default function AddForm() {
    
     const  getData  = async (formdata:FormData) =>{
      'use server';
      const title = formdata.get("title") as string;
      const code = formdata.get("code") as string;
      await prisma.snippet.create({
        data:{
          title,
          code,
        }
      })
    
      console.log(title, code);
     }
    return(
      <form  action={getData} className="flex flex-col items-center justify-center h-screen">
          <input type="text" name="title" placeholder="Enter your name" className="border-2 border-gray-300 p-2 rounded-md mb-4" />
          <input type="text" name="code" placeholder="Enter your email" className="border-2 border-gray-300 p-2 rounded-md mb-4" />
         <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
         
      </form>
    )
}
