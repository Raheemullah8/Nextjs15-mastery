import CommitForm from '@/components/commints/CommitForm';
import PostShow from '@/components/posts/PostShow';
import React from 'react'
interface ShowPageProps{
  params: Promise<{slug: string, id: string}>
}
const ShowPage = async ({ params }: ShowPageProps) => {
  const { slug, id } = (await params) ;
  return (
    <div className=' max-w-2xl mx-auto mt-5 p-6 bg-gray-600 rounded-2xl shadow-lg text-white'>
      <PostShow postid={id} />
      <h2 className='text-2xl font-semibold mt-5 mb-3'>Comments</h2>
      <CommitForm />
    </div>
  );
};
export default ShowPage;