'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useDebtGDPData } from '@/data/debtGDP/use-get-debtGDP-data';
import { Skeleton } from '@components/skeleton';

type Props = {
    country: string;
};

const DebtToGDPChart = ({ country }: Props) => {
    const { data, loading } = useDebtGDPData(country);

    return (
        <div className="bg-white p-4 shadow-md rounded-md w-full md:2/3">
            <h2 className="text-lg font-semibold mb-4">Debt to GDP Ratio</h2>

            {loading ? (
                <Skeleton className="w-full h-[300px]" />
            ) : (
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                        data={data ?? []}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis
                            label={{ value: 'Debt/GDP (%)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="debtRatio" fill="#822E00" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default DebtToGDPChart;
