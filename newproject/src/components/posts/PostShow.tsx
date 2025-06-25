import { prisma } from '@/lib';
import React from 'react';

interface PostShowProps {
  postid: string;
}

const PostShow: React.FC<PostShowProps> = async ({ postid }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postid,
    },
  });

  if (!post) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Post not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {post.title}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4 italic">
        {post.content}
      </p>
    </div>
  );
};

export default PostShow;
