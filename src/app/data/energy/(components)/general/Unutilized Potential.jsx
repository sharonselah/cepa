// pages/AnnualGeneration.jsx

import MetricMap from '../../../MetricMap';
import * as d3 from 'd3';

export default function UnutilizedPotential() {
  return (
    <MetricMap
      metricKey="unutilizedPotential"
      label="Unutilized Potential"
      unit="GWh"
      colorInterpolator={d3.interpolateBlues}
    />
  );
}
