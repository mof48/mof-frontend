import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import MemberSearchPanel from '@/components/AdminPanels/MemberSearchPanel';

const AdminMembers = () => {
  return (
    <AdminLayout>
      <div className="pt-12 px-6 max-w-6xl mx-auto">
        <MemberSearchPanel />
      </div>
    </AdminLayout>
  );
};

export default AdminMembers;
