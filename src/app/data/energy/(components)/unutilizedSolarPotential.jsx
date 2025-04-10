
import React, { useEffect } from "react";
import * as d3 from "d3";
import { useD3Map, renderD3Map } from "@components/d3/renderMap";


const AfricaMapUnutilizedSolarPotential = () => {
  
    const { countryData, containerRef, svgRef } = useD3Map("Unutilized Solar Potential", 100);

    useEffect(() => {
        d3.json("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoAfrica.json")
            .then((data) => {
                renderD3Map(data, countryData, containerRef, svgRef,["#FFDAB9", "#FF4500"], "Unutilized Solar Potential", 100, "%");
            });
    }, [countryData]);
    
    return (
        <div>
            {/* Map Container First */}
            <div
                ref={containerRef}
                className=""
                style={{
                    height: '600px',
                    minHeight: '300px'
                }}
            >
                <svg
                    ref={svgRef}
                    className="w-full h-full"
                ></svg>
                
            </div>

           
        </div>
    );
};

export default AfricaMapUnutilizedSolarPotential;