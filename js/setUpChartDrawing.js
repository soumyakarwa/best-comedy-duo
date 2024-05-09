import { drawChart1 } from "./chart1.js"; // Assume chartModules.js contains all draw functions
import { drawChart2 } from "./chart2.js";
import { drawChart3 } from "./chart3.js";
import { processDataForGraph2, getTopCharacter } from "./util.js";

export function setupChartDrawing(data) {
  console.log("setupdrawing clled");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("hi");
          switch (entry.target.id) {
            case "chart-1":
              drawChart1(data.finalData);
              break;
            case "chart-2":
              drawChart2(data.characterCounts);
              break;
            case "chart-3":
              drawChart3(data.graph3Data.nodes, data.graph3Data.links);
              break;
          }
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }
  );

  document.querySelectorAll(".chart-section").forEach((section) => {
    observer.observe(section);
  });
}
