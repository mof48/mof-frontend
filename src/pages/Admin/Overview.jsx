import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import StatsPanel from '@/components/AdminPanels/StatsPanel';
import ChartPanel from '@/components/AdminPanels/ChartPanel';

const Overview = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState('7d');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    fetch('https://api.mofwomen.com/api/admin/stats', { headers })
      .then((res) => res.json())
      .then(setStats);

    fetch(`https://api.mofwomen.com/api/admin/chart-data?range=${range}`, { headers })
      .then((res) => res.json())
      .then(setChartData);
  }, [range]);

  return (
    <AdminLayout>
      <StatsPanel stats={stats} />
      <ChartPanel data={chartData} range={range} onRangeChange={setRange} />
    </AdminLayout>
  );
};

export default Overview;
