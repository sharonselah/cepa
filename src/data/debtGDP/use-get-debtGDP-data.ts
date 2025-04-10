'use client';

import { useState, useEffect } from "react";
import { DebtGDPEntry } from "./types";
import { debtGDPData } from "./fetch-debtGDP";

export const useDebtGDPData = (country: string) => {
  const [data, setData] = useState<DebtGDPEntry[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const countryData = debtGDPData.find(item => item.country.toLowerCase() === country.toLowerCase());
      setData(countryData ? countryData.values : null);
      setLoading(false);
    };

    fetchData();
  }, [country]);

  return { data, loading };
};
