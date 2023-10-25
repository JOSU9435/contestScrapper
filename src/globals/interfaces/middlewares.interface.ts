import { Request, Response, NextFunction } from "express";

type Async = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | void>;

type Sync = (
  req: Request,
  res: Response,
  next: NextFunction
) => Response | void;

export { Async, Sync };
