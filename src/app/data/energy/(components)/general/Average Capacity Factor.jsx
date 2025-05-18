import MetricMap from '../../../MetricMap';
import * as d3 from 'd3';

export default function AverageCapacityFactor() {
  return (
    <MetricMap
      metricKey="averageCapacityFactor"
      label="Average Capacity Factor"
      unit="%"
      colorInterpolator={d3.interpolateGreens}
    />
  );
}
