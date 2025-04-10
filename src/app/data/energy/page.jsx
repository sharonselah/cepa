'use client';

import { useState } from 'react';
import Metrics from '@components/metrics';
import Header from '@components/header';
import { cn } from '@/lib/utils';
import AfricaMapProduction from './(components)/production';
import AfricaMapCPC from './(components)/cpc';
import AfricaMapElectricityAccess from './(components)/electricityAccess';
import AfricaMapSurplusSupply from './(components)/surplusSupply';
import AfricaMapUnutilizedSolarPotential from './(components)/unutilizedSolarPotential';
import AfricaMapUnutilizedWindPotential from './(components)/unutilizedWindPotential';
import AfricaMapUnutilizedGeothermalPotential from './(components)/unutilizedGeothermalPotential';
//import AfricaMapUnutilizedHydroPotential from './(components)/unutilizedHydroPotential';
import AfricaMapRenewableEnergyMix from './(components)/renewableEnergyMix';
import Footer from '@components/footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Energy = () => {
  const [selectedMetric, setSelectedMetric] = useState('production');
  const [renewablesOpen, setRenewablesOpen] = useState(false);

  const renderMap = () => {
    switch (selectedMetric) {
      case 'production':
        return <AfricaMapProduction />;
      case 'cpc':
        return <AfricaMapCPC />;
      case 'electricityAccess':
        return <AfricaMapElectricityAccess />;
      case 'surplusSupply':
        return <AfricaMapSurplusSupply />;
      case 'unutilizedHydro':
        return <AfricaMapUnutilizedSolarPotential />;
      case 'unutilizedSolar':
        return <AfricaMapUnutilizedSolarPotential />;
      case 'unutilizedWind':
        return <AfricaMapUnutilizedWindPotential />;
      case 'unutilizedGeothermal':
        return <AfricaMapUnutilizedGeothermalPotential />;
      case 'renewableEnergyMix':
        return <AfricaMapRenewableEnergyMix />;
      default:
        return <AfricaMapCPC />;
    }
  };

  return (
    <>
      <div className="col-span-12 max-w-screen relative p-4 md:px-8 md:py-4 min-h-screen">
        <div className="relative flex justify-between items-center">
          <h2 className="text-h4 font-bold text-maroon-100">Energy Production and Supply</h2>
          <Header className={cn('top-0')} />
        </div>

        <div className="relative flex justify-center md:mt-12">
          <div className="absolute left-0 top-4 z-20">
            <Metrics />
          </div>

          {renderMap()}

          <div className="absolute right-0 top-4 flex flex-col gap-1 lg:min-w-72 text-gray-600 rounded shadow-lg space-y-1">
            <button
              className={cn(
                'text-left py-2 px-6 text-sm font-medium',
                selectedMetric === 'production' ? 'bg-maroon-100 text-white' : 'bg-white hover:border-b'
              )}
              onClick={() => setSelectedMetric('production')}
            >
              Total Electricity Production
            </button>

            <button
              className={cn(
                'text-left py-2 px-6 text-sm font-medium',
                selectedMetric === 'surplusSupply' ? 'bg-maroon-100 text-white' : 'bg-white hover:border-b'
              )}
              onClick={() => setSelectedMetric('surplusSupply')}
            >
              Peak Demand
            </button>

         {/*   <button
              className={cn(
                'text-left py-2 px-6 text-sm font-medium',
                selectedMetric === 'cpc' ? 'bg-maroon-100 text-white' : 'bg-white hover:border-b'
              )}
              onClick={() => setSelectedMetric('cpc')}
            >
              Cost Per Capacity
            </button>*/} 

            <button
              className={cn(
                'text-left py-2 px-6 text-sm font-medium',
                selectedMetric === 'electricityAccess' ? 'bg-maroon-100 text-white' : 'bg-white hover:border-b'
              )}
              onClick={() => setSelectedMetric('electricityAccess')}
            >
              Electricity Access Rate
            </button>

            <button
              className={cn(
                'text-left py-2 px-6 text-sm font-medium flex items-center justify-between',
                'bg-white hover:border-b'
              )}
              onClick={() => setRenewablesOpen(!renewablesOpen)}
            >
              <span>Renewable Energy Sources</span>
              {renewablesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {renewablesOpen && (
              <div className="flex flex-col space-y-1 pl-4">
                <button
                  className={cn(
                    'text-left py-2 px-6 text-sm font-medium',
                    selectedMetric === 'unutilizedHydro' ? 'bg-maroon-100 text-white' : 'bg-white hover:border-b'
                  )}
                  onClick={() => setSelectedMetric('unutilizedHydro')}
                >
                  Unutilized Hydro Potential
                </button>

                <button
                  className={cn(
                    'text-left py-2 px-6 text-sm font-medium',
                    selectedMetric === 'unutilizedSolar' ? 'bg-maroon-100 text-white' : 'bg-white hover:border-b'
                  )}
                  onClick={() => setSelectedMetric('unutilizedSolar')}
                >
                  Unutilized Solar Potential
                </button>

                <button
                  className={cn(
                    'text-left py-2 px-6 text-sm font-medium',
                    selectedMetric === 'unutilizedWind' ? 'bg-maroon-100 text-white' : 'bg-white hover:border-b'
                  )}
                  onClick={() => setSelectedMetric('unutilizedWind')}
                >
                  Unutilized Wind Potential
                </button>

                <button
                  className={cn(
                    'text-left py-2 px-6 text-sm font-medium',
                    selectedMetric === 'unutilizedGeothermal' ? 'bg-maroon-100 text-white' : 'bg-white hover:border-b'
                  )}
                  onClick={() => setSelectedMetric('unutilizedGeothermal')}
                >
                  Unutilized Geothermal Potential
                </button>
              </div>
            )}

            <button
              className={cn(
                'text-left py-2 px-6 text-sm font-medium',
                selectedMetric === 'renewableEnergyMix' ? 'bg-maroon-100 text-white' : 'bg-white hover:border-b'
              )}
              onClick={() => setSelectedMetric('renewableEnergyMix')}
            >
              Renewable Energy Mix
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Energy;
