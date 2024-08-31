import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationAction, VacationActionType, vacationStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class VacationService {

    // GET all vacations with followers: 
    // function get the logged-user id
    public async getFollowVacations(userId: number): Promise<VacationModel[]> {

        // get vacations from global state:
        let vacations = vacationStore.getState().vacations;

        // if no vacations exist in global state:
        if (vacations.length === 0) {
            // get vacations from server:
            let response = await axios.get<VacationModel[]>(appConfig.followVacationsUrl + userId);
            vacations = response.data;

            // update global state:
            let action: VacationAction = { type: VacationActionType.SetVacations, payload: vacations };
            vacationStore.dispatch(action);
        }
        return vacations;
    }

    // GET a single vacation by id (use in update vacation):
    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        // get vacations from global state:
        let vacations = vacationStore.getState().vacations;

        // get the wanted vacation from vacations:
        let vacation = vacations.find(v => v.vacationId === vacationId);

        // if vacation was't found:
        if (!vacation) {
            let response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
            vacation = response.data;
        }
        return vacation;
    }

    // POST add new item to the server:
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        // Header is an additional data sent in the request for configuration:
        const options = {
            headers: { "Content-Type": "multipart/form-data" } // include files in the request.
        }

        // post item to backend:
        let response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);

        let addedVacation = response.data;

        // implement follow data:
        addedVacation.isFollowing = 0;
        addedVacation.followersCount= 0;

        // add new item to global state:
        let action: VacationAction = { type: VacationActionType.AddVacation, payload: addedVacation };
        vacationStore.dispatch(action);

        return addedVacation;
    }

    // PUT update existing vacation:
    // public async updateVacation(vacation: VacationModel,isFollowing?:number,followersCount?:number): Promise<VacationModel> {
    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        // Header is an additional data sent in the request for configuration:
        const options = {
            headers: { "Content-Type": "multipart/form-data" } // include files in the request.
        }

        // update db:
        let response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, options);

        let updatedVacation = response.data;

        // implement follow data:
        updatedVacation.isFollowing = vacation.isFollowing;
        updatedVacation.followersCount= vacation.followersCount;

        // update global state:
        let action: VacationAction = { type: VacationActionType.UpdateVacation, payload: updatedVacation };
        vacationStore.dispatch(action);

        return updatedVacation;
    }

    // DELETE vacation by id:
    public async deleteVacation(vacationId: number): Promise<void> {

        // delete from db:
        await axios.delete(appConfig.vacationsUrl + vacationId);

        // delete from global state:
        let action: VacationAction = { type: VacationActionType.DeleteVacation, payload: vacationId };

        vacationStore.dispatch(action);
    }

    // function get the page info.
    // return the page's vacations array:
    public getVacationsPage(currentPage: number, cardsLimitPerPage: number, vacations: VacationModel[]):VacationModel[] {
        let currentPageVacations: VacationModel[] = [];
        if (vacations.length === 0) return currentPageVacations;
        // insert to the array all needed vacations:
        for (let i = (currentPage - 1) * cardsLimitPerPage; i < currentPage * cardsLimitPerPage; i++) {
            currentPageVacations.push(vacations[i]);
            // in case the last page has less items then the limit:
            if (i === vacations.length - 1) break;
        }
        return currentPageVacations;
    }
}

const vacationService = new VacationService();

export default vacationService;
