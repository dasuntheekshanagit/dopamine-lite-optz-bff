import express from "express";
import { lessonController } from "../controllers/LessonsController";

const router = express.Router();

router.get("/:classId", lessonController.getAllLessons);
router.post("/", lessonController.createLessons);
router.put("/:lectureId", lessonController.updateLessons);
router.delete("/:lectureId", lessonController.deleteLessons);

export default router;