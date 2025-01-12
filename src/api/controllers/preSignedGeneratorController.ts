import { HttpStatusCode } from "axios";
import preSignedGeneratorService from "../services/preSignedGeneratorService";
import { Request, Response } from "express";
import logger from "../../config/logger";
import sharedResponses from "../../shared/sharedResponses";

const getManifestByHandler = async (req: Request, res: Response) => {
    const { handler } = req.params;

    try {
        const fetchManifest = await preSignedGeneratorService.getManifestByHandler(handler);

        const [ manifest ] = await Promise.all([
            fetchManifest
        ]);

        const response = {
            manifest: manifest
        };

        res.status(HttpStatusCode.Ok).send(response);
    } catch (error) {
        logger.error(
            `Error fetching folder with handle: ${handler}`,
            error
        )
        return sharedResponses.ErrorResponse(
            res,
            error?.response?.status,
            `Error fetching folder with handle: ${handler}`,
            error?.response?.data?.data?.message || error.message
        )
    }
};

const preSignedGeneratorController = {
    getManifestByHandler,
};

export default preSignedGeneratorController;