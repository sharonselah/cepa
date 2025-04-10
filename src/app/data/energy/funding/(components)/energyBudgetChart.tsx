'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import { useEnergyBudgetData } from '@/data/debtGDP/use-get-total-energy-budget';
import { totalEnergyBudget } from '@/data/debtGDP/fetch-total-energy-budget';
import { Skeleton } from '@components/skeleton';

type Props = {
    country: string;
  };
  
const EnergyBudgetChart = ({ country }: Props) => {
  const countryOptions = totalEnergyBudget.map((entry) => entry.country);
  const [selectedCountry, setSelectedCountry] = useState<string>(country);

  const { data, loading } = useEnergyBudgetData(selectedCountry);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md w-full md:w-2/3">
         <h2 className="text-lg font-semibold">Total Energy Sector Budget</h2>

      {loading ? (
        <Skeleton className="w-full h-[300px]" />
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data ?? []}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              label={{
                value: 'Budget (US$ millions)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="budget"
              stroke="#FF5733"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EnergyBudgetChart;
