import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const FeedPanel = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchPosts = () => {
    fetch('https://api.mofwomen.com/api/posts', { headers })
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  };

  const handlePost = () => {
    if (!message.trim()) return;
    toast.loading('Posting...');
    fetch('https://api.mofwomen.com/api/posts', {
      method: 'POST',
      headers,
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.dismiss();
        toast.success('Posted!');
        setMessage('');
        fetchPosts();
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Failed to post');
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-white/5 border border-gold rounded-xl p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gold">Post an Update</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        placeholder="Write a message..."
        className="w-full px-4 py-3 rounded bg-black border border-white/20 text-white"
      />

      <button
        onClick={handlePost}
        className="bg-gold hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded"
      >
        Post
      </button>

      <div>
        <h3 className="text-md font-semibold text-rose-200 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {posts.map((p) => (
            <div
              key={p._id}
              className="bg-white/10 border border-white/20 rounded-lg p-4"
            >
              <div className="text-sm text-gold font-semibold mb-1">
                {p.author?.name || 'Unknown'}
              </div>
              <div className="text-white">{p.message}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(p.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPanel;
