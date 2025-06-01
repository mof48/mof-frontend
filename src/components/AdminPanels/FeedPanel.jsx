import React from 'react';
import PostComposer from '@/components/PostComposer';
import PostFeed from '@/components/PostFeed';

const FeedPanel = ({ user }) => {
  return (
    <>
      <PostComposer user={user} />
      <PostFeed />
    </>
  );
};

export default FeedPanel;
