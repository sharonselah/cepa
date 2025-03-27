import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const AfricaMapElectricityAccess = () => {
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
    
                const electricityAccessRateData = {};
                const countries = [];
    
                data.features.forEach((d) => {
                    const countryName = d.properties.name;
                    countries.push(countryName);
                    electricityAccessRateData[countryName] = {
                        electricityAccessRate: Math.random() * 100, // Random value between 0 and 100
                    };
                });
    
                setCountryData(electricityAccessRateData);
                setCountryList(countries.sort());
    
                renderMap(data, electricityAccessRateData);
                
                const resizeObserver = new ResizeObserver(() => {
                    renderMap(data, electricityAccessRateData);
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
    
        // **Updated Color Scale for Electricity Access Rate**
    

         const colorScale = d3.scaleLinear()
                    .domain([0, 100])
                    .range(["#FFF5E1", "#822E00"]); // Light Orange → Dark Orange
    
        svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", (d) => {
                const electricityAccessRateValue = dataByCountry[d.properties.name]?.electricityAccessRate || 0;
                return colorScale(electricityAccessRateValue);
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .on("mouseover", function (event, d) {
                d3.select(this).attr("stroke", "#000").attr("stroke-width", 2);
    
                const country = d.properties.name || "Unknown";
                const electricityAccessRateValue = dataByCountry[country]?.electricityAccessRate?.toFixed(2) + "%" || "N/A";
    
                const [x, y] = path.centroid(d);
                const bounds = containerRef.current.getBoundingClientRect();
    
                tooltip.classed("opacity-100", true)
                    .html(`<strong style="color: #800000; font-size: 18px;">${country}</strong><br><hr>
                           <div style="padding: 4px 0;">Electricity Access Rate: ${electricityAccessRateValue}</div>`)
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
    
        // **Updated Legend for 0-100% Electricity Access**
        const legendWidth = containerWidth * 0.6;
        const legendHeight = 20;
    
        const legendSvg = d3.select(legendRef.current)
            .attr("width", legendWidth + 50)
            .attr("height", legendHeight + 40)
            .selectAll("*").remove();
    
        const legendGroup = legendSvg.append("g")
            .attr("transform", "translate(20, 10)");
    
        const legendScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, legendWidth]);
    
        const legendAxis = d3.axisBottom(legendScale)
            .tickValues([0, 20, 40, 60, 80, 100])
            .tickFormat(d3.format(".0f"))
            .tickSize(8);
    
        const gradient = legendSvg.append("defs")
            .append("linearGradient")
            .attr("id", "legend-gradient")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "0%")
            .attr("y2", "0%");
    
        gradient.append("stop").attr("offset", "0%").attr("stop-color", d3.interpolateBlues(0));
        gradient.append("stop").attr("offset", "100%").attr("stop-color", d3.interpolateBlues(1));
    
        legendGroup.append("rect")
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#legend-gradient)")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 0.5);
    
        legendGroup.append("g")
            .attr("transform", `translate(0, ${legendHeight})`)
            .call(legendAxis)
            .selectAll("text")
            .style("font-size", "12px")
            .style("fill", "#555");
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

export default AfricaMapElectricityAccess;