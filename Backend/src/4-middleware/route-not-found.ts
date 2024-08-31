import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError, UnauthorizedError } from "../3-models/client-errors";

function routeNotFound(request: Request, response: Response, next: NextFunction) {
    let err: RouteNotFoundError | UnauthorizedError;
    // on request for followed vacations - userId is sent.
    // if user is not logged - the sent userId is undefined and will be caught here.
    // throw the right error:
    if (request.originalUrl === '/api/follow-vacations/undefined') {
        err = new UnauthorizedError('Please login');
    } else err = new RouteNotFoundError(request.originalUrl);
    next(err);
}

export default routeNotFound;
