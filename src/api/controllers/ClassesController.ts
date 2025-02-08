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
    },

    updateClass: async (req: Request, res: Response) => {
        const { classId } = req.params;
        const { name, ...classData } = req.body;
        const { email } = req.query;

        console.log(req.body);

        try {
            if (!email){
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const existingClass = await classesService.getClassById(classId);

            if (!name || existingClass.name == name) {
                console.error("Class name does not match");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Class name does not match"
                });
            }

            const updatedClass = await classesService.updateClass(classId, name);

            res.json({ success: true, data: updatedClass });
        } catch (error) {
            logger.error(
                `Error updating class with ID: ${classId}`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error updating class with ID: ${classId}`,
                error?.response?.data?.data?.message || error.message
            );
        }
    }
};