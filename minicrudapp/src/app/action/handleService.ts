'use server';

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateSnippet(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

   await prisma.snippet.update({
    where: { id },
    data: { title, code },
  });

  redirect(`/view/${id}`); // redirect to updated snippet page
}

