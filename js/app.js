import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  formatBrooklynNineNineData,
  formatModernFamilyData,
  formatBigBangTheoryData,
  bigBangTheoryChart2Data,
  modernFamilyChart2Data,
  brooklynNineNineChart2Data,
  modernFamilyChart3Data,
  bigBangTheoryChart3Data,
  brooklynNineNineChart3Data,
  graph3ConsolidatedData,
} from "./dataCleaning.js";
import { drawChart1 } from "./chart1.js";
import {
  findMaxKey,
  getTopCharacter,
  processDataForGraph2,
  writeNameProperly,
} from "./util.js";
import { drawChart2 } from "./chart2.js";
import * as Constants from "./constants.js";
import { drawChart3 } from "./chart3.js";
import { fetchAndFormatData } from "./dataProcessing.js";
import { setupChartDrawing } from "./setUpChartDrawing.js";
import { drawChart4 } from "./chart4.js";

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

console.log(finalData);

/////////////////////////////////////////////////////////////////////////////

// CHART 1
drawChart1(finalData);

/////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////

const topCharacters = {
  brooklynNineNine: getTopCharacter(characterCounts.brooklynNineNine),
  modernFamily: getTopCharacter(characterCounts.modernFamily),
  bigBangTheory: getTopCharacter(characterCounts.bigBangTheory),
};

var popularCharacterPairs = {
  brooklynNineNine: null,
  modernFamily: null,
  bigBangTheory: null,
};

var mostPopularCharacterPairs = {
  brooklynNineNine: null,
  modernFamily: null,
  bigBangTheory: null,
};

[
  popularCharacterPairs.brooklynNineNine,
  mostPopularCharacterPairs.brooklynNineNine,
] = brooklynNineNineChart3Data(graph2Data[0], topCharacters.brooklynNineNine);

[popularCharacterPairs.modernFamily, mostPopularCharacterPairs.modernFamily] =
  modernFamilyChart3Data(graph2Data[1], topCharacters.modernFamily);

[popularCharacterPairs.bigBangTheory, mostPopularCharacterPairs.bigBangTheory] =
  bigBangTheoryChart3Data(graph2Data[2], topCharacters.bigBangTheory);

const graph3Data = graph3ConsolidatedData(popularCharacterPairs, topCharacters);

drawChart3(graph3Data.nodes, graph3Data.links);

/////////////////////////////////////////////////////////////////////////////

console.log(topCharacters);

const val1 = findMaxKey(popularCharacterPairs.brooklynNineNine);
const val2 = findMaxKey(popularCharacterPairs.modernFamily);
const val3 = findMaxKey(popularCharacterPairs.bigBangTheory);

const graph4Data = {
  brooklynNineNine: {
    [val1]:
      mostPopularCharacterPairs.brooklynNineNine[val1].totalRating /
      mostPopularCharacterPairs.brooklynNineNine[val1].count,
  },
  modernFamily: {
    [val2]:
      mostPopularCharacterPairs.modernFamily[val2].totalRating /
      mostPopularCharacterPairs.modernFamily[val2].count,
  },
  bigBangTheory: {
    [val3]:
      mostPopularCharacterPairs.bigBangTheory[val3].totalRating /
      mostPopularCharacterPairs.bigBangTheory[val3].count,
  },
};

console.log(graph4Data);

drawChart4(graph4Data, topCharacters);

// async function initialize() {
//   const graph2Data = await fetchAndFormatData();

//   // Assume process and combine data here
//   const finalData = graph2Data[0].concat(graph2Data[1], graph2Data[2]);

//   var characterCounts = {
//     brooklynNineNine: null,
//     modernFamily: null,
//     bigBangTheory: null,
//   };

//   characterCounts.brooklynNineNine = brooklynNineNineChart2Data(graph2Data);
//   characterCounts.modernFamily = modernFamilyChart2Data(graph2Data);
//   characterCounts.bigBangTheory = bigBangTheoryChart2Data(graph2Data);

//   const topCharacters = {
//     brooklynNineNine: getTopCharacter(characterCounts.brooklynNineNine),
//     modernFamily: getTopCharacter(characterCounts.modernFamily),
//     bigBangTheory: getTopCharacter(characterCounts.bigBangTheory),
//   };

//   var popularCharacterPairs = {
//     brooklynNineNine: null,
//     modernFamily: null,
//     bigBangTheory: null,
//   };

//   popularCharacterPairs.brooklynNineNine = brooklynNineNineChart3Data(
//     graph2Data[0],
//     topCharacters.brooklynNineNine
//   );

//   popularCharacterPairs.modernFamily = modernFamilyChart3Data(
//     graph2Data[1],
//     topCharacters.modernFamily
//   );

//   popularCharacterPairs.bigBangTheory = bigBangTheoryChart3Data(
//     graph2Data[2],
//     topCharacters.bigBangTheory
//   );

//   const graph3Data = graph3ConsolidatedData(
//     popularCharacterPairs,
//     topCharacters
//   );

//   // const graph3Data = {
//   //   nodes: [], // Placeholder
//   //   links: [], // Placeholder
//   // };

//   setupChartDrawing({ finalData, characterCounts, graph3Data });
// }

// initialize();
