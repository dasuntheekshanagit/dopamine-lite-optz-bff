import logger from "../../config/logger";
import apiInstances from "../apiInstances/ApiInstance";
import constants from "../constants/constants";

export const noteService = {

    getAllNotes: async (classId: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/notes/{classId}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching all notes`);
            throw error;
        });
    }

};