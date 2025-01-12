import LoggerUtils from "../utils/loggersUtils";
import log4js from "log4js";

require("dotenv").config();

const customLogLevel = process.env.LogLevel;
const env = process.env.Environment;

const logLevel = LoggerUtils.getLogLevel(env, customLogLevel);

log4js.configure({
  appenders: { console: { type: "console" } },
  categories: { default: { appenders: ["console"], level: logLevel } },
});

const logger = log4js.getLogger();

export default logger;
