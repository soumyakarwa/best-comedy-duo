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
