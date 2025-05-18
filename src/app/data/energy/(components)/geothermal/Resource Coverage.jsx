import MetricMap from '../../../MetricMap';
import * as d3 from 'd3';

const interpolateTeal = d3.interpolateRgb("#e0f7f9", "#00796b");

export default function ResourceCoverage() {
  return (
    <MetricMap
      metricKey="resourceCoverage"
      label="Resource Coverage"
      unit="°C"
      colorInterpolator={interpolateTeal}
    />
  );
}

