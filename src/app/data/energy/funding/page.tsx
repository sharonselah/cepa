'use client';

import { useState } from 'react';
import Metrics from '@components/metrics';
import Header from '@components/header';
import Footer from '@components/footer';
import { cn } from '@/lib/utils';
import DebtToGDPChart from './(components)/DebtToGDPChart';
import EnergyBudgetChart from './(components)/energyBudgetChart';
import { totalEnergyBudget } from '@/data/debtGDP/fetch-total-energy-budget';
import MoodysRatingsChart from './(components)/moodysRating';
import ElectricityFundingGapChart from './(components)/ElectricityFundingGapChart';
import FundingTable from './(components)/fundingTable';

const EnergyFunding = () => {
  const [selectedCountry, setSelectedCountry] = useState('Kenya');

  const countryOptions = totalEnergyBudget.map(entry => entry.country);

  return (
    <>
      <div className="col-span-12 max-w-screen relative md:px-6 min-h-screen">
        <div className="col-span-12 md:py-6 mb-6 ">
          <div className="relative flex justify-between items-center">
            <h2 className="text-h3 font-bold text-maroon-100">Energy Funding</h2>
            <Header className={cn('top-0')} />
          </div>
        </div>

        <Metrics className ={cn('md:flex-row justify-between bg-white border-b-8 border-gray-500')}/>

        {/* Global Search */}
        <div className='my-2 flex justify-between items-center'>
          <h1 className='px-2 md:px-4 text-h3 text-maroon-100 capitalize'>
            {selectedCountry}
          </h1>
          <div className='flex gap-3 items-center'>
        
        <label htmlFor="country" className="block font-medium text-sm">
            Select a Country
          </label>
        <div className="min-w-48">
         
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="min-w-48 border border-gray-300 rounded-lg p-2 text-sm"
          >
            {countryOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        </div>
        </div>

        <div className='py-4 w-full flex flex-col md:flex-row gap-3'>
          <DebtToGDPChart country={selectedCountry} />
          <MoodysRatingsChart country={selectedCountry} />
        </div>

        <div className='py-4 w-full flex flex-col md:flex-row gap-3'>
          <ElectricityFundingGapChart country={selectedCountry} />
          <EnergyBudgetChart country={selectedCountry} />
        </div>



        <FundingTable country={selectedCountry} />

      </div>

      <Footer />
    </>
  );
};

export default EnergyFunding;
