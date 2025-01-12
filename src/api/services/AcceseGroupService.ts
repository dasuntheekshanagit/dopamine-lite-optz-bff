import logger from "../../config/logger";
import apiInstances from "../apiInstances/ApiInstance";
import constants from "../constants/constants";

export const accessGroupService = {

    getAccessListByEmail: async (email: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/access-groups/email/${email}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching access list for email: ${email}`);
            throw error;
        });
    }

};