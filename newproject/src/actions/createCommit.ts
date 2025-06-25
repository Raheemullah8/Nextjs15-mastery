"use server";
import { auth } from "@/auth";
import { z } from "zod";

const commitSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

type CreateCommitState ={
error{
    content?: string[];
    formerror?: string;
}           
}

export const CreateCommit = async (formData:FormData): Promise<CreateCommitState> =>{

 const result = commitSchema.safeParse({
    content: formData.get("content"),
  });
  if(!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth()
    if (!session || !session?.user || !session.user.id ) {
        return {
        error: { formerror: "You must be logged in to create a commit." },
        };
    }
    try {
        
        
    } catch (error:unknown) {
        if( error instanceof Error) {
            return {
                error: { formerror: error.message },
            };
        }else{
            return {
                error: { formerror: "An unexpected error occurred." },
            };
        }
    }

}