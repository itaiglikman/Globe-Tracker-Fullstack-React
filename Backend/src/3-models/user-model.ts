import Joi from "joi";
import { ValidationError } from "./client-errors";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;

    constructor(user: UserModel) { //copy constructor
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    // create validation schema:
    private static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(30).trim(),
        lastName: Joi.string().required().min(2).max(30).trim(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4),
        roleId: Joi.number().optional().min(1).max(2)
    });

    // validate properties and throw if not valid:
    public validate(): void {
        let result = UserModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default UserModel;