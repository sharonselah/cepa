import { Leaf, Award, Building2, RefreshCw, User, Settings } from "lucide-react";
export const thematicAreas = [
    {
        title: "Energy",
        description: "The energy category tracks developments in renewable energy (solar, wind, hydro), grid infrastructure, and off-grid solutions.",
        icon: Settings,
        link: "/data/energy",
    },
    {
        title: "Climate Finance & Carbon Markets ",
        description: "Carbon Market sector covers Africa’s evolving carbon credit landscape, including carbon offset projects, policy frameworks, and trading mechanisms.",
        icon: Award,
        link: "/data/carbon-markets",
    },
    {
        title: "Nature",
        description: "The Nature thematic area will focus on conservation, restoration, and nature-based solutions that enhance climate resilience and biodiversity.",
        icon: Leaf,
        link: "/data/nature",
    },
    {
        title: "Green Mining and Manufacturing",
        description: "It covers the responsible extraction and processing of essential minerals for the green energy transition, including lithium, cobalt, & zinc.",
        icon: User,
        link: "/data/critical-minerals",
    },

    {
        title: "Sustainable Agriculture, Land Use, Water, & Oceans ",
        description: "Agriculture covers climate-smart agriculture practices, sustainable food production, soil conservation, and innovative financing for agribusinesses.",
        icon: Building2,
        link: "/data/agriculture",
    },
   
    {
        title: "Adaptation and Resilience ",
        description: "It will touch on climate and health, early warning systems, sustainable water management, drought resilience, and loss and damage.",
        icon: RefreshCw,
        link: "/data/adaptation-resilience",
    },
    {
        title: "Sustainable Infrastructure & Urbanization",
        description: "The sector looks at green building projects, climate-resilient cities, and innovations in transportation and housing.",
        icon: Building2,
        link:"/data/sustainable-infrastructure"
    },
];