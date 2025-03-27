'use client';

import Metrics from "@components/metrics";
import AfricaMapGrid from "./(components)/map";
import Header from "@components/header";
import { cn } from "@/lib/utils";


const Grid = () => {

    return (
        <div className='w-screen relative'>
            <div className='col-span-12 p-6 md:p-8 md:py-6 mx-8'>
                <div className="relative flex justify-between items-center mb-6">
                    <h2 className="text-h3 font-bold">Grid Infrastructure</h2>
                    <Header className={cn("top-0")} />
                </div>
            </div>
            <Metrics />
            <AfricaMapGrid />

        </div>
    );
};

export default Grid;
