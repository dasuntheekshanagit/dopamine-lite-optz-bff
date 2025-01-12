import { HttpStatusCode } from "axios";

const ErrorResponse = (res, status, error, message) => {
  const statusCode = status || HttpStatusCode.InternalServerError;

  const errorResponse = {
    timestamp: new Date(),
    status: statusCode,
    error: error,
    message: message,
  };

  return res.status(statusCode).send(errorResponse);
};
const sharedResponses = {
  ErrorResponse,
};

export default sharedResponses;
