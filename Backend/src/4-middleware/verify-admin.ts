import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

// verify admin validity:
function verifyAdmin(request: Request, response: Response, next: NextFunction): void {

    // authorization: "Bearer the-token"
    //                 01234567
    let authorizationHeader = request.header("authorization");

    // extract token:
    let token = authorizationHeader?.substring(7);

    // verify token:
    cyber.verifyAdmin(token);

    // request contains the verifyAdmin key:
    next();
}

export default verifyAdmin;