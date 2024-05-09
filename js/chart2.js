import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as Constants from "./constants.js";

export function drawChart2(data, c) {
  const width = 1400 * 0.65;
  const height = 700;
  const margin = 20;
  const radius = 150;

  const svg = d3
    .select(`#donut-charts`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const brooklynNineNineGroup = svg
    .append("g")
    .attr("transform", `translate(${width * 0.25}, ${height * 0.25})`);

  const modernFamilyGroup = svg
    .append("g")
    .attr("transform", `translate(${width * 0.74}, ${height * 0.4})`);

  const bigBangTheoryGroup = svg
    .append("g")
    .attr("transform", `translate(${width * 0.33}, ${height * 0.73})`);

  Constants.legendData.forEach((d) => {
    const group = eval(d.id + "Group");
    donutChartHelper(group, radius, data[d.id], d.color, d.text);
  });
}

function donutChartHelper(group, radius, data, c, title) {
  const dataArray = Object.entries(data).map(([key, value]) => ({
    key,
    value,
  }));
  const labelRadius = radius;
  dataArray.sort((a, b) => b.value - a.value);
  const total = d3.sum(dataArray, (d) => d.value);
  const interpolate = d3.interpolateHslLong(c, Constants.whiteColor);

  const colors = dataArray.map((_, i) =>
    interpolate(i / (dataArray.length - 1))
  );
  const colorScale = d3
    .scaleOrdinal()
    .domain(dataArray.map((d) => d.key))
    .range(colors);

  const pie = d3.pie().value((d) => d.value);
  const data_ready = pie(dataArray);
  const arc = d3
    .arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius * 1);
  const outerArc = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  // creating donut sections
  const arcs = group
    .selectAll("allSlices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => colorScale(d.data.key))
    .attr("stroke", Constants.whiteColor)
    .style("stroke-width", "2px");

  // adding character labels
  const labels = group
    .selectAll("allLabels")
    .data(data_ready)
    .enter()
    .append("text")
    .attr("transform", function (d) {
      const pos = outerArc.centroid(d);
      pos[0] = labelRadius * (midAngle(d) < Math.PI ? 1 : -1);
      return `translate(${pos})`;
    })
    .style("text-anchor", function (d) {
      return midAngle(d) < Math.PI ? "start" : "end";
    })
    .text((d) => d.data.key)
    .attr("fill", Constants.blackColor)
    .style("font-size", Constants.labelFontSize);

  // adding lines leading to labels
  const polylines = group
    .selectAll("allPolylines")
    .data(data_ready)
    .enter()
    .append("polyline")
    .attr("stroke", Constants.blackColor)
    .style("fill", "none")
    .attr("stroke-width", 0.5)
    .attr("points", function (d) {
      const pos = outerArc.centroid(d);
      const pos2 = outerArc.centroid(d);
      pos2[0] = labelRadius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
      return [arc.centroid(d), outerArc.centroid(d), pos2];
    });

  // creating mouse hover interaction
  arcs
    .on("mouseover", function (event, d) {
      const percent = ((d.data.value / total) * 100).toFixed(1) + "%";
      // fading out arcs that are not hovered upon
      group
        .selectAll("path")
        .filter((p) => p !== d)
        .transition()
        .duration(Constants.transitionDuration / 2)
        .attr("opacity", 0.3);

      labels
        .filter((p) => p !== d)
        .transition()
        .duration(Constants.transitionDuration / 2)
        .attr("opacity", 0);

      polylines
        .filter((p) => p !== d)
        .transition()
        .duration(Constants.transitionDuration / 2)
        .attr("opacity", 0);

      group
        .append("text")
        .attr("class", "percentage-label")
        .attr("text-anchor", "middle")
        .attr("dy", "-1.2em")
        .text(percent)
        .attr("fill", Constants.blackColor)
        .style("font-size", Constants.labelFontSize)
        .style("font-weight", "bold");
    })
    .on("mouseout", function (event, d) {
      group.selectAll("path").transition().duration(200).attr("opacity", 1);

      labels
        .transition()
        .duration(200)
        .attr("opacity", 1)
        .text((d) => d.data.key); // Restore original label text

      polylines
        .transition()
        .duration(Constants.transitionDuration / 2)
        .attr("opacity", 1);

      group.selectAll(".percentage-label").remove();
    });

  function midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  group
    .append("text")
    .attr("class", "donut-title")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em") // Center the text vertically
    .text(title)
    .attr("fill", Constants.blackColor)
    .style("font-size", Constants.bodyFontSize);
}
