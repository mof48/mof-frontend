import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-black border border-gold text-white p-6 rounded-xl w-full max-w-sm text-center shadow-2xl font-playfair">
        <h2 className="text-2xl font-bold text-gold mb-4">Confirm Logout</h2>
        <p className="mb-6 text-pink-200">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded border border-white hover:bg-white/10 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded bg-gold text-black font-semibold hover:bg-yellow-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
