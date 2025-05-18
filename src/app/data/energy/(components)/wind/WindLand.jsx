import MetricMap from '../../../MetricMap';
import * as d3 from 'd3';

const interpolateTeal = d3.interpolateRgb("#e0f7f9", "#00796b");


export default function WindLandAreaUtilization() {
    return (
      <MetricMap
        metricKey="windLandAreaUtilization"
        label="Land Area Utilization"
        unit="MW/km²"
        colorInterpolator={interpolateTeal}
      />
    );
  }
  
