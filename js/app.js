import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  formatBrooklynNineNineData,
  formatModernFamilyData,
  formatBigBangTheoryData,
  bigBangTheoryChart2Data,
  modernFamilyChart2Data,
  brooklynNineNineChart2Data,
} from "./dataCleaning.js";
import { drawChart1 } from "./chart1.js";
import { processDataForGraph2 } from "./util.js";
import { drawChart2 } from "./chart2.js";
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
const finalData = formattedBrooklynNineNine.concat(
  formattedBigBangTheory,
  formattedModernFamily
);

// CHART 1
drawChart1(finalData);

// Assuming each formatted show data is an array
var graph2Data = [
  formattedBrooklynNineNine,
  formattedModernFamily,
  formattedBigBangTheory,
];

for (let i = 0; i < graph2Data.length; i++) {
  graph2Data[i] = processDataForGraph2(graph2Data[i]);
}

var characterCounts = {
  brooklynNineNine: null,
  modernFamily: null,
  bigBangTheory: null,
};

characterCounts.brooklynNineNine = brooklynNineNineChart2Data(graph2Data);
characterCounts.modernFamily = modernFamilyChart2Data(graph2Data);
characterCounts.bigBangTheory = bigBangTheoryChart2Data(graph2Data);

// CHART 2
drawChart2(characterCounts);
