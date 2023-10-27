import * as Models from "../models";

type ContestProvider = () => Promise<Array<Models.Contest.Contest> | never>;

export { ContestProvider };
