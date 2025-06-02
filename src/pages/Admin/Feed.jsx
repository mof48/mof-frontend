import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import PostComposer from '@/components/PostComposer';
import PostFeed from '@/components/PostFeed';

const Feed = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <AdminLayout>
      <PostComposer user={user} />
      <PostFeed />
    </AdminLayout>
  );
};

export default Feed;
