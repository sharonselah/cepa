import { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

export default function AfricaMapBase({
    loading,
    data,
    colorScale,
    renderTooltipContent,
    renderDetailsPanel,
    searchPlaceholder = "Enter country name...",
    legendTitle = "Legend",
    legendDomain = [0, 100], // Default domain
    legendColorScale = d3.scaleLinear().domain([0, 100]).range(["#ccc", "#000"])
}) {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        if (loading || !svgRef.current || !containerRef.current) return;

        const fetchGeoData = async () => {
            try {
                const response = await fetch("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoAfrica.json");
                const geoData = await response.json();
                renderMap(geoData);

                const handleResize = () => {
                    renderMap(geoData);
                };

                window.addEventListener('resize', handleResize);
                return () => {
                    window.removeEventListener('resize', handleResize);
                };
            } catch (error) {
                console.error("Error fetching geo data:", error);
            }
        };
        fetchGeoData();
    }, [loading, data, renderMap]);

    const renderMap = useCallback( (geoData) => {
        if (!containerRef.current || !svgRef.current) return;
      
        // Calculate dimensions - 60% of container width minus margins
        const containerWidth = containerRef.current.clientWidth *0.85  - 40; 
        const height = containerWidth * 0.7; 
      
        const svg = d3.select(svgRef.current)
          .attr("width", containerWidth)
          .attr("height", height);
      
        svg.selectAll('*').remove();
      
        // Create projection - using fitSize to automatically scale to available space
        const projection = d3.geoAzimuthalEqualArea()
          .fitSize([containerWidth, height], geoData);
      
        const path = d3.geoPath().projection(projection);
      
        // Draw map with updated dimensions
         svg.selectAll('path')
          .data(geoData.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5)
          .attr('fill', (d) => {
            const countryName = d.properties.name;
            const countryData = findCountryByName(countryName);
            return countryData ? colorScale(countryData) : '#ccc';
          })
          .on('mouseover', function (event, d) {
            const countryName = d.properties.name;
            const countryData = findCountryByName(countryName);
      
            if (countryData) {
              d3.select(this).attr('stroke-width', 2).attr('stroke', '#333');
      
              const tooltip = d3.select(tooltipRef.current);
              tooltip
                .style('opacity', 1)
                .style('left', `${event.pageX -250}px`)
                .style('top', `${event.pageY - 90}px`)
                .html(renderTooltipContent(countryData));
            }
          })
          .on('mouseout', function () {
            d3.select(this).attr('stroke-width', 0.5).attr('stroke', '#fff');
            d3.select(tooltipRef.current).style('opacity', 0);
          })
          .on('click', function (event, d) {
            const countryName = d.properties.name;
            const countryData = findCountryByName(countryName);
            if (countryData) {
              setSelectedCountry(countryData);
              setSearchTerm(countryData.country);
            }
          });
      
        // Add responsive legend
        const legendWidth = Math.min(210, containerWidth * 0.3); // Responsive legend width
        const legendHeight = 80;
        const legendMargin = 20;
      
        const legendGroup = svg.append('g')
          .attr('transform', `translate(${containerWidth - legendWidth - legendMargin}, ${height - legendHeight - legendMargin})`);
      
        // Legend background
        legendGroup.append('rect')
          .attr('width', legendWidth)
          .attr('height', legendHeight)
          .attr('fill', 'white')
          .attr('stroke', '#ccc')
          .attr('rx', 5);
      
        // Legend Title
        legendGroup.append('text')
          .attr('x', 10)
          .attr('y', 20)
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .text(legendTitle);
      
        // Legend gradient
        const defs = svg.append('defs');
        const gradientId = 'legend-gradient';
      
        const gradient = defs.append('linearGradient')
          .attr('id', gradientId)
          .attr('x1', '0%')
          .attr('x2', '100%')
          .attr('y1', '0%')
          .attr('y2', '0%');
      
        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', legendColorScale(legendDomain[0]));
      
        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', legendColorScale(legendDomain[1]));
      
        legendGroup.append('rect')
          .attr('x', 10)
          .attr('y', 30)
          .attr('width', legendWidth - 20)
          .attr('height', 15)
          .attr('fill', `url(#${gradientId})`);
      
        // Legend Axis
        const legendScale = d3.scaleLinear()
          .domain(legendDomain)
          .range([0, legendWidth - 20]);
      
        const legendAxis = d3.axisBottom(legendScale)
          .ticks(4)
          .tickSize(0)
          .tickFormat(d => d3.format('.2s')(d));
      
        legendGroup.append('g')
          .attr('transform', `translate(10, 65)`)
          .call(legendAxis)
          .select('.domain').remove(); // Remove axis line
      }, [colorScale, legendColorScale, legendDomain, legendTitle, renderTooltipContent,findCountryByName ]);

   const findCountryByName = useCallback((name) => {
  if (!name || !data) return null;

  // Try exact match first
  let countryData = data.find(
    item => item.country.toLowerCase() === name.toLowerCase()
  );

  // If no exact match, try includes
  if (!countryData) {
    countryData = data.find(
      item =>
        item.country.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(item.country.toLowerCase())
    );
  }

  return countryData;
}, [data]);


    const handleSearch = (e) => {
        e.preventDefault();
        const foundCountry = findCountryByName(searchTerm);
        setSelectedCountry(foundCountry || null);
    };

    return (
        <div className="container mx-auto">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-xl">Loading data...</div>
                </div>
            ) : (
                <div>
                    <div className="relative" ref={containerRef}>
                        <svg ref={svgRef} className="mx-auto"></svg>
                        <div
                            ref={tooltipRef}
                            className="absolute bg-white p-2 rounded shadow-lg pointer-events-none opacity-0 transition-opacity"
                            style={{
                                position: 'absolute',
                                background: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '8px',
                                pointerEvents: 'none',
                                opacity: 0,
                                zIndex: 10
                            }}
                        ></div>
                    </div>

                    <div className="md:w-2/3 mx-auto mt-8">
                        <h2 className="text-xl font-bold mb-4">Search Country Details</h2>
                        <form onSubmit={handleSearch} className="mb-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    className="flex-grow p-2 border rounded"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        {selectedCountry ? (
                            renderDetailsPanel(selectedCountry)
                        ) : searchTerm ? (
                            <div className="">
                               
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}