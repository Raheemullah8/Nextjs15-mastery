"use server"
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
const snippet = await prisma.snippet.findMany()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Code Snippets</h1>
      <Link href="/snippit"><button className="bg-blue-500 text-white p-2 rounded-md">Add Snippet</button></Link>
    <div className="bg-amber-50">
     
     
        {
          snippet.map((item) => (
            <div key={item.id} className="bg-white p-4 m-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p>{item.code}</p>
              <Link href={`/view/${item.id}`}><button className="mt-5 bg-blue-400 text-white rounded px-2">View</button></Link>
            </div>
          ))
        }

      </div>
      </div>
         
  );
}
