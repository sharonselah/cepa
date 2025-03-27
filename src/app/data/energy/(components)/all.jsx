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
        // Fetch GeoJSON data first, we only need to do this once
        d3.json("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoAfrica.json")
            .then((data) => {
                if (!data || !data.features) {
                    console.error('Invalid GeoJSON data');
                    return;
                }

                console.log("GeoJSON loaded successfully with", data.features.length, "features");

                // Generate randomized data for all countries
                const randomizedData = {};
                const countries = [];

                data.features.forEach((d) => {
                    const countryName = d.properties.name;
                    countries.push(countryName);

                    randomizedData[countryName] = {
                        generationCapacity: (Math.random() * 500).toFixed(2) + ' MW',
                        cpc: '$' + (Math.random() * 1000).toFixed(2),
                        accessRate: (Math.random() * 100).toFixed(2) + '%',
                        surplusSupply: (Math.random() * 50).toFixed(2) + ' MW',
                        unutilizedPotential: (Math.random() * 70).toFixed(2) + '%',
                        renewableMix: (Math.random() * 100).toFixed(2) + '%'
                    };
                });

                setCountryData(randomizedData);
                setCountryList(countries.sort());

                // Now that we have the data, render the map
                renderMap(data, randomizedData);

                // Set up resize observer to handle window resizing
                const resizeObserver = new ResizeObserver(() => {
                    renderMap(data, randomizedData);
                });

                if (containerRef.current) {
                    resizeObserver.observe(containerRef.current);
                }

                return () => {
                    resizeObserver.disconnect();
                };
            })
            .catch((error) => {
                console.error('Error loading GeoJSON:', error);
            });
    }, []); // Empty dependency array means this runs once on mount

    // Effect to highlight selected country
    useEffect(() => {
        if (selectedCountry) {
            // Find and highlight the selected country's path
            d3.select(svgRef.current)
                .selectAll('path')
                .attr('stroke-width', d => d.properties.name === selectedCountry ? 3 : 1)
                .attr('stroke', d => d.properties.name === selectedCountry ? '#000' : '#fff');
        }
    }, [selectedCountry]);

    // Function to render the map
    const renderMap = (geoData, dataByCountry) => {
        if (!containerRef.current || !svgRef.current || !geoData) return;

        // Clear previous content
        d3.select(svgRef.current).selectAll("*").remove();

        // Remove any existing tooltips
        d3.select(containerRef.current).selectAll(".tooltip-element").remove();

        // Get actual container width
        const containerWidth = containerRef.current.clientWidth;
        const height = containerWidth * 0.63; // Maintain aspect ratio

        const svg = d3.select(svgRef.current)
            .attr('width', containerWidth)
            .attr('height', height);

        const projection = d3.geoAzimuthalEqualArea()
            .scale(containerWidth / 2.5)
            .translate([containerWidth / 2.2, height / 2]);

        const path = d3.geoPath().projection(projection);

        const tooltip = d3.select(containerRef.current)
            .append('div')
            .attr('class', 'tooltip-element absolute bg-white text-gray-700 text-xs md:text-sm p-4 md:px-6 rounded  shadow-lg opacity-0 pointer-events-none z-50');

        const colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, 100]);

        svg.append('g')
            .selectAll('path')
            .data(geoData.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', (d) => {
                const renewableMix = parseFloat(dataByCountry[d.properties.name]?.renewableMix) || 0;
                return colorScale(renewableMix);
            })
            .attr('stroke', d => d.properties.name === selectedCountry ? '#000' : '#fff')
            .attr('stroke-width', d => d.properties.name === selectedCountry ? 3 : 1)
            .on('mouseover', function (event, d) {
                d3.select(this).attr('stroke', '#000').attr('stroke-width', 2);

                const country = d.properties.name || 'Unknown';
                const data = dataByCountry[country] || {};

                // Get bounding box of the hovered country
                const [x, y] = path.centroid(d);
                const bounds = containerRef.current.getBoundingClientRect();

                tooltip.classed('opacity-100', true)
                    .html(`
          <strong style="color: #800000; font-size: 18px; padding: 4px 0;">${country}</strong><br>
          <hr>
          <div style="padding: 4px 0;">Generation Capacity: ${data.generationCapacity || 'N/A'}</div>
          <div style="padding: 4px 0;">CPC: ${data.cpc || 'N/A'}</div>
          <div style="padding: 4px 0;">Electricity Access Rate: ${data.accessRate || 'N/A'}</div>
          <div style="padding: 4px 0;">Surplus Supply: ${data.surplusSupply || 'N/A'}</div>
          <div style="padding: 4px 0;">Unutilized Potential: ${data.unutilizedPotential || 'N/A'}</div>
          <div style="padding: 4px 0;">Renewable Energy Mix: ${data.renewableMix || 'N/A'}</div>
        `)
                    .style('left', `${x + bounds.left}px`)
                    .style('top', `${y + bounds.top}px`);
            })
            .on('mousemove', function (event) {
                const bounds = containerRef.current.getBoundingClientRect();
                tooltip.style('left', `${event.clientX - bounds.left + 10}px`)
                    .style('top', `${event.clientY - bounds.top + 10}px`);
            })
            .on('mouseout', function (event, d) {
                // Only reset if not the selected country
                if (d.properties.name !== selectedCountry) {
                    d3.select(this).attr('stroke', '#fff').attr('stroke-width', 1);
                } else {
                    d3.select(this).attr('stroke', '#000').attr('stroke-width', 3);
                }
                tooltip.classed('opacity-0', true);
            })
            .on('click', function (event, d) {
                setSelectedCountry(d.properties.name);
            });

        // Legend
        const legendContainer = d3.select(legendRef.current);
        legendContainer.selectAll("*").remove();

        const legendData = [
            { label: 'Gen. Capacity (MW)', color: 'blue' },
            { label: 'CPC ($)', color: 'green' },
            { label: 'Electricity Access Rate (%)', color: 'orange' },
            { label: 'Surplus Supply (MW)', color: 'red' },
            { label: 'Unutilized Potential (%)', color: 'purple' },
            { label: 'Renewable Energy Mix (%)', color: 'teal' }
        ];

        const legend = legendContainer
            .selectAll('div')
            .data(legendData)
            .enter()
            .append('div')
            .attr('class', 'flex items-center gap-2 text-xs mb-2');

        legend.append('div')
            .attr('class', 'w-5 h-4 rounded-full')
            .style('background', d => d.color);

        legend.append('span').text(d => d.label);
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();

        // Find the closest matching country
        const matchingCountry = countryList.find(country =>
            country.toLowerCase() === searchQuery.toLowerCase()
        ) || countryList.find(country =>
            country.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (matchingCountry) {
            setSelectedCountry(matchingCountry);
        } else {
            alert("Country not found. Please try another search term.");
        }
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
                <div ref={legendRef} className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded"></div>
            </div>

            {/* Search Section After Map */}
            <div className="mt-6 p-4 bg-[#F1f1ef] rounded-lg shadow-md w-full min-h-12 md:min-h-24  mx-auto">

                <form onSubmit={handleSearch} className="w-full md:w-1/2 mx-auto flex gap-2 relative">
                    <div className="w-full relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Enter country name"
                            className="w-full px-4 py-2 min-h-16 rounded-full shadow-lg border border-maroon-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20"
                            list="country-list"
                        />
                        <datalist id="country-list">
                            {countryList.map(country => (
                                <option key={country} value={country} />
                            ))}
                        </datalist>
                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 min-h-16 bg-maroon-100 text-white rounded-full shadow-lg min-w-32 focus:outline-none focus:ring-2 focus:ring-maroon-100"
                        >
                            Search
                        </button>
                    </div>
                </form>


                {/* Country Data Display */}
                {selectedCountry && countryData[selectedCountry] && (
                    <div className="bg-white p-8">
                        <h3 className="text-h3 text-center my-8 md:my-12">{selectedCountry}</h3>
                        <div className="px-8  text-gray-700 text-base space-y-6 md:space-y-12 ">
                            {/* Circular Progress Indicators */}
                            <div className="grid grid-cols-3 gap-8 justify-items-center">
                                {/* Electricity Access Rate */}
                                <div className="flex flex-col items-center space-y-4">
                                    <p className='text-h4'>Electricity Access Rate</p>
                                    <div className="relative w-32 h-32"> {/* Increased size */}
                                        <svg className="w-full h-full" viewBox="0 0 36 36">
                                            <circle
                                                className="text-gray-200 stroke-current"
                                                strokeWidth="6"
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                            />
                                            <circle
                                                className="text-[#DDA63A] stroke-current"
                                                strokeWidth="6"
                                                strokeDasharray={`${countryData[selectedCountry].accessRate.replace('%', '')}, 100`}
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                            />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                            {countryData[selectedCountry].accessRate}
                                        </span>
                                    </div>
                                </div>

                                {/* Unutilized Potential */}
                                <div className="flex flex-col items-center space-y-4">
                                    <p className='text-h4'>Unutilized Energy Potential</p>
                                    <div className="relative w-32 h-32"> {/* Increased size */}
                                        <svg className="w-full h-full" viewBox="0 0 36 36">
                                            <circle
                                                className="text-gray-200 stroke-current"
                                                strokeWidth="6"
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                            />
                                            <circle
                                                className="text-maroon-100 stroke-current"
                                                strokeWidth="6"
                                                strokeDasharray={`${countryData[selectedCountry].unutilizedPotential.replace('%', '')}, 100`}
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                            />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                            {countryData[selectedCountry].unutilizedPotential}
                                        </span>
                                    </div>
                                </div>

                                {/* Renewable Energy Mix */}
                                <div className="flex flex-col items-center space-y-4">
                                    <p className='text-h4'>Renewable Energy Mix</p>
                                    <div className="relative w-32 h-32"> {/* Increased size */}
                                        <svg className="w-full h-full" viewBox="0 0 36 36">
                                            <circle
                                                className="text-gray-200 stroke-current"
                                                strokeWidth="6"
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                            />
                                            <circle
                                                className="text-[#0ACF83] stroke-current"
                                                strokeWidth="6"
                                                strokeDasharray={`${countryData[selectedCountry].renewableMix.replace('%', '')}, 100`}
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                            />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                            {countryData[selectedCountry].renewableMix}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Other Metrics */}
                            <div className="grid grid-cols-3 gap-8 justify-items-center">
                                {/* Generation Capacity */}
                                <div className="flex flex-col items-center">
                                    <p className='text-h4 mb-4'>Generation Capacity</p>
                                    <p>{countryData[selectedCountry].generationCapacity}</p>
                                </div>

                                {/* Cost Per Capacity */}
                                <div className="flex flex-col items-center">
                                    <p className='text-h4 mb-4'>Cost Per Capacity</p>
                                    <p>{countryData[selectedCountry].cpc}</p>
                                </div>

                                {/* Surplus Supply */}
                                <div className="flex flex-col items-center">
                                    <p className='text-h4 mb-4'>Surplus Supply</p>
                                    <p>{countryData[selectedCountry].surplusSupply}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default AfricaMapProduction;