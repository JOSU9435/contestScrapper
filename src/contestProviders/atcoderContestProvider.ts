import axios from "axios";
import * as Interfaces from "../globals/interfaces";
import * as Models from "../globals/models";
import * as cheerio from "cheerio";
import * as Constants from "../globals/constants";

const atcoderContestProvider: Interfaces.Contest.ContestProvider = async () => {
  let response;
  try {
    response = await axios.get(Constants.ContestProviders.ATCODER_CONTEST_URL, {
      timeout: Constants.ContestProviders.ATCODER_REQUEST_TIMEOUT || 5000,
    });
  } catch (error) {
    console.error("atcoderContestProvider failed unexpectedly", error);
    return [];
  }

  const htmlPage = response.data;
  const $ = cheerio.load(htmlPage);
  const table = $("#contest-table-upcoming").find("tbody").children();

  const result: Array<Models.Contest.Contest> = [];

  table.each((_i, el) => {
    const row = $(el).children();

    result.push(
      new Models.Contest.Contest(
        row.eq(1).find("a").text().trim(),
        "atcoder",
        `https://atcoder.jp${
          row.eq(1).find("a").attr("href")?.trim() || "/contests"
        }`,
        new Date(row.eq(0).find("a").text().trim())
      )
    );
  });

  return result;
};

export { atcoderContestProvider };
