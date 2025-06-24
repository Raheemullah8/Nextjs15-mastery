"use server"

import { auth } from "@/auth";
import z from "zod";
import { prisma } from "@/lib";
import { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
})

type CreatePostState = {
    title?: string[];
    content?: string[];
    formError?: string[];
    success?: boolean;
}

export const createPost = async (
    slug: string,
    prevState: CreatePostState,
    formData: FormData
): Promise<CreatePostState> => {
   
    const result = postSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    })

    if (!result.success) {
        return {
            ...result.error.flatten().fieldErrors,
        }
    }

    const session = await auth();
    if (!session?.user || !session.user.id) {
        return {
            formError: ["You must be logged in to create a post."],
        }
    }

    const topics = await prisma.topic.findFirst({
        where: {
            slug: slug,
        }
    })

    if (!topics) {
        return {
            formError: ["Topic not found."],
        }
    }
    
    let post: Post
    try {       
        post = await prisma.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topics.id,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating post:", error.message);
        } else {
            console.error("Unknown error creating post:", error);
        }
        return {
            formError: ["Failed to create post."],
        }
    }

    revalidatePath(`/topics/${slug}`);
    redirect(`/topics/${slug}/posts/${post.id}`);
}