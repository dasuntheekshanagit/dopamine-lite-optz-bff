import express from "express";
import preSignedGeneratorRoute from "./preSignedGeneratorRoute";
import classesRoute from "./ClassesRoute";
import lessonsRoute from "./LessonsRoute";
import accessGroupRoute from "./AccessGroupRoute";
import lectureRoute from "./LectureRoute";

const router = express.Router();

router.use("/api/v1", preSignedGeneratorRoute.router);
router.use("/classes", classesRoute);
router.use("/lessons", lessonsRoute);
router.use("/access-groups", accessGroupRoute);
router.use("/lectures", lectureRoute);

export default router;