import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public finishDate: string;
    public price: number;
    public imageUrl: string;
    public image: UploadedFile;

    constructor(vacation: VacationModel) { //copy constructor
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.finishDate = vacation.finishDate;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
    }

    // validation schema - build once:
    private static validationSchema = Joi.object({
        vacationId: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().min(2).max(50).trim(),
        description: Joi.string().required().min(10).max(2000).trim(),
        startDate: Joi.date().required().iso(),
        finishDate: Joi.date().required().iso().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0).max(10000),
        imageUrl: Joi.string().optional().min(40).max(200),
        image:Joi.object().optional().max(50)
    });

    // validate properties and throw if not valid:
    public validate(): void {
        let result = VacationModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default VacationModel;