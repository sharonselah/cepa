import MetricMap from '../../../MetricMap';
import * as d3 from 'd3';



export default function InstalledCapacity() {
  return (
    <MetricMap
      metricKey="installedCapacityMW"
      label="Installed Capacity"
      unit="MW"
      colorInterpolator={d3.interpolateReds}
    />
  );
}
