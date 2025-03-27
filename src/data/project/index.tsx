export type ProjectStage =
  | "Concept Stage"
  | "Implementation Stage"
  | "Planning Stage"
  | "Funding Stage"
  | "Operational Stage";

export interface ProjectCardProps {
  image?: string;
  stage: ProjectStage;
  location: string;
  name: string;
  sector: string;
  description: string;
  capex: number;
  targetRaise: number;
  equity: "Target Funding" | "Target Financing";
  approval: boolean;
}


export const projects: ProjectCardProps[] = [
    {
      image: "/solar.jfif",
      stage: "Implementation Stage",
      location: "Kilifi, Kenya",
      name: "Kilifi Solar Project",
      sector: "Renewable Energy",
      description: "A 50MW solar farm aimed at increasing clean energy access in rural Kilifi County.",
      capex: 50000000,
      targetRaise: 20000000,
      equity: "Target Funding",
      approval: true,
    },
    {
      image: "/wind.jfif",
      stage: "Concept Stage",
      location: "Arusha, Tanzania",
      name: "Arusha Wind Power Project",
      sector: "Wind Energy",
      description: "A feasibility study for a 30MW wind farm to support Tanzania's energy mix diversification.",
      capex: 30000000,
      targetRaise: 15000000,
      equity: "Target Financing",
      approval: false,
    },
    {
      image: "/solar.jfif",
      stage: "Funding Stage",
      location: "Jinja, Uganda",
      name: "Jinja Hydropower Plant",
      sector: "Hydropower",
      description: "A 100MW hydropower project leveraging the Nile River for sustainable electricity generation.",
      capex: 80000000,
      targetRaise: 35000000,
      equity: "Target Funding",
      approval: true,
    },
    {
      image: "/wind.jfif",
      stage: "Operational Stage",
      location: "Lagos, Nigeria",
      name: "Lagos Biogas Facility",
      sector: "Bioenergy",
      description: "A waste-to-energy biogas facility reducing landfill waste while generating clean power.",
      capex: 25000000,
      targetRaise: 10000000,
      equity: "Target Financing",
      approval: true,
    },
  ];
  