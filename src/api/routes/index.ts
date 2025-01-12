import express from "express";
import preSignedGeneratorRoute from "./preSignedGeneratorRoute";
import classesRoute from "./ClassesRoute";
import lessonsRoute from "./LessonsRoute";


const router = express.Router();

router.use("/api/v1", preSignedGeneratorRoute.router);
router.use("/classes", classesRoute.router);
router.use("/lessons", lessonsRoute.router);

export default router;