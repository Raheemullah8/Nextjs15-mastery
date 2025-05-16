import { prisma } from "@/lib/prisma";
import { updateSnippet } from "@/app/action/handleService";
export default async function edit({params}: { params: { id: string } }) {
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
    return(
     <form action={updateSnippet} className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-md space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Edit Snippet</h1>
        <input type="hidden" name="id" value={snippet.id} />
        <input type="text" name="title" defaultValue={snippet.title} className="border border-gray-300 p-2 rounded w-full" />
        <textarea name="code" defaultValue={snippet.code} className="border border-gray-300 p-2 rounded w-full h-40"></textarea>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded">Save</button>
        </form>
    )
}