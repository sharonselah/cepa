import React, { useEffect } from "react";
import * as d3 from "d3";
import { useD3Map, renderD3Map } from "@components/d3/renderMap";


const AfricaMapTNC = () => {

    const { countryData, containerRef, svgRef } = useD3Map("Transmission Coverage", 10000);

    useEffect(() => {
        d3.json("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoAfrica.json")
            .then((data) => {
                renderD3Map(data, countryData, containerRef, svgRef, ["#B2F5EA", "#005F5F"], "Transmission Coverage", 10000, "KM");
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

export default AfricaMapTNC;