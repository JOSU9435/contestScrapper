import * as Interfaces from "../globals/interfaces";
import * as ContestProivders from "../contestProviders";

const getContests: Interfaces.Controller.Async = async (_req, res) => {
  const contestProviders = Object.values(ContestProivders);

  const responses = await Promise.all(
    contestProviders.map((provider) => {
      try {
        return provider();
      } catch (error) {
        console.error(`${provider.name} unexpectedly failed`, error);
        return [];
      }
    })
  );

  res.json(responses.flatMap((response) => response));
};

export { getContests };
