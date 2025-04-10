import { CountryFundingData } from './types';

export const fundingData: CountryFundingData[] = [
  {
    country: 'Kenya',
    values: [
      {
        entity: 'AFDB',
        fundingType: 'Grant',
        totalPledged: 120,
        totalHonored: 100,
        commitmentDate: '2023-06-15',
      },
      {
        entity: 'World Bank',
        fundingType: 'Equity',
        totalPledged: 200,
        totalHonored: 180,
        commitmentDate: '2022-11-01',
      },
    ],
  },
  {
    country: 'Ghana',
    values: [
      {
        entity: 'CIFF',
        fundingType: 'Grant',
        totalPledged: 80,
        totalHonored: 60,
        commitmentDate: '2024-03-10',
      },
    ],
  },
];
