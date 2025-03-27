'use client';

import { useState } from 'react';
import Metrics from '@components/metrics';
import Header from '@components/header';
import { cn } from '@/lib/utils';
import AfricaMapProduction from './(components)/production';
import AfricaMapCPC from './(components)/cpc';
import AfricaMapElectricityAccess from './(components)/electricityAccess';
import AfricaMapSurplusSupply from './(components)/surplusSupply';
import AfricaMapUnutilizedPotential from './(components)/unutilizedPotential';
import AfricaMapRenewableEnergyMix from './(components)/renewableEnergyMix';

const metricOptions = [
    { key: 'production', label: 'Generation Capacity' },
    { key: 'cpc', label: 'CPC' },
    { key: 'electricityAccess', label: 'Electricity Access Rate' },
    { key: 'surplusSupply', label: 'Surplus Supply' },
    { key: 'unutilizedPotential', label: 'Unutilized Potential' },
    { key: 'renewableEnergyMix', label: 'Renewable Energy Mix' }
];

const Energy = () => {
    const [selectedMetric, setSelectedMetric] = useState('production');

    const renderMap = () => {
        switch (selectedMetric) {
            case 'cpc':
                return <AfricaMapCPC />;
            case 'electricityAccess':
                return <AfricaMapElectricityAccess />;
            case 'surplusSupply':
                return <AfricaMapSurplusSupply />;
            case 'unutilizedPotential':
                return <AfricaMapUnutilizedPotential />;
            case 'renewableEnergyMix':
                return <AfricaMapRenewableEnergyMix />;
            default:
                return <AfricaMapProduction />;
        }
    };

    return (
        <div className='col-span-12 max-w-screen relative p-6 md:p-8 md:py-6  min-h-screen'>
            <div className='relative flex justify-between items-center mb-2'>
                <h2 className='text-h3 font-bold'>Energy</h2>
                <Header className={cn('top-0')} />
            </div>




            <div className="relative flex justify-center ">
                <div className='absolute left-0 top-4'>
                    <Metrics />
                </div>

                {renderMap()}

                <div className="absolute right-0 top-4 flex flex-col gap-1 lg:max-h-[60vh] text-gray-600 rounded shadow-lg">
                    {metricOptions.map((metric) => (
                        <button
                            key={metric.key}
                            className={cn(
                                "text-left py-2 px-6 text-sm font-medium",
                                selectedMetric === metric.key ? "bg-maroon-100 text-white" : "bg-white hover:border-b"
                            )}
                            onClick={() => setSelectedMetric(metric.key)}
                        >
                            {metric.label}
                        </button>
                    ))}
                </div>

            </div>


        </div>
    );
};

export default Energy;