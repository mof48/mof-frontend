import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import RequestsPanel from '@/components/AdminPanels/RequestsPanel';

const Requests = () => {
  return (
    <AdminLayout>
      <RequestsPanel />
    </AdminLayout>
  );
};

export default Requests;
