import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ValidationError } from "../3-models/client-errors";
import FollowerModel from "../3-models/follower-model";

// Add new follow:
async function addFollow(newFollower: FollowerModel): Promise<FollowerModel> {
    // validate if user and vacation exist
    newFollower.validate();

    // create sql:
    let sql =
    `INSERT INTO followers(userId,vacationId) VALUES(?,?);`;
    
    // add new follow to db:
    await dal.execute(sql, [newFollower.userId, newFollower.vacationId]);
    
    return newFollower;
}

// Delete a single follow by userId and vacationId:
async function deleteFollow(userId: number, vacationId: number): Promise<void> {
    
    // create sql:
    let sql =
        `DELETE FROM followers WHERE userId = ? AND vacationId = ?;`;

    // remove follow from db:
    let info: OkPacket = await dal.execute(sql, [userId, vacationId]);

    // If nothing was affected and follow doesn't exist - send error:
    if (info.affectedRows === 0) throw new ValidationError("vacation or user wasn't found");
}

export default {
    addFollow,
    deleteFollow,
}