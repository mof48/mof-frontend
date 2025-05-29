import React, { useState } from 'react';

const PostComposer = ({ user }) => {
  const [content, setContent] = useState('');
  const [currentPersona, setCurrentPersona] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handlePost = async () => {
    if (!content.trim()) {
      setFeedback('❌ Please enter some content.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          identity: currentPersona, // ✅ pass persona toggle
        }),
      });

      if (!res.ok) throw new Error('Failed to post');

      setContent('');
      setFeedback('✅ Post published successfully.');
    } catch (err) {
      console.error(err);
      setFeedback('❌ Could not publish post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 border border-gold p-6 rounded-xl text-white shadow-md max-w-2xl mx-auto mt-12">
      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm text-white">Post as:</label>
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
        disabled={loading}
        className="mt-4 bg-gold text-black px-4 py-2 rounded hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Posting...' : 'Post'}
      </button>

      {feedback && (
        <p className={`mt-4 text-sm ${feedback.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default PostComposer;
