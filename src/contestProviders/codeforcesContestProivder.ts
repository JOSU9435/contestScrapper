import * as Interfaces from "../globals/interfaces";
import * as Models from "../globals/models";
import * as Constants from "../globals/constants";
import puppeteer from "puppeteer";

const codeforcesContestProvider: Interfaces.Contest.ContestProvider =
  async () => {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: false,
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(Constants.ContestProviders.CODEFORCES_CONTEST_URL);

      const eventTable = await page
        .locator(
          "xpath//html/body/div[6]/div[5]/div[2]/div[1]/div[1]/div[6]/table/tbody"
        )
        .waitHandle();

      const contests = await page.evaluate((el) => {
        const rows = [...el.children];
        rows.shift();
        return rows.map(({ children: rowItems }) => {
          return {
            name: rowItems[0].textContent?.split("\n")[1].trim() || "",
            platform: "codeforces",
            contestUrl: rowItems[5].querySelector("a")?.href,
            date: rowItems[2].textContent?.replace("UTC", " UTC").trim(),
          };
        });
      }, eventTable);

      browser.close();

      return contests.map(({ name, platform, contestUrl, date }) => {
        return new Models.Contest.Contest(
          name,
          platform,
          contestUrl || "",
          new Date(date || "")
        );
      });
    } catch (error) {
      console.error("codeforcesContestProvider failed unexpectedly", error);
      browser?.close();
      return [];
    }
  };

export { codeforcesContestProvider };
