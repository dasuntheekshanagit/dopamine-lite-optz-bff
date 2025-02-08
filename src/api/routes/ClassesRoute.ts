import express from "express";
import { classesController } from "../controllers/ClassesController";


const router = express.Router();

router.get("/", classesController.getAllClasses);
router.put("/:classId", classesController.updateClass);
router.delete("/:classId", classesController.deleteClass);

export default router;