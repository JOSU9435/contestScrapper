import puppeteer from "puppeteer";
import * as Interfaces from "../globals/interfaces";
import * as Models from "../globals/models";
import * as Constants from "../globals/constants";
import * as cheerio from "cheerio";

const codechefContestProvider: Interfaces.Contest.ContestProvider =
  async () => {
    let htmlPage;
    let browser;
    try {
      browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1024 });
      await page.goto(Constants.ContestProviders.CODECHEF_CONTEST_URL);
      await page.waitForSelector("td._name__cell_1c9os_439 > div > a", {
        timeout: 5000,
      });
      htmlPage = await page.content();
      browser.close();
    } catch (error) {
      console.error("codechefContestProvider failed unexpectedly", error);
      browser?.close();
      return [];
    }

    const $ = cheerio.load(htmlPage);

    const table = $("tbody.MuiTableBody-root").eq(1).children();

    const result: Array<Models.Contest.Contest> = [];

    table.each((_i, el) => {
      const row = $(el).children();

      const contestDate = row.eq(2).find("p").first().text().trim();
      const contestTime = row.eq(2).find("p").last().text().substring(3);

      result.push(
        new Models.Contest.Contest(
          row.eq(1).find("a").text().trim(),
          "codechef",
          row.eq(1).find("a").attr("href")?.trim() || "",
          new Date(`${contestDate} ${contestTime}`)
        )
      );
    });

    return result;
  };

export { codechefContestProvider };
