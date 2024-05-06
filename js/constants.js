// constants.js

const rootStyle = getComputedStyle(document.documentElement);

// Access CSS variables
export const yellowColor = rootStyle.getPropertyValue("--yellow").trim();
export const redColor = rootStyle.getPropertyValue("--red").trim();
export const blueColor = rootStyle.getPropertyValue("--blue").trim();

export const margin = rootStyle.getPropertyValue("--margin").trim();
export const smallerMargin = rootStyle
  .getPropertyValue("--smaller-margin")
  .trim();

export const bodyFontSize = "1rem";
