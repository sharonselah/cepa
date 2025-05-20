import Image from "next/image";
import Header from "@components/header";
import { cn } from "@/lib/utils";
import { thematicAreas } from "@/data/thematic areas";
import Footer from "@components/footer";


const ThematicAreas = () => {

  
    return (
        <>
        <div className="col-span-12 p-8 mx-8">
            {/* Header Row */}
            <div className="relative flex justify-between items-center mb-8 md:mb-12">
                <h2 className="text-2xl font-bold">Thematic Areas</h2>
                <Header className={cn("top-0")} />
            </div>

            {/* Introduction */}
            <div className="bg-[#ffddab] bg-opacity-40 rounded-full px-6 py-3 mb-6">
                <p className="text-gray-800 flex items-center gap-4 text-sm "> <span className='h-4 w-4 border border-black rounded-full flex justify-center items-center'>&#33;</span>
                    Our thematic areas track key projects, policies, and innovations shaping Africa’s sustainability, resilience, and climate action progress.
                </p>
            </div>

            {/* Thematic Area Cards */}
            <div className="flex flex-wrap justify-center mb-6">
                {thematicAreas.slice(0, 4).map((area, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-2">
                        <div className="bg-green-100 shadow-sm hover:border-inherit text-black hover:bg-green-300 duration-300 shadow-xs rounded-lg p-6 flex flex-col justify-between text-left">
                            <Image src={area.icon} alt={area.title} width={65} height={65} className="mb-4" />
                            <h3 className="text-h4 font-semibold md:min-h-16">{area.title}</h3>
                            <p className="text-sm leading-7 mt-2 md:min-h-36 lg:min-h-28">{area.description}</p>
                            <a href={area.link} className="mt-4 active:text-blue-600 font-medium hover:underline">
                                View More →
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Second row - 3 cards */}
            <div className="flex flex-wrap justify-center">
                {thematicAreas.slice(4, 7).map((area, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-2">
                        <div className="bg-green-100 border border-gray-200 hover:border-inherit text-black  hover:bg-green-300 duration-300 shadow-xs rounded-lg p-6 flex flex-col text-leftounded-lg shadow-md p-4 h-full">
                            <Image src={area.icon} alt={area.title} width={65} height={65} className="mb-4" />
                            <h3 className="text-h4 font-semibold md:min-h-24">{area.title}</h3>
                            <p className="text-sm leading-7 mt-2 md:min-h-36">{area.description}</p>
                            <a href={area.link} className="mt-4 active:text-blue-600 font-medium hover:underline">
                                View More →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
 
        </div>
        
        <Footer/>
        </>
    );
};

export default ThematicAreas;
