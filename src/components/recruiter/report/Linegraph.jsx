import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', Apppliedcandidates: 4000 },
  { name: 'Feb', Apppliedcandidates: 3000 },
  { name: 'Mar', Apppliedcandidates: 2000 },
  { name: 'April', Apppliedcandidates: 2780 },
  { name: 'May', Apppliedcandidates: 1890 },
  { name: 'June', Apppliedcandidates: 2390 },
  { name: 'July', Apppliedcandidates: 3490 },
];

export default function SingleLineChart() {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#000' }}>
      {/* Custom Legend as a Header */}
      <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
        <span style={{ color: '#6fcdcd' }}>● Appplied candidates</span>
      </div>

      {/* Line Chart */}
      <LineChart
        width={580}
        height={350}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#000000" />
        <YAxis stroke="#000000" />
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#000000' }}
          itemStyle={{ color: '#000000' }}
          labelStyle={{ color: '#000000' }}
        />
        <Line
          type="monotone"
          dataKey="Apppliedcandidates"
          stroke="#6fcdcd"
          strokeWidth={2}
          dot={{ stroke: '#6fcdcd', strokeWidth: 2 }}
        />
      </LineChart>
    </div>
  );
}
