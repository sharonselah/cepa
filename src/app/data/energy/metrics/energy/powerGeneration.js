export const powerGenerationMetrics = [
    {
      title: 'General Data',
      items: [
       
        { key: 'electricityGeneration', label: 'Annual Electricity Generation'},
        { key: 'installedCapacity', label: 'Installed Capacity'},
        { key: 'capacityFactor', label: 'Average Capacity Factor'},
        { key: 'unutilizedPotential', label: 'Unutilized Potential'},
        { key: 'lcoe', label: 'Levelized Cost of Electricity'},
        { key: 'energyMixShare', label: 'Share of National Energy Mix'},
        { key: 'investmentVolume', label: 'Investment Volume'},
        { key: 'jobsCreated', label: 'Jobs Created'},
        { key: 'ghgAvoided', label: 'GHG Emissions Avoided'},
      ],
    },
    {
      title: 'Geothermal Energy',
      items: [
        { key: 'wellProductivity', label: 'Well Productivity'},
        { key: 'resourceTemp', label: 'Resource Temperature'},
        { key: 'heatEfficiency', label: 'Heat Extraction Efficiency' },
        { key: 'resourceCoverage', label: 'Resource Coverage'},
      ],
    },
    {
      title: 'Hydro Energy',
      items: [
        { key: 'reservoirCapacity', label: 'Reservoir Capacity'},
        { key: 'seasonalVar', label: 'Seasonal Generation Variability'},
      /*  { key: 'catchmentArea', label: 'Catchment Area'},
        { key: 'waterEfficiency', label: 'Water Use Efficiency'},
        { key: 'damSafety', label: 'Dam Safety Index'},*/
      ],
    },
    {
      title: 'Wind Energy',
      items: [
        { key: 'avgWindSpeed', label: 'Average Wind Speed'},
        { key: 'windLandUse', label: 'Land Area Utilization'},
      ],
    },
    {
      title: 'Solar Energy',
      items: [
        { key: 'solarIrradiation', label: 'Solar Irradiation' },
        { key: 'solarLandUse', label: 'Land Area Utilization' },
      ],
    },
  ];