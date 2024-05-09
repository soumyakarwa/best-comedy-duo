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

export const bigBangTheoryMainCharacters = [
  "sheldon",
  "leonard",
  "penny",
  "bernadette",
  "amy",
  "raj",
  "koothrapali",
  "howard",
];

export const brooklynNineNineMainCharacters = [
  "jake",
  "holt",
  "amy",
  "terry",
  "rosa",
  "charles",
  "hitchcock",
  "scully",
  "gina",
  "squad",
  "nine-nine",
];

export const modernFamilyCharacters = [
  "phil",
  "claire",
  "alex",
  "luke",
  "haley",
  "cameron",
  "mitchell",
  "lily",
  "gloria",
  "jay",
  "manny",
  "joe",
  "family",
];
