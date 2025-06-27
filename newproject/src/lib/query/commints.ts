import { prisma } from ".."
import { Comment } from "@prisma/client"

export interface CommentWithUser extends Comment {
  user: { name: string; image: string }
}

export const fetchcommitbypostId = async (
  postId: string
): Promise<CommentWithUser[]> => {
    
  return prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
};
