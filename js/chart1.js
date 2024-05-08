// charts.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as Constants from "./constants.js";

/**
 *
 * @param {*} data
 */
export async function drawChart1(data) {
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = 1400;
  const height = 750;
  const legendHeight = 70;
  const chartWidth = width - margin.right - margin.left;
  const chartHeight = height - legendHeight - margin.top - margin.bottom;
  const bbtDataPt = data.filter(
    (d) =>
      d.show === "The Big Bang Theory" && d.season === "12" && d.episode === "1"
  );

  const svg = d3
    .select("#chart-1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    // .style("border", "1px solid black")
    .style("font-family", Constants.bodyFont)
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

  // chart
  //   .append("ellipse")
  //   .attr("cx", 0)
  //   .attr("cy", 0)
  //   .attr("rx", 5)
  //   .attr("ry", 5)
  //   .attr("fill", "black");

  // chart
  //   .append("ellipse")
  //   .attr("cx", chartWidth)
  //   .attr("cy", 0)
  //   .attr("rx", 5)
  //   .attr("ry", 5)
  //   .attr("fill", "black");
  // chart
  //   .append("ellipse")
  //   .attr("cx", chartWidth)
  //   .attr("cy", chartHeight)
  //   .attr("rx", 5)
  //   .attr("ry", 5)
  //   .attr("fill", "black");
  // chart
  //   .append("ellipse")
  //   .attr("cx", 0)
  //   .attr("cy", chartHeight)
  //   .attr("rx", 5)
  //   .attr("ry", 5)
  //   .attr("fill", "black");

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
    .domain(Constants.legendData.map((item) => item.text))
    .range(Constants.legendData.map((item) => item.color));

  data.sort((a, b) => b.rating - a.rating);
  const episodes = chart.selectAll(".episode").data(data).enter().append("g");

  // Append rect in each group
  episodes.each(function (d) {
    d3.select(this)
      .append("rect")
      .attr("class", () => `rect-${d.show.replace(/\s+/g, "-")}`)
      .attr(
        "x",
        (d) =>
          xScale(d.episode) +
          xScale.bandwidth() / 2 -
          sizeScale(parseFloat(d.rating)) / 2
      )
      .attr(
        "y",
        (d) =>
          yScale(d.season) +
          yScale.bandwidth() / 2 -
          sizeScale(parseFloat(d.rating)) / 2
      )
      .attr("width", (d) => sizeScale(d.rating))
      .attr("height", (d) => sizeScale(d.rating))
      .attr("fill", (d) => colorScale(d.show))
      .on("mouseover", function (event, d) {
        showTooltip(d, event, data);
      })
      .on("mouseout", function () {
        d3.select("#tooltip").style("display", "none");
      });
  });

  const firstXPos =
    xScale("1") + xScale.bandwidth() / 2 - sizeScale(bbtDataPt[0].rating) / 2;

  const legend = chart
    .append("g")
    .attr(
      "transform",
      `translate(${firstXPos}, ${chartHeight + margin.top / 10})`
    );

  createAxes(chart, chartWidth, chartHeight, margin, xScale, yScale);
  createHeatMapButtonControllers(legend);
}

/**
 *
 * @param {*} group
 */
function createHeatMapButtonControllers(group) {
  var spacing = 0;
  var visibilityState = {};
  Constants.legendData.forEach((item, index) => {
    visibilityState[item.text] = true;

    const buttonGroup = group
      .append("g")
      .attr("transform", `translate(${spacing}, 0)`);

    // Append a rectangle to act as the button background
    const buttonRect = buttonGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 35)
      .attr("fill", item.color)
      .style("cursor", "pointer");

    // Append text to the button
    const buttonText = buttonGroup
      .append("text")
      .attr("y", 18)
      .text(item.text)
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .style("fill", Constants.whiteColor);

    const textWidth = buttonText.node().getBBox().width + 20;

    buttonText.attr("x", textWidth / 2);
    buttonRect.attr("width", textWidth);

    buttonRect.on("click", () => {
      visibilityState[item.text] = !visibilityState[item.text];

      // changing opacity of the rectangles belonging to a certain show
      d3.selectAll(`.rect-${item.text.replace(/\s+/g, "-")}`)
        .transition()
        .duration(Constants.transitionDuration)
        .style("opacity", visibilityState[item.text] ? 1 : 0);

      // changing the background color and border of the rect
      buttonRect
        .transition()
        .duration(Constants.transitionDuration)
        .attr(
          "fill",
          visibilityState[item.text] ? item.color : Constants.whiteColor
        )
        .attr("stroke", visibilityState[item.text] ? "none" : item.color)
        .attr("stroke-width", visibilityState[item.text] ? "0" : "1px");

      // changing the color of the button text
      buttonText
        .transition()
        .duration(Constants.transitionDuration)
        .style(
          "fill",
          visibilityState[item.text] ? Constants.whiteColor : item.color
        );
    });

    spacing += textWidth + 10;
  });
}

/**
 *
 * @param {*} group
 * @param {*} chartWidth
 * @param {*} chartHeight
 * @param {*} margin
 * @param {*} xScale
 * @param {*} yScale
 */
function createAxes(group, chartWidth, chartHeight, margin, xScale, yScale) {
  const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
  const xAxisGroup = group
    .append("g")
    .attr("transform", `translate(0, -${margin.top / 2})`)
    .call(xAxis);
  xAxisGroup
    .selectAll(".tick text")
    .style("font-size", Constants.labelFontSize);
  xAxisGroup.select(".domain").remove();

  const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10);
  const yAxisGroup = group.append("g").call(yAxis);
  yAxisGroup
    .selectAll(".tick text")
    .style("font-size", Constants.labelFontSize);
  yAxisGroup.select(".domain").remove();

  xAxisGroup
    .append("text")
    .attr("class", "axis-label")
    .attr("x", chartWidth / 2)
    .attr("y", -5)
    .style("text-anchor", "middle")
    .text("episode")
    .style("fill", Constants.blackColor)
    .style("font-size", Constants.labelFontSize);

  yAxisGroup
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", `rotate(-90)`)
    .attr("y", -margin.left / 2)
    .attr("x", -chartHeight / 2)
    .style("text-anchor", "middle")
    .text("season")
    .style("fill", Constants.blackColor)
    .style("font-size", Constants.labelFontSize);
}

/**
 *
 * @param {*} d
 * @param {*} event
 * @param {*} data
 */
function showTooltip(d, event, data) {
  // Filter data for all shows with the same season and episode
  const relatedData = data.filter(
    (item) => item.season === d.season && item.episode === d.episode
  );
  let content = `<div style="font-size: var(--label-font-size); font-family: var(--body-font-bold);margin-bottom: 8px;"><strong>Season ${d.season}, Episode ${d.episode}</div>`;
  relatedData.forEach((item) => {
    content += `<div style="margin-bottom: 2px;">${item.show}: Rating ${item.rating}</div>`;
  });

  d3.select("#tooltip")
    .style("display", "block")
    .style("left", `${event.pageX + 10}px`)
    .style("top", `${event.pageY + 10}px`)
    .html(content);
}
