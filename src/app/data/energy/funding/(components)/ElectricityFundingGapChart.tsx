'use client';

import { useElectricityFundingGap } from '@/data/debtGDP/use-get-elec-funding-gap';
import { Skeleton } from '@components/skeleton';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
} from 'recharts';

type Props = {
  country: string;
};

const COLORS = ['#800000', '#E5E5E5']; // maroon for achieved, gray for gap

const ElectricityFundingGapChart = ({ country }: Props) => {
  const { data, loading } = useElectricityFundingGap(country);

  if (loading || !data) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  const achieved = data.percentageAchieved;
  const gap = 100 - achieved;
  const chartData = [
    { name: 'Achieved', value: achieved },
    { name: 'Funding Gap', value: gap },
  ];



  return (
    <div className="bg-white p-4 shadow-md rounded-md w-full md:w-1/3">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Electricity Sector Funding Gap</h2>
        <p className="text-sm text-gray-500 mb-1">Based on 2025 projections</p>
        <p className="text-sm font-medium text-gray-700">
          Total Funding Needed: <span className="text-black">${data.totalNeeded.toLocaleString()}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="w-full md:w-3/4 h-[250px]">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={100}
        dataKey="value"
        nameKey="name"
        startAngle={90}
        endAngle={-270}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
        <Label
          value={`${gap}%`}
          position="center"
          fontSize="24px"
          fill="#000000"
          fontWeight="bold"
        />
      </Pie>
      <Tooltip
        formatter={(value: number, name: string) => [`${value}%`, name]}
      />
    </PieChart>
  </ResponsiveContainer>
</div>

        {/* Legend */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-[#800000]" />
            <span className="text-sm text-gray-700">Achieved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-[#E5E5E5]" />
            <span className="text-sm text-gray-700">Funding Gap</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricityFundingGapChart;
