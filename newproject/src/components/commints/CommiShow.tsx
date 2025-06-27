import { fetchcommitbypostId } from '@/lib/query/commints';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import CommitForm from './CommitForm';
import React from 'react';

interface CommiShowProps {
  postId: string;
  commit: string;
}

const CommiShow = async ({ postId, commit }: CommiShowProps) => {
  const commits = await fetchcommitbypostId(postId);
  const commite = commits.find((c) => c.id === commit);

  if (!commite) return <div>Comment not found</div>;

  const child = commits.filter((c) => c.parentId === commit);

  return (
    <div className="ml-4 border-l-2 border-gray-500 pl-4 my-4">
      <div className="flex items-start gap-3 mb-2">
        <Avatar className="w-10 h-10 rounded-full overflow-hidden">
          <AvatarImage
            src={commite.user.image || '/default-avatar.png'}
            alt={commite.user.name}
            className="w-full h-full object-cover"
          />
        </Avatar>
        <div className="bg-gray-700 p-3 rounded-xl shadow-md w-full">
          <p className="text-sm text-white font-semibold">{commite.user.name}</p>
          <p className="text-white mt-1">{commite.content}</p>
        </div>
      </div>

      {/* Inline reply form */}
      <div className="ml-12 mt-2">
        <CommitForm postId={postId} parentId={commite.id} startOpen={false} />
      </div>

      {/* Child comments */}
      <div className="mt-4 space-y-2">
        {child.map((c) => (
          <CommiShow key={c.id} postId={c.postId} commit={c.id} />
        ))}
      </div>
    </div>
  );
};

export default CommiShow;
