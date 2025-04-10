import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";


// Custom Hook for Fetching and Processing GeoJSON Data
export const useD3Map = (dataKey, dataRange) => {
  const [countryData, setCountryData] = useState({});
  const [countryList, setCountryList] = useState([]);
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    d3.json("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoAfrica.json")
      .then((data) => {
        if (!data || !data.features) {
          console.error("Invalid GeoJSON data");
          return;
        }

        const processedData = {};
        const countries = [];

        data.features.forEach((d) => {
          const countryName = d.properties.name;
          countries.push(countryName);
          processedData[countryName] = {
            [dataKey]: Math.random() * dataRange, // Adjusts data dynamically
          };
        });

        setCountryData(processedData);
        setCountryList(countries.sort());
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, [dataKey, dataRange]);

  return { countryData, countryList, containerRef, svgRef };
};

export const renderD3Map = (geoData, dataByCountry, containerRef, svgRef, colorScheme, dataKey, dataRange, unit) => {
  if (!containerRef.current || !svgRef.current || !geoData) return;

  d3.select(svgRef.current).selectAll("*").remove();
  d3.select(containerRef.current).selectAll(".tooltip-element").remove();
  d3.select(containerRef.current).selectAll(".legend-container").remove();

  const containerWidth = containerRef.current.clientWidth - 100;
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

  // 🔥 Dynamically select the color scale type
  let colorScale;
  if (typeof colorScheme === "function") {
    // If colorScheme is a D3 interpolator function
    colorScale = d3.scaleSequential(colorScheme).domain([0, dataRange]);
  } else if (Array.isArray(colorScheme)) {
    // If colorScheme is an array of custom colors
    colorScale = d3.scaleLinear().domain([0, dataRange]).range(colorScheme);
  } else {
    console.error("Invalid color scheme provided");
    return;
  }


  svg.append("g")
    .selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", (d) => {
      const value = dataByCountry[d.properties.name]?.[dataKey] || 0;
      return colorScale(value);
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", 1)
    .on("mouseover", function (event, d) {
      d3.select(this).attr("stroke", "#000").attr("stroke-width", 2);

      const country = d.properties.name || "Unknown";
      const value = dataByCountry[country]?.[dataKey]?.toFixed(0) || "N/A";



      const [x, y] = path.centroid(d);
      const bounds = containerRef.current.getBoundingClientRect();

      tooltip.classed("opacity-100", true)
        .html(`<strong style="color: #800000; font-size: 16px;">${country}</strong><br>
                       <div style="padding: 4px 0px; font-size: 14px;">${dataKey}: ${value} ${unit}</div>`)
        .style("left", `${x + bounds.left}px`)
        .style("top", `${y + bounds.top}px`);
    })
    .on("mousemove", function (event) {
      const bounds = containerRef.current.getBoundingClientRect();
      tooltip.style("left", `${event.clientX - bounds.left + 10}px`)
        .style("top", `${event.clientY - bounds.top}px`);
    })
    .on("mouseout", function () {
      d3.select(this).attr("stroke", "#fff").attr("stroke-width", 1);
      tooltip.classed("opacity-0", true);
    });

  // ---- ADDING LEGEND ----
  const legendWidth = 300, legendHeight = 10;
  const legendMargin = 70;

  const legendSvg = d3.select(containerRef.current)
    .append("svg")
    .attr("class", "legend-container")
    .attr("width", legendWidth + legendMargin)
    .attr("height", 50)
    .style("position", "absolute")
    .style("bottom", "70px")
    .style("left", `${(containerWidth / 2) - (legendWidth / 2)}px`);

  // Gradient scale
  const defs = legendSvg.append("defs");
  const linearGradient = defs.append("linearGradient")
    .attr("id", "legend-gradient")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "100%").attr("y2", "0%");

  const gradientSteps = 10;
  for (let i = 0; i <= gradientSteps; i++) {
    linearGradient.append("stop")
      .attr("offset", `${(i / gradientSteps) * 100}%`)
      .attr("stop-color", colorScale((i / gradientSteps) * dataRange));
  }

  legendSvg.append("rect")
    .attr("x", legendMargin / 2)
    .attr("y", 10)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#legend-gradient)")
    .style("stroke", "none");

  // Legend scale labels
  legendSvg.append("text")
    .attr("x", legendMargin / 2)
    .attr("y", 35)
    .attr("font-size", "12px")
    .attr("fill", "#555")
    .text(`0 ${unit}`);

  legendSvg.append("text")
    .attr("x", legendWidth + (legendMargin / 2) - 20)
    .attr("y", 35)
    .attr("font-size", "12px")
    .attr("fill", "#555")
    .text(`${dataRange} ${unit}`);
};

