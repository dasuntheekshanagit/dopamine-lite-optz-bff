import express from "express";
import { accessGroupController } from "../controllers/AcceseGroupController";


const router = express.Router();

router.get("/", accessGroupController.getAllACL);
router.get("/:accessListId", accessGroupController.getACLById);
router.post("/", accessGroupController.createACL);
router.put("/:accessListId", accessGroupController.updateACL);
router.delete("/:accessListId", accessGroupController.deleteACL);

export default router;