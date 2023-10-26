import axios from "axios";
import * as Interfaces from "../globals/interfaces";
import * as cheerio from "cheerio";
import * as Constants from "../globals/constants";

const leetcodeContestProvider: Interfaces.Contest.ContestProvider =
  async () => {
    let response;
    try {
      response = await axios.get(
        Constants.ContestProviders.LEETCODE_CONTEST_URL,
        {
          timeout: Constants.ContestProviders.LEETCODE_REQUEST_TIMEOUT || 5000,
        }
      );
    } catch (error) {
      console.log("leetcodeContestProvider failed unexpectedly", error);
      return [];
    }

    const htmlPage = response.data;
    const $ = cheerio.load(htmlPage);
    const table = $("div.swiper-wrapper").eq(0).find("a");

    const result: Array<Interfaces.Contest.Contest> = [];

    table.each((_i, el) => {
      const row = $(el);

      result.push(
        new Interfaces.Contest.Contest(
          row.find("div.truncate").text().trim(),
          "leetcode",
          `https://leetcode.com${row.attr("href")?.trim() || ""}`
        )
      );
    });

    return result;
  };

export { leetcodeContestProvider };
