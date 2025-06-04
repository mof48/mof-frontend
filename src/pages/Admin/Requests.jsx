import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import ContactRequestsTab from '@/components/ContactRequestsTab';

const AdminRequests = () => {
  return (
    <AdminLayout>
      <div className="pt-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gold mb-4">Pending Contact Requests</h2>
        <ContactRequestsTab />
      </div>
    </AdminLayout>
  );
};

export default AdminRequests;
