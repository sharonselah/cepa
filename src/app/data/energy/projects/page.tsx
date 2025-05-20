'use client';

import Metrics from "@components/metrics";
import { cn } from "@/lib/utils";
import { projects } from "@/data/project";
import ProjectCard from "@/components/project";


const EnergyProjects = () => {
    return (
      <>
      <div className='max-w-screen relative md:px-8  min-h-screen'>
       
        <Metrics className ={cn('mx-auto md:flex-row justify-between bg-white border-b-8 border-gray-500')}/>
        <div className='col-span-12  md:py-6'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
     
      </>
    );
  };
  
  export default EnergyProjects;