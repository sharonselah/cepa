import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const AfricaMapCPC = () => {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const legendRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [countryData, setCountryData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryList, setCountryList] = useState([]);

    // Use useEffect to ensure the component mounts before rendering the map
    useEffect(() => {
        // Fetch GeoJSON data once
        d3.json("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoAfrica.json")
            .then((data) => {
                if (!data || !data.features) {
                    console.error("Invalid GeoJSON data");
                    return;
                }
    
                // Generate CPC data only
                const cpcData = {};
                const countries = [];
    
                data.features.forEach((d) => {
                    const countryName = d.properties.name;
                    countries.push(countryName);
                    cpcData[countryName] = {
                        cpc: Math.random() * 500, // CPC values between 0 and 500
                    };
                });
    
                setCountryData(cpcData);
                setCountryList(countries.sort());
    
                // Render the map
                renderMap(data, cpcData);
    
                // Handle window resizing
                const resizeObserver = new ResizeObserver(() => {
                    renderMap(data, cpcData);
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
    }, []); // Run once on mount
    
    useEffect(() => {
        if (selectedCountry) {
            d3.select(svgRef.current)
                .selectAll("path")
                .attr("stroke-width", (d) => (d.properties.name === selectedCountry ? 3 : 1))
                .attr("stroke", (d) => (d.properties.name === selectedCountry ? "#000" : "#fff"));
        }
    }, [selectedCountry]);
    
    const renderMap = (geoData, dataByCountry) => {
        if (!containerRef.current || !svgRef.current || !geoData) return;
    
        // Clear previous content
        d3.select(svgRef.current).selectAll("*").remove();
        d3.select(containerRef.current).selectAll(".tooltip-element").remove();
    
        const containerWidth = containerRef.current.clientWidth;
        const height = containerWidth * 0.63; // Maintain aspect ratio
    
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
    
        // Define CPC color scale
        const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, 500]);
    
        svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", (d) => {
                const cpcValue = dataByCountry[d.properties.name]?.cpc || 0;
                return colorScale(cpcValue);
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .on("mouseover", function (event, d) {
                d3.select(this).attr("stroke", "#000").attr("stroke-width", 2);
    
                const country = d.properties.name || "Unknown";
                const cpcValue = dataByCountry[country]?.cpc.toFixed(2) || "N/A";
    
                const [x, y] = path.centroid(d);
                const bounds = containerRef.current.getBoundingClientRect();
    
                tooltip.classed("opacity-100", true)
                    .html(`<strong style="color: #800000; font-size: 18px;">${country}</strong><br><hr>
                           <div style="padding: 4px 0;">Cost Per Capacity: $${cpcValue}</div>`)
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
    
            // Define legend dimensions
        


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

export default AfricaMapCPC;