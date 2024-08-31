import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1,. Global state:
export class VacationsState {
    public vacations: VacationModel[] = []; // Init with empty array.
}

// 2. action type:
export enum VacationActionType {
    SetVacations = "setVacations",
    AddVacation = "addVacation",
    UpdateVacation = "updateVacation",
    DeleteVacation = "deleteVacation",
    Follow = "addFollow",
    Unfollow = "unfollow"
}

// 3. action objet:
export interface VacationAction {
    type: VacationActionType; // Wanted action type from the given options.
    payload?: any; // Wanted info type from the given options.
}

// 4. reducer (invoked by redux library):
export function vacationsReducer(currentState = new VacationsState(), action: VacationAction): VacationsState {
    let newState = { ...currentState };

    switch (action.type) {
        case VacationActionType.SetVacations: //payload is an array with all vacations.
            newState.vacations = action.payload; //update state of vacations.
            break;

        case VacationActionType.AddVacation: //payload is a vacation object.
            newState.vacations.push(action.payload); //add to vacations state the new vacation.
            break;

        case VacationActionType.UpdateVacation: // payload is an updated vacation.
            // find the index of the vacation to update:
            let indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);

            // if vacation was found - update the state:
            if (indexToUpdate >= 0) newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationActionType.DeleteVacation: //payload is a vacation index to delete:
            newState.vacations = newState.vacations.filter(v => v.vacationId !== action.payload);
            break;

        case VacationActionType.Follow: //payload is a liked vacation id :
            let indexToFollow = newState.vacations.findIndex(v => v.vacationId === action.payload);
            let followVacation = newState.vacations[indexToFollow]; // get the vacation to update
            followVacation.isFollowing = 1; //current logged user is following 1.
            followVacation.followersCount += 1; //increment followers.
            break;

        case VacationActionType.Unfollow: //payload is a liked vacation id :
            let indexToUnfollow = newState.vacations.findIndex(v => v.vacationId === action.payload);
            let unfollowVacation = newState.vacations[indexToUnfollow]; // get the vacation to update
            unfollowVacation.isFollowing = 0; //current logged user is following 0.
            unfollowVacation.followersCount -= 1; //decrement followers.
            break;


    }

    return newState; // return the updated global state
}

// 5. Store:
export const vacationStore = createStore(vacationsReducer);