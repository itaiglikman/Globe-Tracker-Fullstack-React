import axios from "axios";
import { VacationAction, VacationActionType, vacationStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class FollowService {

    // add follow to vacation:
    // function get the user and the vacation to like:
    public async addFollow(userId: number, vacationId: number): Promise<void> {
        // add to db:
        let response = await axios.post(appConfig.followUrl, { userId, vacationId });
        let followed = response.data;
        // update global state:
        let action: VacationAction = { type: VacationActionType.Follow, payload: followed.vacationId };
        vacationStore.dispatch(action);
    }

    // remove follow to vacation:
    // function get the user and the vacation to dislike:
    public async deleteFollow(userId: number, vacationId: number): Promise<void> {
        // remove from db:
        await axios.delete(appConfig.followUrl + userId + "/" + vacationId);
        // update global state:
        let action: VacationAction = { type: VacationActionType.Unfollow, payload: vacationId };
        vacationStore.dispatch(action);
    }
}

const followService = new FollowService();
export default followService;