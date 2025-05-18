import MetricMap from '../../../MetricMap';
import * as d3 from 'd3';

const interpolateTeal = d3.interpolateRgb("#e0f7f9", "#00796b");

export default function HeatExtractionEfficiency() {
  return (
    <MetricMap
      metricKey="heatExtractionEfficiency"
      label="Heat Extraction Efficiency"
      unit="%"
      colorInterpolator={interpolateTeal}
    />
  );
}
