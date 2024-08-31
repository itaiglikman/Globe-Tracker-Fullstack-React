import { NextFunction, Request, Response } from "express";
import logger from "../2-utils/logger";
import appConfig from "../2-utils/app-config";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    // Find status code: 
    const statusCode = err.status || 500; // Short Circuit

    const isCrash = statusCode >= 500 && statusCode <= 599;

    console.log(err);

    //On production: Display generic error
    // On development: Display the real error
    const message = isCrash && appConfig.isProduction ? "An unexpected error happened - please try again later." : err.message;

    // Log errors to errors.log file: 
    logger.logError(err.message, err);

    // Response back error message to frontend:
    response.status(statusCode).send(message);
}

export default catchAll;
