'use client'

import React , {useState} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RestrictedPaymentModal from "@components/paymentmodal";
//import { FaMapMarkerAlt } from "react-icons/fa";

// Define types
interface ProjectCardProps {
  image?: string;
  stage: "Concept Stage" | "Implementation Stage" | "Planning Stage" | "Funding Stage" | "Operational Stage";
  location: string;
  name: string;
  sector: string;
  description: string;
  capex: number;
  targetRaise: number;
  equity: "Target Funding" | "Target Financing";
  approval: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  stage,
  location,
  name,
  sector,
  description,
  capex,
  targetRaise,
  equity,
  approval,
}) => {
    const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <div className="relative bg-white shadow-lg rounded-xl p-4 w-full max-w-md border border-gray-200 overflow-hidden">
      {/* Project Image */}
      <div className="relative w-full h-32 overflow-hidden rounded-xl">
        <Image
          src={image || "/art-1.jpg"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
        {/* Stage Button */}
        <span className="absolute bottom-0 right-0 border border-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-xl ">
          {stage}
        </span>
      </div>

      <div className='ml-1'>

      {/* Location */}
      <div className="flex items-center text-[#7092BA] mt-2 md:mt-4 text-xs font-semibold">
        {/* <FaMapMarkerAlt className="mr-1" /> */}{location}
      </div>

      {/* Project Name & Sector */}
      <h3 className="text-textgray font-bold text-gray-900 min-h-8">
        {name} | {sector}
      </h3>

      {/* Description */}
      <p className="text-sm text-textgray line-clamp-2 leading-6 mb-4">{description}</p>

      {/* Capex, Target Raise, Equity */}
      <div className="flex items-center justify-between text-left bg-[#8522210F] rounded-lg p-2 md:py-4 text-sm">
        <div>
          <p className="font-semibold py-2">CAPEX</p>
          <p className="text-xs">${capex.toLocaleString()}</p>
        </div>
        <div className=" border-l border-r border-dotted border-black p-2 md:px-4 ">
          <p className="font-semibold md:py-2">Target Raise</p>
          <p className="text-xs">${targetRaise.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold py-2">Equity</p>
          <p className="text-xs">{equity}</p>
        </div>
      </div>

      {/* View More Button */}
      <div className="mt-4">
        <button 
        onClick={() => setShowModal(true)}
        className=" bg-maroon-100 text-white p-2 md:px-4 rounded-full text-xs shadow-lg hover:translate-y-2">
          View More
        </button>
      </div>
      </div>

      {/* Approval Status */}
      <span
  className={`absolute bottom-3 right-0 py-1 text-xs min-w-32 flex justify-center text-white origin-bottom -rotate-12
    
    ${approval ? "bg-[#F2994A]" : "bg-gray-400"}`}
>
  {approval ? "Approved" : "Pending"}
</span>

 {/* Restricted Access Modal */}
 {showModal && (
        <RestrictedPaymentModal
          onClose={() => setShowModal(false)}
          onProceed={() => router.push("/payment-details")}
        />
      )}
    </div>
  );
};

export default ProjectCard;
