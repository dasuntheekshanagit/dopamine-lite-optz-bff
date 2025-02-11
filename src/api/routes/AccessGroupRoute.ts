import express from "express";
import { accessGroupController } from "../controllers/AcceseGroupController";


const router = express.Router();

router.get("/", accessGroupController.getAllACL);
router.get("/:accessGroupId", accessGroupController.getACLById);
router.post("/", accessGroupController.createACL);
router.put("/:accessGroupId", accessGroupController.updateACL);
router.delete("/:accessGroupId", accessGroupController.deleteACL);

export default router;