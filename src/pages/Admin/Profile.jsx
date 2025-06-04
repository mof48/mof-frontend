import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProfilePanel from '@/components/AdminPanels/ProfilePanel';

const AdminProfile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <AdminLayout>
      <div className="pt-12 px-6 max-w-3xl mx-auto">
        <ProfilePanel user={user} />
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
