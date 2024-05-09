// chart3.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as Constants from "./constants.js";

export function drawChart3(nodes, links) {
  const width = 1400;
  const height = 600;
  const margin = 20;
  const radius = 10;

  const svg = d3
    .select(`#chart-3`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  networkChartHelper(
    svg,
    width,
    height,
    radius,
    nodes.bigBangTheory,
    links.bigBangTheory,
    -width / 3,
    0
  );
  networkChartHelper(
    svg,
    width,
    height,
    radius,
    nodes.modernFamily,
    links.modernFamily,
    0,
    0
  );
  networkChartHelper(
    svg,
    width,
    height,
    radius,
    nodes.brooklynNineNine,
    links.brooklynNineNine,
    width / 3,
    0
  );
}

function networkChartHelper(
  svg,
  width,
  height,
  radius,
  nodes,
  links,
  offsetX,
  offsetY
) {
  const centerForceX = width / 2 + offsetX;
  const centerForceY = height / 2 + offsetY;
  const minRadius = 30;
  const maxRadius = 60;
  const radiusScale = d3
    .scaleLinear()
    .domain([d3.min(links, (d) => d.value), d3.max(links, (d) => d.value)])
    .range([minRadius, maxRadius]);

  const targetValues = [];

  for (let i = 0; i < links.length; i++) {
    targetValues.push({ [links[i].target]: links[i].value });
  }

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance((d) => 400 / Math.sqrt(d.value))
    )
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(centerForceX, centerForceY))
    .on("tick", ticked);

  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", 1);

  const node = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("g") // Create a group for each node
    .attr("class", "node")
    .call(drag(simulation));

  node
    .append("circle")
    .attr("r", (d) => {
      const value = targetValues.find((obj) => obj.hasOwnProperty(d.id));
      return value ? radiusScale(value[d.id]) : minRadius;
    })
    .attr("fill", colorByGroup);

  // Append text to each group
  node
    .append("text")
    .attr("dx", -12)
    .attr("dy", ".35em")
    .text((d) => d.id)
    .style("font-size", Constants.labelFontSize)
    .style("fill", Constants.whiteColor);

  // Update tick function to handle the group
  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    // Update node positions within each group
    node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  }

  function colorByGroup(d) {
    // Example: Differentiate colors by the 'group' attribute or as needed
    switch (d.group) {
      case "modernFamily":
        return Constants.redColor;
      case "brooklynNineNine":
        return Constants.yellowColor;
      case "bigBangTheory":
        return Constants.greenColor;
      default:
        return Constants.yellowColor;
    }
  }

  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = Math.max(radius, Math.min(width - radius, event.x));
      d.fy = Math.max(radius, Math.min(height - radius, event.y));
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
}
