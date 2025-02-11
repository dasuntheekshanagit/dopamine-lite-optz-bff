import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import logger from "../../config/logger";
import sharedResponses from "../../shared/sharedResponses";
import { accessGroupService } from "../services/AcceseGroupService";

export const accessGroupController = {
    getAllACL: async (req: Request, res: Response) => {
        const { email } = req.query;

        try {
            if (!email) {
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const accessList = await accessGroupService.getAccessListAll();

            res.json({ success: true, data: accessList });
        } catch (error) {
            logger.error(
                `Error fetching all access lists`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error fetching all access lists`,
                error?.response?.data?.data?.message || error.message
            );
        }
    },

    getACLById: async (req: Request, res: Response) => {
        const { accessListId } = req.params.accessGroupId;
        const { email } = req.query;

        try {
            if (!email) {
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const accessList = await accessGroupService.getAccessListById(accessListId);
            
            if (!accessList) {
                return res.status(404).json({ success: false, message: `Access list with ID: ${accessListId} not found` });
            }
            res.json({ success: true, data: accessList });
        } catch (error) {
            logger.error(`Error fetching access list with ID: ${accessListId}`, error);
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || 500,
                `Error fetching access list with ID: ${accessListId}`,
                error?.response?.data?.message || error.message
            );
        }
    },

    createACL: async (req: Request, res: Response) => {
        const accessListData = req.body;
        const { email } = req.query;

        try {
            if (!email) {
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            let existingClass;
            try {
                existingClass = await accessGroupService.getAccessListById(accessListData.accessGroupId);
            } catch (error) {
                if (error.response && error.response.status === HttpStatusCode.NotFound) {
                    existingClass = null;
                } else {
                    throw error;
                }
            }

            if (existingClass && existingClass.data.accessGroupId == accessListData.accessGroupId) {
                console.error("Class name already exists");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Class name already exists"
                });
            }

            const newAccessList = await accessGroupService.createAccessList(accessListData);

            res.status(HttpStatusCode.Created).json({ success: true, data: newAccessList });
        } catch (error) {
            logger.error(
                `Error creating access list`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error creating access list`,
                error?.response?.data?.data?.message || error.message
            );
        }
    },

    updateACL: async (req: Request, res: Response) => {
        const { accessListId } = req.params.accessGroupId;
        const accessListData = req.body;
        const { email } = req.query;

        try {
            if (!email) {
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            let existingClass;
            try {
                existingClass = await accessGroupService.getAccessListById(accessListData.accessGroupId);
            } catch (error) {
                if (error.response && error.response.status === HttpStatusCode.NotFound) {
                    existingClass = null;
                } else {
                    throw error;
                }
            }

            console.log(existingClass);

            if (existingClass && existingClass.data.accessGroupId == accessListData.accessGroupId) {
                console.error("Class name already exists");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Class name already exists"
                });
            }

            const updatedAccessList = await accessGroupService.updateAccessList(accessListId, accessListData);

            res.json({ success: true, data: updatedAccessList });
        } catch (error) {
            logger.error(
                `Error updating access list with ID: ${accessListId}`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error updating access list with ID: ${accessListId}`,
                error?.response?.data?.data?.message || error.message
            );
        }
    },

    deleteACL: async (req: Request, res: Response) => {
        const { accessListId } = req.params.accessGroupId;
        const { email } = req.query;

        try {
            if (!email) {
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            console.log(accessListId);
            
            const existingClass = await accessGroupService.getAccessListById(accessListId);

            console.log(existingClass);

            if (!existingClass.data.accessGroupId) {
                console.error("Class Id does not exist");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Class Id does not exist"
                });
            }

            await accessGroupService.deleteAccessList(accessListId);

            res.json({ success: true, message: `Access list with ID: ${accessListId} has been deleted` });
        } catch (error) {
            logger.error(
                `Error deleting access list with ID: ${accessListId}`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error deleting access list with ID: ${accessListId}`,
                error?.response?.data?.data?.message || error.message
            );
        }
    }
};