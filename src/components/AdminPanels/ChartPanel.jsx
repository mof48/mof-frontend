import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const ChartPanel = ({ data, range, onRangeChange }) => {
  return (
    <div className="bg-white/10 border border-gold rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gold">📈 Signups & Revenue</h2>
        <div className="flex gap-4">
          <select
            value={range}
            onChange={(e) => onRangeChange(e.target.value)}
            className="bg-black border border-white/20 text-white px-3 py-1 rounded-md text-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {data?.length === 0 ? (
        <p className="text-sm text-rose-200 italic">No data available for this range.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="signups" stroke="#fbb6ce" name="Signups" />
            <Line type="monotone" dataKey="revenue" stroke="#FFD700" name="Revenue" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartPanel;
