
import { CreatePost } from "@/components/posts/CreatePost";
import PostList from "@/components/posts/PostList";
import { fetchPostByTopic, PostWithData } from "@/lib/query/Posts";


interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const posts: PostWithData[] = await fetchPostByTopic(slug);

  return (
    <div>
      <div className="flex justify-around items-center bg-gray-100 py-2 w-full mb-5">
        <h1 className="text-[20px] font-semibold">Topic: {slug}</h1>
        <CreatePost slug={slug} />
      </div>
  
      <PostList posts={posts} />
      
    </div>
  );
};

export default Page;
