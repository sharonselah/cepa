import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import AfricaMapBase from '@/components/AfricaMapBase';
import { electricityAccessRates } from '@/data/production/electricity access rate/get-elec-access-rate';

// Custom tooltip component for the pie chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
        <p className="font-semibold capitalize">{payload[0].name}</p>
        <p>{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

// Electricity access data hook using real data
const useElectricityAccessRate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setData(electricityAccessRates);
      setLoading(false);
    }, 300);
  }, []);

  return { data, loading };
};

export default function AfricaMapElectricityAccessRate() {
  const { data, loading } = useElectricityAccessRate();

  // Color scale for access rates (red gradient)
  const colorScale = (country) => {
    return d3.interpolateReds(country.accessRate / 100);
  };

  const maxProduction = 100;

  // Tooltip content renderer
  const renderTooltipContent = (countryData) => {
    return `
      <strong>${countryData.country}</strong><br>
      Access Rate: ${countryData.accessRate}%<br>
      Without Access: ${countryData.populationWithoutAccess} million
    `;
  };

  // Details panel renderer
  const renderDetailsPanel = (countryData) => {
    const pieData = [
      { name: 'With Access', value: countryData.accessRate, color: '#0088FE' },
      { name: 'Without Access', value: 100 - countryData.accessRate, color: '#FF8042' }
    ];

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-2">{countryData.country}</h3>
        <p className="text-lg mb-4">
          <span className="font-medium">Access Rate:</span> {countryData.accessRate}%
        </p>
        <p className="text-lg mb-4">
          <span className="font-medium">Population Without Access:</span> {countryData.populationWithoutAccess} million
        </p>

        <h4 className="text-xl font-semibold mb-3">Access Distribution</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <AfricaMapBase
      loading={loading}
      data={data}
      colorScale={colorScale}
      renderTooltipContent={renderTooltipContent}
      renderDetailsPanel={renderDetailsPanel}
      maxValue={maxProduction}
      searchPlaceholder="Search country access rate..."
      legendTitle="Electricity Access Rate (%)"
      legendDomain={[0, 100]}
      legendColorScale={d3.scaleSequential()
        .domain([0, 100])
        .interpolator(d3.interpolateReds)}

    />
  );
}