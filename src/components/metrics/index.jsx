'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import energyProductionImg from 'public/production.png';
import gridInfrastructureImg from 'public/grid.png';
import energyProjectsImg from 'public/projects.png';
import energyDemandImg from 'public/demand.png';
import energyFundingImg from 'public/funding.png';
import { cn } from '@/lib/utils';

const metricData = [
  { heading: 'Energy Production', image: energyProductionImg, path: '' },
  { heading: 'Energy Demand', image: energyDemandImg, path: 'demand' },
  { heading: 'Distribution & Transmission', image: gridInfrastructureImg, path: 'grid' },
  { heading: 'Energy Funding', image: energyFundingImg, path: 'funding' },
  { heading: 'Energy Projects', image: energyProjectsImg, path: 'projects' },
  
  { heading: 'Energy Efficiency', image: energyProjectsImg, path: 'projects' },
  { heading: 'Clean Cooking', image: energyProjectsImg, path: 'projects' },
  { heading: 'Energy Policy', image: energyProjectsImg, path: 'projects' },
];

const Metrics = ({ className = '' }) => {
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
    <div className={cn("flex md:flex-col gap-4 p-4 md:p-8 md:py-4 bg-gray-100 z-20", className)}>
      {metricData.map((metric, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-4 cursor-pointer transition-all"
          onClick={() => handleMetricClick(index, metric.path)}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center border-2",
              activeMetric === index
                ? "bg-green-900 border-green-900"
                : "bg-gray-500 border-gray-500"
            )}
          >
            <Image
              src={metric.image}
              alt={metric.heading}
              className={cn(
                "rounded-full object-cover w-[20px] h-[20px] transition-all",
                "invert brightness-200"
              )}
              width={20}
              height={20}
            />
          </div>

          <h4 className={cn("text-center text-sm font-semibold", activeMetric === index ? "text-[#006633]" : "text-gray-800")}>
            {metric.heading}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Metrics;