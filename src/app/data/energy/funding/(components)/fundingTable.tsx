'use client';

import { useFundingData } from '@/data/debtGDP/use-get-funding';
import { Skeleton } from '@components/skeleton';
import { format } from 'date-fns';

type Props = {
  country: string;
};

const FundingTable = ({ country }: Props) => {
  const { data, loading } = useFundingData(country);

  if (loading || !data) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-md w-full overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Funding Commitments</h2>
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-maroon-100 text-xs font-semibold text-white">
          <tr>
            <th className="px-4 py-4">Entity</th>
            <th className="px-4 py-4">Funding Type</th>
            <th className="px-4 py-4">Total Pledged (USD M)</th>
            <th className="px-4 py-4">Total Honored (USD M)</th>
            <th className="px-4 py-4">Commitment Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-4 border">{entry.entity}</td>
              <td className="px-4 py-4 border">{entry.fundingType}</td>
              <td className="px-4 py-4 border">{entry.totalPledged}</td>
              <td className="px-4 py-4 border">{entry.totalHonored}</td>
              <td className="px-4 py-4 border">
                {format(new Date(entry.commitmentDate), 'MMM d, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FundingTable;
