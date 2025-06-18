// actions/createtopics.ts
"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// ✅ Validation schema
const topicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-z]+$/, "Name must contain only lowercase letters (a-z)"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must be less than 1000 characters"),
});

// ✅ Form state type
type CreateTopicState = {
  name?: string[];
  description?: string[];
  formError?: string[];
  success?: boolean;
};

// ✅ Server action
export const createTopic = async (
  prevState: CreateTopicState,
  formData: FormData
): Promise<CreateTopicState> => {
  // Validate form data
  const result = topicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return result.error.flatten().fieldErrors;
  }

  // Check authentication
  const session = await auth();
  if (!session?.user) {
    return {
      formError: ["You must be logged in to create a topic."],
    };
  }

  let topic: Topic;

  try {
    // Check if topic already exists
    const existingTopic = await prisma.topic.findUnique({
      where: { slug: result.data.name },
    });

    if (existingTopic) {
      return {
        formError: ["A topic with this name already exists."],
      };
    }

    // Create topic
    topic = await prisma.topic.create({
      data: {
        slug: result.data.name,
        name: result.data.name,
        description: result.data.description,
      },
    });

  } catch (error) {
    console.error("Topic creation error:", error);
    return {
      formError: ["Something went wrong. Please try again."],
    };
  }

  // Revalidate and redirect (outside try-catch)
  revalidatePath("/");
  redirect(`/topics/${topic.slug}`);
};

