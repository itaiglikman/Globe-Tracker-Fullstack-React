import Joi from "joi";
import { ValidationError } from "./client-errors";

class FollowerModel {
    public userId: number;
    public vacationId: number;

    constructor(follower: FollowerModel) { //copy constructor
        this.userId = follower.userId;
        this.vacationId = follower.vacationId;
    }

    // create validation schema:
    private static validationSchema = Joi.object({
        userId: Joi.number().required().integer().positive(),
        vacationId: Joi.number().required().integer().positive(),
    });

    // validate properties and throw if not valid:
    public validate(): void {
        let result = FollowerModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default FollowerModel;