import React, { useState } from 'react';

const PostComposer = ({ user }) => {
  const [content, setContent] = useState('');
  const [currentPersona, setCurrentPersona] = useState('admin');

  const handlePost = async () => {
    if (!content.trim()) return alert('Enter content');

    const token = localStorage.getItem('token');
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        identity: currentPersona,
      }),
    });

    alert('✅ Post published');
    setContent('');
  };

  return (
    <div className="bg-white/10 border border-gold p-6 rounded-xl text-white shadow-md max-w-2xl mx-auto mt-12">
      <div className="mb-4">
        <label className="text-sm text-white mr-3">Post as:</label>
        <select
          value={currentPersona}
          onChange={(e) => setCurrentPersona(e.target.value)}
          className="bg-black border border-gold text-gold px-3 py-1 rounded text-sm"
        >
          <option value="admin">Elite Admin</option>
          <option value="shadow">Shenzhen Nongke Orchid</option>
        </select>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="Write your message..."
        className="w-full p-3 rounded bg-black/30 border border-white/10 text-white placeholder-gray-400"
      />

      <button
        onClick={handlePost}
        className="mt-4 bg-gold text-black px-4 py-2 rounded hover:bg-yellow-400"
      >
        Post
      </button>
    </div>
  );
};

export default PostComposer;
