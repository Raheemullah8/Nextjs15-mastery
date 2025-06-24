import PostList from "@/components/posts/PostList";
import { CreateTopicDialog } from "@/components/topics/CreateTopic";
import { PostWithData } from "@/lib/query/Posts";
import { fetchPost } from "@/lib/query/Posts";

export default async function Home() {
const posts:PostWithData[] = await fetchPost();

  return (
    <div>
      <div className="flex justify-between items-center p-5 mx-8 my-5">
        <div className="font-bold text-2xl">
          <h1>Home Page</h1>
        </div>
        <div>
          <CreateTopicDialog />
        </div>
      </div>

      <PostList posts={posts} />
    </div>
  );
}
