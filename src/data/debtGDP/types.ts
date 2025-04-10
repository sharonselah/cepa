export interface EnergyBudgetEntry {
    year: string;
    budget: number;
  }
  
  export interface CountryEnergyBudget {
    country: string;
    values: EnergyBudgetEntry[];
  }

  export interface DebtGDPEntry {
    year: string;
    debtRatio: number;
  }
  
  export interface CountryDebtGDP {
    country: string;
    values: DebtGDPEntry[];
  }
  
  //Moody's Rating 
  export interface MoodyRatingEntry {
    year: string;
    rating: string;          // e.g., "B2", "Ba3", "A1"
    outlook?: string;        // e.g., "Stable", "Negative", "Positive"
    downgradeRisk?: number;  // optional: numeric scale, e.g., 0-100 risk of downgrade
  }
  
  export interface CountryMoodyRatings {
    country: string;
    values: MoodyRatingEntry[];
  }
  
  //energy funding gap 
  export interface ElectricityFundingGap {
    country: string;
    totalNeeded: number; // in USD millions
    percentageAchieved: number; // percentage (0-100)
  }

  //funding commitments 
  export interface FundingEntry {
    entity: string;
    fundingType: string;
    totalPledged: number; 
    totalHonored: number; 
    commitmentDate: string; // ISO string or formatted date
  }
  
  export interface CountryFundingData {
    country: string;
    values: FundingEntry[];
  }
  
  
