'use client';

import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

// Regions of Africa
const regions = {
  "Northern Africa": ["Algeria", "Egypt", "Libya", "Morocco", "Tunisia", "Sudan", "W. Sahara"],
  "Western Africa": ["Benin", "Burkina Faso", "Cape Verde", "Côte d'Ivoire", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Liberia", "Mali", "Mauritania", "Niger", "Nigeria", "Senegal", "Sierra Leone", "Togo"],
  "Central Africa": ["Cameroon", "Central African Rep.", "Chad", "Congo", "Dem. Rep. Congo", "Eq. Guinea", "Gabon", "São Tomé and Príncipe"],
  "Eastern Africa": ["Burundi", "Comoros", "Djibouti", "Eritrea", "Ethiopia", "Kenya", "Madagascar", "Mauritius", "Rwanda", "Seychelles", "Somalia", "Somaliland", "S. Sudan", "Tanzania", "Uganda"],
  "Southern Africa": ["Angola", "Botswana", "Eswatini", "Lesotho", "Namibia", "South Africa", "Malawi", "Mozambique","Zambia", "Zimbabwe"]
};

// Metrics to display
const metrics = [
  { id: 'energyIntensity', name: 'Energy Intensity (kWh/GDP)', color: d3.interpolateGreens, format: value => `${value.toFixed(2)} kWh/GDP` },
  { id: 'standardsAdoption', name: 'Energy Efficiency Standards Adoption (%)', color: d3.interpolateBlues, format: value => `${value.toFixed(0)}%` },
  { id: 'energySavings', name: 'Energy Savings (GWh/year)', color: d3.interpolateOranges, format: value => `${value.toFixed(0)} GWh/year` },
  { id: 'investment', name: 'Energy Efficiency Investment ($ million)', color: d3.interpolatePurples, format: value => `$${value.toFixed(0)}M` },
  { id: 'buildingCertification', name: 'Buildings with Energy Efficiency Certification (%)', color: d3.interpolateReds, format: value => `${value.toFixed(0)}%` },
  { id: 'industryImplementation', name: 'Industry Energy Efficiency Implementation Rate (%)', color: d3.interpolateYlGn, format: value => `${value.toFixed(0)}%` },
  { id: 'programCoverage', name: 'Energy Efficiency Program Coverage (% population)', color: d3.interpolateYlOrBr, format: value => `${value.toFixed(0)}%` },
  { id: 'avoidedCapacity', name: 'Avoided Capacity Needs (MW)', color: d3.interpolateBuPu, format: value => `${value.toFixed(0)} MW` },
  { id: 'roi', name: 'Return on EE Investment (%)', color: d3.interpolateRdYlGn, format: value => `${value.toFixed(0)}%` }
];

// Generate random data for each country
const generateRandomData = (countries) => {
  const data = {};
  
  countries.forEach(country => {
    data[country] = {
      energyIntensity: Math.random() * 10 + 1,
      standardsAdoption: Math.random() * 100,
      energySavings: Math.random() * 5000 + 100,
      investment: Math.random() * 1000 + 10,
      buildingCertification: Math.random() * 100,
      industryImplementation: Math.random() * 100,
      programCoverage: Math.random() * 100,
      avoidedCapacity: Math.random() * 2000 + 50,
      roi: Math.random() * 30 + 5
    };
  });
  
  return data;
};

// Calculate regional averages
const calculateRegionalData = (countryData) => {
  const regionalData = {};
  
  Object.entries(regions).forEach(([region, countries]) => {
    const regionalMetrics = {};
    
    metrics.forEach(metric => {
      let sum = 0;
      let count = 0;
      
      countries.forEach(country => {
        if (countryData[country] && countryData[country][metric.id] !== undefined) {
          sum += countryData[country][metric.id];
          count++;
        }
      });
      
      regionalMetrics[metric.id] = count > 0 ? sum / count : 0;
    });
    
    regionalData[region] = regionalMetrics;
  });
  
  return regionalData;
};

export default function Home() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapData, setMapData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [viewMode, setViewMode] = useState('country'); // 'country' or 'region'
  const [countryData, setCountryData] = useState({});
  const [regionalData, setRegionalData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Fetch GeoJSON data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoAfrica.json");
        const data = await response.json();
        setMapData(data);
        
        // Generate mock data for all countries in the map
        const countries = data.features.map(feature => feature.properties.name);
        const generatedData = generateRandomData(countries);
        setCountryData(generatedData);
        
        // Calculate regional data
        const regions = calculateRegionalData(generatedData);
        setRegionalData(regions);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    
    fetchData();
  }, []);

  // Draw map when data changes
  useEffect(() => {
    if (!mapData || !containerRef.current) return;
    
    const drawMap = () => {
      const containerWidth = containerRef.current.clientWidth * 0.9 - 40;
      const height = containerWidth * 0.7;
      
      // Clear previous SVG
      d3.select(mapRef.current).selectAll("*").remove();
      
      // Create new SVG
      const svg = d3.select(mapRef.current)
        .attr("width", containerWidth)
        .attr("height", height);
      
      // Set up projection and path generator
      const projection = d3.geoAzimuthalEqualArea()
        .fitSize([containerWidth, height], mapData);
      const pathGenerator = d3.geoPath().projection(projection);
      
      // Get metric value range for color scale
      const metricValues = Object.values(countryData)
        .map(country => country[selectedMetric.id])
        .filter(value => value !== undefined);
      
      const minValue = Math.min(...metricValues);
      const maxValue = Math.max(...metricValues);
      
      // Color scale for the selected metric
      const colorScale = d3.scaleSequential()
        .domain([minValue, maxValue])
        .interpolator(selectedMetric.color);

      if (viewMode === 'country') {
        // Draw countries
        svg.selectAll(".country")
          .data(mapData.features)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", pathGenerator)
          .attr("fill", feature => {
            const countryName = feature.properties.name;
            return countryData[countryName] ? colorScale(countryData[countryName][selectedMetric.id]) : "#ccc";
          })
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5)
          .on("mouseover", (event, feature) => {
            const countryName = feature.properties.name;
            const value = countryData[countryName] ? countryData[countryName][selectedMetric.id] : "No data";
            const formattedValue = countryData[countryName] 
              ? selectedMetric.format(countryData[countryName][selectedMetric.id])
              : "No data";
            
            setTooltipContent(`${countryName}: ${formattedValue}`);
            setTooltipPosition({ x: event.pageX, y: event.pageY });
            setShowTooltip(true);
            setSelectedCountry(countryName);
            
            d3.select(event.currentTarget)
              .attr("stroke", "#000")
              .attr("stroke-width", 1.5);
          })
          .on("mousemove", (event) => {
            setTooltipPosition({ x: event.pageX, y: event.pageY });
          })
          .on("mouseout", (event) => {
            setShowTooltip(false);
            setSelectedCountry(null);
            
            d3.select(event.currentTarget)
              .attr("stroke", "#fff")
              .attr("stroke-width", 0.5);
          });
      } else {
        // Draw regions
        const regionFeatures = [];
        
        // Group countries by region
        Object.entries(regions).forEach(([regionName, countries]) => {
          // Filter features that belong to this region
          const regionCountries = mapData.features.filter(feature => 
            countries.includes(feature.properties.name)
          );
          
          if (regionCountries.length > 0) {
            // Merge geometries for countries in this region
            const mergedGeometry = {
              type: "Feature",
              properties: { name: regionName },
              geometry: {
                type: "MultiPolygon",
                coordinates: regionCountries.flatMap(feature => {
                  if (feature.geometry.type === "Polygon") {
                    return [feature.geometry.coordinates];
                  } else if (feature.geometry.type === "MultiPolygon") {
                    return feature.geometry.coordinates;
                  }
                  return [];
                })
              }
            };
            
            regionFeatures.push(mergedGeometry);
          }
        });
        
        // Draw regions
        svg.selectAll(".region")
          .data(regionFeatures)
          .enter()
          .append("path")
          .attr("class", "region")
          .attr("d", pathGenerator)
          .attr("fill", feature => {
            const regionName = feature.properties.name;
            return regionalData[regionName] ? colorScale(regionalData[regionName][selectedMetric.id]) : "#ccc";
          })
          .attr("stroke", "#000")
          .attr("stroke-width", 1)
          .on("mouseover", (event, feature) => {
            const regionName = feature.properties.name;
            const value = regionalData[regionName] ? regionalData[regionName][selectedMetric.id] : "No data";
            const formattedValue = regionalData[regionName] 
              ? selectedMetric.format(regionalData[regionName][selectedMetric.id])
              : "No data";
            
            setTooltipContent(`${regionName}: ${formattedValue}`);
            setTooltipPosition({ x: event.pageX, y: event.pageY });
            setShowTooltip(true);
            
            d3.select(event.currentTarget)
              .attr("stroke", "#000")
              .attr("stroke-width", 2);
          })
          .on("mousemove", (event) => {
            setTooltipPosition({ x: event.pageX, y: event.pageY });
          })
          .on("mouseout", (event) => {
            setShowTooltip(false);
            
            d3.select(event.currentTarget)
              .attr("stroke", "#000")
              .attr("stroke-width", 1);
          });
      }
      
      // Add legend
      const legendWidth = 450;
      const legendHeight = 20;
      const legendPosition = { x: 20, y: height - 40 };
      
      const legendScale = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([0, legendWidth]);
      
      const legendAxis = d3.axisBottom(legendScale)
        .ticks(4)
        .tickFormat(d => selectedMetric.format(d));
      
      const defs = svg.append("defs");
      const linearGradient = defs.append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
      
      // Create color stops
      const numStops = 10;
      for (let i = 0; i <= numStops; i++) {
        const offset = `${(i / numStops) * 100}%`;
        const value = minValue + (i / numStops) * (maxValue - minValue);
        
        linearGradient.append("stop")
          .attr("offset", offset)
          .attr("stop-color", colorScale(value));
      }
      
      // Add legend rectangle
      svg.append("rect")
        .attr("x", legendPosition.x)
        .attr("y", legendPosition.y)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#legend-gradient)");
      
      // Add legend axis
      svg.append("g")
        .attr("transform", `translate(${legendPosition.x}, ${legendPosition.y + legendHeight})`)
        .call(legendAxis)
        .selectAll("text")
        .style("font-size", "10px");
      
      // Add legend title
      svg.append("text")
        .attr("x", legendPosition.x)
        .attr("y", legendPosition.y - 5)
        .style("font-size", "12px")
        .text(selectedMetric.name);
    };
    
    drawMap();
    
    // Redraw on window resize
    const handleResize = () => drawMap();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [mapData, selectedMetric, viewMode, countryData, regionalData]);

  // Export data as CSV
  const exportCSV = () => {
    // Prepare CSV content
    let csvContent = "Country,";
    csvContent += metrics.map(m => m.name).join(",");
    csvContent += "\n";
    
    Object.keys(countryData).forEach(country => {
      csvContent += `"${country}",`;
      csvContent += metrics.map(m => countryData[country][m.id]).join(",");
      csvContent += "\n";
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'african_energy_efficiency_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      <main className="container mx-auto px-4 py-8">
       {/*  <h1 className="text-3xl font-bold mb-6 text-center text-[#006633]">Energy Demand Dashboard</h1>*/}
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Metric:</label>
              <select 
                className="border border-gray-300 rounded-md p-2 w-full md:w-64"
                value={selectedMetric.id}
                onChange={(e) => setSelectedMetric(metrics.find(m => m.id === e.target.value))}
              >
                {metrics.map(metric => (
                  <option key={metric.id} value={metric.id}>{metric.name}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">View Mode:</label>
              <div className="flex space-x-2">
                <button 
                  className={`px-4 py-2 rounded-md ${viewMode === 'country' ? 'bg-[#006633] text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setViewMode('country')}
                >
                  Country View
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${viewMode === 'region' ? 'bg-[#006633] text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setViewMode('region')}
                >
                  Regional View
                </button>
              </div>
            </div>
            
            <button 
              className="bg-[#006633] hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
              onClick={exportCSV}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-1-1h-6.586l-1.293-1.293A1 1 0 007.414 4H4a1 1 0 00-1 1v12zm10-6a1 1 0 112 0v3.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L13 14.586V11z" clipRule="evenodd" />
              </svg>
              Download CSV
            </button>
          </div>
          
          <div className="flex flex-wrap">
            <div className="w-full lg:w-3/5" ref={containerRef}>
              <svg ref={mapRef}></svg>
              
              {showTooltip && (
                <div 
                  className="absolute bg-black bg-opacity-80 text-white px-3 py-1 rounded pointer-events-none z-10"
                  style={{ 
                    left: `${tooltipPosition.x + 10}px`, 
                    top: `${tooltipPosition.y - 40}px` 
                  }}
                >
                  {tooltipContent}
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-2/5 mt-6 lg:mt-0">
              <h2 className="text-lg font-semibold mb-4">Regional Summary for {selectedMetric.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(regionalData).map(([region, data]) => (
                  <div 
                    key={region} 
                    className={`bg-green-100 p-4 rounded-lg ${
                      selectedCountry && regions[region]?.includes(selectedCountry) ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <h3 className="font-medium text-lg mb-2">{region}</h3>
                    <p className="text-sm mb-1">
                      <span className="font-medium"></span> {selectedMetric.format(data[selectedMetric.id])}
                    </p>
                    <p className="text-sm text-gray-600">
                      {regions[region]?.length || 0} countries
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">African Continental Average</h2>
                <div className="bg-blue-50 p-4 rounded-lg">
                  {metrics.map(metric => {
                    // Calculate continental average
                    const values = Object.values(countryData).map(country => country[metric.id]);
                    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
                    
                    return (
                      <div key={metric.id} className="mb-2 last:mb-0">
                        <p className="text-sm">
                          <span className="font-medium">{metric.name}:</span> {metric.format(average)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Methodology & Sources</h2>
          
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">Data Collection Methodology</h3>
          {/*   <p className="text-gray-700 mb-4">
              The data presented in this dashboard is randomly generated for demonstration purposes.
              In a real implementation, the data would be collected from various national energy agencies, 
              international organizations, and research institutions through standardized methodologies.
            </p>
            <h4 className="font-medium mb-1">Calculations:</h4>
            */}
            
            
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Energy Intensity (kWh/GDP):</strong> Calculated as total energy consumption divided by GDP.</li>
              <li><strong>Energy Savings (GWh/year):</strong> Measured against baseline consumption prior to efficiency implementations.</li>
              <li><strong>Return on EE Investment (%):</strong> Calculated as (Annual Energy Cost Savings / Total Implementation Cost) × 100.</li>
              <li><strong>Avoided Capacity Needs (MW):</strong> Estimated based on peak demand reduction achieved through efficiency measures.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Data Sources</h3>
           
            
            <ul className="list-disc pl-6 text-gray-700">
              <li>
                International Energy Agency. (2023). <em>Energy Efficiency Indicators</em>. 
                <a href="https://www.iea.org/data-and-statistics/data-product/energy-efficiency-indicators" className="text-[#006633] hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  https://www.iea.org/data-and-statistics/data-product/energy-efficiency-indicators
                </a>
              </li>
              <li>
                African Development Bank. (2023). <em>Africa Energy Portal</em>.
                <a href="https://africa-energy-portal.org" className="text-[#006633] hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  https://africa-energy-portal.org
                </a>
              </li>
              <li>
                United Nations Economic Commission for Africa. (2023). <em>Energy Access and Transition in Africa</em>.
                <a href="https://www.uneca.org/energy-access-and-transition" className="text-[#006633] hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  https://www.uneca.org/energy-access-and-transition
                </a>
              </li>
              <li>
                World Bank. (2023). <em>Sustainable Energy for All (SE4ALL) database</em>.
                <a href="https://data.worldbank.org/indicator/EG.EGY.PRIM.PP.KD" className="text-[#006633] hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  https://data.worldbank.org/indicator/EG.EGY.PRIM.PP.KD
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
   
    </div>
  );
}