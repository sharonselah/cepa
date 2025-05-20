import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { powerGenerationMetrics } from './energy/powerGeneration';

const MetricDropdown = ({ selectedMetric, setSelectedMetric }) => {  
  const [openCategory, setOpenCategory] = useState(
    powerGenerationMetrics[0]?.title || null
  );

  const toggleCategory = (title) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  const handleSelect = (key) => {
    setSelectedMetric(key); 
  };

  return (
    <div className="flex flex-col gap-1 text-gray-600 rounded shadow-lg space-y-1 bg-white p-2">
      {powerGenerationMetrics.map((category) => (
        <div key={category.title} className="flex flex-col">
          <button
            className="px-4 py-2 text-left font-medium hover:bg-gray-50 rounded flex items-center justify-between"
            onClick={() => toggleCategory(category.title)}
          >
            <span>{category.title}</span>
            {openCategory === category.title ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {openCategory === category.title && (
            <div className="ml-2 border-l border-gray-200 pl-2">
              {category.items.map((item) => (
                <button
                  key={item.key}
                  className={`text-left py-2 px-6 text-sm font-medium w-full ${
                    selectedMetric === item.key 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white hover:border-b'
                  }`}
                  onClick={() => handleSelect(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricDropdown;