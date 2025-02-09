import express from "express";
import preSignedGeneratorRoute from "./preSignedGeneratorRoute";
import classesRoute from "./ClassesRoute";
import lessonsRoute from "./LessonsRoute";
import accessGroupRoute from "./AccessGroupRoute";

const router = express.Router();

router.use("/api/v1", preSignedGeneratorRoute.router);
router.use("/classes", classesRoute);
router.use("/lessons", lessonsRoute);
router.use("/access-groups", accessGroupRoute);

export default router;