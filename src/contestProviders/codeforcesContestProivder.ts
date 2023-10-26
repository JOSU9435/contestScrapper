import axios from "axios";
import * as Interfaces from "../globals/interfaces";
import * as cheerio from "cheerio";

const codeforcesContestProvider: Interfaces.Contest.ContestProvider =
  async () => {
    const response = await axios.get("https://codeforces.com/contests");
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
          new Date(row.eq(2).text())
        )
      );
    });

    result.unshift();
    return result;
  };

export { codeforcesContestProvider };
