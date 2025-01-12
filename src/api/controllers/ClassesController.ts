import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import logger from "../../config/logger";
import sharedResponses from "../../shared/sharedResponses";
import { classesService } from "../services/ClassesService";

export const classesController = {
    getAllClasses: async (req: Request, res: Response) => {
        try {
            const classesList = await classesService.getAllClasses();
            const response = {
                data: classesList.data
            };
            res.json({ success: true, data: response.data });
        } catch (error) {
            logger.error(
                `Error fetching all classes`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error fetching all classes`,
                error?.response?.data?.data?.message || error.message
            );
        }
    }

}