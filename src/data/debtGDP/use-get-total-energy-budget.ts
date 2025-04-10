// use-get-energy-budget.ts
'use client';

import { useState, useEffect } from 'react';
import { EnergyBudgetEntry } from './types';
import { totalEnergyBudget } from './fetch-total-energy-budget';

export const useEnergyBudgetData = (country: string) => {
  const [data, setData] = useState<EnergyBudgetEntry[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const countryData = totalEnergyBudget.find(
        (item) => item.country.toLowerCase() === country.toLowerCase()
      );
      setData(countryData ? countryData.values : null);
      setLoading(false);
    };

    fetchData();
  }, [country]);

  return { data, loading };
};
