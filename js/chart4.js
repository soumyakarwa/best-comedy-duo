// chart4.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as Constants from "./constants.js";
import { writeNameProperly } from "./util.js";

export function drawChart4(data, topCharacters) {
  console.log(topCharacters);
  const width = 1400 * 0.6;
  const height = 600;
  const margin = 50;

  const formattedData = Object.keys(data).map((show) => {
    const characterName = Object.keys(data[show])[0]; // Get the single character key
    const averageRating = data[show][characterName];
    console.log(topCharacters[show]);
    return {
      show,
      character: `${writeNameProperly(
        topCharacters[show].key
      )} & ${characterName}`,
      averageRating,
    };
  });

  console.log(formattedData);

  const svg = d3
    .select("#lollipop-charts")
    .append("svg")
    .attr("width", width)
    .attr("height", height + margin * 2)
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

  // X scale
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(formattedData.map((d) => d.character))
    .padding(1);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .attr("stroke-width", 1)
    .selectAll("text")
    .attr("transform", `translate(20, 0)`)
    .style("font-size", Constants.bodyFontSize)
    .style("text-anchor", "end")
    .style("font-family", Constants.bodyFont);

  // Y scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(formattedData, (d) => d.averageRating + 1)])
    .range([height, 0]);

  const yAxis = svg
    .append("g")
    .call(d3.axisLeft(y))
    .attr("stroke-width", 1)
    .style("font-family", Constants.bodyFont)
    .style("font-size", Constants.bodyFontSize);

  yAxis
    .append("text")
    .attr("text-anchor", "middle") // Center the text anchor at the middle of the line
    .attr("transform", "rotate(-90)") // Rotate the text for vertical alignment
    .attr("y", -margin + 10) // Position the text along the Y-axis based on the margin
    .attr("x", -(height / 2)) // Center the text in the middle of the axis
    .text("Average Rating") // The label text
    .style("fill", "black") // Text color
    .style("font-size", "16px") // Optional: Adjust font size according to your design
    .style("font-family", Constants.bodyFont);

  // Lines
  svg
    .selectAll("myline")
    .data(formattedData)
    .join("line")
    .attr("x1", (d) => x(d.character))
    .attr("x2", (d) => x(d.character))
    .attr("y1", (d) => y(d.averageRating))
    .attr("y2", y(0))
    .attr("stroke", (d) => {
      if (d.show === "modernFamily") return Constants.redColor;
      else if (d.show === "brooklynNineNine") return Constants.yellowColor;
      else return Constants.greenColor;
    })
    .attr("stroke-width", 3);

  // Circles
  svg
    .selectAll("mycircle")
    .data(formattedData)
    .join("circle")
    .attr("cx", (d) => x(d.character))
    .attr("cy", (d) => y(d.averageRating))
    .attr("r", 30)
    .style("fill", (d) => {
      if (d.show === "modernFamily") return Constants.redColor;
      else if (d.show === "brooklynNineNine") return Constants.yellowColor;
      else return Constants.greenColor;
    });
  svg
    .selectAll("textRating")
    .data(formattedData)
    .join("text")
    .attr("x", (d) => x(d.character))
    .attr("y", (d) => y(d.averageRating) + 5) // Offset the text a bit above the circle
    .text((d) => d.averageRating.toFixed(2)) // Assuming you want to format the number to two decimal places
    .attr("text-anchor", "middle") // Center the text horizontally
    .style("fill", "white") // Choose a contrasting color
    .style("font-size", "14px") // Set the font size
    .style("font-family", Constants.bodyFont);
}
