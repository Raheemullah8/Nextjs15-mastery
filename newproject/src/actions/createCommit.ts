"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const commitSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

type CreateCommitState = {
  error: {
    content?: string[];
    formerror?: string;
  };
  success?: boolean;
};

export const CreateCommit = async (
  { postId, parentId }: { postId: string; parentId?: string },
  prevState: CreateCommitState,
  formData: FormData
): Promise<CreateCommitState> => {
  // ✅ Validate form content
  const result = commitSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }

  // ✅ Check session
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: { formerror: "You must be logged in to create a commit." },
    };
  }

  // ✅ Try creating comment
  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id,
        postId,
        parentId: parentId || null,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: { formerror: error.message },
      };
    } else {
      return {
        error: { formerror: "An unexpected error occurred." },
      };
    }
  }

  // ✅ Get topic slug to revalidate
  const topic = await prisma.topic.findFirst({
    where: {
      posts: {
        some: {
          id: postId,
        },
      },
    },
    select: {
      slug: true,
    },
  });

  if (!topic) {
    return {
      error: { formerror: "Topic not found." },
    };
  }

  // ✅ Revalidate the page
  revalidatePath(`/topics/${topic.slug}/posts/${postId}`);

  return {
    error: {},
    success: true,
  };
};
