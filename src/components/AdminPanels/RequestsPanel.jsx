import React from 'react';
import ContactRequestsTab from '@/components/ContactRequestsTab';

const RequestsPanel = () => {
  return (
    <div className="bg-white/10 border border-gold p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gold mb-4">📬 Contact Requests</h2>
      <ContactRequestsTab />
    </div>
  );
};

export default RequestsPanel;
