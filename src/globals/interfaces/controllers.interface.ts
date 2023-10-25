import { Request, Response } from "express";

type Async = (req: Request, res: Response) => Promise<Response | void>;

type Sync = (req: Request, res: Response) => Response | void;

export { Async, Sync };
