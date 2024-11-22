import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'January', Apppliedcandidates: 4000, Selectedcandidates: 2400, Rejectedcandidates: 1000 },
  { name: 'February', Apppliedcandidates: 3000, Selectedcandidates: 1398, Rejectedcandidates: 800 },
  { name: 'March', Apppliedcandidates: 2000, Selectedcandidates: 9800, Rejectedcandidates: 1200 },
  { name: 'April', Apppliedcandidates: 2780, Selectedcandidates: 3908, Rejectedcandidates: 900 },
  { name: 'May', Apppliedcandidates: 1890, Selectedcandidates: 4800, Rejectedcandidates: 500 },
  { name: 'June', Apppliedcandidates: 2390, Selectedcandidates: 3800, Rejectedcandidates: 700 },
  { name: 'July', Apppliedcandidates: 3490, Selectedcandidates: 4300, Rejectedcandidates: 400 },
];

export default function CustomBarChart() {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#000' }}>
      {/* Manual Legend as a Header */}
      <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
        <span style={{ marginRight: '20px', color: '#6fcdcd' }}>■ Appplied candidates</span>
        <span style={{ marginRight: '20px', color: '#ffb66e' }}>■ Selected candidates</span>
        <span style={{ color: '#ff7793' }}>■ Rejected candidates</span>
      </div>

      {/* Render the chart */}
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#000000" />
        <YAxis stroke="#000000" />
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#000000' }}
          itemStyle={{ color: '#000000' }}
          labelStyle={{ color: '#000000' }}
        />
        <Bar dataKey="Apppliedcandidates" fill="#dbf2f2" stroke="#6fcdcd" strokeWidth={2} />
        <Bar dataKey="Selectedcandidates" fill="#ffecd9" stroke="#ffb66e" strokeWidth={2} />
        <Bar dataKey="Rejectedcandidates" fill="#ffe0e6" stroke="#ff7793" strokeWidth={2} />
      </BarChart>
    </div>
  );
}





// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   'Page A',
//   'Page B',
//   'Page C',
//   'Page D',
//   'Page E',
//   'Page F',
//   'Page G',
// ];

// const theme = createTheme({
//   components: {
//     MuiBarChart: {
//       styleOverrides: {
//         root: {
//           '--mui-bar-chart-bar-color': '#dbf2f2', // Bar color
//           '--mui-bar-chart-bar-border-color': '#4bc0c0', // Border color
//           '--mui-bar-chart-bar-border-width': '2px', // Border width
//         },
//       },
//     },
//   },
// });

// export default function SimpleBarChart() {
//     return (
//       <div style={{ border: '1px solid #4bc0c0', backgroundColor: '#dbf2f2', padding: '10px' }}>
//         <BarChart
//           width={500}
//           height={300}
//           series={[
//             {
//               data: pData,
//               label: 'pv',
//               id: 'pvId',
//             },
//             {
//               data: uData,
//               label: 'uv',
//               id: 'uvId',
//             },
//           ]}
//           xAxis={[{ data: xLabels, scaleType: 'band' }]}
//         />
//       </div>
//     );
//   }
  