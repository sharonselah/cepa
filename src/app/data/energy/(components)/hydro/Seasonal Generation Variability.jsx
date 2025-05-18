import MetricMap from '../../../MetricMap';
import * as d3 from 'd3';

const interpolateTeal = d3.interpolateRgb("#e0f7f9", "#00796b");



export default function SeasonalGenerationVariability() {
  return (
    <MetricMap
      metricKey="seasonalGenerationVariability"
      label="Seasonal Variability"
      unit="%"
      colorInterpolator={interpolateTeal}
    />
  );
}
/*
export default function CatchmentArea() {
    return (
      <MetricMap
        metricKey="catchmentArea"
        label="Catchment Area"
        unit="km²"
        colorInterpolator={interpolateTeal}
      />
    );
}

export default function WaterUseEfficiency() {
    return (
      <MetricMap
        metricKey="waterEfficiency"
        label="Water Use Efficiency"
        unit="kWh/m³"
        colorInterpolator={interpolateTeal}
      />
    );
}

export default function DamSafetyIndex() {
    return (
      <MetricMap
        metricKey="damSafety"
        label="Dam Safety Index"
        unit="DSI"
        colorInterpolator={interpolateTeal}
      />
    );
}*/


  
  
