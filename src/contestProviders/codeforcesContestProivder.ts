import axios from "axios";
import * as Interfaces from "../globals/interfaces";
import * as Models from "../globals/models";
import * as cheerio from "cheerio";
import * as Constants from "../globals/constants";

const codeforcesContestProvider: Interfaces.Contest.ContestProvider =
  async () => {
    let response;
    try {
      response = await axios.get(
        Constants.ContestProviders.CODEFORCES_CONTEST_URL,
        {
          timeout:
            Constants.ContestProviders.CODEFORCES_REQUEST_TIMEOUT || 5000,
        }
      );
    } catch (error) {
      console.error("codeforcesContestProvider failed unexpectedly", error);
      return [];
    }

    const htmlPage = response.data;

    const $ = cheerio.load(htmlPage);

    const table = $("table").eq(0).find("tbody").children();

    const result: Array<Models.Contest.Contest> = [];

    table.each((_i, el) => {
      const row = $(el).children();

      result.push(
        new Models.Contest.Contest(
          row.eq(0).text().replace(/\n/g, "").trim(),
          "codeforces",
          `https://codeforces.com${
            row.eq(5).find("a.red-link").attr("href")?.trim() || "/contests"
          }`,
          new Date(row.eq(2).text().trim() + " UTC+3")
        )
      );
    });

    result.shift();
    return result;
  };

export { codeforcesContestProvider };
