import logger from "../../config/logger";
import apiInstances from "../apiInstances/ApiInstance";
import constants from "../constants/constants";

export const lectureService = {

    getAllLecturesByClass: async (classId: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/lectures/?class=${classId}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching all lectures`);
            throw error;
        });
    },

    getAllLectures: async () => {
        return await apiInstances.backendInstance
        .request({
            url: `/lectures`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching all lectures`);
            throw error;
        });
    },

    getLectureById: async (lectureId: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/lectures/${lectureId}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching the lecture with ID: ${lectureId}`);
            throw error;
        });
    },

    createLecture: async (lectureData: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/lectures`,
            method: constants.HTTP_METHODS.POST,
            data: lectureData,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while creating the lecture`);
            throw error;
        });
    },

    updateLecture: async (lectureId: string, lectureData: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/lectures/${lectureId}`,
            method: constants.HTTP_METHODS.PUT,
            data: lectureData,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while updating the lecture with ID: ${lectureId}`);
            throw error;
        });
    },

    deleteLecture: async (lectureId: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/lectures/${lectureId}`,
            method: constants.HTTP_METHODS.DELETE,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while deleting the lecture with ID: ${lectureId}`);
            throw error;
        });
    }
}