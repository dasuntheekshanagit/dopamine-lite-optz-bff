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

    createClass: async (req: Request, res: Response) => {
        const { name } = req.body;
        const { email } = req.query;

        try {
            if (!email){
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            let existingClass;
            try {
                existingClass = await classesService.getClassByName(name);
            } catch (error) {
                if (error.response && error.response.status === HttpStatusCode.NotFound) {
                    existingClass = null;
                } else {
                    throw error;
                }
            }

            if (existingClass && existingClass.data.name == name) {
                console.error("Class name already exists");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Class name already exists"
                });
            }

            const newClass = await classesService.createClass(name);

            res.json({ success: true, data: newClass });
        } catch (error) {
            logger.error(
                `Error creating class`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error creating class`,
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

            let existingClass;
            try {
                existingClass = await classesService.getClassByName(name);
            } catch (error) {
                if (error.response && error.response.status === HttpStatusCode.NotFound) {
                    existingClass = null;
                } else {
                    throw error;
                }
            }

            if (!name || (existingClass && existingClass.data.name == name)) {
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
    },

    deleteClass: async (req: Request, res: Response) => {
        const { classId } = req.params;
        const { email } = req.query;

        try {
            if (!email){
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const existingClass = await classesService.getClassById(classId);

            if (!existingClass.data.classId) {
                console.error("Class Id does not exist");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Class Id does not exist"
                });
            }

            await classesService.deleteClass(classId);

            res.json({ success: true, message: `Class with ID: ${classId} has been deleted` });
        } catch (error) {
            logger.error(
                `Error deleting class with ID: ${classId}`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error deleting class with ID: ${classId}`,
                error?.response?.data?.data?.message || error.message
            );
        }
    }
};