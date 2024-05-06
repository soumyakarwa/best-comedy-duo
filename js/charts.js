// charts.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as Constants from "./constants.js";
import {
  calculateTrianglePoints,
  calculateIsoscelesTrianglePoints,
} from "./util.js";

/**
 *
 * @param {*} data1
 * @param {*} data2
 * @param {*} data3
 */
export async function drawHeatmap(data1, data2, data3) {
  // Example data structure from your screenshot

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const width = 1200 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // Create SVG
  const svg = d3
    .select("#chart-1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Set scales
  const xScale = d3
    .scaleBand()
    .domain(data3.map((d) => d.episode))
    .range([0, width])
    .padding(0.1);

  const yScale = d3
    .scaleBand()
    .domain(data3.map((d) => d.season))
    .range([0, height])
    .padding(0.1);

  const sizeScale = d3
    .scaleLinear()
    .domain(d3.extent(data3, (d) => parseFloat(d.rating)))
    .range([5, 50]); // Size range for the squares, min and max

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Append the x-axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  // Append the y-axis
  svg.append("g").call(yAxis);

  svg
    .selectAll(".big-bang-theory-circle")
    .data(data3)
    .enter()
    .append("circle")
    .attr("class", "big-bang-theory-circle")
    .attr("cx", (d) => xScale(d.episode) + xScale.bandwidth() / 2) // Center the square
    .attr("cy", (d) => yScale(d.season) + yScale.bandwidth() / 2) // Center the square
    .attr("r", (d) => sizeScale(parseFloat(d.rating)) / 2)
    .attr("fill", Constants.redColor);

  // add
  svg
    .selectAll("modern-family")
    .data(data2)
    .enter()
    .append("rect")
    .attr("class", "modern-family")
    .attr(
      "x",
      (d) =>
        xScale(d.episode) +
        xScale.bandwidth() / 2 -
        sizeScale(parseFloat(d.rating)) / 2
    ) // Center the square
    .attr(
      "y",
      (d) =>
        yScale(d.season) +
        yScale.bandwidth() / 2 -
        sizeScale(parseFloat(d.rating)) / 2
    ) // Center the square
    .attr("width", (d) => sizeScale(parseFloat(d.rating)))
    .attr("height", (d) => sizeScale(parseFloat(d.rating)))
    .attr("fill", Constants.blueColor); // Change fill based on your preference

  svg
    .selectAll(".brooklyn-nine-nine")
    .data(data1)
    .enter()
    .append("path")
    .attr("class", "brooklyn-nine-nine")
    .attr("d", (d) => {
      const points = calculateIsoscelesTrianglePoints(
        xScale(d.episode) + xScale.bandwidth() / 2,
        yScale(d.season) + yScale.bandwidth() / 2,
        sizeScale(parseFloat(d.rating))
      );
      return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;
    })
    .attr("fill", Constants.yellowColor);

  //   svg
  //     .selectAll(".modern-family-circle")
  //     .data(data2)
  //     .enter()
  //     .append("circle")
  //     .attr("class", "modern-family-circle")
  //     .attr("cx", (d) => xScale(d.episode) + xScale.bandwidth() / 2) // Center the square
  //     .attr("cy", (d) => yScale(d.season) + yScale.bandwidth() / 2) // Center the square
  //     .attr("r", (d) => sizeScale(parseFloat(d.rating)) / 2)
  //     .attr("fill", Constants.blueColor);
}

export async function drawLayeredChart(data) {
  const margin = { top: 30, right: 30, bottom: 60, left: 30 };
  const width = 1400;
  const height = 750;
  const legendHeight = 70;
  const chartWidth = width - margin.right - margin.left;
  const chartHeight = height - legendHeight - margin.top - margin.bottom;

  console.log(`margin is ${Constants.margin}`);

  // Create SVG
  const svg = d3
    .select("#chart-1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black")
    .style("font-family", "Inter")
    .style("font-size", Constants.bodyFontSize);

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // svg
  //   .append("ellipse")
  //   .attr("cx", 0)
  //   .attr("cy", 0)
  //   .attr("rx", 5)
  //   .attr("ry", 5)
  //   .attr("fill", "black");
  // svg
  //   .append("ellipse")
  //   .attr("cx", 0)
  //   .attr("cy", chartHeight)
  //   .attr("rx", 5)
  //   .attr("ry", 5)
  //   .attr("fill", "black");
  // svg
  //   .append("ellipse")
  //   .attr("cx", 0)
  //   .attr("cy", height)
  //   .attr("rx", 5)
  //   .attr("ry", 5)
  //   .attr("fill", "black");

  chart
    .append("ellipse")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", "black");

  chart
    .append("ellipse")
    .attr("cx", chartWidth)
    .attr("cy", 0)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", "black");
  chart
    .append("ellipse")
    .attr("cx", chartWidth)
    .attr("cy", chartHeight)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", "black");
  chart
    .append("ellipse")
    .attr("cx", 0)
    .attr("cy", chartHeight)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", "black");

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.episode))
    .range([0, chartWidth]);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.season))
    .range([0, chartHeight]);

  const sizeScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseFloat(d.rating)))
    .range([10, 50]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(["The Big Bang Theory", "Modern Family", "Brooklyn Nine Nine"])
    .range([Constants.redColor, Constants.blueColor, Constants.yellowColor]);

  // Sort data to ensure circles are layered correctly
  data.sort((a, b) => b.rating - a.rating);

  // Append groups for each episode
  const episodes = chart.selectAll(".episode").data(data).enter().append("g");

  // Append rect in each group
  episodes.each(function (d) {
    d3.select(this)
      .selectAll("rect")
      .data([d]) // Bind current data point to single circle
      .enter()
      .append("rect")
      .attr(
        "x",
        (d) =>
          xScale(d.episode) +
          xScale.bandwidth() / 2 -
          sizeScale(parseFloat(d.rating)) / 2
      ) // Center the square
      .attr(
        "y",
        (d) =>
          yScale(d.season) +
          yScale.bandwidth() / 2 -
          sizeScale(parseFloat(d.rating)) / 2
      ) // Center the square
      .attr("width", (d) => sizeScale(d.rating))
      .attr("height", (d) => sizeScale(d.rating))
      .attr("fill", (d) => colorScale(d.show)); // Use color scale based on the show
  });

  const bbtDataPt = data.filter(
    (d) =>
      d.show === "The Big Bang Theory" && d.season === "12" && d.episode === "1"
  );

  const legendData = [
    { color: Constants.yellowColor, text: "Brooklyn Nine-Nine" },
    { color: Constants.blueColor, text: "Modern Family" },
    { color: Constants.redColor, text: "The Big Bang Theory" },
  ];

  console.log(bbtDataPt[0].rating);

  const firstXPos =
    xScale("1") + xScale.bandwidth() / 2 - sizeScale(bbtDataPt[0].rating) / 2;

  const legend = chart
    .append("g")
    .attr(
      "transform",
      `translate(${firstXPos}, ${chartHeight + margin.top / 2})`
    );

  var spacing = 0;

  legendData.forEach((item, index) => {
    const buttonGroup = legend
      .append("g")
      .attr("transform", `translate(${spacing}, 0)`);

    // Append a rectangle to act as the button background
    const buttonRect = buttonGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 30)
      .attr("fill", item.color)
      .style("cursor", "pointer") // Change cursor on hover to indicate it's clickable
      .on("click", () => {
        // Define click behavior, e.g., filter data based on the show
        console.log(`Filtering data for: ${item.text}`);
      });

    // Append text to the button
    const buttonText = buttonGroup
      .append("text")
      .attr("y", 16)
      .text(item.text)
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none") // Prevent text from blocking click events on the rectangle
      .style("fill", "white");

    const textWidth = buttonText.node().getBBox().width + 10;

    buttonText.attr("x", textWidth / 2);
    buttonRect.attr("width", textWidth);

    spacing += textWidth + 10;
  });

  // Add the Y Axis
  //   svg.append("g").call(d3.axisLeft(yScale));
}
