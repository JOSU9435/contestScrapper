interface Contest {
  name: string;
  platform: string;
  contestUrl: string;
  startTime?: Date;
}

type ContestProvider = () => Promise<Array<Contest> | never>;

export { Contest, ContestProvider };
