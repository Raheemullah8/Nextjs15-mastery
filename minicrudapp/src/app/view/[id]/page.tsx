import Link from "next/link"; // 👈 Import Link from next

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


interface DynamicRouteProps {
  params: {
    id: string;
  };
}

export default async function DynamicRoute({ params }: DynamicRouteProps) {
  const id = parseInt(params.id);

  const snippet = await prisma.snippet.findUnique({
    where: {
      id: id,
    },
  });


  if (!snippet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Snippet not found.</p>
      </div>
    );
  }
  async function userdelte(){

    "use server";
      const id = parseInt(params.id);
    await prisma.snippet.delete({
      where: {
        id: id,
      },
    });
    redirect("/"); // redirect to home page after deletion
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-md space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{snippet.title}</h1>

      <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800 overflow-x-auto">
        <code>{snippet.code}</code>
      </pre>

      <div className="flex gap-4">
        <button onClick={userdelte} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded">
          Delete
        </button>

        {/* 👇 EDIT Button as a Link */}
        <Link href={`/snippit/edit/${snippet.id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}
