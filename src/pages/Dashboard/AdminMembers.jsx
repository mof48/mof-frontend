// src/pages/Dashboard/AdminMembers.jsx
import React, { useState } from 'react';
import MemberSearchPanel from '@/components/AdminPanels/MemberSearchPanel';
import ContactRequestsTab from '@/components/ContactRequestsTab';

const TABS = ['Search Members', 'Pending Requests'];

const AdminMembers = () => {
  const [activeTab, setActiveTab] = useState('Search Members');

  return (
    <div className="pt-12 px-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gold mb-6">👥 Admin Member Tools</h1>

      {/* Tab Select */}
      <div className="mb-6 flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm rounded-md transition font-semibold ${
              activeTab === tab
                ? 'bg-gold text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Panels */}
      {activeTab === 'Search Members' && <MemberSearchPanel />}
      {activeTab === 'Pending Requests' && <ContactRequestsTab />}
    </div>
  );
};

export default AdminMembers;
