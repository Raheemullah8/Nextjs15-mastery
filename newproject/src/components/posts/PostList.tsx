"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { PostWithData } from "@/lib/query/Posts";


type PostListProps = {
  posts: PostWithData[];
};

function PostList({ posts }: PostListProps) {
  if (!posts.length) return <p>No posts found.</p>;

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {posts.map((post) => (
        <Card key={post.id} className="shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <h2 className="text-xl font-bold">{post.title}</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{post.content}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline">Slug: {post.topic.slug}</Badge>
              {post.user && <Badge variant="outline">By: {post.user.name}</Badge>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-gray-500">
            <span>{post._count.comments} Comments</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default PostList;
