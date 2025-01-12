import log4js from "log4js";

const PRODUCTION = "prod";

const getLogLevel = (environment: string, customLogLevel: any) => {
    if (customLogLevel){
        return customLogLevel;
    }

    if (environment == PRODUCTION){
        return log4js.levels.ERROR.levelStr;
    }

    return log4js.levels.INFO.levelStr;
};

const LoggerUtils = {
    getLogLevel,
};

export default LoggerUtils;