import { Router } from "express";
import * as Controllers from "../controllers";

const router: Router = Router();

router.get("/", Controllers.getContests);

export default router;
