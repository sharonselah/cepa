import { CountryMoodyRatings } from "./types";

export const moodysRatingsData: CountryMoodyRatings[] = [
    {
      country: 'Kenya',
      values: [
        { year: '2018', rating: 'B2', outlook: 'Stable' },
        { year: '2019', rating: 'B2', outlook: 'Negative' },
        { year: '2020', rating: 'B3', outlook: 'Negative' },
        { year: '2021', rating: 'B3', outlook: 'Stable' },
        { year: '2022', rating: 'B3', outlook: 'Stable', downgradeRisk: 10 },
      ],
    },
    {
      country: 'Ghana',
      values: [
        { year: '2018', rating: 'B3', outlook: 'Positive' },
        { year: '2019', rating: 'B3', outlook: 'Stable' },
        { year: '2020', rating: 'Caa1', outlook: 'Negative' },
        { year: '2021', rating: 'Ca', outlook: 'Stable', downgradeRisk: 40 },
      ],
    },
    {
        country: 'Nigeria',
        values: [
          { year: '2018', rating: 'B3', outlook: 'Positive' },
          { year: '2019', rating: 'Ba3', outlook: 'Stable' },
          { year: '2020', rating: 'Caa1', outlook: 'Negative' },
          { year: '2021', rating: 'Ca', outlook: 'Negative' , downgradeRisk: 90},
        ],
      },
  ];
  