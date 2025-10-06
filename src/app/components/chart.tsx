// File: components/Chart.tsx (FINAL CRASH-PROOF VERSION)

"use client";

import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Define the structure of the data our charts expect
interface ChartData {
  name: string;
  value: number;
}

interface ChartProps {
  type: 'bar' | 'line' | 'pie';
  data: any; // Hum AI se 'any' data expect karenge
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

export function AiChart({ type, data }: ChartProps) {
  // Safety check to ensure data is a valid array
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-center">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="font-semibold text-yellow-800">Visualization Unavailable</p>
          <p className="text-sm text-yellow-700">The AI could not generate a valid chart for this data.</p>
        </div>
      </div>
    );
  }

  const chartData = data as ChartData[];

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
            <YAxis />
            <Tooltip wrapperClassName="!bg-white !border-gray-300 rounded-lg shadow-lg" />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Value" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
            <YAxis />
            <Tooltip wrapperClassName="!bg-white !border-gray-300 rounded-lg shadow-lg" />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Value" strokeWidth={2} />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              // === YEH RAHA FIX ===
              // Humne (percent ?? 0) add kiya hai
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip wrapperClassName="!bg-white !border-gray-300 rounded-lg shadow-lg" />
            <Legend />
          </PieChart>
        );
      default:
        return <p>Unsupported chart type: {type}</p>;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      {renderChart()}
    </ResponsiveContainer>
  );
}