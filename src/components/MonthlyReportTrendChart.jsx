import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Local Mock Data ---
const mockTrendData = [
  { name: 'Jan', reports: 200 },
  { name: 'Feb', reports: 180 },
  { name: 'Mar', reports: 250 },
  { name: 'Apr', reports: 300 },
  { name: 'May', reports: 380 },
  { name: 'Jun', reports: 450 },
  { name: 'Jul', reports: 350 },
  { name: 'Aug', reports: 420 },
  { name: 'Sep', reports: 500 },
  { name: 'Oct', reports: 480 },
  { name: 'Nov', reports: 550 },
  { name: 'Dec', reports: 620 },
];

// --- Custom Tooltip (White theme) ---
const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white/95 backdrop-blur-sm border border-blue-200 rounded-lg shadow-xl font-sans text-xs">
        <p className="text-blue-600 mb-1">{`Month: ${label}`}</p>
        <p className="text-gray-800">{`Reports: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// --- Loading Indicator (White theme) ---
const LoadingIndicator = () => (
  <div className="flex justify-center items-center h-full min-h-[350px] text-blue-500 bg-gray-50">
    Loading Data...
  </div>
);


const MonthlyReportTrendChart = ({ data = mockTrendData, loading = false }) => {
  return (
    // CARD CONTAINER CHANGES:
    // Increased vertical margin to my-10 (40px) for greater separation.
    // Added a slightly thicker shadow (shadow-lg) to emphasize the card.
    // The border and auto horizontal margin (mx-auto) are already included.
    <div className="mx-auto my-10 max-w-4xl p-6 bg-white rounded-xl border border-gray-300 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        {/* STRUCTURAL CHANGE: Changed h2 to p as requested */}
        <p className="text-xl font-semibold text-gray-800">Monthly Report Trend</p>
        <span className="text-gray-500 text-sm border border-gray-300 py-1 px-3 rounded-md">Last 12 Months</span>
      </div>
      
      {/* Chart rendering area. Now includes horizontal padding (px-8) for margins. */}
      <div className="h-[350px] min-h-[350px] px-8"> 
        {loading ? <LoadingIndicator /> : (
          <ResponsiveContainer width="100%" height={350}>
            {/* Margins are now set internally to allow Y-axis labels space, but the 
                60px visual padding comes from the parent div's px-8 class. */}
            <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
              {/* Subtle Grid Lines */}
              <CartesianGrid vertical={false} stroke="#e0e0e0" strokeDasharray="3 3" />
              
              {/* X-Axis and Y-Axis with subtle colors */}
              <XAxis dataKey="name" stroke="#a0a0a0" tickLine={false} axisLine={false} />
              <YAxis dataKey="reports" stroke="#a0a0a0" tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              
              {/* Custom Tooltip */}
              <Tooltip content={<CustomLineTooltip />} />

              {/* Gradient Definitions for Line Color and Fill Area (Blue shades) */}
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={1}/> {/* Bright Blue start */}
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={1}/> {/* Indigo/Purple end */}
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              
              {/* The Line (using monotone for smooth curve) */}
              <Line 
                type="monotone" 
                dataKey="reports" 
                stroke="url(#colorGradient)" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#3b82f6', strokeWidth: 2 }}
              />
              {/* The Fill Area below the line */}
              <Line 
                type="monotone" 
                dataKey="reports" 
                stroke="none"
                fill="url(#areaGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MonthlyReportTrendChart;