import axios from "axios";
import * as Interfaces from "../globals/interfaces";
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
      console.log("codeforcesContestProvider failed unexpectedly", error);
      return [];
    }

    const htmlPage = response.data;

    const $ = cheerio.load(htmlPage);

    const table = $("table").eq(0).find("tbody").children();

    const result: Array<Interfaces.Contest.Contest> = [];

    table.each((_i, el) => {
      const row = $(el).children();

      result.push(
        new Interfaces.Contest.Contest(
          row.eq(0).text().replace(/\n/g, "").trim(),
          "codeforces",
          row.eq(5).find("a.red-link").attr("href")?.trim() || "",
          new Date(row.eq(2).text().trim())
        )
      );
    });

    result.shift();
    return result;
  };

export { codeforcesContestProvider };
