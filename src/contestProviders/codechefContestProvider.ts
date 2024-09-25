import puppeteer from "puppeteer";
import * as Interfaces from "../globals/interfaces";
import * as Models from "../globals/models";
import * as Constants from "../globals/constants";

const codechefContestProvider: Interfaces.Contest.ContestProvider =
  async () => {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: "new",
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(Constants.ContestProviders.CODECHEF_CONTEST_URL);

      const contestTable = await page
        .locator(
          "xpath//html/body/div[1]/div/div[3]/div/div/div[2]/div[1]/div[2]/div/div[2]/table/tbody"
        )
        .waitHandle();

      const contests = await page.evaluate((el) => {
        return [...el.children].map(({ children: rowItems }) => {
          const date = [...rowItems[2].querySelectorAll("p")].map(
            (p) => p.textContent
          );
          return {
            name: rowItems[1].querySelector("span")?.textContent || "",
            platform: "codechef",
            contestUrl:
              rowItems[1].querySelector("a")?.href ||
              "https://www.codechef.com/contests",
            date: `${date[0]} ${date[1]?.substring(4)}`,
          };
        });
      }, contestTable);
      console.log(contests);
      browser.close();

      return contests.map(
        ({ name, platform, contestUrl, date }) =>
          new Models.Contest.Contest(name, platform, contestUrl, new Date(date))
      );
    } catch (error) {
      console.error("codechefContestProvider failed unexpectedly", error);
      browser?.close();
      return [];
    }
  };

export { codechefContestProvider };
