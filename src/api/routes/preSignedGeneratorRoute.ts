import express from "express";
import preSignedGeneratorController from "../controllers/preSignedGeneratorController";

const router = express.Router();

router.get("/folder/:handler", preSignedGeneratorController.getManifestByHandler);

const preSignedGeneratorRoute = {
    router,
}

export default preSignedGeneratorRoute;