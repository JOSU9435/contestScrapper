import * as Interfaces from "../globals/interfaces";

const health: Interfaces.Controller.Sync = (_, res) => {
  res.json({
    status: 200,
    message: "OK! Server Running",
  });
};

export { health };
