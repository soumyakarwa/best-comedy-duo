import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  formatBrooklynNineNineData,
  formatModernFamilyData,
  formatBigBangTheoryData,
} from "./dataCleaning.js";
import { drawHeatmap, drawLayeredChart } from "./charts.js";
import * as Constants from "./constants.js";

const intro = d3.select("#intro");
const main = d3.select("#main");
const chart1 = d3.select("#chart-1");
const chart2 = d3.select("#chart-2");
const chart3 = d3.select("#chart-3");
const footer = d3.select("#footer");

async function loadData(url) {
  const response = await d3.csv(url);
  return response;
}

const brooklynNineNine = await loadData("/data/brooklyn-nine-nine.csv");
const bigBangTheory = await loadData("/data/big-bang-theory.csv");
const modernFamily = await loadData("/data/modern-family.csv");

// aligning all data formats
const formattedBrooklynNineNine = formatBrooklynNineNineData(brooklynNineNine);
const formattedBigBangTheory = formatBigBangTheoryData(bigBangTheory);
const formattedModernFamily = formatModernFamilyData(modernFamily);

// Concatenate all data into a single array
var finalData = formattedBrooklynNineNine.concat(
  formattedBigBangTheory,
  formattedModernFamily
);

// drawHeatmap(
//   formattedBrooklynNineNine,
//   formattedModernFamily,
//   formattedBigBangTheory
// );

drawLayeredChart(finalData);

console.log(finalData); // .forEach((d) => console.log(d.show, d.season, d.episode)));

// any additional steps for drawing into charts goes here
