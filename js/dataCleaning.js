// dataCleaning.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  convertBigBangTheoryDateFormat,
  convertBrooklynNineNineDateFormat,
} from "./util.js";

/**
 *
 * @param {*} data
 * @returns
 */
export function formatBrooklynNineNineData(data) {
  return data.map((item) => {
    return {
      show: "Brooklyn Nine-Nine",
      season: item.Season,
      episode: item.Episode,
      title: item.Title,
      airdate: convertBrooklynNineNineDateFormat(item.Airdate),
      rating: item.Rating,
      totalVotes: item["Total Votes"],
      episodeDescription: item["Episode Description"],
    };
  });
}

/**
 *
 * @param {*} data
 * @returns
 */
export function formatModernFamilyData(data) {
  return data.map((item) => {
    var seasonEpisodeSplit = item["Season-Episode"].split("-");
    return {
      show: "Modern Family",
      season: seasonEpisodeSplit[0].substring(1),
      episode: seasonEpisodeSplit[1].substring(1),
      title: item.Title,
      airdate: item.Airdate,
      rating: item.Rating,
      totalVotes: item["Total Votes"],
      episodeDescription: item.Description,
    };
  });
}

/**
 *
 * @param {*} data
 * @returns
 */
export function formatBigBangTheoryData(data) {
  return data.map((item) => {
    return {
      show: "The Big Bang Theory",
      season: item.season,
      episode: item.episode_num,
      title: item.title,
      airdate: convertBigBangTheoryDateFormat(item.original_air_date),
      rating: item.imdb_rating,
      totalVotes: item.total_votes,
      episodeDescription: item.desc,
    };
  });
}

/**
 *
 * @param {*} graph2Data
 * @returns
 */
export function bigBangTheoryChart2Data(graph2Data) {
  const characterCounts = {
    sheldon: 0,
    leonard: 0,
    penny: 0,
    bernadette: 0,
    amy: 0,
    raj: 0,
    howard: 0,
  };

  const bigBangTheoryData = graph2Data[2];

  // Update character counts based on episode descriptions
  bigBangTheoryData.forEach((episode) => {
    const description = episode.episodeDescription.toLowerCase();

    if (description.includes("the gang")) {
      Object.keys(characterCounts).forEach((character) => {
        characterCounts[character]++;
      });
    } else {
      Object.keys(characterCounts).forEach((character) => {
        if (description.includes(character)) {
          characterCounts[character]++;
        }
        // Special case for Koothrappali
        if (description.includes("koothrapali")) {
          characterCounts["raj"]++; // Correctly reference 'raj' as a key
        }
      });
    }
  });

  return characterCounts;
}

/**
 *
 * @param {*} graph2Data
 * @returns
 */
export function modernFamilyChart2Data(graph2Data) {
  const characterCounts = {
    phil: 0,
    claire: 0,
    alex: 0,
    luke: 0,
    haley: 0,
    cam: 0,
    mitch: 0,
    lily: 0,
    jay: 0,
    gloria: 0,
    manny: 0,
  };

  const modernFamilyData = graph2Data[1];

  // Update character counts based on episode descriptions
  modernFamilyData.forEach((episode) => {
    const description = episode.episodeDescription.toLowerCase();

    if (description.includes("the family")) {
      Object.keys(characterCounts).forEach((character) => {
        characterCounts[character]++;
      });
    } else {
      Object.keys(characterCounts).forEach((character) => {
        if (description.includes(character)) {
          characterCounts[character]++;
        }
      });
    }
  });

  return characterCounts;
}

export function brooklynNineNineChart2Data(graph2Data) {
  const characterCounts = {
    jake: 0,
    amy: 0,
    holt: 0,
    terry: 0,
    rosa: 0,
    gina: 0,
    hitchcock: 0,
    charles: 0,
  };

  const brooklynNineNineData = graph2Data[0];

  // Update character counts based on episode descriptions
  brooklynNineNineData.forEach((episode) => {
    const description = episode.episodeDescription.toLowerCase();

    // Check for mentions of "squad" or "nine-nine"
    if (description.includes("squad") || description.includes("nine-nine")) {
      Object.keys(characterCounts).forEach((character) => {
        characterCounts[character]++;
      });
    } else {
      // Check for specific character mentions
      Object.keys(characterCounts).forEach((character) => {
        if (description.includes(character)) {
          characterCounts[character]++;
        }
      });
    }
  });

  return characterCounts;
}
