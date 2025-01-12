import logger from "../../config/logger";
import apiInstances from "../apiInstances/ApiInstance";
import constants from "../constants/constants";

const getManifestByHandler = async (handler: any) => {
    return await apiInstances.preSignedGeneratorInstance
    .request({
        url: "/geturl",
        method: constants.HTTP_METHODS.GET,
        params:{
          manifest_key: "index.m3u8",
          segment_keys: "index0.ts",
          folder: handler,
          expiration:3600
          }
    })
    .then((response) =>{
        return response.data.modified_m3u8_content;
    })
    .catch((error) =>{
        logger.error(
            `An Error occurred getting folder with handler: ${handler}`
        );
        throw error;
    });
};

const preSignedGeneratorService = {
    getManifestByHandler,
};

export default preSignedGeneratorService;
