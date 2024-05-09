// dataCleaning.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  convertBigBangTheoryDateFormat,
  convertBrooklynNineNineDateFormat,
  writeNameProperly,
} from "./util.js";
import * as Constants from "./constants.js";

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
    cameron: 0,
    mitchell: 0,
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

/**
 *
 * @param {*} graph2Data
 * @param {*} topCharacters
 */
export function modernFamilyChart3Data(data, topCharacters) {
  let characterPairs = Object.keys(Constants.modernFamilyCharacters).reduce(
    (newObj, key) => {
      if (writeNameProperly(key) !== writeNameProperly(topCharacters.key)) {
        newObj[key] = Constants.modernFamilyCharacters[key];
      }
      return newObj;
    },
    {}
  );

  data.forEach((episode) => {
    const description = episode.episodeDescription;
    const sentences = description
      .split(/[.!?;]+/)
      .map((sentence) => sentence.trim()); // Split into sentences and trim whitespace

    sentences.forEach((sentence) => {
      let words = RiTa.tokenize(sentence);
      for (let key in characterPairs) {
        if (
          words.includes(key) &&
          words.includes(writeNameProperly(topCharacters.key))
        ) {
          characterPairs[key]++;
        }
      }
    });
  });
  return characterPairs;
}

/**
 *
 * @param {*} graph2Data
 * @param {*} topCharacters
 */
export function bigBangTheoryChart3Data(data, topCharacters) {
  let characterPairs = Object.keys(Constants.bigBangTheoryCharacters).reduce(
    (newObj, key) => {
      if (writeNameProperly(key) !== writeNameProperly(topCharacters.key)) {
        newObj[key] = Constants.bigBangTheoryCharacters[key];
      }
      return newObj;
    },
    {}
  );

  data.forEach((episode) => {
    const description = episode.episodeDescription;
    const sentences = description
      .split(/[.!?;]+/)
      .map((sentence) => sentence.trim()); // Split into sentences and trim whitespace

    sentences.forEach((sentence) => {
      let words = RiTa.tokenize(sentence);
      for (let key in characterPairs) {
        if (
          words.includes(key) &&
          words.includes(writeNameProperly(topCharacters.key))
        ) {
          characterPairs[key]++;
        }
      }
    });
  });
  return characterPairs;
}

/**
 *
 * @param {*} graph2Data
 * @param {*} topCharacters
 */
export function brooklynNineNineChart3Data(data, topCharacters) {
  let characterPairs = Object.keys(Constants.brooklynNineNineCharacters).reduce(
    (newObj, key) => {
      if (writeNameProperly(key) !== writeNameProperly(topCharacters.key)) {
        newObj[key] = Constants.brooklynNineNineCharacters[key];
      }
      return newObj;
    },
    {}
  );

  data.forEach((episode) => {
    const description = episode.episodeDescription;
    const sentences = description
      .split(/[.!?;]+/)
      .map((sentence) => sentence.trim()); // Split into sentences and trim whitespace

    sentences.forEach((sentence) => {
      let words = RiTa.tokenize(sentence);
      for (let key in characterPairs) {
        if (
          words.includes(key) &&
          words.includes(writeNameProperly(topCharacters.key))
        ) {
          characterPairs[key]++;
        }
      }
    });
  });
  return characterPairs;
}

/**
 *
 * @param {*} popularCharacterPairs
 * @param {*} topCharacters
 * @returns
 */
export function graph3ConsolidatedData(popularCharacterPairs, topCharacters) {
  const showData = {
    modernFamily: {
      interactions: popularCharacterPairs.modernFamily,
      topCharacter: topCharacters.modernFamily,
    },
    brooklynNineNine: {
      interactions: popularCharacterPairs.brooklynNineNine,
      topCharacter: topCharacters.brooklynNineNine,
    },
    bigBangTheory: {
      interactions: popularCharacterPairs.bigBangTheory,
      topCharacter: topCharacters.bigBangTheory,
    },
  };

  let nodes = {
    modernFamily: [],
    brooklynNineNine: [],
    bigBangTheory: [],
  };

  let links = {
    modernFamily: [],
    brooklynNineNine: [],
    bigBangTheory: [],
  };

  [nodes.modernFamily, links.modernFamily] = graph3ConsolidatedDataHelper(
    nodes.modernFamily,
    links.modernFamily,
    showData.modernFamily,
    "modernFamily"
  );

  [nodes.brooklynNineNine, links.brooklynNineNine] =
    graph3ConsolidatedDataHelper(
      nodes.brooklynNineNine,
      links.brooklynNineNine,
      showData.brooklynNineNine,
      "brooklyNineNine"
    );

  [nodes.bigBangTheory, links.bigBangTheory] = graph3ConsolidatedDataHelper(
    nodes.bigBangTheory,
    links.bigBangTheory,
    showData.bigBangTheory,
    "bigBangTheory"
  );

  return { nodes, links };
}

function graph3ConsolidatedDataHelper(nodeArray, linkArray, data, show) {
  const topCharacter = writeNameProperly(data.topCharacter.key);

  // Ensure top character node exists and is only added once
  if (!nodeArray.find((n) => n.id === topCharacter)) {
    nodeArray.push({ id: topCharacter, group: show });
  }

  Object.entries(data.interactions).forEach(([character, value]) => {
    const fullCharacterName = writeNameProperly(character);
    // Add character node if it does not already exist
    if (!nodeArray.find((n) => n.id === fullCharacterName)) {
      nodeArray.push({ id: fullCharacterName, group: show });
    }
    // Create a link if the character is not the top character and has interactions
    if (fullCharacterName !== topCharacter && value > 0) {
      linkArray.push({
        source: topCharacter,
        target: fullCharacterName,
        value,
      });
    }
  });

  return [nodeArray, linkArray];
}
