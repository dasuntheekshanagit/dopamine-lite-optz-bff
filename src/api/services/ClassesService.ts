import logger from "../../config/logger";
import apiInstances from "../apiInstances/ApiInstance";
import constants from "../constants/constants";

export const classesService = {

    getAllClasses: async () => {
        return await apiInstances.backendInstance
        .request({
            url: `/classes`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching all classes`);
            throw error;
        });
    },

    getClassById: async (classId: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/classes/${classId}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching the class with ID: ${classId}`);
            throw error;
        });
    },

    getClassByName: async (name: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/classes/search?name=${name}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching the class with name: ${name}`);
            throw error;
        });
    },

    createClass: async (name: any) => {
        const data = { name: name };
        return await apiInstances.backendInstance
        .request({
            url: `/classes`,
            method: constants.HTTP_METHODS.POST,
            data: data,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while creating the class`);
            throw error;
        }
        );
    },

    updateClass: async (classId: string, name: any) => {
        const data = { name: name };
        return await apiInstances.backendInstance
        .request({
            url: `/classes/${classId}`,
            method: constants.HTTP_METHODS.PUT,
            data: data,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while updating the class with ID: ${classId}`);
            throw error;
        });
    },

    deleteClass: async (classId: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/classes/${classId}`,
            method: constants.HTTP_METHODS.DELETE,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while deleting the class with ID: ${classId}`);
            throw error;
        });
    },
};