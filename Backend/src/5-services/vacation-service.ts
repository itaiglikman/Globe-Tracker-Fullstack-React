import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import VacationModel from "../3-models/vacation-model";
import appConfig from "../2-utils/app-config";
import imageHelper from "../2-utils/image-helper";

// get all vacations:
async function getAllVacations(): Promise<VacationModel[]> {
    // create sql:
    let sql = `SELECT 
        vacationId,
        destination, 
        description, 
        startDate, 
        finishDate, 
        price, 
        CONCAT('${appConfig.domainName}/api/vacations/', imageName) as imageUrl
        FROM vacations`;

    // get vacations from db in array:
    let vacations = await dal.execute(sql);

    return vacations;
}

// get all vacations with follow data by userId:
async function getFollowVacations(userId: number): Promise<VacationModel[]> {
    // create sql:
    // 1. get all vacation properties.
    // 2. create imageUrl address.
    // 3. if exists - select followers data (isFollowing & followersCount) from followers table, by userId.
    // 4. order vacations by date.
    const sql = `
    SELECT
    V.vacationId, V.destination, V.description, V.startDate, V.finishDate, V.price,
    CONCAT('${appConfig.domainName}/api/vacations/', V.imageName) AS imageUrl,
    EXISTS(SELECT * FROM followers AS F WHERE F.vacationId = V.vacationId AND F.userId = ?) AS isFollowing,
    (SELECT COUNT(F.userId) FROM followers AS F WHERE F.vacationId = V.vacationId) AS followersCount
    FROM vacations AS V
    ORDER BY V.startDate;
    `;

    // get vacations from db in array:
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
}

// get single vacation by id (for update action):
async function getVacationById(vacationId: number): Promise<VacationModel> {
    // create sql:
    let sql = `SELECT 
        vacationId,
        destination, 
        description, 
        startDate, 
        finishDate, 
        price, 
        CONCAT('${appConfig.domainName}/api/vacations/', imageName) as imageUrl
        FROM vacations WHERE vacationId = ?`;

    // get vacations from db in array:
    let vacations = await dal.execute(sql, [vacationId]); //return array
    if (!vacations.length) throw new ResourceNotFoundError(vacationId);
    let vacation = vacations[0]; // get the item object
    return vacation;
}

// add new vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    // validation:
    vacation.validate();

    // save image:
    // check if contain image:
    let imageName = await imageHelper.saveImage(vacation.image);

    // create sql:
    let sql = `INSERT INTO 
    vacations(destination, 
                    description, 
                    startDate, 
                    finishDate, 
                    price, 
                    imageName) 
                VALUES(?,?,?,?,?,?);`

    // send vacation to db:
    let info: OkPacket = await dal.execute(sql,
        [vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.finishDate,
        vacation.price,
            imageName]);

    // insert id:
    vacation.vacationId = info.insertId;

    // set image url fot front obj:
    vacation.imageUrl = `${appConfig.domainName}/api/vacations/${imageName}`;

    // remove image from vacation object because we don't response it back:
    delete vacation.image;

    // return added vacation:
    return vacation;
}

// Update full vacation:
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // validation:
    vacation.validate();

    let sql = "", imageName = "";

    // get vacation's existing image:
    let oldImage = await getImageName(vacation.vacationId);

    // if client sent image send new image:
    if (vacation.image) {
        // delete old image from the disk and save the new one. Get new image's name:
        imageName = await imageHelper.updateImage(vacation.image, oldImage);

        sql = `
        UPDATE vacations SET 
        destination=?,
        description=?,
        startDate=?,
        finishDate=?,
        price=?,
        imageName=?
        WHERE vacationId=${vacation.vacationId};
        `;
    } else { //if no image to update send old image:
        imageName = oldImage;
        sql = ` UPDATE vacations SET 
        destination=?,
        description=?,
        startDate=?,
        finishDate=?,
        price=?,
        imageName=?
        WHERE vacationId=${vacation.vacationId};
        `;
    }

    let info: OkPacket = await dal.execute(sql,
        [vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.finishDate,
        vacation.price,
            imageName]);

    // If nothing was affected and vacation doesn't exist - send error:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // get image url:
    vacation.imageUrl = `${appConfig.domainName}/api/vacations/${imageName}`;

    // remove image from vacation object because we don't response it back:
    delete vacation.image;

    // return updated item:
    return vacation;

}

// Delete vacation:
async function deleteVacation(vacationId: number): Promise<void> {

    // take old image:
    let oldImage = await getImageName(vacationId);

    // Delete image:
    await imageHelper.deleteImage(oldImage);

    // create sql:
    let sql = `DELETE from vacations WHERE vacationId = ? `;
    let info: OkPacket = await dal.execute(sql, [vacationId]);

    // If nothing was affected and vacation doesn't exist - send error:
    if (!info.affectedRows) throw new ResourceNotFoundError(vacationId);
}

// get the old image name from DB and return the imageName:
async function getImageName(id: number): Promise<string> {
    let sql = `SELECT imageName FROM vacations WHERE vacationId = ${id} `;
    let vacations = await dal.execute(sql);
    let vacation = vacations[0];
    if (!vacation) return null;
    let imageName = vacation.imageName;
    return imageName;
}

export default {
    getAllVacations,
    getVacationById,
    addVacation,
    updateVacation,
    deleteVacation,
    getFollowVacations,
};

