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
}