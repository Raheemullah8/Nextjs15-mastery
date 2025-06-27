import React from 'react';
import CommiShow from './CommiShow';
import { fetchcommitbypostId } from '@/lib/query/commints';

interface CommitListProps {
  postId: string;
}

const CommitList = async ({ postId }: CommitListProps) => {
  const commits = await fetchcommitbypostId(postId);
  const topLevel = commits.filter((c) => c.parentId === null);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">All Comments</h2>
      {topLevel.map((commit) => (
        <CommiShow key={commit.id} postId={postId} commit={commit.id} />
      ))}
    </div>
  );
};

export default CommitList;
