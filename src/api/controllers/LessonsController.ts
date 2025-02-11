import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import logger from "../../config/logger";
import sharedResponses from "../../shared/sharedResponses";
import { noteService } from "../services/NoteService";
import { lectureService } from "../services/LectureService";
import { accessGroupService } from "../services/AcceseGroupService";
import { ILecture } from "../../types/lecture.types";
import { INote } from "../../types/note.types";
import { classesService } from "../services/ClassesService";

export const lessonController = {
    getAllLessonsByEmail: async (req: Request, res: Response) => {
        const { classId, email } = req.query;
        let updatedLectures = null;
        let updatedNotes = null;
        try {
            const [accessList, classDetails, lectureList, notesList] = await Promise.all([
                accessGroupService.getAccessListByEmail(email),
                classesService.getClassById(classId),
                lectureService.getAllLecturesByClass(classId),
                noteService.getAllNotesByClass(classId)
            ]);


            if (!accessList || accessList.length === 0) {
                res.json({ success: true, data: null });
            }
            
            if (!Array.isArray(accessList)) {
                throw new TypeError('accessList is not an array');
            }

            const accessSet = new Set(accessList.map(item => item));

            const updateAccessField = (list: (ILecture | INote)[]) => {
                return list.map(item => {
                    if (accessSet.has(item.accessGroupId)) {
                        item.access = true;
                    } else {
                        item.access = false;
                        delete item.handler;
                        delete item.handler;
                    }
                    return item;
                });
            };


            if (lectureList != null){
                updatedLectures = updateAccessField(lectureList);
            } 

            if (notesList != null){
                updatedNotes = updateAccessField(notesList);
            }

            const response = {
                classDetails: classDetails.data,
                lectures: updatedLectures,
                notes: updatedNotes
            };

            res.json({ success: true, data: response });
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

    getAllLessons: async (req: Request, res: Response) => {
        const { email } = req.query;
        const classId = req.params.classId;

        try {
            if (!email) {
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const classesList = await lectureService.getAllLecturesByClass(classId);
            
            const response = {
                data: classesList.data
            };

            res.json({ success: true, data: response.data });
        } catch (error) {
            logger.error(
                `Error fetching all lessons`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error fetching all lessons`,
                error?.response?.data?.data?.message || error.message
            );
        }
    },

    createLessons: async (req: Request, res: Response) => {
        const classId = req.body.classId;
        const accessListId = req.body.accessListId;
        const { email } = req.query;

        try {
            if (!email) {
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const [accessList, classDetails] = await Promise.all([
                accessGroupService.getAccessListById(accessListId),
                classesService.getClassById(classId),
            ]);

            if (!accessList || !classDetails) {
                console.error("Invalid access list or class ID");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Invalid access list or class ID"
                });
            }

            const newClass = await lectureService.createLecture(req.body);

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

    updateLessons: async (req: Request, res: Response) => {
        const classId = req.body.classId;
        const lectureId = req.params.lectureId;
        const accessListId = req.body.accessListId;
        const { email } = req.query;

        try {
            if (!email) {
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const [accessList, classDetails, lectureData] = await Promise.all([
                accessGroupService.getAccessListById(accessListId),
                classesService.getClassById(classId),
                lectureService.getLectureById(lectureId)
            ]);

            if (!accessList || !classDetails || !lectureData) {
                console.error("Invalid access list or class ID");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Invalid access list or class ID"
                });
            }

            const updatedClass = await lectureService.updateLecture(req.body.lectureId, req.body);

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

    deleteLessons: async (req: Request, res: Response) => {
        const lectureId  = req.params.lectureId;
        const { email } = req.query;

        try {
            if (!email) {
                console.error("Email is required");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Email is required"
                });
            }

            const existingLecture = await lectureService.getLectureById(lectureId);

            if (!existingLecture.data.lectureId) {
                console.error("Lecture Id does not exist");
                return res.status(HttpStatusCode.BadRequest).json({
                    success: false,
                    message: "Lecture Id does not exist"
                });
            }

            await classesService.deleteClass(lectureId);

            res.json({ success: true, message: `Lecture with ID: ${lectureId} has been deleted` });
        } catch (error) {
            logger.error(
                `Error deleting lecture with ID: ${lectureId}`,
                error
            );
            return sharedResponses.ErrorResponse(
                res,
                error?.response?.status || HttpStatusCode.InternalServerError,
                `Error deleting lecture with ID: ${lectureId}`,
                error?.response?.data?.data?.message || error.message
            );
        }
    }
};