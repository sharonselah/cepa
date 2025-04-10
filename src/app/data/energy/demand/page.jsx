'use client';

import { useState } from 'react';
import Metrics from '@components/metrics';
import Header from '@components/header';
import { cn } from '@/lib/utils';
import Footer from '@components/footer';
import AfricaMapAD from './(components)/AD.jsx';
import AfricaMapLF from './(components)/LF.jsx';
import AfricaMapIED from './(components)/IED.jsx';
import AfricaMapTSD from './(components)/TED.jsx';
import AfricaMapRED from './(components)/RED.jsx';


const metricOptions = [
    { key: "averageDemand", label: "Average Demand" },
  { key: "loadFactor", label: "Load Factor" },
  { key: "industrialEnergyDemand", label: "Industrial Demand" },
  { key: "residentialEnergyDemand", label: "Residential Demand" },
  { key: "transportSectorDemand", label: "Transport Demand" },
];

const Demand = () => {
    const [selectedMetric, setSelectedMetric] = useState('averageDemand');

    const renderMap = () => {
        switch (selectedMetric) {
            case 'averageDemand':
                return <AfricaMapAD />;
            case 'loadFactor':
                return <AfricaMapLF />;
            case 'industrialEnergyDemand':
                return <AfricaMapIED/>;
            case 'residentialEnergyDemand':
                return <AfricaMapRED/>;
            case 'transportSectorDemand':
                return <AfricaMapTSD/>;
            default:
                return <AfricaMapAD/>;
        }
    };

    return (
        <>
            <div className='col-span-12 max-w-screen relative p-4 md:px-8 md:py-2  min-h-screen'>
                <div className='relative flex justify-between items-center'>
                <h2 className="text-h4 font-bold text-maroon-100">Energy Demand</h2>
                    <Header className={cn('top-0')} />
                </div>

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
            <Footer />
        </>
    );
};

export default Demand;