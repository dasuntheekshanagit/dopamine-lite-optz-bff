import logger from "../../config/logger";
import apiInstances from "../apiInstances/ApiInstance";
import constants from "../constants/constants";

export const noteService = {

    getAllNotesByClass: async (classId: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/notes/?class=${classId}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching all notes`);
            throw error;
        });
    },

    getAllNotes: async () => {
        return await apiInstances.backendInstance
        .request({
            url: `/notes`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching all notes`);
            throw error;
        });
    },

    getNoteById: async (noteId: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/notes/${noteId}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching the note with ID: ${noteId}`);
            throw error;
        });
    },

    createNote: async (noteData: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/notes`,
            method: constants.HTTP_METHODS.POST,
            data: noteData,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while creating the note`);
            throw error;
        });
    },

    updateNote: async (noteId: string, noteData: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/notes/${noteId}`,
            method: constants.HTTP_METHODS.PUT,
            data: noteData,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while updating the note with ID: ${noteId}`);
            throw error;
        });
    },

    deleteNote: async (noteId: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/notes/${noteId}`,
            method: constants.HTTP_METHODS.DELETE,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while deleting the note with ID: ${noteId}`);
            throw error;
        });
    }

};