import * as Interfaces from "../interfaces";

class Contest implements Interfaces.Contest.Contest {
  name: string;
  platform: string;
  contestUrl: string;
  startTime?: Date;
  constructor(
    name: string,
    platform: string,
    contestUrl: string,
    startTime?: Date
  ) {
    this.name = name;
    this.platform = platform;
    this.contestUrl = contestUrl;
    this.startTime = startTime;
  }
}

export { Contest };
