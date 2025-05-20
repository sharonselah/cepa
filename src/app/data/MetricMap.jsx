import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import AfricaMapBase from '@/components/AfricaMapBase';
import { countryEnergyProductionData } from '@/data/production/get-country-energy-production-data';

export default function MetricMap({ metricKey, label, unit, colorInterpolator }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(countryEnergyProductionData);
      setLoading(false);
    }, 300);
  }, []);

  const maxValue = Math.max(
    ...data.map((d) => (typeof d[metricKey] === 'number' ? d[metricKey] : 0))
  );

  const colorScale = (country) => {
    const value = country[metricKey];
    return typeof value === 'number' ? colorInterpolator(value / maxValue) : '#eee';
  };

  const renderTooltipContent = (countryData) => {
    const value = countryData[metricKey];
    return `
      <strong>${countryData.country}</strong><br>
      ${label}: ${value !== 'N/A' ? `${value} ${unit}` : 'N/A'}
    `;
  };

  const renderDetailsPanel = (countryData) => {
    const value = countryData[metricKey];
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-2">{countryData.country}</h3>
        <p className="text-lg mb-4">
          <span className="font-medium">{label}:</span>{' '}
          {value !== 'N/A' ? `${value} ${unit}` : 'N/A'}
        </p>
      </div>
    );
  };

  return (
    <>
      <h1 className="text-center text-[#006633] text-h4 mb-4">{label}</h1>
      <AfricaMapBase
        loading={loading}
        data={data}
        colorScale={colorScale}
        renderTooltipContent={renderTooltipContent}
        renderDetailsPanel={renderDetailsPanel}
        maxValue={maxValue}
        searchPlaceholder={`Search country by ${label.toLowerCase()}...`}
        legendTitle={`${label} (${unit})`}
        legendDomain={[0, maxValue]}
        legendColorScale={d3.scaleSequential()
          .domain([0, maxValue])
          .interpolator(colorInterpolator)}
      />
    </>
  );
}
