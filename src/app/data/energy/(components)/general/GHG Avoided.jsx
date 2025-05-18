import MetricMap from '../../../MetricMap';
import * as d3 from 'd3';

const interpolateTeal = d3.interpolateRgb("#e0f7f9", "#00796b");

export default function GhgAvoided() {
  return (
    <MetricMap
      metricKey="ghgAvoided"
      label="GHG Avoided"
      unit="tCO₂e"
      colorInterpolator={interpolateTeal}
    />
  );
}
