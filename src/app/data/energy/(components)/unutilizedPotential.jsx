import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const AfricaMapUnutilizedPotential = () => {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const legendRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [countryData, setCountryData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryList, setCountryList] = useState([]);

    // Use useEffect to ensure the component mounts before rendering the map
    useEffect(() => {
        d3.json("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoAfrica.json")
            .then((data) => {
                if (!data || !data.features) {
                    console.error("Invalid GeoJSON data");
                    return;
                }
    
                // Generate unutilized potential data (0-100%)
                const unutilizedPotentialData = {};
                const countries = [];
    
                data.features.forEach((d) => {
                    const countryName = d.properties.name;
                    countries.push(countryName);
                    unutilizedPotentialData[countryName] = {
                        unutilizedPotential: Math.random() * 100, // Random value between 0 and 100%
                    };
                });
    
                setCountryData(unutilizedPotentialData);
                setCountryList(countries.sort());
    
                // Render the map
                renderMap(data, unutilizedPotentialData);
    
                // Handle window resizing
                const resizeObserver = new ResizeObserver(() => {
                    renderMap(data, unutilizedPotentialData);
                });
    
                if (containerRef.current) {
                    resizeObserver.observe(containerRef.current);
                }
    
                return () => {
                    resizeObserver.disconnect();
                };
            })
            .catch((error) => {
                console.error("Error loading GeoJSON:", error);
            });
    }, []);
    
    const renderMap = (geoData, dataByCountry) => {
        if (!containerRef.current || !svgRef.current || !geoData) return;
    
        d3.select(svgRef.current).selectAll("*").remove();
        d3.select(containerRef.current).selectAll(".tooltip-element").remove();
    
        const containerWidth = containerRef.current.clientWidth;
        const height = containerWidth * 0.63;
    
        const svg = d3.select(svgRef.current)
            .attr("width", containerWidth)
            .attr("height", height);
    
        const projection = d3.geoAzimuthalEqualArea()
            .scale(containerWidth / 2.5)
            .translate([containerWidth / 2.2, height / 2]);
    
        const path = d3.geoPath().projection(projection);
    
        const tooltip = d3.select(containerRef.current)
            .append("div")
            .attr("class", "tooltip-element absolute bg-white text-gray-700 text-xs md:text-sm p-4 md:px-6 rounded shadow-lg opacity-0 pointer-events-none z-50");
    
        // Define unutilized potential color scale (Purple)
        const colorScale = d3.scaleSequential(d3.interpolatePurples).domain([0, 100]);
    
        svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", (d) => {
                const unutilizedPotentialValue = dataByCountry[d.properties.name]?.unutilizedPotential || 0;
                return colorScale(unutilizedPotentialValue);
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .on("mouseover", function (event, d) {
                d3.select(this).attr("stroke", "#000").attr("stroke-width", 2);
    
                const country = d.properties.name || "Unknown";
                const unutilizedPotentialValue = dataByCountry[country]?.unutilizedPotential.toFixed(2) || "N/A";
    
                const [x, y] = path.centroid(d);
                const bounds = containerRef.current.getBoundingClientRect();
    
                tooltip.classed("opacity-100", true)
                    .html(`<strong style="color: #4B0082; font-size: 18px;">${country}</strong><br><hr>
                           <div style="padding: 4px 0;">Unutilized Potential: ${unutilizedPotentialValue}%</div>`)
                    .style("left", `${x + bounds.left}px`)
                    .style("top", `${y + bounds.top}px`);
            })
            .on("mousemove", function (event) {
                const bounds = containerRef.current.getBoundingClientRect();
                tooltip.style("left", `${event.clientX - bounds.left + 10}px`)
                    .style("top", `${event.clientY - bounds.top + 10}px`);
            })
            .on("mouseout", function () {
                d3.select(this).attr("stroke", "#fff").attr("stroke-width", 1);
                tooltip.classed("opacity-0", true);
            });
    };
    
    
    return (
        <div className="relative w-full space-y-6">
            {/* Map Container First */}
            <div
                ref={containerRef}
                className="relative w-full sm:w-96 md:w-[800px] lg:w-[960px] mx-auto"
                style={{
                    height: '600px',
                    minHeight: '300px'
                }}
            >
                <svg
                    ref={svgRef}
                    className="w-full h-full"
                ></svg>
                <div ref={legendRef} className=""></div>
            </div>

           
        </div>
    );
};

export default AfricaMapUnutilizedPotential;