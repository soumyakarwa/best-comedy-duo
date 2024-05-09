import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  formatBrooklynNineNineData,
  formatModernFamilyData,
  formatBigBangTheoryData,
} from "./dataCleaning.js";

async function loadData(url) {
  const response = await d3.csv(url);
  return response;
}

export async function fetchAndFormatData() {
  const brooklynNineNine = await loadData("/data/brooklyn-nine-nine.csv");
  const bigBangTheory = await loadData("/data/big-bang-theory.csv");
  const modernFamily = await loadData("/data/modern-family.csv");

  return [
    formatBrooklynNineNineData(brooklynNineNine),
    formatBigBangTheoryData(bigBangTheory),
    formatModernFamilyData(modernFamily),
  ];
}

// export { fetchAndFormatData };
