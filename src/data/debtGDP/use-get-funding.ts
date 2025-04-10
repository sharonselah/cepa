'use client';

import { useState, useEffect } from 'react';
import { FundingEntry } from './types';
import { fundingData } from './fetch-funding';

export const useFundingData = (country: string) => {
  const [data, setData] = useState<FundingEntry[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const match = fundingData.find((entry) => entry.country === country);
    if (match) {
      setData(match.values);
    } else {
      setData([]);
    }
    setLoading(false);
  }, [country]);

  return { data, loading };
};
