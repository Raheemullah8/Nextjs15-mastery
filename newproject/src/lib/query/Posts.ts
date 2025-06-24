import type { Post } from "@prisma/client";
import { prisma } from "..";


export interface PostWithData extends Post {
  topic: { slug: string };
  user?: { name: string };
  _count: { comments: number };
}

export const fetchPostByTopic = async (
  slug: string
): Promise<PostWithData[]> => {
  return prisma.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};
export const fetchPost = async ():Promise<PostWithData[]> =>{
    return prisma.post.findMany({
       orderBy:{
        comments:{_count: "desc"}
       },
         include:{
          topic: {select: {slug: true}},
          user: {select: {name: true}},
          _count: {select: {comments: true}}
         },
         take:5
    })

}
