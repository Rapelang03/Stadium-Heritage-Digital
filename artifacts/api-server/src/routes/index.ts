import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import communityRouter from "./community";
import marketplaceRouter from "./marketplace";
import businessRouter from "./businesses";
import adminRouter from "./admin";
import seedRouter from "./seed";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(communityRouter);
router.use(marketplaceRouter);
router.use(businessRouter);
router.use(adminRouter);
router.use(seedRouter);

export default router;
