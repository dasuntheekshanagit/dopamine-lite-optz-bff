import express from "express";
import { lessonController } from "../controllers/LessonsController";

const router = express.Router();

router.get("/", lessonController.getAllLessonsByEmail);

export default router;