'use client';

import Metrics from "./(components)/metrics";
import AfricaMapProduction from "./(components)/production";
import Header from "@components/header";
import { cn } from "@/lib/utils";


const Energy = () => {

    return (
        <div className='w-screen relative'>
            <div className='col-span-12 p-6 md:p-8 md:py-6 mx-8'>
                <div className="relative flex justify-between items-center mb-6">
                    <h2 className="text-h3 font-bold">Energy</h2>
                    <Header className={cn("top-0")} />
                </div>
            </div>
            <Metrics />
            <AfricaMapProduction />
        </div>
    );
};

export default Energy;
