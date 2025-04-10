'use client';

import Metrics from "@components/metrics"
import Header from "@components/header";
import { cn } from "@/lib/utils";
import { projects } from "@/data/project";
import ProjectCard from "@/components/project";
import Footer from '@components/footer';

const EnergyProjects = () => {
    return (
      <>
      <div className='col-span-12 max-w-screen relative md:px-8  min-h-screen'>
        <div className='col-span-12 md:py-6 mb-6'>
          <div className="relative flex justify-between items-center">
            <h2 className="text-h3 font-bold text-maroon-100">Energy Projects</h2>
            <Header className={cn("top-0")} />
          </div>
        </div>
        <Metrics className ={cn('mx-auto md:flex-row justify-between bg-white border-b-8 border-gray-500')}/>
        <div className='col-span-12  md:py-6'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
      </>
    );
  };
  
  export default EnergyProjects;