// dataCleaning.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {
  convertBigBangTheoryDateFormat,
  convertBrooklynNineNineDateFormat,
} from "./util.js";

export function formatBrooklynNineNineData(data) {
  return data.map((item) => {
    // console.log("Brooklyn Nine Nine ", item.Airdate);
    // console.log(
    //   "Brooklyn Nine Nine ",
    //   convertBrooklynNineNineDateFormat(item.Airdate)
    // );

    return {
      show: "Brooklyn Nine Nine",
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

export function formatModernFamilyData(data) {
  return data.map((item) => {
    var seasonEpisodeSplit = item["Season-Episode"].split("-");

    // const s = seasonEpisodeSplit[0][0]; // 'S'
    // const number = seasonEpisodeSplit[0].substring(1); // '1' (gets the rest of the string after 'S')

    // console.log(s, number);

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

export function formatBigBangTheoryData(data) {
  return data.map((item) => {
    // console.log("The Big Bang Theory ", item.original_air_date);
    // console.log(
    //   "The Big Bang Theory ",
    //   convertBigBangTheoryDateFormat(item.original_air_date)
    // );

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
