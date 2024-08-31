import express, { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";
import verifyToken from "../4-middleware/verify-token";
import followService from "../5-services/follow-service";
import followerModel from "../3-models/follower-model";

const router = express.Router();

// Post add follow http://localhost:4000/api/follow
// Access: Only registered user
router.post("/follow", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // get follow info:
        let newFollow = new followerModel(request.body);

        // add new follow to db:
        await followService.addFollow(newFollow);
        response.status(StatusCode.Created).json(newFollow);
    }
    catch (err: any) { next(err) }
});

// DELETE follow http://localhost:4000/api/follow/:userId/:vacationId
// Access: Only registered user
router.delete("/follow/:userId([0-9]+)/:vacationId([0-9]+)", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // get follow info from params:
        let userId = +request.params.userId;
        let vacationId = +request.params.vacationId;

        // delete follow from db:
        await followService.deleteFollow(userId, vacationId);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) { next(err) }
});

export default router;
