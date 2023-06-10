import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GeoPathValueFn, EarthquakeData } from "./types";
import fetchCountriesData from "./useCountriesData";
import { feature } from "topojson-client";
import { Topology } from "topojson-specification";
import LegendBubble from "./legendBubble";

interface WorldMapProps {
  earthquakeData: EarthquakeData[];
  countryData: Topology;
  bubbleOption: string;
}

const WorldMap = (props: WorldMapProps) => {
  const chartRef = useRef(null);
  const [rotation, setRotation] = useState<number[]>([0, 0, 0]);
  const world = props.countryData;

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

    // if (magnitude <= 5.5) {
    //   return "#00ff00";
    // } else if (magnitude < 6.0) {
    //   // Calculate the green value based on the magnitude within the range
    //   var green = Math.floor((magnitude - 5.5) * (255 / 0.5));
    //   return rgbToHex(0, green, 0);
    // } else if (magnitude < 7.0) {
    //   // Calculate the red value based on the magnitude within the range
    //   var red = Math.floor((magnitude - 6.0) * (255 / 1.0));
    //   return rgbToHex(red, 255, 0);
    // } else if (magnitude < 8.0) {
    //   // Calculate the green value based on the magnitude within the range
    //   var green = Math.floor((8.0 - magnitude) * (255 / 1.0));
    //   return rgbToHex(255, green, 0);
    // } else {
    //   return "#ff0000";
    // }
  };

  const animateCircles = () => {
    const circles = d3.selectAll(".quake");

    // Transition to grow the circles
    circles
      .transition()
      .ease(d3.easeSinInOut) // Apply easing function
      .duration(1000)
      .attr("r", (d) =>
        props.bubbleOption === "Magnitude"
          ? mapScale(d.magnitude)
          : mapScaleDepth(d.depth, -1, 700)
      )
      .attr("stroke-width", 0.1) // Increase stroke width for glowing effect
      .attr("fill-opacity", 0.4) // Increase fill opacity for glowing effect
      .transition()
      .duration(200) // Stay big for 200 milliseconds
      .ease(d3.easeSinInOut) // Apply easing function
      .transition()
      .ease(d3.easeSinInOut) // Apply easing function
      .duration(600)
      .attr("r", (d) =>
        props.bubbleOption === "Magnitude"
          ? mapScale(d.magnitude * 0.5)
          : mapScaleDepth(d.depth * 0.5, -1, 700)
      )
      .attr("stroke-width", 2) // Reset stroke width
      .attr("fill-opacity", 0.1) // Reset fill opacity
      .on("end", animateCircles); // Restart the animation
  };

  useEffect(() => {
    if (!world.objects) {
      return;
    }

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

      const land = feature(world, world.objects.land);

      // Define projection
      const projection = d3
        .geoNaturalEarth1() //d3.geoOrthographic()
        .fitSize([width, height], land);

      // Update the projection scale and translation based on the container size
      projection.scale(projection.scale());
      projection.translate([width / 2, height / 2]);
      projection.rotate([rotation[0], rotation[1]]);

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
        .attr("fill-opacity", "0.1")

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
        .attr("opacity", "#ccc")
        .attr("fill", "#444")
        .attr("fill-opacity", "0.5")
        .attr("class", "borders");

      // Add circles representing earthquakes but if it is not on projection then don't show it
      earthquakes
        .selectAll(".quake")
        .data(props.earthquakeData)
        .enter()
        .append("circle")
        .attr("class", "quake")
        .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
        .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
        .attr("r", (d) =>
          props.bubbleOption === "Magnitude"
            ? mapScale(d.magnitude)
            : mapScaleDepth(d.depth, -1, 700)
        )
        .attr("stroke", (d) =>
          props.bubbleOption === "Magnitude"
            ? magnitudeScaleToColor(d.magnitude)
            : depthScaleToColor(d.depth)
        )
        .attr("stroke-width", 1)
        .attr("fill", (d) =>
          props.bubbleOption === "Magnitude"
            ? magnitudeScaleToColor(d.magnitude)
            : depthScaleToColor(d.depth)
        )
        .attr("fill-opacity", 0.2)
        .append("title")
        .text((d) => {
          return `Longitude: ${d.longitude}, Latitude: ${d.latitude}, Depth: ${d.depth}, Magnitude: ${d.magnitude}`;
        });

      animateCircles();

      // rotate the globe based on click release
      const drag = d3.drag().on("drag", function (event) {
        const rotate = projection.rotate();
        setRotation(rotate);
        const k = projection.scale() / 2000;
        projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);
      });

      //svg.call(drag as any);
    }
  }, [
    animateCircles,
    magnitudeScaleToColor,
    props.earthquakeData,
    rotation,
    world,
    props.bubbleOption,
  ]);

  if (!world.objects) {
    return <div className="p-10">Loading...</div>;
  }

  // return <div ref={chartRef} className="world-map p-10"></div>;

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
        {props.bubbleOption === "Magnitude"
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
