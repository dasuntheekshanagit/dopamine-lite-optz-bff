import logger from "../../config/logger";
import apiInstances from "../apiInstances/ApiInstance";
import constants from "../constants/constants";

export const userService = {

    getUserRoleByEmail: async (email: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/users?email=${email}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching user role for email: ${email}`);
            throw error;
        });
    }

};