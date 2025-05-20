'use client';

import { useState } from 'react';
import Metrics from '@components/metrics';
import Header from '@components/header';
import { cn } from '@/lib/utils';
//original 
import AfricaElectricityProduction from './(components)/production'
import InstalledCapacity from './(components)/general/Installed Capacity';
import AnnualGeneration from './(components)/general/Annual Electricity Generation';
import AverageCapacityFactor from  './(components)/general/Average Capacity Factor';
import LCOE from './(components)/general/LCOE';
import UnutilizedPotential from './(components)/general/Unutilized Potential'; 
import JobsCreated from './(components)/general/Jobs Created'; 
import InvestmentVolume from './(components)/general/Investment Volume'; 
import GhgAvoided from './(components)/general/GHG Avoided'; 
import EnergyShareMix from './(components)/general/Energy Share Mix';
import AverageWindSpeed from './(components)/wind/Average Wind Speed';
import WindLandAreaUtilization from './(components)/wind/WindLand';
import SolarLandAreaUtilization from './(components)/solar/Solar Land';
import SolarIrradiation from './(components)/solar/Solar Irradiation';
//geothermal 
import HeatExtractionEfficiency from './(components)/geothermal/Heat Extraction Efficiency';
import ResourceCoverage from './(components)/geothermal/Resource Coverage';
import ResourceTemperature from './(components)/geothermal/Resource Temperature';
import WellProductivity from './(components)/geothermal/Well Productivity';
//hydro
import ResourceCapacity from './(components)/hydro/Reservoir Capacity';
import SeasonalGenerationVariability from './(components)/hydro/Seasonal Generation Variability';
/*import CatchmentArea from './(components)/hydro/Seasonal Generation Variability';
import WaterUseEfficiency from './(components)/hydro/Seasonal Generation Variability';
import DamSafetyIndex from './(components)/hydro/Seasonal Generation Variability';*/

import Footer from '@components/footer';
import MetricDropdown from "./metrics/metricDropDown";

const Energy = () => {
  const [selectedMetric, setSelectedMetric] = useState('electricityGeneration');

  const renderMap = () => {
    switch (selectedMetric) {
      case 'installedCapacity':
        return <InstalledCapacity />;
      case 'electricityGeneration':
        return <AfricaElectricityProduction />;
      case 'capacityFactor':
        return <AverageCapacityFactor  />;
      case 'energyMixShare':
        return <EnergyShareMix/>;
      case 'lcoe':
        return <LCOE/>;
      case 'unutilizedPotential':
        return <UnutilizedPotential/>;
      case 'investmentVolume':
        return <InvestmentVolume />;
      case 'jobsCreated':
        return <JobsCreated/>;
      case 'ghgAvoided':
        return <GhgAvoided/>;
      case 'avgWindSpeed':
          return <AverageWindSpeed/>;
      case 'windLandUse':
          return <WindLandAreaUtilization/>;
      case 'solarLandUse':
          return <SolarLandAreaUtilization/>;
      case 'solarIrradiation':
          return <SolarIrradiation/>;
      case 'reservoirCapacity':
          return <ResourceCapacity/>;
      case 'seasonalVar':
          return < SeasonalGenerationVariability/>
      case 'waterUseEfficiency':
          return <WaterUseEfficiency/>;
      case 'damSafetyIndex':
          return <DamSafetyIndex/>;
      case 'catchmentArea':
        return <CatchmentArea/>
      case 'resourceCoverage':
        return <ResourceCoverage/>;
      case 'wellProductivity':
        return <WellProductivity/>;
      case 'resourceTemperature':
        return <ResourceTemperature/>;
      case 'heatExtractionEfficiency':
        return <HeatExtractionEfficiency/>
        
      default:
        return <InstalledCapacity />;
    }
  };



  return (
    <>
      <div className="col-span-12 max-w-screen relative p-4 md:px-8 md:py-4 min-h-screen">
        <div className="relative flex justify-between items-center">
          <h2 className="text-h4 font-bold text-[#006633]">Energy Production</h2>
          <Header className={cn('top-0')} />
        </div>

        <div className="relative grid grid-cols-12 gap-4 md:mt-12 min-h-screen">

          <div className='col-span-2'>
            <Metrics />
          </div>

          <div className='col-span-8'>{renderMap()}</div>
          <div className='col-span-2'>
            <MetricDropdown
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
          />
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Energy;
