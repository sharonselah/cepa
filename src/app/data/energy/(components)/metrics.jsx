'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import energyProductionImg from 'public/production.png';
import gridInfrastructureImg from 'public/grid.png';
import energyProjectsImg from 'public/projects.png';
import energyDemandImg from 'public/demand.png';
import energyFundingImg from 'public/funding.png';

const metricData = [
  { heading: 'Energy Production and Supply', image: energyProductionImg, path: 'production' },
  { heading: 'Grid Infrastructure', image: gridInfrastructureImg, path: 'grid' },
  { heading: 'Energy Projects', image: energyProjectsImg, path: 'projects' },
  { heading: 'Energy Demand', image: energyDemandImg, path: 'demand' },
  { heading: 'Energy Funding', image: energyFundingImg, path: 'funding' },
];

const Metrics = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the last part of the URL to determine the active metric
  const currentPath = pathname.split('/').pop();
  const initialActiveIndex = metricData.findIndex((metric) => metric.path === currentPath);
  const [activeMetric, setActiveMetric] = useState(initialActiveIndex !== -1 ? initialActiveIndex : 0);

  useEffect(() => {
    setActiveMetric(initialActiveIndex !== -1 ? initialActiveIndex : 0);
  }, [pathname]);

  const handleMetricClick = (index, path) => {
    setActiveMetric(index);
    router.push(`/data/energy/${path}`);
  };

  return (
    <>
    <div className="col-span-12 grid grid-cols-3 md:grid-cols-5 gap-4 p-4 md:p-8 md:py-4 bg-[#F1f1ef]">
      {metricData.map((metric, index) => (
        <div
          key={index}
          className={`flex flex-col items-center gap-4 cursor-pointer transition-all`}
          onClick={() => handleMetricClick(index, metric.path)}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
              activeMetric === index ? 'border-maroon-100 bg-maroon-100' : 'border-gray-400'
            }`}
          >
            <Image 
    src={metric.image} 
    alt={metric.heading} 
    className={`rounded-full object-cover w-[30px] h-[30px] transition-all ${
      activeMetric === index ? 'filter invert brightness-200' : ''
    }`} 
    width={30} 
    height={30} 
  />
          </div>
          <h4 className={`text-center text-sm font-semibold ${activeMetric == index ?'text-maroon-100': 'text-gray-800'}`}>{metric.heading}</h4>
        </div>
      ))}
    </div>
    </>
  );
};

export default Metrics;
