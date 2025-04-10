
export type ElectricityProduction = {
    country: string;
    totalProductionGWh: number;
    sources: {
      geothermal?: number; // percent
      hydro?: number;
      oil?: number;
      wind?: number;
      solar?: number;
      biofuels?:number; 
      coal?: number;
      natural_gas?:number;
      nuclear?:number;
    };
  };
  