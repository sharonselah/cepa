
import { useState, useEffect } from 'react';
import { electricityAccessRates } from './get-elec-access-rate';
import { ElectricityAccessRate } from './types';

export const useElectricityAccessRate = () => {
  const [data, setData] = useState<ElectricityAccessRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setData(electricityAccessRates);
      setLoading(false);
    }, 300);
  }, []);

  return { data, loading };
};
