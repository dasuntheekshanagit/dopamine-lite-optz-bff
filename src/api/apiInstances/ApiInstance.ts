import axios from "axios";
import config from "../../config.json";

const preSignedGeneratorInstance = axios.create({
    baseURL: `${config.services. preSignedGenerator}`,
    withCredentials: false,
    timeout: 60000,
});

const backendInstance = axios.create({
  baseURL: `${config.services.backEnd}/api`,
  withCredentials: false,
  timeout: 10000,
});

const apiInstances = {
    preSignedGeneratorInstance,
    backendInstance
  };

export default apiInstances;
