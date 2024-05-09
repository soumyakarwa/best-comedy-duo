// constants.js

const rootStyle = getComputedStyle(document.documentElement);

// Access CSS variables
export const yellowColor = rootStyle.getPropertyValue("--yellow").trim();
export const greenColor = rootStyle.getPropertyValue("--red").trim();
export const redColor = rootStyle.getPropertyValue("--blue").trim();
export const whiteColor = rootStyle.getPropertyValue("--white").trim();
export const blackColor = rootStyle.getPropertyValue("--black").trim();
export const maxWidth = rootStyle.getPropertyValue("--max-width").trim();
export const chartMargin = rootStyle.getPropertyValue("--chart-margin").trim();

export const margin = rootStyle.getPropertyValue("--margin").trim();
export const smallerMargin = rootStyle
  .getPropertyValue("--smaller-margin")
  .trim();

export const bodyFontSize = "1rem";
export const labelFontSize = "0.7rem";

export const legendData = [
  { color: yellowColor, text: "Brooklyn Nine-Nine", id: "brooklynNineNine" },
  { color: redColor, text: "Modern Family", id: "modernFamily" },
  { color: greenColor, text: "The Big Bang Theory", id: "bigBangTheory" },
];

export const bodyFont = rootStyle.getPropertyValue("--body-font").trim();
export const bodyFontBold = rootStyle
  .getPropertyValue("--body-font-bold")
  .trim();

export const transitionDuration = rootStyle
  .getPropertyValue("--transition-duration")
  .trim();

export const modernFamilyCharacters = {
  Phil: 0,
  Claire: 0,
  Alex: 0,
  Luke: 0,
  Haley: 0,
  Cameron: 0,
  Mitchell: 0,
  Lily: 0,
  Jay: 0,
  Gloria: 0,
  Manny: 0,
};

export const brooklynNineNineCharacters = {
  Jake: 0,
  Rosa: 0,
  Hitchcock: 0,
  Holt: 0,
  Amy: 0,
  Terry: 0,
  Gina: 0,
  Charles: 0,
  Scully: 0,
};

export const bigBangTheoryCharacters = {
  Sheldon: 0,
  Leonard: 0,
  Howard: 0,
  Raj: 0,
  Amy: 0,
  Bernadette: 0,
  Penny: 0,
};
