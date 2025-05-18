
import { useState, useEffect } from 'react';
import { countryEnergyProductionData} from './get-country-energy-production-data';
import { CountryEnergyProductionData } from './types';

export const useCountryEnergyProduction = () => {
  const [data, setData] = useState<CountryEnergyProductionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setData(countryEnergyProductionData);
      setLoading(false);
    }, 300);
  }, []);

  return { data, loading };
};
