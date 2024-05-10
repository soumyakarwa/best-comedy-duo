// util.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function convertBigBangTheoryDateFormat(dateString) {
  // Define parsers for both full month name and abbreviated month with a period
  const parseFullMonth = d3.timeParse("%d %B %Y"); // e.g., "16 May 2019"
  const parseAbbrevMonth = d3.timeParse("%d %b. %Y"); // e.g., "24 Sep. 2007"

  let date = parseFullMonth(dateString);
  if (!date) {
    date = parseAbbrevMonth(dateString);
  }

  const formatDate = d3.timeFormat("%Y-%m-%d");

  if (!date) {
    console.error("Failed to parse date:", dateString);
    return dateString; // or return the original dateString, or any other fallback
  }

  return formatDate(date);
}

export function convertBrooklynNineNineDateFormat(dateString) {
  const parseDate = d3.timeParse("%d/%m/%Y");
  const formatDate = d3.timeFormat("%Y-%m-%d");

  let date = parseDate(dateString);

  if (!date) {
    console.error("Failed to parse date:", dateString);
    return dateString; // or return the original dateString, or any other fallback
  }

  return formatDate(date);
}

export function calculateTrianglePoints(x, y, size) {
  const height = (size * Math.sqrt(3)) / 2; // Height of the equilateral triangle
  return [
    { x: x, y: y - height / 2 }, // Top vertex
    { x: x - size / 2, y: y + height / 2 }, // Bottom left vertex
    { x: x + size / 2, y: y + height / 2 }, // Bottom right vertex
  ];
}

export function calculateIsoscelesTrianglePoints(x, y, size) {
  const height = (size * Math.sqrt(3)) / 2; // Height calculation similar to equilateral for consistency
  const base = size; // Base length, can be adjusted
  return [
    { x: x, y: y - height / 2 }, // Top vertex (apex)
    { x: x - base / 2, y: y + height / 2 }, // Bottom left vertex
    { x: x + base / 2, y: y + height / 2 }, // Bottom right vertex
  ];
}

export function processDataForGraph2(showData) {
  // Sort the show's data in descending order by rating
  showData.sort((a, b) => b.rating - a.rating);

  // Calculate the number of entries for the top 25%
  var top25PercentCount = Math.ceil(showData.length * 0.25);

  // Return the top 25% of entries
  return showData.slice(0, top25PercentCount);
}

export function getTopCharacter(showData) {
  const dataArray = Object.entries(showData).map(([key, value]) => ({
    key,
    value,
  }));
  dataArray.sort((a, b) => b.value - a.value);
  return dataArray[0];
}

export function writeNameProperly(name) {
  if (!name || name.length === 0) return ""; // Return empty if the input is empty or not provided

  const firstLetter = name[0].toUpperCase(); // Capitalize the first letter
  const restOfName = name.slice(1).toLowerCase(); // Ensure the rest of the name is in lowercase

  return firstLetter + restOfName; // Concatenate and return the properly formatted name
}

export function findMaxKey(data) {
  return Object.keys(data).reduce((a, b) => (data[a] > data[b] ? a : b));
}

// creating an arrow hed
// svg
// .append("defs")
// .append("marker")
// .attr("id", "arrowhead")
// .attr("viewBox", "-0 -5 10 10") // Coordinates of the viewBox create a bounding box for the path
// .attr("refX", 5) // x position of the reference point of the marker (tip of the arrow)
// .attr("refY", 0)
// .attr("orient", "auto")
// .attr("markerWidth", 6)
// .attr("markerHeight", 6)
// .attr("xoverflow", "visible")
// .append("svg:path")
// .attr("d", "M 0,-5 L 10 ,0 L 0,5") // A basic triangle
// .attr("fill", "#333");
