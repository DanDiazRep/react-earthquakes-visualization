import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { WorldMapProps, GeoPathValueFn } from "./types";
import fetchCountriesData from "./fetchCountriesData";
import { feature } from "topojson-client";
import { Topology } from "topojson-specification";
import LegendBubble from "./legendBubble";

const WorldMap = ({
  earthquakeData,
  selectedMonth,
  bubbleOption = "magnitude",
  selectedYear,
}: WorldMapProps) => {
  const chartRef = useRef(null);

  const magnitudeSteps = [
    "<= 5.5 Mag.",
    "< 6.0 Mag.",
    "< 7.0 Mag.",
    "< 8.0 Mag.",
    ">= 8.0 Mag.",
  ];
  const depthSteps = ["<= 140m", "< 280m", "< 420m", "< 560m", ">= 560m"];

  const rgbToHex = (red: number, green: number, blue: number) => {
    // Convert RGB values to hexadecimal format
    var rgb = blue | (green << 8) | (red << 16);
    return "#" + (0x1000000 + rgb).toString(16).slice(1);
  };

  const depthScaleToColor = (depth: number) => {
    // FIXXXXME simplified color scale for presentation
    const colors = colorArray;
    if (depth <= 140) {
      return colors[4];
    } else if (depth < 280) {
      return colors[3];
    } else if (depth < 420) {
      return colors[2];
    } else if (depth < 560) {
      return colors[1];
    } else {
      return colors[0];
    }
  };

  const mapScale = (
    depth: number,
    minInput: number = 0,
    maxInput: number = 10,
    minOutput: number = 1,
    maxOutput: number = 20
  ) => {
    const scaledValue = (depth - minInput) / (maxInput - minInput);
    const size = scaledValue * (maxOutput - minOutput) + minOutput;
    return size;
  };

  const mapScaleDepth = (
    depth: number,
    minInput: number = 0,
    maxInput: number = 10,
    minOutput: number = 1,
    maxOutput: number = 20
  ) => {
    const reversedValue = 1 - (depth - minInput) / (maxInput - minInput);
    const size = reversedValue * (maxOutput - minOutput) + minOutput;
    return size;
  };

  const colorScale = d3
    .scaleLinear()
    .domain([0, 4]) // Input domain: 0 to 4 (5 colors in total)
    .range(["#00ff00", "#ff0000"]); // Color range from green to red

  const colorArray = [
    d3.color(colorScale(0)).formatHex(),
    d3.color(colorScale(1)).formatHex(),
    d3.color(colorScale(2)).formatHex(),
    d3.color(colorScale(3)).formatHex(),
    d3.color(colorScale(4)).formatHex(),
  ];

  const magnitudeScaleToColor = (magnitude: number) => {
    // FIXXXME simplified color scale for presentation
    const colors = colorArray;
    if (magnitude <= 5.5) {
      return colors[0];
    } else if (magnitude < 6.0) {
      return colors[1];
    } else if (magnitude < 7.0) {
      return colors[2];
    } else if (magnitude < 8.0) {
      return colors[3];
    } else {
      return colors[4];
    }

    if (magnitude <= 5.5) {
      return "#00ff00";
    } else if (magnitude < 6.0) {
      // Calculate the green value based on the magnitude within the range
      var green = Math.floor((magnitude - 5.5) * (255 / 0.5));
      return rgbToHex(0, green, 0);
    } else if (magnitude < 7.0) {
      // Calculate the red value based on the magnitude within the range
      var red = Math.floor((magnitude - 6.0) * (255 / 1.0));
      return rgbToHex(red, 255, 0);
    } else if (magnitude < 8.0) {
      // Calculate the green value based on the magnitude within the range
      var green = Math.floor((8.0 - magnitude) * (255 / 1.0));
      return rgbToHex(255, green, 0);
    } else {
      return "#ff0000";
    }
  };

  useEffect(() => {
    const drawMap = async () => {
      if (chartRef.current) {
        const width = window.innerWidth * 0.95;
        const height = window.innerHeight * 0.95;

        // Clear the previous content of chartRef
        d3.select(chartRef.current).html("");

        // Create SVG
        const svg = d3
          .select(chartRef.current)
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        // Append empty placeholder g element to the SVG
        // g will contain geometry elements
        const map = svg.append("g");
        const earthquakes = svg.append("g");
        const world: Topology = await fetchCountriesData();
        const land = feature(world, world.objects.land);

        // Define projection
        const projection = d3.geoEqualEarth().fitSize([width, height], land);

        // Update the projection scale and translation based on the container size
        projection.scale(projection.scale());
        projection.translate([width / 2, height / 2]);

        // Define path generator
        const path = d3.geoPath().projection(projection);
        const graticule = d3.geoGraticule10();
        const borders = feature(world, world.objects.countries);

        // Draw the map elements
        map
          .append("path")
          .datum(graticule)
          .attr("d", path as GeoPathValueFn)
          .attr("stroke", "#ccc")
          .attr("fill", "#000")
          .attr("opacity", 0.4)
          .attr("class", "graticule");

        /*map.append('path')
                    .datum(land)
                    .attr('d', path as GeoPathValueFn)
                    .attr('class', 'land')
                    .attr('fill', '#fff');*/

        map
          .append("path")
          .datum(borders)
          .attr("d", path as GeoPathValueFn)
          .attr("stroke", "#ccc")
          .attr("class", "borders");

        // Add circles representing earthquakes
        earthquakes
          .selectAll(".quake")
          .data(
            earthquakeData.filter(
              (d) => d.month === selectedMonth && d.year === selectedYear
            )
          )
          .enter()
          .append("circle")
          .attr("class", "quake")
          .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
          .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
          .attr("r", (d) =>
            bubbleOption === "Magnitude"
              ? mapScale(d.magnitude)
              : mapScaleDepth(d.depth, -1, 700)
          )
          .attr("stroke", (d) =>
            bubbleOption === "Magnitude"
              ? magnitudeScaleToColor(d.magnitude)
              : depthScaleToColor(d.depth)
          )
          .attr("stroke-width", 1)
          .attr("fill", (d) =>
            bubbleOption === "Magnitude"
              ? magnitudeScaleToColor(d.magnitude)
              : depthScaleToColor(d.depth)
          )
          .attr("fill-opacity", 0.4);
      }
    };

    drawMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earthquakeData, selectedMonth, selectedYear, bubbleOption]);

  return (
    <div>
      <div ref={chartRef} className="world-map p-10"></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 50,
        }}
      >
        {bubbleOption === "Magnitude"
          ? magnitudeSteps.map((step, index) => (
              <LegendBubble
                key={index}
                color={colorArray[index]}
                value={step}
              />
            ))
          : depthSteps
              .reverse()
              .map((step, index) => (
                <LegendBubble
                  key={index}
                  color={colorArray[index]}
                  value={step}
                />
              ))}
      </div>
    </div>
  );
};

export default WorldMap;
