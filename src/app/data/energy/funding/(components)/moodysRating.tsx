'use client';

import { useMoodysRatings } from '@/data/debtGDP/use-get-moodys-rating';
import { Skeleton } from '@components/skeleton';

type Props = {
  country: string;
};

const MoodysRatingsChart = ({ country }: Props) => {
  const { data, loading } = useMoodysRatings(country);

  if (loading) return <Skeleton className="w-full h-[150px]" />;
  if (!data || data.length === 0) return <p>No data available for {country}.</p>;

  // Get the latest entry by sorting by year
  const latest = [...data].sort((a, b) => parseInt(b.year) - parseInt(a.year))[0];

  return (
    <div className="bg-white p-4 shadow-md rounded-md md:w-1/3">
      <h2 className="text-lg font-semibold mb-4">
        Moodys Rating <span className="text-gray-500 text-base">(for {latest.year})</span>
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-[#eff6ff] text-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between gap-4">
          <p className="text-sm text-gray-600">Rating</p>
          <p className="text-xl font-bold">{latest.rating}</p>
        </div>
        <div className="bg-[#ffefef] text-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between gap-4">
          <p className="text-sm text-gray-600">Outlook</p>
          <p className="text-xl font-bold">{latest.outlook}</p>
        </div>
        <div className="bg-[rgba(251,220,142,0.8)] text-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between gap-4">
          <p className="text-sm text-gray-600">Downgrade Risk</p>
          <p className="text-xl font-bold">{latest.downgradeRisk}/100</p>
        </div>
      </div>
    </div>
  );
};

export default MoodysRatingsChart;
