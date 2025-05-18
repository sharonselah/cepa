

export interface CountryEnergyProductionData {
    country: string;
    installedCapacityMW: number | 'N/A';
    annualGenerationGWh: number | 'N/A';
    averageCapacityFactor: number | 'N/A'; 
    unutilizedPotential: number | 'N/A';
    lcoe: number | 'N/A';
    nationalEnergyMix: number | 'N/A';
    investmentVolume: number | 'N/A';
    jobsCreated: number | 'N/A';
    ghgAvoided: number | 'N/A';
    //hydro
    reservoirCapacity: number | 'N/A';
    seasonalGenerationVariability: number | 'N/A';
    waterUseEfficiency: number | 'N/A';
    damSafetyIndex: number | 'N/A';
    catchmentArea: number | 'N/A';
    //wind
    avgWindSpeed: number | 'N/A';
    windLandAreaUtilization: number | 'N/A';
    //solar 
    solarIrradiation: number | 'N/A';
    solarLandAreaUtilization: number | 'N/A';
    //geothermal 
    resourceCoverage: number | 'N/A';
    wellProductivity: number | 'N/A';
    resourceTemperature: number | 'N/A';
    heatExtractionEfficiency: number | 'N/A';
  }

  

  export interface CountryDemandData {
    country: string;


  }
  