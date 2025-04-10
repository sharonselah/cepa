'use client'

import { useState, useEffect } from 'react';
import { MoodyRatingEntry } from "./types";
import { moodysRatingsData } from './fetch-moodys-rating';


export const useMoodysRatings = (country: string) => {
    const [data, setData] = useState<MoodyRatingEntry[] | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const match =  moodysRatingsData.find((entry) => entry.country === country);
      if (match) {
        setData(match.values);
      } else {
        setData([]);
      }
      setLoading(false);
    }, [country]);
  
    return { data, loading };
  };