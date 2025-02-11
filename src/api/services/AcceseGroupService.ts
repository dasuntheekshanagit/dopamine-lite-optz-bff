import logger from "../../config/logger";
import apiInstances from "../apiInstances/ApiInstance";
import constants from "../constants/constants";

export const accessGroupService = {

    getAccessListByEmail: async (email: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/access-groups/email?email=${email}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching access list for email: ${email}`);
            throw error;
        });
    },

    getAccessListById: async (accessListId: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/access-groups/${accessListId}`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching access list with ID: ${accessListId}`);
            throw error;
        });
    },

    getAccessListAll: async () => {
        return await apiInstances.backendInstance
        .request({
            url: `/access-groups`,
            method: constants.HTTP_METHODS.GET,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while fetching all access lists`);
            throw error;
        });
    },

    createAccessList: async (accessListData: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/access-groups`,
            method: constants.HTTP_METHODS.POST,
            data: accessListData,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while creating access list`);
            throw error;
        });
    },

    updateAccessList: async (accessListId: string, accessListData: any) => {
        return await apiInstances.backendInstance
        .request({
            url: `/access-groups/${accessListId}`,
            method: constants.HTTP_METHODS.PUT,
            data: accessListData,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while updating access list with ID: ${accessListId}`);
            throw error;
        });
    },

    deleteAccessList: async (accessListId: string) => {
        return await apiInstances.backendInstance
        .request({
            url: `/access-groups/${accessListId}`,
            method: constants.HTTP_METHODS.DELETE,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            logger.error(`An error occurred while deleting access list with ID: ${accessListId}`);
            throw error;
        });
    }

};