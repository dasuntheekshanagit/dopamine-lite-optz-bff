import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import logger from "../../config/logger";
import sharedResponses from "../../shared/sharedResponses";
import { noteService } from "../services/NoteService";
import { lectureService } from "../services/LectureService";
import { accessGroupService } from "../services/AcceseGroupService";
import { ILecture } from "../../types copy/lecture.types";
import { INote } from "../../types copy/note.types";

export const lessonController = {
    getAllClasses: async (req: Request, res: Response) => {
        const { classId, email } = req.query;
        try {
            const [accessList, lectureList, notesList] = await Promise.all([
                accessGroupService.getAccessListByEmail(email),
                lectureService.getAllLectures(classId),
                noteService.getAllNotes(classId)
            ]);

            const accessSet = new Set(accessList.map(item => item.id));

            const updateAccessField = (list: (ILecture | INote)[]) => {
                return list.map(item => {
                    if (accessSet.has(item.classId)) {
                        item.access = true;
                    } else {
                        item.access = false;
                        delete item.handler;
                        delete item.handler;
                    }
                    return item;
                });
            };

            const updatedLectures = updateAccessField(lectureList);
            const updatedNotes = updateAccessField(notesList);

            const response = {
                data: updatedLectures,
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