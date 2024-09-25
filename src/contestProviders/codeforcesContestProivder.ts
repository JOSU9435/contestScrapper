import * as Interfaces from "../globals/interfaces";
import * as Models from "../globals/models";
import * as Constants from "../globals/constants";
import axios from "axios";

const codeforcesContestProvider: Interfaces.Contest.ContestProvider =
  async () => {
    try {
      const response = await axios.get(
        `${Constants.ContestProviders.CODEFORCES_CONTEST_URL}?gym=false`
      );

      if (response.data.status !== "OK") {
        throw new Error("Codeforces API error");
      }

      const contests: Interfaces.codeforces.codefrocesContest[] =
        response.data.result;

      return contests
        .filter((contest) => contest.phase === "BEFORE")
        .map(
          ({ name, startTimeSeconds, id }) =>
            new Models.Contest.Contest(
              name,
              "codeforces",
              `https://codeforces.com/contestRegistration/${id}`,
              new Date(startTimeSeconds * 1000)
            )
        );
    } catch (error) {
      console.error("codeforcesContestProvider failed unexpectedly", error);
      return [];
    }
  };

export { codeforcesContestProvider };
