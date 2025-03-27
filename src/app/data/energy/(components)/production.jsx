import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const AfricaMapProduction = () => {
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
    
                // Generate generation capacity data (0-1000 MW)
                const generationCapacityData = {};
                const countries = [];
    
                data.features.forEach((d) => {
                    const countryName = d.properties.name;
                    countries.push(countryName);
                    generationCapacityData[countryName] = {
                        generationCapacity: Math.random() * 1000, // Random value between 0 and 1000 MW
                    };
                });
    
                setCountryData(generationCapacityData);
                setCountryList(countries.sort());
    
                // Render the map
                renderMap(data, generationCapacityData);
    
                // Handle window resizing
                const resizeObserver = new ResizeObserver(() => {
                    renderMap(data, generationCapacityData);
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
    
        const containerWidth = containerRef.current.clientWidth - 150;
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
    
        const colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, 1000]);
    
        svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", (d) => {
                const generationCapacityValue = dataByCountry[d.properties.name]?.generationCapacity || 0;
                return colorScale(generationCapacityValue);
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .on("mouseover", function (event, d) {
                d3.select(this).attr("stroke", "#000").attr("stroke-width", 2);
    
                const country = d.properties.name || "Unknown";
                const generationCapacityValue = dataByCountry[country]?.generationCapacity.toFixed(2) || "N/A";
    
                const [x, y] = path.centroid(d);
                const bounds = containerRef.current.getBoundingClientRect();
    
                tooltip.classed("opacity-100", true)
                    .html(`<strong style="color: #800000; font-size: 16px;">${country}</strong><br>
                           <div style="padding: 4px 0px; font-size: 14px;">Generation Capacity: ${generationCapacityValue} MW</div>`)
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
                <div ref={legendRef} className=""></div>
            </div>

           
        </div>
    );
};

export default AfricaMapProduction;