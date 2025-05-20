"use client";

import { thematicAreas } from "@/data/thematic areas";
import {
  Leaf,
  Award,
  Building2,
  RefreshCw,
  User,
  Settings,
} from "lucide-react";

const ThematicAreas = () => {
  const icons = [Building2, Award, Leaf, RefreshCw, User, Settings];

  return (
    <div className="p-8">
      {/* Introduction Banner */}
      <div className="bg-[#fdf6e3] rounded-full px-6 py-3 mb-6">
        <p className="text-gray-800 flex items-center gap-4 text-sm">
          <span className="h-4 w-4 border border-black rounded-full flex justify-center items-center">
            &#33;
          </span>
          Our thematic areas track key projects, policies, and innovations shaping Africa’s sustainability, resilience, and climate action progress.
        </p>
      </div>

      {/* First Row - 4 Cards */}
      <div className="flex flex-wrap justify-center mb-6">
        {thematicAreas.slice(0, 4).map((area, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={area.title} className="w-full sm:w-1/2 md:w-1/4 p-2">
              <div className="bg-[#ccedd8] hover:bg-[#b3e6c9] text-black duration-300 rounded-lg p-6 flex flex-col justify-between text-left min-h-[350px]">
                <Icon className="w-8 h-8 text-[#006633] mb-4" />
                <h3 className="text-h4 font-semibold md:min-h-16">{area.title}</h3>
                <p className="text-sm leading-7 mt-2 md:min-h-36 lg:min-h-28">{area.description}</p>
                <a
                  href={area.link}
                  className="mt-4 active:text-blue-600 font-medium hover:underline"
                >
                  View More →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Second Row - 3 Cards */}
      <div className="flex flex-wrap justify-center">
        {thematicAreas.slice(4, 7).map((area, index) => {
          const Icon = icons[(index + 4) % icons.length];
          return (
            <div key={area.title} className="w-full sm:w-1/2 md:w-1/4 p-2">
              <div className="bg-[#ccedd8] hover:bg-[#b3e6c9] text-black duration-300 rounded-lg p-6 flex flex-col justify-between text-left min-h-[350px]">
                <Icon className="w-8 h-8 text-[#006633] mb-4" />
                <h3 className="text-h4 font-semibold md:min-h-24">{area.title}</h3>
                <p className="text-sm leading-7 mt-2 md:min-h-36">{area.description}</p>
                <a
                  href={area.link}
                  className="mt-4 active:text-blue-600 font-medium hover:underline"
                >
                  View More →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThematicAreas;
