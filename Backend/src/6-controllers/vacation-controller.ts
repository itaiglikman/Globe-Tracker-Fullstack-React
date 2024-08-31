import express, { NextFunction, Request, Response } from "express";
import path from "path";
import StatusCode from "../3-models/status-code";
import VacationModel from "../3-models/vacation-model";
import verifyAdmin from "../4-middleware/verify-admin";
import verifyToken from "../4-middleware/verify-token";
import vacationService from "../5-services/vacation-service";

const router = express.Router();

// GET all vacations http://localhost:4000/api/vacations
// Access: Only registered user
router.get("/vacations", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        let vacations = await vacationService.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET Vacations with follow data by userId http://localhost:4000/api/follow-vacations/:userId
// Access: Only registered user
router.get("/follow-vacations/:userId([0-9]+)", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        let userId = +request.params.userId;

        let vacations = await vacationService.getFollowVacations(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err)
    }
});

// GET vacation one vacation by vacationId http://localhost:4000/api/vacations/:id
// Access: Only admin (for update action):
router.get("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        let vacationId = +request.params.vacationId;
        let vacation = await vacationService.getVacationById(vacationId);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// POST add new vacation http://localhost:4000/api/vacations
// Access: Only admin
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // image isn't in the body request.
        // add image to request.files into request.body:
        request.body.image = request.files?.image;

        let vacation = new VacationModel(request.body);
        let newVacation = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(newVacation);
    }
    catch (err: any) {
        next(err);
    }
});

//PUT update full vacation http://localhost:4000/api/vacations/:id
// Access: Only admin
router.put("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // set request as a new object:
        request.body = new VacationModel(request.body);
        // insert the wanted id:
        request.body.vacationId = +request.params.vacationId;

        // handle image in body,
        // add image to request.files into request.body:
        request.body.image = request.files?.image;

        // get the vacation:
        let vacation = request.body;

        // update item in DB:
        let updatedVacation = await vacationService.updateVacation(vacation);

        // response back the updated item:
        response.json(updatedVacation);
    } catch (err: any) {
        next(err);
    }
});

// DELETE vacation by vacationId http://localhost:4000/api/vacations/:id
// Access: Only admin
router.delete("/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        let vacationId = +request.params.vacationId;
        await vacationService.deleteVacation(vacationId);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) { next(err) }
});

// GET image: http://localhost:4000/api/vacations/:imageName
router.get("/vacations/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // get image name:
        let imageName = request.params.imageName;

        // get absolute path:
        let absolutePath = path.join(__dirname, "../1-assets/images/destinations/", imageName);

        // response back the image file:
        response.sendFile(absolutePath);

    } catch (err: any) {
        next(err);
    }
});

export default router;
