// pages/AnnualGeneration.jsx

import MetricMap from '../../../MetricMap';
import * as d3 from 'd3';

export default function AnnualGeneration() {
  return (
    <MetricMap
      metricKey="annualGenerationGWh"
      label="Annual Electricity Generation"
      unit="GWh"
      colorInterpolator={d3.interpolateBlues}
    />
  );
}
