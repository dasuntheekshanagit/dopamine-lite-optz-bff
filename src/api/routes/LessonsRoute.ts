import express from "express";
import { lessonController } from "../controllers/LessonsController";

const router = express.Router();

router.get("/", lessonController.getAllClasses);

export default router;