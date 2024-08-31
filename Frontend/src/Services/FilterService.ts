import FiltersModel from "../Models/FiltersModel";
import VacationModel from "../Models/VacationModel";

class FilterService {

    // function get the current active filters and the vacations array.
    // function will direct to the right option to filter by the active filters.
    // function will return the filtered vacations:
    public getFilters(currentFilters: FiltersModel, vacations: VacationModel[]): VacationModel[] {

        // all vacations:
        if (currentFilters.all)
            return vacations;

        // active vacations and followed vacations:
        if (currentFilters.active && currentFilters.followed)
            return this.filterActiveAndFollowedVacations(vacations);

        // future vacations and followed vacations:
        if (currentFilters.future && currentFilters.followed)
            return this.filterFutureAndFollowedVacations(vacations);

        //only active vacations:
        if (currentFilters.active)
            return this.filterActiveVacations(vacations);

        //only future vacations:
        if (currentFilters.future)
            return this.filterFutureVacations(vacations);

        //only followed vacations:
        if (currentFilters.followed)
            return this.filterFollowedVacations(vacations);

        // if no filter was pressed send back all vacations:
        return vacations;
    }

    //only active vacations:
    filterActiveVacations(vacations: VacationModel[]): VacationModel[] {
        let filteredVacations = vacations.filter(v => {
            let isActive = this.checkIfActive(v);
            if (isActive) return v;
        });
       
        return filteredVacations;
    }

    //only future vacations:
    filterFutureVacations(vacations: VacationModel[]): VacationModel[] {
        let filteredVacations = vacations.filter(v => {
            let isFuture = this.checkIfFuture(v);
            if (isFuture) return v;
        });
       
        return filteredVacations;
    }
    // active vacations and followed vacations:
    filterActiveAndFollowedVacations(vacations: VacationModel[]): VacationModel[] {
        let filteredVacations = vacations.filter(v =>
            this.checkIfActive(v) && this.checkIfFollowed(v));
       
        return filteredVacations;
    }

    // future vacations and followed vacations:
    filterFutureAndFollowedVacations(vacations: VacationModel[]): VacationModel[] {
        let filteredVacations = vacations.filter(v =>
            this.checkIfFuture(v) && this.checkIfFollowed(v));
       
        return filteredVacations;
    }

    //only followed vacations:
    filterFollowedVacations(vacations: VacationModel[]): VacationModel[] {
        let filteredVacations = vacations.filter(v => this.checkIfFollowed(v));
        return filteredVacations;
    }

    // check is vacation is active today:
    checkIfActive(vacation: VacationModel): boolean {
        let start = new Date(vacation.startDate);
        let finish = new Date(vacation.finishDate);
        let today = new Date();
        let isActive = start <= today && today <= finish;
        return isActive;
    }

    // check if vacation didn't start yet:
    checkIfFuture(vacation: VacationModel): boolean {
        let start = new Date(vacation.startDate);
        let today = new Date();
        let isFuture = start > today;
        return isFuture;
    }
    
    // check if vacation is followed by logged user:
    checkIfFollowed(vacation: VacationModel): boolean {
        return vacation.isFollowing === 1;
    }

}

const filterService = new FilterService();
export default filterService;