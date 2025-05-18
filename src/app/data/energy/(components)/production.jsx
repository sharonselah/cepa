import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useElectricityProduction } from '@/data/production/generation capacity/use-fetch-elec-production';

// Color palette for energy sources
const COLORS = {
  hydro: '#0088FE',
  solar: '#FFBB28',
  wind: '#00C49F',
  geothermal: '#FF8042',
  coal: '#555555',
  natural_gas: '#8884d8',
  oil: '#b91c1c',
  nuclear: '#4B0082',
  biofuels: '#32CD32',
  others: '#AAAAAA'
};

export default function AfricaElectricityProduction() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const { data, loading } = useElectricityProduction();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  useEffect(() => {
    if (loading || !svgRef.current || !containerRef.current) return;

    const fetchGeoData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoAfrica.json");
        const geoData = await response.json();
        renderMap(geoData);
        
        // Handle window resize
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
  }, [loading, data]);

  const renderMap = (geoData) => {
    if (!containerRef.current || !svgRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const height = containerWidth * 0.7;
    
    
    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", height);
    
    svg.selectAll('*').remove();
    
    // Create a color scale based on electricity production
    const maxProduction = d3.max(data, d => d.totalProductionGWh) || 0;
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, maxProduction]);
    
    // Create projection and path generator
    const projection = d3.geoAzimuthalEqualArea()
      .scale(containerWidth / 2.6)
      .translate([containerWidth / 2.7, height / 2 - 50]);
    
    const path = d3.geoPath().projection(projection);

    /*

     // Calculate dimensions - 60% of container width minus margins
            const containerWidth = containerRef.current.clientWidth *0.85  - 40; 
            const height = containerWidth * 0.7; 
          
            const svg = d3.select(svgRef.current)
              .attr("width", containerWidth)
              .attr("height", height);
          
            svg.selectAll('*').remove();
          
            // Create projection - using fitSize to automatically scale to available space
            const projection = d3.geoAzimuthalEqualArea()
              .fitSize([containerWidth, height], geoData);*/
    
    // Draw map
    const countries = svg.selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .attr('fill', (d) => {
        const countryName = d.properties.name;
        const countryData = findCountryByName(countryName);
        return countryData ? colorScale(countryData.totalProductionGWh) : '#ccc';
      })
      .on('mouseover', function(event, d) {
        const countryName = d.properties.name;
        const countryData = findCountryByName(countryName);
        
        if (countryData) {
          d3.select(this).attr('stroke-width', 2).attr('stroke', '#333');
          
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style('opacity', 1)
            .style('left', `${event.pageX -190}px`)
            .style('top', `${event.pageY -120}px`)
            .html(`
              <strong>${countryData.country}</strong><br>
              Total Production: ${countryData.totalProductionGWh.toLocaleString()} GWh
            `);
        }
      })
      .on('mouseout', function() {
        d3.select(this).attr('stroke-width', 0.5).attr('stroke', '#fff');
        d3.select(tooltipRef.current).style('opacity', 0);
      })
      .on('click', function(event, d) {
        const countryName = d.properties.name;
        const countryData = findCountryByName(countryName);
        if (countryData) {
          setSelectedCountry(countryData);
          setSearchTerm(countryData.country);
        }
      });

    // Add legend
    const legendGroup = svg.append('g')
      .attr('transform', `translate(20, ${height - 120})`);
      
    legendGroup.append('rect')
      .attr('width', 200)
      .attr('height', 100)
      .attr('fill', 'white')
      .attr('stroke', '#ccc')
      .attr('rx', 5);

    legendGroup.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text('Electricity Production (GWh)');

    const legendScale = d3.scaleLinear()
      .domain([0, maxProduction])
      .range([0, 180]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(3)
      .tickFormat(d => d3.format('.0s')(d));

    legendGroup.append('g')
      .attr('transform', `translate(10, 60)`)
      .call(legendAxis);

    const gradientId = 'legend-gradient';
    
    // Add gradient definition
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorScale(0));

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorScale(maxProduction));

    // Add gradient rectangle
    legendGroup.append('rect')
      .attr('x', 10)
      .attr('y', 40)
      .attr('width', 180)
      .attr('height', 15)
      .attr('fill', `url(#${gradientId})`);
  };

  // Improved country name search that's more flexible
  const findCountryByName = (name) => {
    if (!name) return null;
    
    // Try exact match first
    let countryData = data.find(item => 
      item.country.toLowerCase() === name.toLowerCase()
    );
    
    // If no exact match, try includes
    if (!countryData) {
      countryData = data.find(item => 
        item.country.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(item.country.toLowerCase())
      );
    }
    
    return countryData;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const foundCountry = findCountryByName(searchTerm);
    setSelectedCountry(foundCountry || null);
  };

  // Convert source data to pie chart format and add "others" if needed
  const getPieChartData = (sources) => {
    if (!sources) return [];
    
    const chartData = [];
    let totalPercentage = 0;
    
    // Process known sources
    Object.entries(sources).forEach(([key, value]) => {
      chartData.push({
        name: key.replace('_', ' '),
        value: value,
        color: COLORS[key] || '#AAAAAA'
      });
      totalPercentage += value;
    });
    
    // Add "others" if percentages don't sum to 100%
    if (totalPercentage < 100) {
      chartData.push({
        name: 'others',
        value: 100 - totalPercentage,
        color: COLORS.others
      });
    }
    
    return chartData;
  };

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-semibold capitalize">{payload[0].name}</p>
          <p>{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-h4 mb-4">Annual Electricity Generation</h1>
      
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
                  placeholder="Enter country name..."
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
              <div className="">
                <h3 className="text-2xl font-bold mb-2">{selectedCountry.country}</h3>
                <p className="text-lg mb-4">
                  <span className="font-medium">Total Electricity Production:</span> {selectedCountry.totalProductionGWh.toLocaleString()} GWh
                </p>
                
                <h4 className="text-xl font-semibold mb-3">Energy Sources</h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPieChartData(selectedCountry.sources)}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getPieChartData(selectedCountry.sources).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
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