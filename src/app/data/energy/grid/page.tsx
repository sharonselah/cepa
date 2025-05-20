'use client';

import { useState } from 'react';
import Metrics from '@components/metrics';
import { cn } from '@/lib/utils';
import AfricaMapTNC from './(components)/TNC.jsx';
import AfricaMapDNC from './(components)/DNC.jsx';
import AfricaMapLSD from './(components)/LSD.jsx';
import AfricaMapMOD from './(components)/MOD.jsx';
import AfricaMapSMD from './(components)/SMD.jsx';
import AfricaMapACE from './(components)/ACE.jsx';


const metricOptions = [
    { key: 'Transmission Network Coverage', label: 'Transmission Network Coverage' },
    { key: 'Distribution Network Coverage', label: 'Distribution Network Coverage' },
    { key: 'Average Cost of Electricity', label: 'Average Cost of Electricity' },
    { key: 'Smart Grid Deployment', label: 'Smart Grid Deployment' },
    { key: 'Load Shedding Data & Frequency', label: 'Load Shedding Data & Frequency' },
    { key: 'Mini-Grid & Off-Grid Deployments', label: 'Mini-Grid & Off-Grid Deployments ' },


];

const Grid = () => {
    const [selectedMetric, setSelectedMetric] = useState('Transmission Network Coverage');

    const renderMap = () => {
        switch (selectedMetric) {
            case 'Transmission Network Coverage':
                return <AfricaMapTNC />;
            case 'Distribution Network Coverage':
                return <AfricaMapDNC />;
            case 'Average Cost of Electricity':
                return <AfricaMapACE />;
            case 'Smart Grid Deployment':
                return <AfricaMapSMD />;
            case 'Load Shedding Data & Frequency':
                return <AfricaMapLSD />;
            case 'Mini-Grid & Off-Grid Deployments':
                return <AfricaMapMOD />;
            default:
                return <AfricaMapTNC />;
        }
    };

    return (
        <>
            <div className=' max-w-screen relative p-4 md:px-8 md:py-2  min-h-screen'>
              

                <div className="relative flex justify-center md:mt-12 ">
                    <div className='absolute left-0 top-4'>
                        <Metrics />
                    </div>

                    {renderMap()}

                    <div className="absolute right-0 top-4 flex flex-col gap-1 lg:min-w-72 text-gray-600 rounded shadow-lg space-y-4">
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
      
        </>
    );
};

export default Grid;