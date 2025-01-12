import logger from "../../config/logger";
import apiInstances from "../apiInstances/ApiInstance";
import constants from "../constants/constants";

export const lectureService = {

    getAllLectures: async (classId: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/lectures/class/${classId}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching all lectures`);
            throw error;
        });
    }
}