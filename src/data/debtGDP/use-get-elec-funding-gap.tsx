'use client';

import { useEffect, useState } from 'react';
import { ElectricityFundingGap } from './types';
import { electricityFundingGapData } from './fetch-elec-funding-gap';

export const useElectricityFundingGap = (country: string) => {
  const [data, setData] = useState<ElectricityFundingGap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const entry = electricityFundingGapData.find(
      (item) => item.country === country
    );
    setData(entry ?? null);
    setLoading(false);
  }, [country]);

  return { data, loading };
};
