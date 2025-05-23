import React, { useEffect, useState } from 'react';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-white text-sm">Loading posts...</p>;
  }

  return (
    <div className="mt-12 space-y-6 max-w-2xl mx-auto">
      {posts.length === 0 ? (
        <p className="text-gray-400 italic text-center">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white/10 p-5 rounded-xl border border-gold shadow">
            <div className="flex items-center gap-4 mb-3">
              <img
                src={post.avatar || '/default-avatar.png'}
                alt={post.displayName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gold">{post.displayName}</p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-white whitespace-pre-line">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostFeed;
