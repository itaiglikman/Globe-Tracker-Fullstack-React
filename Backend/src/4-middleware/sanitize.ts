import { Request, Response, NextFunction } from "express";
import striptags from "striptags";

// Remove tags from user input:
function sanitize(request: Request, response: Response, next: NextFunction) {
    for(const prop in request.body) { // Run the request.body obj.
        if(typeof request.body[prop] === "string") { // Check if it's a string
            request.body[prop] = striptags(request.body[prop]); // If it's a string - rewrite without tags.
        }
    }
    next();
}

export default sanitize;