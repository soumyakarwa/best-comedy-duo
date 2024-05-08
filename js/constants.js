// constants.js

const rootStyle = getComputedStyle(document.documentElement);

// Access CSS variables
export const yellowColor = rootStyle.getPropertyValue("--yellow").trim();
export const redColor = rootStyle.getPropertyValue("--red").trim();
export const blueColor = rootStyle.getPropertyValue("--blue").trim();
export const whiteColor = rootStyle.getPropertyValue("--white").trim();
export const blackColor = rootStyle.getPropertyValue("--black").trim();

export const margin = rootStyle.getPropertyValue("--margin").trim();
export const smallerMargin = rootStyle
  .getPropertyValue("--smaller-margin")
  .trim();

export const bodyFontSize = "1rem";
export const labelFontSize = "0.7rem";

export const legendData = [
  { color: yellowColor, text: "Brooklyn Nine-Nine" },
  { color: blueColor, text: "Modern Family" },
  { color: redColor, text: "The Big Bang Theory" },
];

export const bodyFont = rootStyle.getPropertyValue("--body-font").trim();
export const bodyFontBold = rootStyle
  .getPropertyValue("--body-font-bold")
  .trim();

export const transitionDuration = rootStyle
  .getPropertyValue("--transition-duration")
  .trim();
