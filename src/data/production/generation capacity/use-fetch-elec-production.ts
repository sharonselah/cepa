
import { useState, useEffect } from 'react';
import { electricityProductionData } from './get-elec-production';
import { ElectricityProduction } from './types';

export const useElectricityProduction = () => {
  const [data, setData] = useState<ElectricityProduction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setData(electricityProductionData);
      setLoading(false);
    }, 300);
  }, []);

  return { data, loading };
};
