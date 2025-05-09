"use server"
import { prisma } from "@/lib/prisma";

export default async function Home() {
const snippet = await prisma.snippet.findMany()
  return (
    <div className="bg-amber-50">
     
     
        {
          snippet.map((item) => (
            <div key={item.id} className="bg-white p-4 m-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p>{item.code}</p>
            </div>
          ))
        }

      </div>
         
  );
}
