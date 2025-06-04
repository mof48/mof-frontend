import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import PostComposer from '@/components/PostComposer';
import PostFeed from '@/components/PostFeed';

const AdminFeed = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <AdminLayout>
      <div className="pt-12 px-6 max-w-4xl mx-auto">
        <PostComposer user={user} />
        <PostFeed />
      </div>
    </AdminLayout>
  );
};

export default AdminFeed;
