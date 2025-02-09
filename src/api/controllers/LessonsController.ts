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
    getAllClasses: async (req: Request, res: Response) => {
        const { classId, email } = req.query;
        let updatedLectures = null;
        let updatedNotes = null;
        try {
            const [accessList, classDetails, lectureList, notesList] = await Promise.all([
                accessGroupService.getAccessListByEmail(email),
                classesService.getClassById(classId),
                lectureService.getAllLectures(classId),
                noteService.getAllNotes(classId)
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
};